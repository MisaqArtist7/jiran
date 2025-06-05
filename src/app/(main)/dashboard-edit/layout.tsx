// app/(main)/layout.tsx
import { Metadata } from 'next'

import React from 'react'
export const metadata: Metadata = {
    title: 'Edit-info | Jiran'
}
export default function DashboardLayout({children} : Readonly<{ children: React.ReactNode}>) {
  return (
    <>
        {children}
    </>
  )
}
