// app/(main)/layout.tsx
import { Metadata } from 'next'

import React from 'react'
export const metadata: Metadata = {
    title: 'Edit-info | Jiran',
    description: 'Edit your information on Jiran.',
    robots: {
      index: false,
      follow: true
    }
}
export default function DashboardLayout({children} : Readonly<{ children: React.ReactNode}>) {
  return (
    <main>
      {children}
    </main>
  )
}
