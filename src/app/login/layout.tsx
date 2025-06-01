import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login with email | Jiran ",
};

export default function LoginLayout({ children,}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" dir="ltr">
      <body>
        {children}
      </body>
    </html>
  );
}
