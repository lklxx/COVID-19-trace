package db

import (
    "context"
    "fmt"
    "log"
    _ "github.com/joho/godotenv/autoload"
    "cloud.google.com/go/bigtable"
)

type InfectedTrace struct {
    Class   string
    Place   string
}

type InfectedTimeTraceList struct {
    Time         string
    InfectedTraceList   []InfectedTrace
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

func HandleInfectedTraceStore(infectedTimeTraceList InfectedTimeTraceList) []error {

    time := infectedTimeTraceList.Time
    infectedTraceList := infectedTimeTraceList.InfectedTraceList
    ctx := context.Background()
    var errs []error

    // Create table if it's not yet created

    if !sliceContains(tables, tableName) {
        log.Printf("Creating table %s", tableName)
        if err := adminClient.CreateTable(ctx, tableName); err != nil {
            log.Fatalf("Could not create table %s: %v", tableName, err)
            return append(errs, err)
        }
    }

    // Issue mutations

    tbl := client.Open(tableName)
    muts := make([]*bigtable.Mutation, len(infectedTraceList))
    rowKeys := make([]string, len(infectedTraceList))

    for i, trace := range infectedTraceList {
        muts[i] = bigtable.NewMutation()
        columnFamilyName := trace.Class
		columnName := fmt.Sprintf("%s", trace.Place)
        muts[i].Set(columnFamilyName, columnName, bigtable.Now(), []byte("1"))
        rowKeys[i] = time
    }

    // Apply mutations

    rowErrs, err := tbl.ApplyBulk(ctx, rowKeys, muts)
    if err != nil {
        log.Fatalf("Could not apply bulk row mutation: %v", err)
        return append(errs, err)
    }
    if rowErrs != nil {
        for _, rowErr := range rowErrs {
            log.Printf("Error writing row: %v", rowErr)
        }
        log.Fatalf("Could not write some rows")
        return rowErrs
    }

    return errs
}