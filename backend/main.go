package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/akadotsh/image-app/backend/config"
	"github.com/akadotsh/image-app/backend/graph"
	customMiddleware "github.com/akadotsh/image-app/backend/middleware"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/chi/v5"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
	"go.mongodb.org/mongo-driver/mongo"
)

const defaultPort = "8080"

func main() {

	if os.Getenv("ENV") != "production" {
        err := godotenv.Load()
        if err != nil {
            log.Fatalf("failed to load .env file")
        }
    }

	port := os.Getenv("PORT")
	db_password := os.Getenv("DB_PASSWORD")

	if port == "" {
		port = defaultPort
	}

	


	db:= config.ConnectDB(db_password)
    

	router:= chi.NewRouter();

	corsMiddleware := cors.New(cors.Options{
        AllowedOrigins:   []string{"*"}, 
        AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
        ExposedHeaders:   []string{"Link"},
        AllowCredentials: true,
        MaxAge:           300, 
    })

	
	router.Use(corsMiddleware.Handler)
   router.Use(middleware.Logger)
   router.Use(customMiddleware.AuthMiddleware(db))

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}}))

	fileServer := http.FileServer(http.Dir("./public"))

	// Route Handlers
    router.Handle("/documentation/*", http.StripPrefix("/documentation", fileServer))
	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", dbMiddleware(db,srv))

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Printf("Documentation available at http://localhost:%s/documentation/", port)
	log.Fatal(http.ListenAndServe("0.0.0.0:"+port, router))
}


func dbMiddleware(database *mongo.Database, next http.Handler) http.Handler{
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := config.WithDB(r.Context(), database)
		next.ServeHTTP(w, r.WithContext(ctx))
})}
