package db

import (
    "context"
    "fmt"
    "log"
    "strconv"
    "time"
    _ "github.com/joho/godotenv/autoload"
    "cloud.google.com/go/bigtable"
)

type Trace struct {
    Class   string
    Place   string
    Time    string
}

type UserTraceList struct {
    Uid         string
    TraceList   []Trace
}

var adminClient *bigtable.AdminClient
var client *bigtable.Client
var tables []string

const tableName = "trace-all"

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

func HandleTraceStore(userTraceList UserTraceList) []error {

    uid := userTraceList.Uid
    traceList := userTraceList.TraceList
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
    muts := make([]*bigtable.Mutation, len(traceList))
    rowKeys := make([]string, len(traceList))

    tblInfo, err := adminClient.TableInfo(ctx, tableName)
    if err != nil {
        log.Fatalf("Could not read info for table %s: %v", tableName, err)
    }

    for i, trace := range traceList {
        muts[i] = bigtable.NewMutation()
        columnFamilyName := trace.Class

        // Create column family if it's not yet created

        if !sliceContains(tblInfo.Families, columnFamilyName) {
            if err := adminClient.CreateColumnFamily(ctx, tableName, columnFamilyName); err != nil {
                log.Fatalf("Could not create column family %s: %v", columnFamilyName, err)
            }
        }

        curTime := time.Now().Unix()
        curOffset := curTime % 2592000
        traceOffset, _ := strconv.Atoi(trace.Time)
        traceTimeStamp := curTime - (curOffset - int64(traceOffset))
        if traceTimeStamp > curTime {
            traceTimeStamp -= 2592000
        }
        timeStamp := bigtable.Timestamp(traceTimeStamp * 1000000)

        columnName := fmt.Sprintf("%s#%s", trace.Place, trace.Time)
        muts[i].Set(columnFamilyName, columnName, timeStamp, []byte("1"))
        rowKeys[i] = uid
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