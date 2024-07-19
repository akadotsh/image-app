package test

// import (
// 	"context"
// 	"testing"

// 	"github.com/99designs/gqlgen/graphql/handler"
// 	"github.com/99designs/gqlgen/graphql/handler/apollofederatedtracingv1/generated"
// 	"github.com/akadotsh/image-app/backend/config"
// 	"github.com/akadotsh/image-app/backend/graph/model"
// 	"github.com/stretchr/testify/require"
// 	"go.mongodb.org/mongo-driver/mongo"
// 	"go.mongodb.org/mongo-driver/mongo/options"
// )

// func TestCreateAccount(t *testing.T) {
//     // Set up a test database
//     ctx := context.Background()
//     client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))
//     require.NoError(t, err)
//     defer client.Disconnect(ctx)

//     database := client.Database("test_db")

//     // Set up the resolver and server
//     resolver := &Resolver{}
//     srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: resolver}))
//     c := client.New(srv)

//     // Inject the database into the context
//     ctx = config.WithDatabase(ctx, database)

//     t.Run("CreateNewAccount", func(t *testing.T) {
//         var resp struct {
//             CreateAccount struct {
//                 Token string
//                 User  struct {
//                     ID    string
//                     Email string
//                     Name  string
//                 }
//             }
//         }

//         c.MustPost(`
//             mutation {
//                 createAccount(username: "testuser", email: "test@example.com", password: "password123") {
//                     token
//                     user {
//                         id
//                         email
//                         name
//                     }
//                 }
//             }
//         `, &resp, client.WithContext(ctx))

//         require.NotEmpty(t, resp.CreateAccount.Token)
//         require.Equal(t, "test@example.com", resp.CreateAccount.User.Email)
//         require.Equal(t, "testuser", resp.CreateAccount.User.Name)
//     })

//     t.Run("CreateAccountWithExistingEmail", func(t *testing.T) {
//         var resp struct {
//             CreateAccount struct {
//                 Token string
//                 User  *model.User
//             }
//         }

//         err := c.Post(`
//             mutation {
//                 createAccount(username: "testuser2", email: "test@example.com", password: "password123") {
//                     token
//                     user {
//                         id
//                         email
//                         name
//                     }
//                 }
//             }
//         `, &resp, client.WithContext(ctx))

//         require.Error(t, err)
//         require.Contains(t, err.Error(), "user with this email already exists")
//     })

//     // Add more test cases as needed
// }