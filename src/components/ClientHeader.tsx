"use client";

import { useEffect } from "react";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function ClientHeader() {
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      fetch("/api/save-user", { method: "POST" }); // Call API to save user
    }
  }, [isSignedIn]);

  return (
    <div className="flex items-center space-x-4">
      {isSignedIn ? (
        <>
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
            Dashboard
          </Link>
          <UserButton afterSignOutUrl="/" />
        </>
      ) : (
        <SignInButton mode="modal">
          <button className="text-gray-600 hover:text-gray-900">Sign In</button>
        </SignInButton>
      )}
    </div>
  );
}

