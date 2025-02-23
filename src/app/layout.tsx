import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider, SignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arsana Labs",
  description: "Open-source innovation and expert software consulting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // layout.tsx
return (
  <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        {/* Header Section - Always visible */}
        <header className="flex items-center justify-between p-4 bg-gray-100 shadow-md">
          <h1 className="text-xl font-bold text-gray-900">Arsana Labs</h1>
          
          {/* Show User Profile Button when signed in */}
          <SignedIn>
            <div className="flex items-center">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </header>

        {/* Authentication Flow */}
        <SignedOut>
          <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sign In to Continue</h2>
              <SignIn routing="hash" />
            </div>
          </div>
        </SignedOut>

        {/* Main Content - Shown when signed in */}
        <SignedIn>
          {children}
        </SignedIn>
      </body>
    </html>
  </ClerkProvider>
);
}
