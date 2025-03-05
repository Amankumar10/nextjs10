"use client";
import { useState } from "react";
import {
  Bell,
  UserPlus,
  Settings,
  Home,
  Key,
  LogOut,
  User,
  Shield,
  Menu,
  User2,
} from "lucide-react";
import MainWrapper from "../components/MainWrapper";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  useChangePasswordMutation,
  useUpdateUserMutation,
} from "../rtkQuery/api/endpoints/accountApi";
import { baseApi } from "../rtkQuery/api/baseApi";
import { logout, setUser } from "../rtkQuery/slices/authSlice";
import { enqueueSnackbar } from "notistack";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("changePassword");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [updateUser, {}] = useUpdateUserMutation();
  const [changePassword, {}] = useChangePasswordMutation();

  const [profileImage, setProfileImage] = useState(user?.user_profile?.file); // Default image
  const dispatch = useDispatch();

  const handleChangeProfile = async (name, value) => {
    dispatch(
      setUser({
        ...user,
        user_profile: { ...user.user_profile, [name]: value },
      })
    );
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        alert("File size must be less than 5MB.");
        return;
      }

      // Upload the file to the server
      uploadImage(file);
    }
  };

  // Upload the image to the server
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await updateUser(formData);
    setProfileImage(response.data.file); // Update the profile picture
  };

  const handleSave = async () => {
    const formData = new FormData();
    // formData.append('file',user.user_profile.file)
    formData.append("name", user.user_profile.name);
    formData.append("dob", user.user_profile.dob);
    const response = await updateUser(formData).unwrap();
    enqueueSnackbar("Profile updated successfully", { variant: "success" });
  };

  const handleChangePassword = async () => {
    if (
      password != "" &&
      confirmPassword != "" &&
      password == confirmPassword
    ) {
      if (password.length > 6) {
        const response = await changePassword({
          password,
          password2: confirmPassword,
        }).unwrap();
        enqueueSnackbar("Password changed successfully", {
          variant: "success",
        });
        setPassword("");
        setConfirmPassword("");
      } else {
        enqueueSnackbar("Minimum length for the password is six", {
          variant: "info",
        });
      }
    } else {
      enqueueSnackbar("Ensure password fields are matched", {
        variant: "warning",
      });
    }
  };

  return (
    <MainWrapper>
      {/* Main Content */}

      {/* Mobile Navbar */}
      <div className="flex items-center justify-between p-4 md:hidden">
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu className="h-6 w-6 text-gray-900" />
        </button>
        <h2 className="text-xl font-bold">Settings</h2>
      </div>

      <div className="mt-6 flex flex-col md:flex-row gap-6 rounded-lg bg-white p-6 shadow-sm h-[850px] mb-16">
        {/* Settings Navigation */}
        <div className="w-full md:w-72 space-y-2">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Settings</h2>

          <button
            onClick={() => setActiveTab("account")}
            className={`flex w-full items-center gap-3 rounded-lg p-3 text-left ${
              activeTab === "account"
                ? "bg-gray-200 text-gray-900"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <User className="h-5 w-5" />
            <span className="font-medium">Account</span>
          </button>

          <button
            onClick={() => setActiveTab("changePassword")}
            className={`flex w-full items-center gap-3 rounded-lg p-3 text-left ${
              activeTab === "changePassword"
                ? "bg-gray-200 text-gray-900"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Key className="h-5 w-5" />
            <span className="font-medium">Change Password</span>
          </button>
          <button
            onClick={() => setActiveTab("editProfile")}
            className={`flex w-full items-center gap-3 rounded-lg p-3 text-left ${
              activeTab === "editProfile"
                ? "bg-gray-200 text-gray-900"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <User2 className="h-5 w-5" />
            <span className="font-medium">Edit Profile</span>
          </button>

          <button
            onClick={() => dispatch(logout())}
            className="flex w-full items-center gap-3 rounded-lg p-3 text-left text-red-500 hover:bg-gray-50"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Log Out</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 rounded-lg bg-[#FEF7FE] p-6 w-full">
          <div className="mb-6 flex items-center gap-3">
            <Shield className="h-6 w-6 text-gray-900" />
            <h2 className="text-xl font-bold text-gray-900">
              Privacy and Security Settings
            </h2>
          </div>

          {activeTab === "changePassword" && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Change Password
              </h3>
              {/* Add password change form here if needed */}
              <div className="mt-4">
                <label className="block text-gray-600">New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-[20px] bg-[#F2F6FB] shadow-md shadow-black/25 text-black"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-600">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-[20px] bg-[#F2F6FB] shadow-md shadow-black/25 text-black"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button
                onClick={handleChangePassword}
                className="mt-4 bg-[#534FF1] text-white px-8 py-2 rounded w-full"
              >
                Change Password
              </button>
            </div>
          )}
          {activeTab === "editProfile" && (
            <div className="mt-4">
              <div className="flex items-center space-x-4">
                <img
                  src={profileImage}
                  width={50}
                  height={50}
                  className="rounded-full"
                  alt="Profile"
                />
                <label className="border border-gray-300 p-2 rounded cursor-pointer bg-white text-black">
                  Select a file
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <div className="mt-4">
                <label className="block text-gray-600">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-[20px] bg-[#F2F6FB] shadow-md shadow-black/25 text-black"
                  value={user?.user_profile?.name || ""}
                  onChange={(e) => handleChangeProfile("name", e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-600">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-[20px] bg-[#F2F6FB] shadow-md shadow-black/25 text-black"
                  value={user?.user_profile?.email || ""}
                  disabled
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-600 ">Birthday</label>
                <div className="flex space-x-2">
                  <input
                    type="date"
                    value={user?.user_profile?.dob || ""}
                    onChange={(e) => handleChangeProfile("dob", e.target.value)}
                    className="w-full px-4 py-2 border rounded-[20px] bg-[#F2F6FB] shadow-md shadow-black/25 text-black"
                  />
                </div>
              </div>
              <button
                onClick={handleSave}
                className="mt-4 bg-[#534FF1] text-white px-8 py-2 rounded w-full"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </MainWrapper>
  );
}
