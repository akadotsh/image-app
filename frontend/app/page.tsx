"use client";
import { gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "@/graphqlClient";
import { useDispatch, useSelector, useStore } from "react-redux";
import { RootState } from "@/lib/reduxStore";
import { useEffect } from "react";
import { updateUserInfo } from "@/lib/slices/authSlice";
import { User } from "@/lib/types";
import { UserInfo } from "@/components/user-info";

const GET_USER = gql`
  query GetUser {
    user {
      id
      name
      email
    }
  }
`;

export default function Home() {
  // const dispatch = useDispatch();
  // const isLoggedIn = useSelector((state: RootState) => {
  //   return state.auth.isLoggedIn;
  // });

  // console.log("isLoggedIn", isLoggedIn);

  // const { isLoading, error, data, isPending } = useQuery<{ user: User }>({
  //   queryKey: ["user"],
  //   queryFn: async () => graphqlClient.request(GET_USER),
  // });

  // console.log("isLoading", isLoading);
  // console.log("data", data);

  // useEffect(() => {
  //   if (!isPending && data) {
  //     dispatch(updateUserInfo({ ...data.user, userId: data.user.id }));
  //   }
  // }, [isPending]);

  const { isLoading, email, name, userId, error } = useSelector(
    (state: RootState) => state.auth
  );
  return (
    <main className="flex justify-center min-h-screen p-24">
      <div className="flex flex-col space-y-10">
        <h1 className="text-5xl font-extrabold">Image App</h1>

        <UserInfo
          data={email && name && userId ? { email, name, id: userId } : null}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </main>
  );
}
