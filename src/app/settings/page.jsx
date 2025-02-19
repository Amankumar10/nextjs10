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

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("changePassword");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [name, setName] = useState("Amdsafn");
  const [email, setEmail] = useState("dfdjg@gmail.com");

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

      <div className="mt-6 flex flex-col md:flex-row gap-6 rounded-lg bg-white p-6 shadow-sm h-[850px]">
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

          <button className="flex w-full items-center gap-3 rounded-lg p-3 text-left text-red-500 hover:bg-gray-50">
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
            </div>
          )}
          {activeTab === "editProfile" && (
            <div className="mt-4">
              <div className="flex items-center space-x-4">
                <Image
                  src="/user.png"
                  width={50}
                  height={50}
                  className="rounded-full"
                  alt="Profile"
                />
                <label className="border border-gray-300 p-2 rounded cursor-pointer bg-white text-black">
                  Select a file
                  <input type="file" className="hidden" />
                </label>
              </div>
              <div className="mt-4">
                <label className="block text-gray-600">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded text-black"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-600">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border text-black rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-600 ">Birthday</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    className="p-2 border rounded w-1/3 text-black placeholder-black"
                    placeholder="Day"
                  />
                  <input
                    type="text"
                    className="p-2 border rounded w-1/3 text-black placeholder-black"
                    placeholder="Month"
                  />
                  <input
                    type="text"
                    className="p-2 border rounded w-1/3 text-black placeholder-black"
                    placeholder="Year"
                  />
                </div>
              </div>
              <button className="mt-4 bg-[#534FF1] text-white px-8 py-2 rounded w-full">
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </MainWrapper>
  );
}
