import React from 'react' 
export default function notfound() {
  return (
  <div className="NotFound relative flex-col-center gap-y-3 min-h-screen">
    <div className="absolute inset-0 bg-black/50 z-0" />
    <h1 className="relative z-10 text-white/90 text-5xl">404 - Page Not Found</h1>
  </div>
  )
}
