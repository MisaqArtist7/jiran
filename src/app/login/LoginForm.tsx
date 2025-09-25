"use client";
// ------------------ Imports ------------------
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import "./login.css";
import Link from "next/link";

// ------------------ Zod Schema for Validation ------------------
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password or Email is not correct"),
  rememberMe: z.boolean().optional(),
});

// ------------------ Infer TS Type from Schema ------------------
type LoginFormInputs = z.infer<typeof loginSchema>;

// ------------------ Login Page Component ------------------
export default function LoginForm() {

  const { register, handleSubmit, setError, formState: { errors }, } = useForm<LoginFormInputs>({ 
    resolver: zodResolver(loginSchema), 
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (data: LoginFormInputs) => {
  setIsPending(true);
  console.log("Form data:", data);

  try {
    const response = await fetch('https://jiran-api.com/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await response.json();
    console.log("Login response:", result);

    if (response.ok) {
      const token = result.data.token;
      localStorage.setItem("token", token);
      router.push("/dashboard");
    } else {
      if (result.errors?.email || result.errors?.password) {
        setError("email", {
          type: "server",
          message: result.errors.email || "Email or password is incorrect",
        });
        setError("password", {
          type: "server",
          message: result.errors.password || "Email or password is incorrect",
        });
      } else {
        console.error("Other login error:", result);
      }
    }
  } catch (err) {
    console.error("Network or server error:", err);
  } finally {
    setIsPending(false);
  }
};

  return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-md shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Sign in to your account
        </h2>

        {/* Email */}
        <label htmlFor="email" className="block mb-1 font-medium">
          Email
        </label>
        <div
          className={`flex-row-center w-full p-2 rounded border shadow-sm ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        >
          <EnvelopeIcon className="h-7 w-7" />
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            className="w-full pl-2"
          />
        </div>
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}

        {/* Password */}
        <label htmlFor="password" className="block mt-4 mb-1 font-medium">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Enter your password"
            className={`w-full p-2 border rounded shadow-sm pr-10 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
          >
            <Image
              src={showPassword ? "/images/close.svg" : "/images/open.svg"}
              width={25}
              height={25}
              alt="toggle password"
            />
          </button>
        </div>
        {errors.password && (
          <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
        )}

        {/* Remember Me / Forgot Password */}
        <div className="flex items-center justify-between mt-4">
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              {...register("rememberMe")}
              className="w-3.5 h-3.5"
            />
            <span className="text-sm select-none">Remember me</span>
          </label>
          <Link
            href="#"
            className="text-sm text-[var(--primaryColor)] hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full mt-6 bg-[var(--primaryColor)] text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isPending ? "Signing in..." : "Sign in"}
        </button>

        {/* Sign Up Link */}
        <p className="text-center mt-4 text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-[var(--primaryColor)] hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
  );
}
