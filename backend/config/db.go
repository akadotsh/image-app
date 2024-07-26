package config

import (
	"context"
	"fmt"
	"log"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var uri = `mongodb+srv://devakash256:PASSWORD@test.ebuvh6t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

var DB *mongo.Database

type contextKey string

const dbKey contextKey = "db"
const dbname = "imageapp"

func ConnectDB(password string) (*mongo.Database,error){
	
  ctx,cancel:=	context.WithTimeout(context.Background(), 10*time.Second);

  defer cancel();

  uri= strings.Replace(uri,"PASSWORD",password,1)

  client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))

  if err != nil {
	log.Fatal(err)
  }

 fmt.Println("DB Connected successfully")

 DB = client.Database(dbname)

 collection:= client.Database(dbname).Collection("images");

 indexModel:= mongo.IndexModel{
	Keys: bson.D{{Key:"userid",Value: 1}},
 }

 _,err= collection.Indexes().CreateOne(ctx,indexModel)

 if err !=nil {
	return nil, fmt.Errorf("failed to create index: %v", err)
}

 return DB ,nil
}


func WithDB(ctx context.Context, db *mongo.Database) context.Context {
	return context.WithValue(ctx, dbKey, db)
}

func FromContext(ctx context.Context) (*mongo.Database, bool) {
	db, ok := ctx.Value(dbKey).(*mongo.Database)
	return db, ok
}