'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import './login.css'

// Define form validation schema using Zod
const loginSchema = z.object({ 
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
})

// Infer TypeScript type from schema
type LoginFormInputs = z.infer<typeof loginSchema>

export default function LoginPage() {
  // Initialize form methods
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  })

  // Handle form submission
  const onSubmit = (data: LoginFormInputs) => {
    console.log("Form data:", data)
    // TODO: handle login logic (e.g. call API)
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Form container */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-md shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign in to your account</h2>

        {/* Email field */}
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
        {/* Email error message */}
        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}

        {/* Password field */}
        <label htmlFor="password" className="block mt-4 mb-1 font-medium">Password</label>
        <input
          id="password"
          type="password"
          {...register("password")}
          placeholder="Enter your password"
          className={`w-full p-2 border rounded shadow-sm ${errors.password ? "border-red-500" : "border-gray-300"}`}
        />
        {/* Password error message */}
        {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}

        {/* Remember me & Forgot password section */}
        <div className="flex items-center justify-between mt-4">
          <label className="flex items-center gap-1">
            <input type="checkbox" {...register("rememberMe")} className="w-3.5 h-3.5" />
            <span className="text-sm select-none">Remember me</span>
          </label>
          <a href="#" className="text-sm text-[var(--primaryColor)] hover:underline">Forgot password?</a>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full mt-6 bg-[var(--primaryColor)] text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Sign in
        </button>

        {/* Sign up link */}
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
