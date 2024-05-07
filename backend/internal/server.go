package internal

import (
	"net/http"

	"github.com/go-chi/chi/v5"
)

type HttpServer struct {
	Path   string
	Port   string
	Router *chi.Mux
}

type MountableHttpAdapter interface {
	MountAdapter() (path string, router chi.Mux)
}

func NewHttpServer(Port string, Path string) *HttpServer {
	return &HttpServer{Port: Port, Path: Path, Router: chi.NewRouter()}
}

func (h HttpServer) MountAdapter(a MountableHttpAdapter) {
	p,r := a.MountAdapter()
	h.Router.Mount(h.Path+p, &r)
}

func (h HttpServer) StartServer() {
	http.ListenAndServe(h.Port, h.Router)
}
