package main

import (
    "context"
    "flag"
	"fmt"
	"log"
    "os"
    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
    "cloud.google.com/go/bigtable"
    "github.com/Leng-Kai/COVID-19-trace/backend/infected-store/db"
)

func infected_store(c *gin.Context) {

    infectedTimeTraceList := db.InfectedTimeTraceList{}
	c.BindJSON(&infectedTimeTraceList)
	log.Printf("%v", &infectedTimeTraceList)

    time := infectedTimeTraceList.Time
    infectedTraceList := infectedTimeTraceList.InfectedTraceList

    fmt.Println("time:", time)
    fmt.Println("infected trace: [")
    for i := range infectedTraceList {
        fmt.Println(infectedTraceList[i].Class, infectedTraceList[i].Place, ",")
    }
    fmt.Println("]")

    // db mutation
    err := db.HandleInfectedTraceStore(infectedTimeTraceList)
    res := "success"
    if len(err) != 0 {
        res = "failed"
    }

    c.JSON(200, gin.H{
        "res":  res,
        "err":  err,
    })
}

func main() {
    server := gin.Default()
    project_id := os.Getenv("PROJECT_ID")
    instance_id := os.Getenv("INSTANCE_ID")
    project  := flag.String("project", project_id, "The Google Cloud Platform project ID. Required.")
    instance := flag.String("instance", instance_id, "The Google Cloud Bigtable instance ID. Required.")
    flag.Parse()

    for _, f := range []string{ "project", "instance" } {
        if flag.Lookup(f).Value.String() == "" {
            log.Fatalf("The %s flag is required.", f)
        }
    }

    ctx := context.Background()
    adminClient, err := bigtable.NewAdminClient(ctx, *project, *instance)
    if err != nil {
        log.Fatalf("Could not create admin client: %v", err)
    }
    client, err := bigtable.NewClient(ctx, *project, *instance)
    if err != nil {
        log.Fatalf("Could not create data operations client: %v", err)
    }
    tables, err := adminClient.Tables(ctx)
    if err != nil {
        log.Fatalf("Could not fetch table list: %v", err)
    }

    db.InitDB(adminClient, client, tables)

    server.Use(cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"POST"},
		AllowHeaders:     []string{"Authorization", "Content-Type", "Upgrade", "Origin", "Connection", "Accept-Encoding", "Accept-Language", "Host", "Access-Control-Request-Method", "Access-Control-Request-Headers"},
	}))
    server.POST("/infected-store", infected_store)
    server.Run(":9090")
}