'use client'
import Image from "next/image";
import { useState } from "react";
import { Bell, UserPlus, Home } from "lucide-react";
import { User, Key, LogOut, Settings } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("editProfile");
  const [name, setName] = useState("Amdsafn");
  const [email, setEmail] = useState("dfdjg@gmail.com");
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "Profile Update",
      message: "Your profile was successfully updated",
      time: "2 minutes ago",
      isUnread: true
    },
    {
      id: 2,
      title: "Security Alert",
      message: "New login detected from Chrome browser",
      time: "1 hour ago",
      isUnread: true
    },
    {
      id: 3,
      title: "Welcome to Ashberri",
      message: "Thank you for joining our platform",
      time: "2 days ago",
      isUnread: false
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white p-4 shadow-md flex md:block fixed bottom-0 left-0 right-0 md:relative">
        <h1 className="text-2xl font-bold text-orange-500 hidden md:block">Ashberri</h1>
        <nav className="mt-6 space-y-4 flex md:flex-col justify-around w-full">
          <button  className="flex items-center justify-center gap-10 p-2 rounded-full w-[170px] h-[50px] text-black"
           
          >
            <Home />
            <span className="hidden md:inline">Home</span>
          </button>
          <button  className="flex items-center justify-center gap-5 p-2 rounded-full w-[170px] h-[50px] text-black"
          >
            <UserPlus />
            <span className="hidden md:inline">Add User</span>
          </button>
          <div  className="flex items-center justify-center gap-5 p-2 rounded-full w-[170px] h-[50px]"
            style={{
              background: "linear-gradient(90deg, #CEC2E6 0%, #A87DFF 100%)"
            }}
          >
      <button className="flex items-center space-x-3 text-white-500 font-medium hover:text-purple-600 transition-colors">
        <Settings className="w-5 h-5" />
        <span className="hidden md:inline text-white">Settings</span>
      </button>
    </div>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6 bg-white shadow-md rounded-lg flex flex-col md:flex-row">
        {/* Settings Sidebar */}
        <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg mt-9">
          <h2 className="text-2xl font-bold text-gray-700">Settings</h2>

          <button 
            onClick={() => setActiveTab("account")}
            className={`flex items-center space-x-3 p-2 mt-4 rounded-lg w-full text-[24px] ${activeTab === "account" ? "bg-gray-200" : "text-gray-600"}`}
          >
            <User size={24} />
            <span>Account</span>
          </button>

          <button 
            onClick={() => setActiveTab("changePassword")}
            className={`flex items-center space-x-3 p-2 mt-4 rounded-lg w-full text-[24px] ${activeTab === "changePassword" ? "bg-gray-400 text-white" : "text-gray-600"}`}
          >
            <Key size={24} />
            <span>Change Password</span>
          </button>

          <button 
            onClick={() => setActiveTab("editProfile")}
            className={`flex items-center space-x-3 p-2 mt-4 rounded-lg w-full text-[24px] ${activeTab === "editProfile" ? "bg-gray-400 text-white" : "text-gray-600"}`}
          >
            <Settings size={24} />
            <span>Edit Profile</span>
          </button>

          <button className="flex items-center space-x-3 p-2 mt-4 text-gray-600 w-full text-[24px]">
            <LogOut size={24} />
            <span>Log Out</span>
          </button>
        </div>
        
        {/* Content Panel */}
        <div className="w-full md:w-2/3 p-6 bg-[#FEF7FE] rounded-lg mt-9">
          <h2 className="text-xl font-bold text-gray-700">Edit profile</h2>
          {activeTab === "changePassword" && (
            <p className="mt-4 text-gray-600">Change Password</p>
          )}
          {activeTab === "editProfile" && (
            <div className="mt-4">
              <div className="flex items-center space-x-4">
                <Image src="/user.png" width={50} height={50} className="rounded-full" alt="Profile" />
                <label className="border border-gray-300 p-2 rounded cursor-pointer bg-white text-black">
                  Select a file
                  <input type="file" className="hidden" />
                </label>
              </div>
              <div className="mt-4">
                <label className="block text-gray-600">Name</label>
                <input type="text" className="w-full p-2 border rounded" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="mt-4">
                <label className="block text-gray-600">Email</label>
                <input type="email" className="w-full p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="mt-4">
                <label className="block text-gray-600">Birthday</label>
                <div className="flex space-x-2">
                  <input type="text" className="p-2 border rounded w-1/3 text-black placeholder-black" placeholder="Day" />
                  <input type="text" className="p-2 border rounded w-1/3 text-black placeholder-black" placeholder="Month" />
                  <input type="text" className="p-2 border rounded w-1/3 text-black placeholder-black" placeholder="Year" />
                </div>
              </div>
              <button className="mt-4 bg-[#534FF1] text-white px-8 py-2 rounded w-full">
                Save Changes
              </button>
            </div>
          )}
        </div>
      </main>
      
      {/* Notification Icon and Panel */}
      <div className="absolute top-4 right-4 flex items-center space-x-4">
        <div className="relative">
          <div 
            className="w-9 h-9 bg-purple-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-800 transition-colors"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="w-6 h-6 text-white" />
            <span
  className="absolute -top-2 -right-3 bg-[#024DC0] text-white text-xs rounded-full w-8 h-6 flex items-center justify-center"
>
  129
</span>
            
          </div>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                  <button className="text-sm text-purple-600 hover:text-purple-700">
                    Mark all as read
                  </button>
                </div>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      notification.isUnread ? 'bg-purple-50' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-800">{notification.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <span className="text-xs text-gray-500 mt-1">{notification.time}</span>
                      </div>
                      {notification.isUnread && (
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <button className="text-sm text-gray-600 hover:text-gray-700 w-full text-center">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>
        <Image src="/user.png" width={33} height={33} className="rounded-full" alt="Profile" />
      </div>
    </div>
  );
}