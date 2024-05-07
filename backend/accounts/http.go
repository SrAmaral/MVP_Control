// http adapter
package accounts

import (
	"app/internal"
	"net/http"

	"github.com/go-chi/chi/v5"
)

type AccountsHttpAdapter struct {
	account_service AccountsService
	path string
}

func NewAccountsHttpAdapter(db *internal.DBManager) *AccountsHttpAdapter {
	ur :=NewUserRepository(db.DB)
	cr := NewClientRepository(db.DB)
	s:=NewAccountsServiceImpl(ur,cr)
	return &AccountsHttpAdapter{
		account_service: *s,
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
	h.account_service.UserRepository.FindAll()
}

func (h AccountsHttpAdapter) createUser(w http.ResponseWriter, r *http.Request) {
	h.account_service.UserRepository.Create(User{})
}

func (h AccountsHttpAdapter) getUserById(w http.ResponseWriter, r *http.Request) {
	h.account_service.UserRepository.Read(1)
}

func (h AccountsHttpAdapter) updateUser(w http.ResponseWriter, r *http.Request) {
	h.account_service.UserRepository.Update(User{})
}

func (h AccountsHttpAdapter) deleteUser(w http.ResponseWriter, r *http.Request) {
	h.account_service.UserRepository.Delete(1)
}

// Clients
func (h AccountsHttpAdapter) getClients(w http.ResponseWriter, r *http.Request) {
	h.account_service.ClientRepository.FindAll()
}

func (h AccountsHttpAdapter) createClient(w http.ResponseWriter, r *http.Request) {
	h.account_service.ClientRepository.Create(Client{})
}

func (h AccountsHttpAdapter) getClientById(w http.ResponseWriter, r *http.Request) {
	h.account_service.ClientRepository.Read(1)
}

func (h AccountsHttpAdapter) updateClient(w http.ResponseWriter, r *http.Request) {
	h.account_service.ClientRepository.Update(Client{})
}

func (h AccountsHttpAdapter) deleteClient(w http.ResponseWriter, r *http.Request) {
	h.account_service.ClientRepository.Delete(1)
}
