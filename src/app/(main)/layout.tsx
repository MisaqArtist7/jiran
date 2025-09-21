// app/(main)/layout.tsx
import { Metadata } from 'next'
import Header from '@/components/shared/Header/Header'
import Footer from '@/components/shared/Footer/Footer'

export const metadata: Metadata = {
  title: "Home | Jiran",
  description: "Connect locally and grow together.",
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
