import React from 'react'
import { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'Sign up | Jiran'
}
export default function SignUpLayout({children} : Readonly<{children: React.ReactNode}>) {
  return (
    <html lang='en' dir='ltr'>
        <body>
            {children}
        </body>
    </html>
  )
}
