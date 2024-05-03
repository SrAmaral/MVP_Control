package main

import (
	"fmt"
	"net/http"
)

func main() {
    fmt.Printf("Primeiro Log")
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w,string("<h1>Teste</h1>"))
	})
    http.ListenAndServe(":8082", nil)
}
