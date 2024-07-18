package middleware

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/akadotsh/image-app/backend/config"
	"github.com/akadotsh/image-app/backend/graph/model"
	"github.com/golang-jwt/jwt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var CurrentUserKey = "current_user"

func AuthMiddleware(db *mongo.Database) func(http.Handler) http.Handler {
	fmt.Println("AuthMiddleware Called")
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

			token, err := parseToken(r)

			fmt.Println("TOKEN", token)

			if err != nil {
				log.Printf("Error parsing token: %v", err)
				next.ServeHTTP(w, r)
				return
			}

			userID, err := ValidateToken(token)

			fmt.Println("userID", userID)

			if err != nil {
				log.Printf("Invalid token: %v", err)
				next.ServeHTTP(w, r)
				return
			}

			user, err := getUserByID(db, userID)
			if err != nil {
				log.Printf("Error retrieving user: %v", err)
				next.ServeHTTP(w, r)
				return
			}

			if user == nil {
				log.Printf("User is nil after retrieval from database")
				next.ServeHTTP(w, r)
				return
			}

			ctx := context.WithValue(r.Context(), CurrentUserKey, user)
			log.Printf("Storing user in context: %+v", user)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

func extractTokenFromRequest(r *http.Request) string {
	bearerToken := r.Header.Get("Authorization")
	fmt.Println("bearerToken", bearerToken)
	strArr := strings.Split(bearerToken, " ")
	if len(strArr) == 2 {
		return strArr[1]
	}
	return ""
}

func parseToken(r *http.Request) (*jwt.Token, error) {
	tokenString := extractTokenFromRequest(r)
	if tokenString == "" {
		return nil, errors.New("no token found in request")
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return config.SecretKey, nil
	})

	return token, err

}

func GetCurrentUserFromCTX(ctx context.Context) (*model.User, error) {
	user, ok := ctx.Value(CurrentUserKey).(*model.User)
	if !ok || user == nil {
		return nil, errors.New("Not Authorized: Please login again!")
	}

	return user, nil
}

func getUserByID(db *mongo.Database, userID string) (*model.User, error) {
	collection := db.Collection("users")

	var user model.User
	collection.FindOne(context.Background(), bson.M{"_id": userID}).Decode(&user)

	return &user, nil
}

func ValidateToken(token *jwt.Token) (string, error) {
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return "", errors.New("invalid token claims")
	}

	if !token.Valid {
		return "", errors.New("token is not valid")
	}

	userID, ok := claims["user_id"].(string)
	if !ok {
		return "", errors.New("user_id not found in token claims")
	}

	exp, ok := claims["exp"].(float64)
	if !ok {
		return "", errors.New("exp not found in token claims")
	}

	if time.Now().Unix() > int64(exp) {
		return "", errors.New("token has expired")
	}

	return userID, nil
}
