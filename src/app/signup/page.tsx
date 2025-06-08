'use client' // Enable client-side rendering in Next.js 13+

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import Link from 'next/link'
import axios from 'axios'
import { EnvelopeIcon, UserIcon, KeyIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import './register.css'

export default function SignUP() {
  // Define Zod schema for form validation

const signUpSchema = z
  .object({
    name: z.string().min(8, 'Name must be at least 8 characters'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must include at least one uppercase letter')
      .regex(/[0-9]/, 'Password must include at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must include at least one symbol (e.g. @, #, !)'),
    password_confirmation: z.string(),
    // agreeTerm: z.boolean().refine(val => val === true, {
    //   message: "You must agree to the terms",
    // }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ['password_confirmation'],
  });

  // Infer TypeScript type from Zod schema
  type signUpFormInputs = z.infer<typeof signUpSchema>;

  // Initialize react-hook-form with Zod resolver for validation
  const { register, handleSubmit, formState: { errors } } = useForm<signUpFormInputs>({ resolver: zodResolver(signUpSchema) });

  // Watch the agreeTerm checkbox to enable/disable submit button
  // const isAgreeTermeChecked = watch('agreeTerm');

  // Local state to toggle password visibility
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  // State for storing user's geolocation coordinates or null if not available
  const [location, setLocation] = useState<{ loc_lat: number; loc_lng: number } | null>(null);
  // State for any error messages related to geolocation
  const [locationError, setLocationError] = useState<string | null>(null);

  // useEffect to request user's current location once on component mount
  useEffect(() => {
    // Check if geolocation API is supported by the browser
    if (!navigator.geolocation) {
      setLocationError('Your browser does not support geolocation.');
      return;
    }

    // Get current position asynchronously
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        // On success, update location state with latitude and longitude
        setLocation({ loc_lat: pos.coords.latitude, loc_lng: pos.coords.longitude });
        // Clear any previous error
        setLocationError(null);
      },
      () => {
        // On error or if user denies permission, set error message
        setLocationError('Access to location was denied.');
      }
    );
  }, []);

  const router = useRouter();
  // Handle form submission
  const onSubmit = (data: signUpFormInputs) => {
    // Check if location data is available before submitting
    if (!location) {
      alert('Please allow access to your location.');
      return;
    }
    // Combine form data with location info
    const dataToSend = { ...data, loc_lat: location.loc_lat, loc_lng: location.loc_lng };
    console.log('Data to send:', dataToSend);
    
    axios.post( 'http://56.228.2.146:8080/api/v1/auth/register', dataToSend, {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  .then((response) => {
    console.log('✅ Success:', response.data);
    router.push('/login'); // go to login page
    })
    .catch((error) => {
      if (error.response && error.response.status === 422) {
        console.log('❌ Validation Error Payload:', error.response.data);
      } else {
        console.error('❌ Other Error:', error);
      }
    });
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">

      <form onSubmit={handleSubmit(onSubmit)} method='post'
        className="bg-white p-8 rounded-md shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign up to your account</h2>

        {/* Show location error message if any */}
        {locationError && <p className="text-red-600 mb-4 text-center">{locationError}</p>}

        {/* Full Name input field */}
        <label htmlFor="FullName" className="block mb-1 font-medium">Full Name</label>
        <div className={`${errors.name ? "border-red-500" : "border-gray-300"} flex-row-center w-full p-2 rounded border shadow-sm`}>
          <UserIcon className="h-7 w-7" />
          <input
            {...register('name')}
            id="FullName"
            type="text"
            placeholder="Enter your Nickname"
            className="w-full pl-2"
          />
        </div>
        {/* Display validation error for FullName */}
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
        )}

        {/* Email input field */}
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
        {/* Display validation error for Email */}
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}

        {/* Password input field with toggle visibility */}
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
          {/* Button to toggle password visibility */}
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
        {/* Display validation error for Password */}
        {errors.password && (
          <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
        )}

        {/* Confirm Password input field with toggle visibility */}
        <label htmlFor="confirmPassword" className="block mt-4 mb-1 font-medium">Re-Password</label>
        <div className={`relative rounded border shadow-sm ${errors.password_confirmation ? "border-red-500" : "border-gray-300"}`}>
          <div className='flex-row-center w-full p-2'>
            <KeyIcon className="h-7 w-7" />
            <input
              {...register('password_confirmation')}
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              placeholder="Re-enter your password"
              className="w-full pl-2"
            />
          </div>
          {/* Button to toggle confirm password visibility */}
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
        {/* Display validation error for Confirm Password */}
        {errors.password_confirmation && (
          <p className="text-red-600 text-sm mt-1">{errors.password_confirmation.message}</p>
        )}

        {/* Checkbox for agreeing to terms of service */}
        <div className="flex items-center justify-between mt-4">
          <label className="flex items-center gap-1">
            <input
              // {...register("agreeTerm")}
              type="checkbox"
              className="w-3.5 h-3.5"
            />
            <span className="text-sm select-none">
              I agree to the <span className='text-[var(--primaryColor)]'>Terms Of Services</span>
            </span>
          </label>
        </div>

        {/* Submit button, disabled if terms not agreed or location missing or has error */}
        {/* <button
          type="submit"
          disabled={!isAgreeTermeChecked || !location || !!locationError}
          className={`w-full mt-6 text-white py-2 rounded-md transition
            ${(!isAgreeTermeChecked || !location || !!locationError)
              ? 'bg-gray-400 pointer-events-none opacity-60'
              : 'bg-[var(--primaryColor)] hover:bg-blue-700 pointer-events-auto opacity-100'}`}
        >
          Sign Up
        </button> */}

        <button
          type="submit"
          className={`w-full mt-6 text-white py-2 rounded-md transition bg-[var(--primaryColor)]`}
        >
          Sign Up
        </button>

        {/* Link to sign in page */}
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
