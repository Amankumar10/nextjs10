"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function AuthRedirect({ children }) {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/"); // Redirect logged-in users to home
    }
  }, [isAuthenticated]);
  return <>{children}</>; // Show login form only if not logged in
}
