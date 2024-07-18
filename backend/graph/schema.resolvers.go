package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.49

import (
	"context"
	"errors"
	"fmt"

	"github.com/akadotsh/image-app/backend/config"
	"github.com/akadotsh/image-app/backend/graph/model"
	"github.com/akadotsh/image-app/backend/middleware"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

var (
	ErrBadCredential = errors.New("invalid email or password")
	ErrNotAuthorized = errors.New("authorization required, please log in again")
	ErrMissingLoginFields = errors.New("email and password are required")
)


// CreateAccount is the resolver for the createAccount field.
func (r *mutationResolver) CreateAccount(ctx context.Context, username string, email string, password string) (*model.AuthPayload, error) {
	database, ok := config.FromContext(ctx)

	if !ok {
		return nil, fmt.Errorf("database connection error")
	}

	collection := database.Collection("users")

	var existingUser model.User

	err := collection.FindOne(ctx, bson.M{"email": email}).Decode(&existingUser)

	if err == nil {
		return nil, errors.New("user with this email already exists")
	} else if err != mongo.ErrNoDocuments {
		return nil, err
	}

	hashPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	if err != nil {
		return nil, err
	}

	newUser := &model.User{
		ID:       primitive.NewObjectID().Hex(),
		Email:    email,
		Name:     username,
		Password: string(hashPassword),
	}

	fmt.Println("new user", newUser)

	_, err = collection.InsertOne(ctx, newUser)

	if err != nil {
		return nil, err
	}

	token, err := config.GenerateToken(newUser.ID)

	if err != nil {
		return nil, err
	}

	return &model.AuthPayload{
		Token: token,
		User:  newUser,
	}, nil
}

// Login is the resolver for the login field.
func (r *mutationResolver) Login(ctx context.Context, email string, password string) (*model.AuthPayload, error) {
	
	if email == "" || password == "" {
		return nil, ErrMissingLoginFields
	}
	
	database, ok := config.FromContext(ctx)

	if !ok {
		return nil, fmt.Errorf("database connection error")
	}
	collection := database.Collection("users")
	
	var user model.User


	err:= collection.FindOne(ctx, bson.M{"email": email}).Decode(&user)

	if err != nil {
        if err == mongo.ErrNoDocuments {
            // Use a generic error message to avoid revealing user existence
            return nil, ErrBadCredential
        }
        return nil, fmt.Errorf("database query error: %w", err)
    }

	fmt.Println("login: user", user)

	if !config.VerifyPassword(user.Password, password) {
		return nil, ErrBadCredential
	}

	token, err := config.GenerateToken(user.ID)

	if err != nil {
		return nil, fmt.Errorf("token generation error: %w", err)
	}

	return &model.AuthPayload{
		Token: token,
		User:  &user,
	}, nil
}

// User is the resolver for the user field.
func (r *queryResolver) User(ctx context.Context) (*model.User, error) {
	database, ok := config.FromContext(ctx)

	user, err := middleware.GetCurrentUserFromCTX(ctx)

	if err != nil {
		return nil, ErrNotAuthorized
	}

	if !ok {
		panic("db not found")
	}
	var dbuser model.User

	database.Collection("users").FindOne(ctx, bson.M{"_id": user.ID}).Decode(&dbuser)

	fmt.Println("fetched user", user)

	return &dbuser, nil

}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
