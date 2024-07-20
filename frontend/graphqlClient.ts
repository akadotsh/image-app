import { GraphQLClient } from "graphql-request";

export const endpoint = "https://image-app-production.up.railway.app/query";
export const graphqlClient = new GraphQLClient(endpoint, {
  headers: () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token") ?? "";
      return { authorization: `Bearer ${token}` };
    }
    return {
      authorization: "",
    };
  },
});
