package tests

import (
	"github.com/akadotsh/image-app/backend/config"
	"github.com/stretchr/testify/assert"
	"golang.org/x/crypto/bcrypt"
	"testing"
)

const SecretKey = "secret_key"

func TestGenerateToken(t *testing.T) {
	userID := "12345"
	tokenString, err := config.GenerateToken(userID)

	assert.NoError(t, err, "Expected no error when generating token")
	assert.NotEmpty(t, tokenString, "Expected a non-empty token string")
}

func TestHashPassword(t *testing.T) {
	password := "super-secure-password"

	hashedPassword, err := config.HashPassword(password)
	assert.NoError(t, err, "should not return an error")
	assert.NotEmpty(t, hashedPassword, "Hashed password should not be empty")

	err = bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	assert.NoError(t, err, "Hashed password should match the original password")
}
