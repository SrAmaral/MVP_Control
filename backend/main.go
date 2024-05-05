package main

import (
	"app/accounts"
)

func main() {
	r := NewHttpServer(":8082", "/v1")
	r.MountAdapter(accounts.NewAccountsHttpAdapter())
	r.StartServer()
}
