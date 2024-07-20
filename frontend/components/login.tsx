"use client";

import { loginFormSchema } from "@/lib/zodValidation";
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
import { toast } from "sonner";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ClientError, gql } from "graphql-request";
import { useMutation } from "@tanstack/react-query";
import { graphqlClient } from "@/graphqlClient";
import { storage } from "@/lib/utils";

const LOGIN = gql`
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

export const Login = () => {
  const loginMutation = useMutation({
    mutationFn: async (variables: { email: string; password: string }) =>
      graphqlClient.request(LOGIN, variables),
  });

  const handleLogin = async ({
    email,
    password,
  }: z.infer<typeof loginFormSchema>) => {
    try {
      loginMutation.mutate(
        {
          email,
          password,
        },
        {
          onSuccess: (data: any) => {
            storage.set("token", data.login.token);
            window.location.replace("/");
            loginform.reset();
          },
          onError: (error: any) => {
            console.error(error);
            const graphlErr = error as ClientError;
            toast.error(graphlErr.message);
          },
        }
      );
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
    }
  };

  const loginform = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    handleLogin(values);
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...loginform}>
          <form
            onSubmit={loginform.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={loginform.control}
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
              control={loginform.control}
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
              disabled={loginMutation.isPending}
            >
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
