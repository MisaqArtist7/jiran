// app/(main)/layout.tsx
import { Metadata } from 'next'
import Header from '@/components/shared/Header/Header'

export const metadata: Metadata = {
  title: 'Jiran compony'
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
