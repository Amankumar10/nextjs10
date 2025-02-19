"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-pink-gradient">
      {/* Left Section (Hidden on Small Screens) */}
      <div
        className="hidden md:flex md:w-1/2 items-center justify-center bg-cover bg-center bg-white"
        style={{
          backgroundImage: "url('login-bg.png')",
        }}
      >
        <div className="text-black text-center p-6 flex flex-col items-center justify-center">
          <img
            src="login-bg-logo.png"
            alt="Travel Logo"
            className="w-[60px] h-[60px] mb-4"
          />
          <div className="text-start">
            <h1 className="text-[40px] md:text-[50px] font-bold leading-[50px] md:leading-[68px]">
              Let’s Explore
              <br />
              the world together
              <br />
              Join now
            </h1>
            <h3 className="text-[24px] md:text-[32px] font-light leading-[32px] md:leading-[43px]">
              For business accounts
              <br /> Just call us!
            </h3>
          </div>
        </div>
      </div>

      {/* Right Section (Login Form) */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-white pb-20 pt-10 px-10 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-4xl font-bold text-black">Login</h2>
            <img
              src="login-page-person.png"
              alt="Company Logo"
              className="h-auto max-w-[150px] md:max-w-[250px] w-auto"
            />
          </div>

          <form className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-lg font-bold text-black ml-1">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full h-[55px] px-4 py-2 border rounded-[20px] bg-[#F2F6FB] shadow-md shadow-black/25 text-black"
              />
            </div>

            {/* Password Field */}
            <div className="flex items-center justify-between">
              <label className="text-lg font-bold text-black ml-1">
                Password
              </label>
              <p className="text-sm text-purple-600">
                <Link href="/auth/forgot-password" className="hover:underline">
                  Forgot Password?
                </Link>
              </p>
            </div>

            {/* Password Input with Show/Hide Button */}
            <div className="relative !mt-1">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="w-full h-[55px] px-4 py-2 border rounded-[20px] bg-[#F2F6FB] shadow-md shadow-black/25 text-black"
                required
              />
              <button
                type="button"
                className="absolute right-4 top-[50%] transform -translate-y-[50%] text-gray-600 hover:text-black"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 text-xl rounded-xl hover:bg-blue-600 !mt-10 transition"
            >
              Login
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center text-md text-[#161499] mt-4">
            Don't have an account yet?{" "}
            <Link href="/signup" className="hover:underline">
              Register for Free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
