"use client"
import React from 'react'
import { ExclamationCircleIcon, PlusIcon, MapPinIcon, MapIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import axios from 'axios'
import { useEffect } from 'react'

export default function DashboardEdit() {

useEffect(() => {
    axios.post(
      'https://jiran-api.com/api/v1/auth/edit-profile', {}, 
      {
        headers: 
        {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((response) => {
      console.log('✅ Success:', response.data);
      console.log(response);
      return response.data;
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <main className='container my-11'>
      <section className='flex items-start justify-between gap-3'>

        <div className='w-1/2 flex flex-col items-start justify-center gap-7'>

          <div className='bg-white shadow rounded-lg w-full p-3'>
            <div className='flex flex-col justify-center items-start gap-2'>
              <h6 className='text-red-600 flex-row-center'>
                <ExclamationCircleIcon className='w-7 h-7'/>
                Personal Information
              </h6>
              <div className="relative w-24 h-24">
                <Image src="/images/user.jpg" alt="User" fill className="rounded-full object-cover" />
              </div>
            </div>

            <form action="" className='flex flex-col justify-center gap-3 my-4 px-3 w-full'>   
                <div className='flex items-center justify-between w-full'>
                  <label htmlFor="Name" className='text-[var(--navy)]'>Name</label>
                  <input type="text" className='border-b px-3 py-2 border-gray-300 w-[85%]' placeholder='Your Name' />
                </div>

                <div className='flex items-center justify-between w-full'>
                  <label htmlFor="E-mail" className='text-[var(--navy)]'>Email</label>
                  <input type="text" className='border-b px-3 py-2 border-gray-300 w-[85%]' placeholder='Your E-mail' />
                </div>

                <div className='flex items-center justify-between w-full'>
                  <label htmlFor="Bio" className='text-[var(--navy)]'>Bio</label>
                  <input type="text" className='border-b px-3 py-2 border-gray-300 w-[85%]' placeholder='About yourself' />
                </div>

                <div className='flex items-center gap-x-11 w-full'>
                  <label htmlFor="Gender" className='text-[var(--navy)]'>Gender</label>
                  <div className='flex items-center gap-7'>
                    <div className='flex-row-center gap-1'>
                      <input type="checkbox" name="fwefwef" id="" />
                      <span>Male</span>
                    </div>
                    <div className='flex-row-center gap-1'>
                      <input type="checkbox" name="fwefwef" id="" />
                      <span>Female</span>
                    </div>
                    <div className='flex-row-center gap-1'>
                      <input type="checkbox" name="fwefwef" id="" />
                      <span>Other</span>
                    </div>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <label htmlFor="Social Links" className='text-[var(--navy)]'>Social Links</label>
                  <PlusIcon className='w-6 h-6 text-[var(--navy)] hover:text-[var(--primaryColor)] hover:cursor-pointer'/>
                </div>
            </form>

          </div>

          <div className='w-full flex-row-center gap-2 p-3'>
            <button className='flex-row-center py-2.5 border border-[var(--primaryColor)] bg-[var(--primaryColor)] hover:bg-blue-600 text-white w-1/2 rounded transition-colors duration-75'>Done</button>
            <button className='flex-row-center py-2.5 border border-red-600 text-red-600 w-1/2 rounded hover:bg-red-600 hover:text-white transition-colors duration-75'>Discard</button>
          </div>

        </div>

        <div className='w-1/2 bg-white flex flex-col items-start shadow rounded-lg p-4'>

          <h6 className='text-red-600 flex-row-center'>
            <MapPinIcon className='w-7 h-7'/>
            Your Location
          </h6>

          <form className='flex py-2'>
            <div className='flex flex-col justify-center gap-7 w-full'>
              
              <div className='flex items-center justify-between gap-2 w-full'>
                <div className='w-1/2'>
                  <label className='text-[var(--navy)]'>Latitude</label>
                  <input type="text" className='border rounded px-3 py-2 border-gray-300 w-full' placeholder='-' />
                </div>
                <div className='w-1/2'>
                  <label className='text-[var(--navy)]'>Latitude</label>
                  <input type="text" className='border rounded px-3 py-2 border-gray-300 w-full' placeholder='-' />
                </div>
              </div>

              <div className='border border-gray-300 shadow flex-row-center w-full p-11 rounded'>map</div>

            </div>
          </form>

          <div>

          <div>
            <h6 className='text-red-600 flex items-center pt-4'>
              <MapIcon className='w-7 h-7'/>
              Your Address
            </h6>

            <form className='flex py-2'>
              <div className='flex flex-col justify-center gap-3 w-full'>
                
                <div className='flex items-center justify-between gap-2 w-full'>
                  <div className='w-1/2'>
                    <label className='text-[var(--navy)]'>Country</label>
                    <input type="text" className='border rounded px-3 py-2 border-gray-300 w-full' placeholder='Your Country' />
                  </div>
                  <div className='w-1/2'>
                    <label className='text-[var(--navy)]'>City</label>
                    <input type="text" className='border rounded px-3 py-2 border-gray-300 w-full' placeholder='Your City' />
                  </div>
                </div>

                <div>
                  <label className='text-[var(--navy)]'>Address</label>
                  <input type="text" className='border rounded px-3 py-2 border-gray-300 w-full' placeholder='Your Address' />
                </div>

                <div>
                  <label className='text-[var(--navy)]'>Post Code</label>
                  <input type="text" className='border rounded px-3 py-2 border-gray-300 w-full' placeholder='Your Post Code' />
                </div>

                <button type='submit' className='border border-[var(--primaryColor)] text-[var(--primaryColor)] rounded py-2 hover:bg-[var(--primaryColor)] hover:text-white'>Save Address</button>

              </div>
            </form>
          </div>

          </div>
        </div>

      </section>
    </main>
  )
}
