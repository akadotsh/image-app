package config

import (
	"time"

	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

var SecretKey = []byte("your-very-secret-key-here")

func GenerateToken(userID string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["user_id"] = userID
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

	return token.SignedString(SecretKey)
}

func ValidateToken(tokenStirng string) (string, error) {
	token, err := jwt.Parse(tokenStirng, func(t *jwt.Token) (interface{}, error) {
		return SecretKey, nil
	})

	if err != nil {
		return "", err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		userID := claims["user_id"].(string)
		return userID, nil
	}

	return "", jwt.ErrSignatureInvalid
}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	return string(bytes), err
}

func VerifyPassword(HashedPassword, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(HashedPassword), []byte(password))

	return err == nil
}
