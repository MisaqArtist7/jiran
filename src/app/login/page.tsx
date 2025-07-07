"use client";

// ------------------ Imports ------------------
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import Image from "next/image";
import './login.css';
import axios from "axios";


// ------------------ Zod Schema for Validation ------------------
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password or Email is not correct"),
  rememberMe: z.boolean().optional(),
})

// ------------------ Infer TS Type from Schema ------------------
type LoginFormInputs = z.infer<typeof loginSchema>

// ------------------ Login Page Component ------------------
export default function LoginPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  })

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const router = useRouter()

  const onSubmit = (data: LoginFormInputs) => {
    const now = Date.now()

    // اجازه نده کمتر از ۵ ثانیه یکبار ارسال شه
    if (now - lastSubmitTime < 5000) {
      console.log("⏱ Wait before next login attempt!");
      return;
    }

    setIsSubmitting(true);
    setLastSubmitTime(now);

    console.log("Form data:", data)

    axios.post('https://jiran-api.com/api/v1/auth/login', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log('✅ Login Success:', response.data);
      router.push('/dashboard')
      const token = response.data.data.token;
      localStorage.setItem('token', token);
      console.log('📦 Token saved to localStorage:', token);
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        console.error('❌ Invalid credentials');
        setError("email", {
          type: "server",
          message: "Email or password is incorrect",
        });
        setError("password", {
          type: "server",
          message: "Email or password is incorrect",
        });
      } else {
        console.error('❌ Other login error:', error);
      }
    })
    .finally(() => {
      setIsSubmitting(false);
    });

  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-md shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign in to your account</h2>

        {/* Email */}
        <label htmlFor="email" className="block mb-1 font-medium">Email</label>
        <div className={`flex-row-center w-full p-2 rounded border shadow-sm ${errors.email ? "border-red-500" : "border-gray-300"}`}>
          <EnvelopeIcon className="h-7 w-7" />
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            className="w-full pl-2"
          />
        </div>
        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}

        {/* Password */}
        <label htmlFor="password" className="block mt-4 mb-1 font-medium">Password</label>
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
            onClick={() => setShowPassword(prev => !prev)}
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
          <a href="#" className="text-sm text-[var(--primaryColor)] hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-6 bg-[var(--primaryColor)] text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>

        {/* Sign Up Link */}
        <p className="text-center mt-4 text-sm">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-[var(--primaryColor)] hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </main>
  )
}
