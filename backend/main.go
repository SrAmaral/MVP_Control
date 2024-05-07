package main

import (
	"app/accounts"
	"app/internal"
)

func main() {
	durl:= "postgres://postgres:IHtnxfVSIFjLLdx4JInTh724ORFoDNUQKgdlJSRL9kO0fR1MDhnyRLg8NU0LHDwh@82.197.94.212:5432/mvp_control_db?sslmode=disable"
	d := internal.ConnectDB(durl)
	r := internal.NewHttpServer(":8082", "/v1")
	r.MountAdapter(accounts.NewAccountsHttpAdapter(d))
	r.StartServer()
}
