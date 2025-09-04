import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#E6E6E6] py-3">
      <div className="container flex flex-wrap *:mx-auto items-center gap-4 *:hover:text-[var(--primaryColor)]">
        <Link href="#">About Us</Link>
        <Link href="#">Support</Link>
        <Link href="#">Terms & Privacy</Link>
        <Link href="#">Follow Us</Link>{" "}
      </div>
    </footer>
  );
}
