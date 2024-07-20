"use client";

import { signupFormSchema } from "@/lib/zodValidation";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { gql } from "graphql-request";
import { useMutation } from "@tanstack/react-query";
import { graphqlClient } from "@/graphqlClient";
import { login } from "@/lib/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "@/lib/utils";

const CREATE_ACCOUNT = gql`
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

export const Signup = () => {
  const dispatch = useDispatch();

  const signupMutation = useMutation({
    mutationFn: async (variables: {
      username: string;
      email: string;
      password: string;
    }) => graphqlClient.request(CREATE_ACCOUNT, variables),
  });

  const handleSignup = async ({
    email,
    password,
    username,
  }: z.infer<typeof signupFormSchema>) => {
    try {
      signupMutation.mutate(
        {
          username,
          email,
          password,
        },
        {
          onSuccess: (data: any) => {
            storage.set("token", data.login.token);
            dispatch(
              login({ token: data.createAccount.token, userId: "user-id" })
            );

            window.location.replace("/");
            singupForm.reset();
          },
          onError: (error: any) => {
            console.log(error?.message);
          },
        }
      );
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  const singupForm = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof signupFormSchema>) {
    console.log("Values", values);
    handleSignup(values);
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Singup</CardTitle>
        <CardDescription>Register your account</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...singupForm}>
          <form
            onSubmit={singupForm.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={singupForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndoe"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={singupForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="jondoe@gmail.com"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={singupForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="password"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={signupMutation.isPending}
            >
              Signup
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
