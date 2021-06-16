package db

import (
    "context"
    // "fmt"
    "log"
    "strings"
    _ "github.com/joho/godotenv/autoload"
    "cloud.google.com/go/bigtable"
)

type Trace struct {
    Class   string
    Place   string
    Time    string
}

type TraceListS struct {
    TraceList   []Trace
}

var adminClient *bigtable.AdminClient
var client *bigtable.Client
var tables []string

const tableName = "trace-infected"

func sliceContains(list []string, target string) bool {
    for _, s := range list {
        if s == target {
            return true
        }
    }
    return false
}

func InitDB(ac *bigtable.AdminClient, c *bigtable.Client, t []string) {
    adminClient = ac
    client = c
    tables = t
}

func HandleInfectedMatch(traceList []Trace) ([]Trace, []error) {

    ctx := context.Background()
	var matchedTraceList []Trace
    var errs []error

    // Create table if it's not yet created

    if !sliceContains(tables, tableName) {
        log.Printf("Creating table %s", tableName)
        if err := adminClient.CreateTable(ctx, tableName); err != nil {
            log.Fatalf("Could not create table %s: %v", tableName, err)
            return matchedTraceList, append(errs, err)
        }
    }

    // Fetch

    tbl := client.Open(tableName)

    for _, trace := range traceList {
		rowKey := trace.Time

		row, err := tbl.ReadRow(ctx, rowKey)
		if err != nil {
			log.Fatalf("Could not read row: %v", err)
			return matchedTraceList, append(errs, err)
		}

		for cf, itemList := range row {
			if cf != trace.Class { continue }
			for _, item := range itemList {
                family_column := strings.Split(item.Column, ":")
				column := family_column[1]
				if column != trace.Place { continue }
				goto trace_matched
			}
		}

		continue

trace_matched:
		matchedTraceList = append(matchedTraceList, trace)
	}

    return matchedTraceList, errs
}