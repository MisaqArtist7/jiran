'use client' // Enables client-side rendering in Next.js 13+

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import Link from 'next/link'
import { EnvelopeIcon, UserIcon, KeyIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import './register.css'

export default function SignUP() {

  const signUpSchema = z.object({
    FullName: z.string().min(8, 'Nickname must be at least 8 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    agreeTerm: z.boolean().refine(val => val === true, {
      message: "You must agree to terms",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords doesn't match",
  });

  type signUpFormInputs = z.infer<typeof signUpSchema>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<signUpFormInputs>({
    resolver: zodResolver(signUpSchema)
  });

  const isAgreeTermeChecked = watch('agreeTerm');

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError('مرورگر شما از موقعیت مکانی پشتیبانی نمی‌کند.');
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocationError(null);
      },
      () => setLocationError('دسترسی به موقعیت مکانی رد شد.')
    );
  }, []);

  const onSubmit = (data: signUpFormInputs) => {
    if (!location) {
      alert('لطفا اجازه دسترسی به موقعیت مکانی را بدهید.');
      return;
    }
    const dataToSend = { ...data, location };
    console.log('Data to send:', dataToSend);
    // TODO: ارسال داده به سرور اینجا انجام شود
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">

      <form onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-md shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign up to your account</h2>

        {/* Location error message */}
        {locationError && <p className="text-red-600 mb-4 text-center">{locationError}</p>}

        <label htmlFor="FullName" className="block mb-1 font-medium">Full Name</label>
        <div className={`${errors.FullName ? "border-red-500" : "border-gray-300"} flex-row-center w-full p-2 rounded border shadow-sm`}>
          <UserIcon className="h-7 w-7" />
          <input
            {...register('FullName')}
            id="FullName"
            type="text"
            placeholder="Enter your Nickname"
            className="w-full pl-2"
          />
        </div>
        {errors.FullName && (
          <p className="text-red-600 text-sm mt-1">{errors.FullName.message}</p>
        )}

        <label htmlFor="email" className="block mt-4 mb-1 font-medium">Email</label>
        <div className={`${errors.email ? "border-red-500" : "border-gray-300"} flex-row-center w-full p-2 rounded border shadow-sm`}>
          <EnvelopeIcon className="h-7 w-7" />
          <input
            {...register('email')}
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full pl-2"
          />
        </div>
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}

        <label htmlFor="password" className="block mt-4 mb-1 font-medium">Password</label>
        <div className={`${errors.password ? "border-red-500" : "border-gray-300"} relative rounded border shadow-sm`}>
          <div className='flex-row-center w-full p-2'>
            <KeyIcon className="h-7 w-7" />
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Enter your password"
              className="w-full pl-2"
            />
          </div>
          <button
            onClick={(e) => { e.preventDefault(); setShowPassword(prev => !prev); }}
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
          >
            <Image
              src={showPassword ? "/images/close.svg" : "/images/open.svg"}
              width={25}
              height={25}
              alt="toggle visibility"
            />
          </button>
        </div>
        {errors.password && (
          <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
        )}

        <label htmlFor="confirmPassword" className="block mt-4 mb-1 font-medium">Re-Password</label>
        <div className={`relative rounded border shadow-sm ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}>
          <div className='flex-row-center w-full p-2'>
            <KeyIcon className="h-7 w-7" />
            <input
              {...register('confirmPassword')}
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              placeholder="Re-enter your password"
              className="w-full pl-2"
            />
          </div>
          <button
            onClick={(e) => { e.preventDefault(); setShowConfirmPassword(prev => !prev); }}
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
          >
            <Image
              src={showConfirmPassword ? "/images/close.svg" : "/images/open.svg"}
              width={25}
              height={25}
              alt="toggle visibility"
            />
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>
        )}

        <div className="flex items-center justify-between mt-4">
          <label className="flex items-center gap-1">
            <input
              {...register("agreeTerm")}
              type="checkbox"
              className="w-3.5 h-3.5"
            />
            <span className="text-sm select-none">
              I agree to the <span className='text-[var(--primaryColor)]'>Terms Of Services</span>
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={!isAgreeTermeChecked || !location || !!locationError}
          className={`w-full mt-6 text-white py-2 rounded-md transition
            ${(!isAgreeTermeChecked || !location || !!locationError)
              ? 'bg-gray-400 pointer-events-none opacity-60'
              : 'bg-[var(--primaryColor)] hover:bg-blue-700 pointer-events-auto opacity-100'}`}
        >
          Sign Up
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-[var(--primaryColor)] hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </main>
  )
}
