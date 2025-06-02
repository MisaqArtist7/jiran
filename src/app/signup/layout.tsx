import React from 'react'
import { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'Sign up | Jiran'
}
export default function SignUpLayout({children} : Readonly<{children: React.ReactNode}>) {
  return (
    <main> {children} </main>
  )
}
