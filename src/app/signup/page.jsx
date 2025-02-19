"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SignupPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("");
  }, [router]);

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-white bg-cover bg-center px-4 sm:px-6"
      style={{
        backgroundImage: "url('login-bg.png')",
      }}
    >
      <div className="w-full bg-pink-gradient max-w-sm sm:max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-lg bg-opacity-90">
        <h2 className="text-3xl font-black text-center mb-6 text-black">
          Ashberri
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black ml-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Full name"
              className="w-full h-[55px] px-4 py-2 border rounded-[20px] bg-[#F2F6FB] shadow-md shadow-black/25 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black ml-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full h-[55px] px-4 py-2 border rounded-[20px] bg-[#F2F6FB] shadow-md shadow-black/25 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black ml-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              className="w-full h-[55px] px-4 py-2 border rounded-[20px] bg-[#F2F6FB] shadow-md shadow-black/25 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black ml-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              className="w-full h-[55px] px-4 py-2 border rounded-[20px] bg-[#F2F6FB] shadow-md shadow-black/25 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black ml-1">
              Gender
            </label>
            <div className="flex flex-wrap gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="gender" required />
                <span className="text-black">Male</span>
              </label>

              <label className="flex items-center gap-2">
                <input type="radio" name="gender" required />
                <span className="text-black">Female</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="gender" required />
                <span className="text-black">Other</span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 font-black text-white py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-md text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-orange-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
