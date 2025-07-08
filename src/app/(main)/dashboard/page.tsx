"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import LocationIcon from '@/components/icons/LocationIcon'
import LinkedinIcon from '@/components/icons/LinkedinIcon'
import WhatsappIcon from '@/components/icons/WhatsappIcon'
import InstagramIcon from '@/components/icons/InstagramIcon'
import DashboardPost from '@/components/ui/DashboardPost/DashboardPost'
import AllOutlineIcon from '@/components/icons/AllOutlineIcon'
import BusinessOutlineIcon from '@/components/icons/BusinessOutlineIcon'
import NeedsOutlineIcon from '@/components/icons/NeedsOutlineIcon'
import JobOutlineIcon from '@/components/icons/JobOutlineIcon'
import CommunityOutlineIcon from '@/components/icons/CommunityOutlineIcon'
import Link from 'next/link'
import axios from 'axios'
import useUserStore from '@/store/useUserStore'

  export default function Dashboard() {
  const { name, email, avatar, setUser } = useUserStore();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
      console.log("⛔ No token found!");
      return;
    }

    axios.get('https://jiran-api.com/api/v1/auth/show', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response => {
      console.log(response);
      const userData = response.data.data;
      setUser({
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar_path,
        bio: userData.bio,
      });
    })
    .catch(error => {
      console.error('❌ Error:', error);
    });
  }, [setUser]);

  return (
    <main className='container'>
      {/* User info section */}
      <section className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6 my-11'>

        <div className='flex flex-col justify-center'>
          {/* Profile Info */}
          <div className="flex items-center gap-4">
            <div className="relative w-28 h-28">
              <Image src={avatar || '/images/default-avatar.svg'} alt={name} fill className="rounded-full object-cover" />
            </div>
            <div>
              <h4 className="text-xl font-semibold">{name}</h4>
              <span className="text-sm text-gray-900">{email}</span>
            </div>
          </div>
          
          {/* Bio and Quote */}
          <div>
            <h5 className="flex items-center font-medium gap-1 pt-2">
              <LocationIcon />
              New York, USA
            </h5>
            <p className="text-sm mt-1 text-gray-600 italic">&quot;You can&apos;t kill someone who has already died.&quot;</p>
          </div>
          {/* user's social media */}
          <div className='flex items-center gap-x-2 pt-1'>
            <WhatsappIcon />
            <InstagramIcon />
            <LinkedinIcon />
          </div>
        </div>

        <div className='flex-row-center gap-2 '>
          <Link href="/dashboard-edit" className='flex-row-center w-36 h-9 rounded-[5px] hover:bg-[var(--primaryColor)] hover:border-[var(--PrimaryColor)] hover:text-white border text-[var(--navy)] border-gray-300'> Edit profile </Link>
          <Link href="/dashboard-edit" className='flex-row-center w-36 h-9 rounded-[5px] hover:bg-[var(--primaryColor)] hover:border-[var(--PrimaryColor)] hover:text-white border text-[var(--navy)] border-gray-300'> Share profile </Link>
        </div>

      </section>

      {/* posts */}
      <section className='my-11'>

        <h3>Posts</h3>
        <div className='flex-row-center gap-x-36 mt-4 mb-7'>
          <AllOutlineIcon />
          <BusinessOutlineIcon />
          <JobOutlineIcon />
          <NeedsOutlineIcon />
          <CommunityOutlineIcon />
        </div>

        <div className='grid grid-cols-4 gap-x-11'>
          <DashboardPost />
        </div>
        
      </section>
    </main>
  )
}
