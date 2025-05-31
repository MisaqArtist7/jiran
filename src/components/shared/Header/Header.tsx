import React from 'react'
import Image from 'next/image'
import { UserIcon, HomeIcon, BriefcaseIcon, NewspaperIcon, PhoneIcon, FingerPrintIcon, BellAlertIcon} from '@heroicons/react/24/outline'

export default function Header() {
  return (
    // Main header block
    <header className="header h-20 flex-row-center">
      {/* Navigation bar */}
      <nav className="header__nav container flex items-center justify-between">

        {/* Logo section */}
        <div className="header__logo">
          <Image src="/images/Logo.svg" alt="Site Logo" width={77} height={0} />
        </div>

        {/* Navigation menu */}
        <ul className="header__menu bg-white p-3 px-7 shadow rounded-full flex items-center gap-x-4">
          <li className="header__menu-item">
            <a href="#" className='flex-row-center gap-x-1'>
              <HomeIcon className='w-5 h-5'/>
              Home
            </a>
          </li>
          <li className="header__menu-item">
            <a href="#" className='flex-row-center gap-x-1'>
              <BriefcaseIcon className='w-5 h-5'/>
              Business
            </a>
          </li>
          <li className="header__menu-item">
            <a href="#" className='flex-row-center gap-x-1'>
              <NewspaperIcon className='w-5 h-5'/>
              Posts
            </a>
          </li>
          <li className="header__menu-item">
            <a href="#" className='flex-row-center gap-x-1'>
              <FingerPrintIcon className='w-5 h-5'/>
              About us
            </a>
          </li>
          <li className="header__menu-item">
            <a href="#" className='flex-row-center gap-x-1'>
              <PhoneIcon className='w-5 h-5'/>
              Contact us
            </a>
          </li>
        </ul>

        {/* Icon section (e.g., profile, cart, etc.) */}
        <div className="header__icons flex-row-center gap-x-2">
          <a href="" className='relative bg-[var(--primaryColor)] rounded-full p-2.5 text-white'>
            <BellAlertIcon className='w-6 h-6'/>
            <span className='absolute -top-1 -right-1 bg-[var(--primaryColor)] text-white rounded-full border border-white w-4 h-4 text-xs flex-row-center'>1</span>
          </a>
          <a href="" className='bg-[var(--primaryColor)] rounded-full p-2.5 text-white'>
            <UserIcon className='w-6 h-6'/>
          </a>
        </div>
      </nav>
    </header>
  )
}
