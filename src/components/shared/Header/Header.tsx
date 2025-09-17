import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./header.css";
import {
  HomeIcon,
  BriefcaseIcon,
  NewspaperIcon,
  FingerPrintIcon,
} from "@heroicons/react/24/outline";

export default function Header() {
  return (
    // Main header block
    <header className="header py-4  flex-row-center shadow-sm">
      {/* Navigation bar */}
      <nav className="header__nav container flex items-center justify-between">
        <div className="flex flex-wrap gap-x-3">
          {/* Logo section */}
          <div className="header__logo">
            <Image
              src="/images/Logo.svg"
              alt="Site Logo"
              width={77}
              height={50}
              style={{ width: "auto", height: "auto" }}
            />
          </div>
          {/* <form action="" className='bg-[#F3F3F6] pr-3 pl-6 w-[369px] h-14 rounded-full flex items-center justify-between hover:bg-white border-2 border-white hover:border-[var(--primaryColor)]/10'>
              <input type="text" placeholder='What are you looking for?' className='placeholder:text-sm placeholder:text-black/80'/>
              <button type='submit' className='bg-[var(--primaryColor)] rounded-full p-2.5 text-white flex-row-center'>
                <MagnifyingGlassIcon strokeWidth={2} className='w-5 h-5'/>
              </button>
            </form> */}
          {/* Navigation menu */}
          <ul className="flex flex-wrap *:mx-auto header__menu p-3 rounded-full  items-center gap-x-4 gap-y-2">
            <li className="header__menu-item">
              <Link href="./" className="flex-row-center gap-x-1">
                <HomeIcon className="w-5 h-5" />
                Home
              </Link>
            </li>
            <li className="header__menu-item">
              <Link href="#" className="flex-row-center gap-x-1">
                <BriefcaseIcon className="w-5 h-5" />
                Business
              </Link>
            </li>
            <li className="header__menu-item">
              <Link href="#" className="flex-row-center gap-x-1">
                <NewspaperIcon className="w-5 h-5" />
                Blogs
              </Link>
            </li>
            <li className="header__menu-item">
              <Link href="./login" className="flex-row-center gap-x-1">
                <FingerPrintIcon className="w-5 h-5" />
                Account
              </Link>
            </li>
          </ul>
        </div>
        {/* Icon section (e.g., profile, cart, etc.) */}
        {/* <div className="header__icons flex-row-center gap-x-2">
          <Link href="" className='relative bg-[var(--primaryColor)] rounded-full p-2.5 text-white'>
            <BellAlertIcon className='w-6 h-6'/>
            <span className='absolute -top-1 -right-1 bg-[var(--primaryColor)] text-white rounded-full border border-white w-4 h-4 text-xs flex-row-center'>1</span>
          </Link>
          <Link href="./login" className='hover:bg-[var(--primaryColor)] bg-white border-2 border-[var(--primaryColor)] text-[var(--primaryColor)] rounded-full p-2.5 hover:text-white flex-row-center transition-colors duration-150'>
            <UserIcon className='w-6 h-6'/>
          </Link>
        </div> */}
      </nav>
    </header>
  );
}
