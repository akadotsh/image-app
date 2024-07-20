import { GraphQLClient } from "graphql-request";
import { storage } from "./lib/utils";

export const endpoint = "https://image-app-production.up.railway.app/query";
export const graphqlClient = new GraphQLClient(endpoint, {
  headers: () => {
    if (typeof window !== "undefined") {
      const token = storage.get("token");
      const parsedToken = token ? JSON.parse(token) : "";
      return { authorization: `Bearer ${parsedToken}` };
    }
    return {
      authorization: "",
    };
  },
});
