// http adapter
package accounts

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
)

type AccountsHttpAdapter struct {
	account_service AccountsService
	path string
}

func NewAccountsHttpAdapter() *AccountsHttpAdapter {
	return &AccountsHttpAdapter{
		account_service: *NewAccountsServiceImpl(UserRepository{}, ClientRepository{}),
		path: "/accounts",
	}
}
func (h AccountsHttpAdapter) MountAdapter() (path string, router chi.Mux){
	r := chi.NewRouter()
	//Users
	r.Get("/users", h.getUsers)
	r.Post("/users", h.createUser)
	r.Get("/users/{userID}", h.getUserById)
	r.Post("/users/{userID}", h.updateUser)
	r.Delete("/users/{userID}", h.deleteUser)

	//Clients
	r.Get("/clients", h.getClients)
	r.Post("/clients", h.createClient)
	r.Get("/clients/{clientID}", h.getClientById)
	r.Post("/clients/{clientID}", h.updateClient)
	r.Delete("/clients/{clientID}", h.deleteClient)

	return h.path,*r
}

// Users
func (h AccountsHttpAdapter) getUsers(w http.ResponseWriter, r *http.Request) {
	fmt.Println("getUsers")
	//h.account_service.UserRepository.FindAll()
}

func (h AccountsHttpAdapter) createUser(w http.ResponseWriter, r *http.Request) {

}

func (h AccountsHttpAdapter) getUserById(w http.ResponseWriter, r *http.Request) {

}

func (h AccountsHttpAdapter) updateUser(w http.ResponseWriter, r *http.Request) {

}

func (h AccountsHttpAdapter) deleteUser(w http.ResponseWriter, r *http.Request) {

}

// Clients
func (h AccountsHttpAdapter) getClients(w http.ResponseWriter, r *http.Request) {
	fmt.Println("getAccounts")
}

func (h AccountsHttpAdapter) createClient(w http.ResponseWriter, r *http.Request) {

}

func (h AccountsHttpAdapter) getClientById(w http.ResponseWriter, r *http.Request) {

}

func (h AccountsHttpAdapter) updateClient(w http.ResponseWriter, r *http.Request) {

}

func (h AccountsHttpAdapter) deleteClient(w http.ResponseWriter, r *http.Request) {

}
