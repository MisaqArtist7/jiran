'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'  
import { EnvelopeIcon, UserIcon, KeyIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

import './register.css'

const signUpSchema = z.object({
  name: z.string()
    .min(8, { message: 'Name must be at least 8 characters' })
    .regex(/^[a-zA-Z\s]+$/, { message: 'Name may only contain letters and spaces.' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, { message: 'Password must include at least one uppercase letter' })
    .regex(/[0-9]/, { message: 'Password must include at least one number' })
    .regex(/[^A-Za-z0-9]/, { message: 'Password must include at least one symbol' }),
  password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ['password_confirmation'],
})

type SignUpFormInputs = z.infer<typeof signUpSchema>

export default function SignUpFormComponent() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<SignUpFormInputs>({
    resolver: zodResolver(signUpSchema),
  })

  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  

  const [location, setLocation] = useState<{ loc_lat: number; loc_lng: number } | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError('Your browser does not support geolocation.')
    }
    navigator.geolocation.getCurrentPosition(
      (position) => setLocation({ loc_lat: position.coords.latitude, loc_lng: position.coords.longitude }),
      () => setLocationError('Access to location was denied.')
    )
  }, [])

  const onSubmit = async (data: SignUpFormInputs) => {
    if (!location) {
      setLocationError('Your browser does not support geolocation.')
    }
    setPending(true)

    try { // block: maybe someting went wrong
      const response = await fetch('/api/register', { // connect to server via api
        method: 'POST',
        body: JSON.stringify({ ...data, ...location }), // convert object to json
        headers: { 'Content-Type': 'application/json' },
      })
      const result = await response.json() // read server's response

      if (response.ok) {
        localStorage.setItem('token', result.data.token)
        router.push('/dashboard')
      } else {
        if (result.errors?.email) {
          setError('email', { type: 'server', message: result.errors.email })
        } else {
          console.error(result)
        }
      }
    } 
    catch (err) {
      console.error(err)
    } 
    finally {
      setPending(false)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-md shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign up</h2>

        {locationError && <p className="text-red-600 mb-4 text-center">{locationError}</p>}

        {/* Name */}
        <label htmlFor="FullName" className="block mb-1 font-medium">Full Name</label>
        <div className={`${errors.name ? 'border-red-500' : 'border-gray-300'} flex-row-center w-full p-2 rounded border shadow-sm`}>
          <UserIcon className="h-7 w-7" />
          <input {...register('name')} id="FullName" type="text" placeholder="Enter your name" className="w-full pl-2" />
        </div>
        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}

        {/* Email */}
        <label htmlFor="email" className="block mt-4 mb-1 font-medium">Email</label>
        <div className={`${errors.email ? 'border-red-500' : 'border-gray-300'} flex-row-center w-full p-2 rounded border shadow-sm`}>
          <EnvelopeIcon className="h-7 w-7" />
          <input {...register('email')} id="email" type="email" placeholder="Enter your email" className="w-full pl-2" />
        </div>
        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}

        {/* Password */}
        <label htmlFor="password" className="block mt-4 mb-1 font-medium">Password</label>
        <div className={`${errors.password ? 'border-red-500' : 'border-gray-300'} relative rounded border shadow-sm`}>
          <div className="flex-row-center w-full p-2">
            <KeyIcon className="h-7 w-7" />
            <input {...register('password')} type={showPassword ? 'text' : 'password'} id="password" placeholder="Enter your password" className="w-full pl-2" />
          </div>
          <button type="button" onClick={e => { e.preventDefault(); setShowPassword(prev => !prev) }} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
            <Image src={showPassword ? '/images/close.svg' : '/images/open.svg'} width={25} height={25} alt="toggle visibility" />
          </button>
        </div>
        {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}

        {/* Confirm Password */}
        <label htmlFor="confirmPassword" className="block mt-4 mb-1 font-medium">Re-Password</label>
        <div className={`relative rounded border shadow-sm ${errors.password_confirmation ? 'border-red-500' : 'border-gray-300'}`}>
          <div className="flex-row-center w-full p-2">
            <KeyIcon className="h-7 w-7" />
            <input {...register('password_confirmation')} type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword" placeholder="Re-enter your password" className="w-full pl-2" />
          </div>
          <button type="button" onClick={e => { e.preventDefault(); setShowConfirmPassword(prev => !prev) }} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
            <Image src={showConfirmPassword ? '/images/close.svg' : '/images/open.svg'} width={25} height={25} alt="toggle visibility" />
          </button>
        </div>
        {errors.password_confirmation && <p className="text-red-600 text-sm mt-1">{errors.password_confirmation.message}</p>}

        {/* Terms */}
        <div className="flex items-center justify-between mt-4">
          <label className="flex items-center gap-1">
            <input type="checkbox" className="w-3.5 h-3.5" />
            <span className="text-sm select-none">I agree to the <span className="text-[var(--primaryColor)]">Terms Of Services</span></span>
          </label>
        </div>

        {/* Submit */}
        <button type="submit" disabled={pending} className={`w-full mt-6 text-white py-2 rounded-md transition ${pending ? 'bg-gray-400 cursor-not-allowed' : 'bg-[var(--primaryColor)] hover:bg-blue-700'}`}>
          {pending ? 'Please wait...' : 'Sign Up'}
        </button>

        {/* Link to login */}
        <p className="text-center mt-4 text-sm">
          Already have an account? <Link href="/login" className="text-[var(--primaryColor)] hover:underline">Sign In</Link>
        </p>
      </form>
    </main>
  )
}
