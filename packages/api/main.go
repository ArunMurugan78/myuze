package main

import (
  "github.com/gin-gonic/contrib/static"
  "github.com/gin-gonic/gin"
)

func main() {
  // Set the router as the default one shipped with Gin
  router := gin.Default()

  // Serve frontend static files
  router.Use(static.Serve("/", static.LocalFile("./client", true)))

  router.Run()
}
