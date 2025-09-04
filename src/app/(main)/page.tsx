import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
export default function HomePage() {
  return (
    <>
      <main className="container">
        <section className="hero text-[var(--navy)] flex-col-center gap-7 my-7 py-7">
          <div className="flex-col-center font-semibold">
            <h1>Connect locally</h1>
            <p>Grow together</p>
          </div>
          <Link
            href="#"
            className="bg-[var(--primaryColor)] hover:bg-blue-600 text-white px-7 py-2 rounded"
          >
            Join Your Local Network
          </Link>
          <form action="">
            <div className="flex items-center justify-between rounded shadow bg-white py-2 pr-2 pl-4 md:w-2xl lg:w-3xl">
              <input
                type="text"
                className="placeholder:text-[var(--navy)] text-black"
                placeholder="Search..."
              />
              <MagnifyingGlassIcon strokeWidth={2} className="w-5 h-5" />
            </div>
          </form>
        </section>
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 place-items-center my-11">
          {[
            {
              src: "/images/BusinessesVector.svg",
              alt: "BusinessesVector",
              label: "Businesses",
            },
            { src: "/images/JobsVector.svg", alt: "JobsVector", label: "Jobs" },
            {
              src: "/images/NeedsVector.svg",
              alt: "NeedsVector",
              label: "Needs",
            },
            {
              src: "/images/CommunityVector.svg",
              alt: "CommunityVector",
              label: "Community",
            },
          ].map(({ src, alt, label }) => (
            <div
              key={label}
              className="bg-white p-4 shadow rounded flex flex-col items-center justify-between h-[277px] w-full max-w-[250px]"
            >
              <Image src={src} alt={alt} width={190} height={174} />
              <h4>{label}</h4>
            </div>
          ))}
        </section>

        <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 place-items-center my-11">
          {[
            { id: 1, src: "/images/CommunityBox.svg" },
            { id: 2, src: "/images/LocalServicesVector.svg" },
            { id: 3, src: "/images/OpportunityBox.svg" },
          ].map(({ id, src }) => (
            <div key={id}>
              <Image src={src} alt="" width={218} height={218} />
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
