"use client";

import { useRouter } from "next/navigation";

const AuthPage = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Welcome</h1>
        <p className="text-gray-600 mb-4">Please select an option:</p>
        <button
          onClick={() => router.push("/login")}
          className="w-full bg-blue-600 text-white py-2 rounded-lg mb-4 hover:bg-blue-700 transition"
        >
          Login
        </button>
        <button
          onClick={() => router.push("/signup")}
          className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
