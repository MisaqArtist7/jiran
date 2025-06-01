// app/(main)/layout.tsx
import Header from '@/components/shared/Header/Header'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
