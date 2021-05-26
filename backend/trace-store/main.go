package main

import (
	"fmt"
	"log"
    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
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

func trace_store(c *gin.Context) {

    userTraceList := UserTraceList{}
	c.BindJSON(&userTraceList)
	log.Printf("%v", &userTraceList)

    uid := userTraceList.Uid
    traceList := userTraceList.TraceList

    fmt.Println("user:", uid)
    fmt.Println("user trace: [")
    for i := range traceList {
        fmt.Println(traceList[i].Class, traceList[i].Place, traceList[i].Time, ",")
    }
    fmt.Println("]")

    // db mutation

    c.JSON(200, gin.H{
        "res":   "success",
    })
}

func main() {    server := gin.Default()
    server.Use(cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"POST"},
		AllowHeaders:     []string{"Authorization", "Content-Type", "Upgrade", "Origin", "Connection", "Accept-Encoding", "Accept-Language", "Host", "Access-Control-Request-Method", "Access-Control-Request-Headers"},
	}))
    server.POST("/trace-store", trace_store)
    server.Run(":9090")
}