'use client'
import React, { useState } from 'react'
import BusinessIcon from '@/components/icons/BusinessIcon'
import JobIcon from '@/components/icons/JobIcon'
import NeedsIcon from '@/components/icons/NeedsIcon'
import CommunityIcon from '@/components/icons/CommunityIcon'

const icons: { [key: string]: React.ElementType } = {
  BusinessIcon,
  JobIcon,
  NeedsIcon,
  CommunityIcon,
}

export default function DashboardPost() {
  const [posts] = useState([
    { id: 1, title: 'Business', desc: 'Landscaper Position', icon: 'BusinessIcon', bgColor: 'bg-[#1FAF381A]' },
    { id: 2, title: 'Job', desc: 'Landscaper Position', icon: 'JobIcon', bgColor: 'bg-[#007BFF1A]' },
    { id: 3, title: 'Needs', desc: 'Landscaper Position', icon: 'NeedsIcon', bgColor: 'bg-[#FFDD551A]' },
    { id: 4, title: 'Community', desc: 'Landscaper Position', icon: 'CommunityIcon', bgColor: 'bg-[#FF6B6B1A]' },
  ])

  return (
    <>
      {posts.map((post) => {
        const IconComponent = icons[post.icon] 
        return (
          <div key={post.id} className='rounded-[9px] overflow-hidden shadow'>
            <div className={`${post.bgColor} flex items-center p-3 gap-2`}>
              <IconComponent />
              <h4>{post.title}</h4>
            </div>
            <div className='py-4 px-5'>
              <p>Hiring for</p>
              <p>{post.desc}</p>
            </div>
          </div>
        )
      })}
    </>
  )
}
