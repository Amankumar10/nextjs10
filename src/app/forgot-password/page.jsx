"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import AuthRedirect from "../components/AuthRedirect";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../rtkQuery/slices/authSlice";
import {
  useForgotPasswordMutation,
  useRegisterMutation,
} from "../rtkQuery/api/endpoints/accountApi";
import { FaSpinner } from "react-icons/fa";
import { enqueueSnackbar } from "notistack";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [forgotPassword, { isLoading, isError, error }] =
    useForgotPasswordMutation();
  // Initialize react-hook-form
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    setError, // To set server errors in the form
  } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    enqueueSnackbar("Reset Link has been sent to your email", {
      variant: "success",
    });
    const response = await forgotPassword({ email: data.email });
    router.push("/reset-password");
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
            Forgot Password
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-black ml-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                {...formRegister("email", { required: "Email is required" })}
                className="w-full h-[55px] px-4 py-2 border rounded-[20px] bg-[#F2F6FB] shadow-md shadow-black/25 text-black"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 ml-2">
                  {errors.email.message}
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
                "Forgot Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </AuthRedirect>
  );
};

export default ForgotPasswordPage;
