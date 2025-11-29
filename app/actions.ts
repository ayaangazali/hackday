"use server";

import { encodedRedirect } from "@/utils/utils";
import { stackServerApp } from "@/stack";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required",
    );
  }

  try {
    await stackServerApp.signUpWithCredential({ email, password });
    return redirect("/pages/dashboard");
  } catch (error: any) {
    console.error(error.message);
    return encodedRedirect("error", "/sign-up", error.message || "Sign up failed");
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await stackServerApp.signInWithCredential({ email, password });
    return redirect("/pages/dashboard");
  } catch (error: any) {
    return encodedRedirect("error", "/sign-in", error.message || "Sign in failed");
  }
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  try {
    await stackServerApp.sendForgotPasswordEmail(email);
    
    if (callbackUrl) {
      return redirect(callbackUrl);
    }

    return encodedRedirect(
      "success",
      "/forgot-password",
      "Check your email for a link to reset your password.",
    );
  } catch (error: any) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }
};

export const resetPasswordAction = async (formData: FormData) => {
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    return encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    return encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      return encodedRedirect("error", "/protected/reset-password", "User not found");
    }
    
    await user.update({ password });
    return encodedRedirect("success", "/protected/reset-password", "Password updated");
  } catch (error: any) {
    return encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }
};

export const signOutAction = async () => {
  await stackServerApp.signOut();
  return redirect("/");
};
