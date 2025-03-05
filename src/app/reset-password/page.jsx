"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import AuthRedirect from "../components/AuthRedirect";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../rtkQuery/slices/authSlice";
import {
  useForgotPasswordMutation,
  useRegisterMutation,
  useResetConfirmPasswordMutation,
} from "../rtkQuery/api/endpoints/accountApi";
import { FaSpinner } from "react-icons/fa";
import { enqueueSnackbar } from "notistack";
import { Suspense } from "react";

const ResetPassword = () => {
  const router = useRouter();
  const [resetConfirmPassword, { isLoading, isError, error }] =
    useResetConfirmPasswordMutation();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  // Initialize react-hook-form
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    setError, // To set server errors in the form
  } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    const response = await resetConfirmPassword({
      password: data.password,
      token,
    });
    if (response.data.message === "Password reset successfully") {
      enqueueSnackbar(response.data.message, { variant: "success" });
      router.push("/login");
    } else {
      enqueueSnackbar(response.data.message, { variant: "error" });
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
            Reset Password
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-black ml-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                {...formRegister("password", {
                  required: "Password is required",
                })}
                className="w-full h-[55px] px-4 py-2 border rounded-[20px] bg-[#F2F6FB] shadow-md shadow-black/25 text-black"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 ml-2">
                  {errors.password.message}
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
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </AuthRedirect>
  );
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassword />
    </Suspense>
  );
}
