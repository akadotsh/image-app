import { gql } from "graphql-request";

export const GET_USER = gql`
  query GetUser {
    user {
      id
      name
      email
    }
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(username: $username, email: $email, password: $password) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;

export const MY_IMAGES = gql`
  query getAllImages($id: ID!) {
    getAllMyProfilePictures(userId: $id) {
      id
      url
      filename
    }
  }
`;

export const DELETE_IMAGE = gql`
  mutation deletePicture($id: ID!) {
    deletePicture(id: $id) {
      success
      message
    }
  }
`;
