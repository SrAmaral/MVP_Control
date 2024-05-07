package internal

import (
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

type DBManager struct{
	DB *sqlx.DB
}

func ConnectDB(dataSource string) *DBManager {
	db, err := sqlx.Connect("postgres", dataSource)
	if err != nil {
		panic(err)
	}
	defer db.Close()
	return &DBManager{
		DB:db,
	}
}

func (db DBManager) RegisterRepository(f *func() any){
}
