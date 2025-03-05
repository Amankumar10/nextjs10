"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import AuthRedirect from "../components/AuthRedirect";
import { useEffect, useRef, useState, Suspense } from "react";

import { useDispatch } from "react-redux";
import { loginSuccess } from "../rtkQuery/slices/authSlice";
import { useRegisterMutation } from "../rtkQuery/api/endpoints/accountApi";
import { FaSpinner } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import FaSpinner for loading

import { enqueueSnackbar } from "notistack";

const SignupPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  
  const [register, { isLoading, isError, error }] = useRegisterMutation();
  const dispatch = useDispatch();
  // Initialize react-hook-form
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    setError, // To set server errors in the form
  } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Call the register mutation
      const response = await register(data).unwrap();
      // dispatch(loginSuccess(response));
      // Handle successful registration
      console.log("Registration successful:", response);
      enqueueSnackbar("Please check your email for verification", {
        variant: "success",
      });
      // router.push("/"); // Redirect after successful registration
    } catch (err) {
      // Handle server errors
      if (err.data && err.data.errors) {
        // Loop through server errors and set them in the form
        Object.entries(err.data.errors).forEach(([field, messages]) => {
          const capitalizedMessage = messages
            .map((msg) => msg.charAt(0).toUpperCase() + msg.slice(1)) // Capitalize each message
            .join(", ");
          setError(field, {
            type: "server",
            message: capitalizedMessage, // Join multiple error messages
          });
        });
      } else {
        console.error("Registration failed:", err);
      }
    }
  };

  return (
    <AuthRedirect>
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
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-black ml-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Full name"
                {...formRegister("name", { required: "Name is required" })}
                className="w-full h-[55px] px-4 py-2 border rounded-[20px] bg-[#F2F6FB] shadow-md shadow-black/25 text-black"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 ml-2">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-black ml-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                {...formRegister("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full h-[55px] px-4 py-2 border rounded-[20px] bg-[#F2F6FB] shadow-md shadow-black/25 text-black"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 ml-2">
                  {errors.email.message}
                </p>
              )}
            </div>




            <div className="relative">
  <label className="block text-sm font-medium text-black ml-1">
    Password
  </label>
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Create Password"
      {...formRegister("password", {
        required: "Password is required",
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters",
        },
      })}
      className="w-full h-[55px] px-4 py-2 pr-12 border rounded-[20px] bg-[#F2F6FB] shadow-md shadow-black/25 text-black"
    />
    {errors.password && (
      <p className="text-red-500 text-sm mt-1 ml-2">
        {errors.password.message}
      </p>
    )}
    <button
      type="button"
      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
    </button>
  </div>
</div>









            
            <div>
              <label className="block text-sm font-medium text-black ml-1">
                Date of Birth
              </label>
              <input
                type="date"
                {...formRegister("dob", {
                  required: "Date of Birth is required",
                })}
                className="w-full h-[55px] px-4 py-2 border rounded-[20px] bg-[#F2F6FB] shadow-md shadow-black/25 text-black"
              />
              {errors.dob && (
                <p className="text-red-500 text-sm mt-1 ml-2">
                  {errors.dob.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-black ml-1">
                Gender
              </label>
              <div className="flex flex-wrap gap-4 mt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="male"
                    {...formRegister("gender", {
                      required: "Gender is required",
                    })}
                  />
                  <span className="text-black">Male</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="female"
                    {...formRegister("gender", {
                      required: "Gender is required",
                    })}
                  />
                  <span className="text-black">Female</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="other"
                    {...formRegister("gender", {
                      required: "Gender is required",
                    })}
                  />
                  <span className="text-black">Other</span>
                </label>
              </div>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1 ml-2">
                  {errors.gender.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 font-black text-white py-2 rounded-lg hover:bg-orange-600 transition flex items-center justify-center"
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? (
                <FaSpinner className="animate-spin" size={20} /> // Loading spinner
              ) : (
                "Sign Up"
              )}
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
    </AuthRedirect>
  );
};

export default SignupPage;
