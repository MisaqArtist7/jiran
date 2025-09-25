import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login with email | Jiran ",
  description: "Log in to your Jiran account using your email.",
  robots: {
    index: false,
    follow: true
  }
};

export default function LoginLayout({ children,}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <main> {children} </main>
  );
}
