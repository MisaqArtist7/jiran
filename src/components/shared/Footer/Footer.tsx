import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#E6E6E6] py-3">
      <div className="container flex flex-wrap *:mx-auto items-center gap-4 *:hover:text-[var(--primaryColor)]">
        <a href="#">About Us</a>
        <a href="#">Support</a>
        <a href="#">Terms & Privacy</a>
        <a href="#">Follow Us</a>
      </div>
    </footer>
  );
}
