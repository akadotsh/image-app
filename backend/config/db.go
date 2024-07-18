package config

import (
	"context"
	"fmt"
	"log"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var uri = `mongodb+srv://devakash256:PASSWORD@test.ebuvh6t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

var DB *mongo.Database

type contextKey string

const dbKey contextKey = "db"

func ConnectDB(password string) *mongo.Database{
	
  ctx,cancel:=	context.WithTimeout(context.Background(), 10*time.Second);

  defer cancel();

  uri= strings.Replace(uri,"PASSWORD",password,1)

  client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))

  if err != nil {
	log.Fatal(err)
  }

 fmt.Println("DB Connected successfully")

 DB = client.Database("imageapp")

 return DB
}


func WithDB(ctx context.Context, db *mongo.Database) context.Context {
	return context.WithValue(ctx, dbKey, db)
}

func FromContext(ctx context.Context) (*mongo.Database, bool) {
	db, ok := ctx.Value(dbKey).(*mongo.Database)
	return db, ok
}