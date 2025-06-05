import React from 'react'
import { ExclamationCircleIcon, PlusIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function DashboardEdit() {
  return (
    <main className='container my-11'>
      <section className='flex items-center justify-between'>

        <div className='w-1/2 bg-white shadow rounded-lg flex flex-col items-start justify-center p-3'>

          <div className='flex flex-col justify-center gap-2'>
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

        <div className='w-1/2'>

        </div>

      </section>
    </main>
  )
}
