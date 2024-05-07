//domain
package accounts

type Client struct{

}

type User struct{

}

type CrudRepository[T any] interface {
	Create(entity T) T
	Read(id int) T
	Update(entity T)
	Delete(id int)
	FindAll() []T
}

type AccountsService struct{
	UserRepository CrudRepository[User]
	ClientRepository CrudRepository[Client]
}

func NewAccountsServiceImpl(UserRepository CrudRepository[User],ClientRepository CrudRepository[Client]) *AccountsService{
	return &AccountsService{UserRepository: UserRepository,ClientRepository: ClientRepository}
}