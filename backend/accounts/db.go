// database layer
package accounts

import "github.com/jmoiron/sqlx"

//ClientDAO
type ClientRepository struct {
	DB     *sqlx.DB
	Schema string
}

func NewClientRepository(db *sqlx.DB) *ClientRepository {
	return &ClientRepository{
		DB: db,
	}
}

func (r ClientRepository) Create(c Client) Client {
	return c
}

func (c ClientRepository) Read(id int) Client {
	panic("not implemented") // TODO: Implement
}

func (c ClientRepository) Update(entity Client) {
	panic("not implemented") // TODO: Implement
}

func (c ClientRepository) Delete(id int) {
	panic("not implemented") // TODO: Implement
}

func (c ClientRepository) FindAll() []Client {
	panic("not implemented") // TODO: Implement
}

//UserDAO
type UserRepository struct {
	DB     *sqlx.DB
	Schema string
}

func NewUserRepository(db *sqlx.DB) *UserRepository {
	return &UserRepository{
		DB: db,
	}
}

func (u UserRepository) Create(entity User) User {
	panic("not implemented") // TODO: Implement
}

func (u UserRepository) Read(id int) User {
	panic("not implemented") // TODO: Implement
}

func (u UserRepository) Update(entity User) {
	panic("not implemented") // TODO: Implement
}

func (u UserRepository) Delete(id int) {
	panic("not implemented") // TODO: Implement
}

func (u UserRepository) FindAll() []User {
	panic("not implemented") // TODO: Implement
}
