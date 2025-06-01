'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import { EnvelopeIcon, UserIcon, KeyIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import './register.css'
export default function SignUP() {

  const signUpSchema = z.object({
    nickName: z.string().min(8, 'This name has already taken or is invalid'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    agreeTerm: z.boolean().refine(val => val === true, {
      message: "You must agree to terms",
    }),

  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords doesn't match",
  });


  type signUpFormInputs = z.infer<typeof signUpSchema>;

  const {register, handleSubmit, watch, formState: { errors }} = useForm<signUpFormInputs>({
    resolver: zodResolver(signUpSchema)
  });
  const isAgreeTermeChecked = watch('agreeTerm'); 

  const onSubmit = (data: signUpFormInputs) => {
    console.log(data) // send to server
  }
  const [showPassword, setShowPassword] = useState<boolean>(false)
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Form container */}
      <form onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 rounded-md shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign up to your account</h2>

        {/* Username field */}
        <label htmlFor="username" className="block mb-1 font-medium">Full Name</label>
        <div className={`${errors.nickName ? "border-red-500" : "border-gray-300"} flex-row-center w-full p-2 rounded border shadow-sm`}>
          <UserIcon className="h-7 w-7" />
        <input {...register('nickName')}
          id="username" type="text" placeholder="Enter your Nickname" className="w-full pl-2"/>
        </div>
        {/* Email error message */}
        {errors.nickName && (
          <p className="text-red-600 text-sm mt-1">{errors.nickName.message}</p>
        )}
        
        {/* Email field */}
        <label htmlFor="email" className="block mt-4  mb-1 font-medium">Email</label>
        <div className={`${errors.email ? "border-red-500" : "border-gray-300"} flex-row-center w-full p-2 rounded border shadow-sm`}>
          <EnvelopeIcon className="h-7 w-7" />
          <input {...register('email')}
          id="email" type="email" placeholder="Enter your email" className="w-full pl-2"/>
        </div>
        {/* Email error message */}
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}

        {/* Password field */}
        <label htmlFor="password" className="block mt-4 mb-1 font-medium">Password</label>
        <div className={`${errors.password ? "border-red-500" : "border-gray-300"} relative rounded border shadow-sm`}>
          <div className='flex-row-center w-full p-2'>
            <KeyIcon className="h-7 w-7" />
            <input {...register('password')}
              type={`${showPassword ? 'type' : 'password'}`}
              id="password"// toggle visibility
              placeholder="Enter your password"
              className={`w-full pl-2`}
              />
          </div>

          {/* 👁 Toggle visibility button */}
          <button onClick={() => setShowPassword((prev: boolean) => !prev)}
          type="button"  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" >
            {showPassword ? (
              <Image src="/images/close.svg" width={25} height={25} alt="" />
            ) : (
              <Image src="/images/open.svg" width={25} height={25} alt="" />
            )}
          </button>
        </div>

        {/* Error message */}
        {errors.password && (
          <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
        )}
        {/* Confirm password field */}
        <label htmlFor="password" className="block mt-4 mb-1 font-medium">Re-Password</label>
        <div className={`relative rounded border shadow-sm ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}>
          <div className='flex-row-center w-full p-2'>
            <KeyIcon className="h-7 w-7" />
            <input {...register('confirmPassword')}
              id="confirmPassword"// toggle visibility
              placeholder="Enter your password"
              className={`w-full pl-2`}
              />
          </div>
          {/* 👁 Toggle visibility button */}
          <button type="button"  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" >

          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>
        )}

        {/* Remember me & Forgot password section */}
        <div className="flex items-center justify-between mt-4">
          <label className="flex items-center gap-1">
            <input {...register("agreeTerm")}
            type="checkbox"  className="w-3.5 h-3.5" />
            <span className="text-sm select-none">I agree to the <span className='text-[var(--primaryColor)]'>Terms Of Services</span></span>
          </label>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={!isAgreeTermeChecked} // وقتی تیک زده نشده دکمه غیر فعال میشه
          className={`w-full mt-6 text-white py-2 rounded-md transition
            ${isAgreeTermeChecked
              ? 'bg-[var(--primaryColor)] hover:bg-blue-700 pointer-events-auto opacity-100'
              : 'bg-gray-400 pointer-events-none opacity-60'}`}>
          Sign in
        </button>

        {/* Sign up link */}
        <p className="text-center mt-4 text-sm">
          Alreay have an account?{" "}
          <a href="/login" className="text-[var(--primaryColor)] hover:underline">
            Sign in
          </a>
        </p>
      </form>
    </main>
  )
}
