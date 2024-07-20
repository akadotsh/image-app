import { graphqlClient } from "@/graphqlClient";
import { RootState } from "@/lib/reduxStore";
import {
  setErrorState,
  setIsFetching,
  updateAuthState,
  updateUserInfo,
} from "@/lib/slices/authSlice";
import { User } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { useDispatch, useSelector } from "react-redux";

const GET_USER = gql`
  query GetUser {
    user {
      id
      name
      email
    }
  }
`;

export const useGlobalUser = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, userId, name, email, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  useQuery<{ user: User }>({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        dispatch(setIsFetching(true));
        const data: { user: User } = await graphqlClient.request(GET_USER);
        dispatch(
          updateUserInfo({
            userId: data.user.id,
            name: data.user.name,
            email: data.user.email,
          })
        );

        return data;
      } catch (error: any) {
        console.error("Error fetching user data:", error);
        dispatch(updateAuthState(false));
        dispatch(setErrorState(error));
        throw error;
      } finally {
        dispatch(setIsFetching(false));
      }
    },
  });

  return { isLoggedIn, userId, name, email, isLoading };
};
