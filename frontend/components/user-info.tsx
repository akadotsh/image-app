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

interface Props {
  isLoading: boolean;
  error: Error | ClientError | null;
  data: User | null;
}

export const UserInfo = (props: Props) => {
  const { data, error, isLoading } = props;

  console.log("error", error);

  if (isLoading) {
    return <CardSkeleton />;
  }

  if (error) {
    const graphqlError = error as ClientError;
    return (
      <div className="text-red-500">
        <p>
          {graphqlError?.response?.errors?.length &&
            graphqlError.response?.errors[0]?.message}{" "}
        </p>
        <Link href={"/login"} className="underline">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{data?.name}</CardTitle>
          <CardDescription>{data?.email}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col text-base space-y-4">
          <Link href={"/uploadimage"} className="underline">
            Upload Image
          </Link>
          <Link href={"/myimages"} className="underline">
            View My Image
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};
