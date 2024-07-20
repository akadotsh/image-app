import { z } from "zod";

const emailValidation = z.string().email({
  message: "Invalid email address",
});

const passwordValidation = z.string({
  message: "Please enter valid value",
  required_error: "Password is required",
});

export const signupFormSchema = z.object({
  username: z.string(),
  email: emailValidation,
  password: passwordValidation,
});

export const loginFormSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});
