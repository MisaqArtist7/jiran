import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button className={`w-36 h-9 rounded-[5px] hover:bg-[var(--primaryColor)] hover:border-[var(--PrimaryColor)] hover:text-white border text-[var(--navy)] border-gray-300 ${className}`} {...props} >
      {children}
    </button>
  )
}
