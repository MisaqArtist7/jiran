import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function HomePage() {
  return (
    <main className="container">
      <section className="hero text-[var(--navy)] flex-col-center gap-7 my-7 py-7">
        <div className="flex-col-center font-semibold">
          <h1>Connect locally</h1>
          <p>Grow together</p>
        </div>
        <a href="#" className="bg-[var(--primaryColor)] hover:bg-blue-600 text-white px-7 py-2 rounded">Join Your Local Network</a>
        <form action="">
          <div className='flex items-center justify-between rounded shadow bg-white py-2 pr-2 pl-4 w-3xl'>
            <input type="text" className="placeholder:text-[var(--navy)] text-black" placeholder="Search..."/>
            <MagnifyingGlassIcon strokeWidth={2} className='w-5 h-5' />
          </div>
        </form>
      </section>
    </main>
  )
}
