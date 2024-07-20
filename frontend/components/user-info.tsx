"use client";
import { ClientError } from "graphql-request";
import { User } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import { CardSkeleton } from "./card-skeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/reduxStore";

interface Props {
  isLoading: boolean;
  error: Error | ClientError | null;
  data: User | null;
}

export const UserInfo = (props: Props) => {
  const { data, error } = props;
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  if (error) {
    const graphqlError = error as ClientError;
    return (
      <div className="text-red-500">
        {error ? (
          <p>
            {graphqlError?.response?.errors?.length &&
              graphqlError.response?.errors[0]?.message}{" "}
          </p>
        ) : (
          <p>Please Login to access!</p>
        )}
        <Link href={"/login"} className="underline">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="">
      {isLoggedIn ? (
        <Card>
          <CardHeader>
            <CardTitle>Name: {data?.name}</CardTitle>
            <CardDescription>Email: {data?.email}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col text-base space-y-4">
            <Link href="/uploadimage" className="underline">
              Upload Image
            </Link>
            <Link href="/myimages" className="underline">
              View My Images
            </Link>
          </CardContent>
        </Card>
      ) : (
        <CardSkeleton />
      )}
    </div>
  );
};
//  null}
