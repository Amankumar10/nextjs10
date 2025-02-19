"use client";

import React, { useEffect, useState } from "react";

import {
  FaHome,
  FaUserPlus,
  FaCog,
  FaCamera,
  FaSmile,
  FaThumbsUp,
  FaThumbsDown,
  FaShare,
  FaUserCircle,
} from "react-icons/fa";
import {
  Search,
  Settings,
  Home,
  UserPlus,
  User,
  Bell,
  MessageCircle,
  Heart,
  UserCheck,
  MessageSquare,
} from "lucide-react";

import { BiSearch } from "react-icons/bi";
import { useRouter, usePathname } from "next/navigation";
const friends = [
  { id: 1, name: "Alexander Smith", avatar: "https://i.pravatar.cc/40?img=1" },
  { id: 2, name: "Olivia Johnson", avatar: "https://i.pravatar.cc/40?img=2" },
  {
    id: 3,
    name: "Benjamin Williams",
    avatar: "https://i.pravatar.cc/40?img=3",
  },
  { id: 4, name: "Emily Brown", avatar: "https://i.pravatar.cc/40?img=4" },
  { id: 5, name: "Liam Davis", avatar: "https://i.pravatar.cc/40?img=5" },
  { id: 6, name: "Sophia Martinez", avatar: "https://i.pravatar.cc/40?img=6" },
  { id: 7, name: "Noah Wilson", avatar: "https://i.pravatar.cc/40?img=7" },
  { id: 8, name: "William Taylor", avatar: "https://i.pravatar.cc/40?img=8" },
];

const notifications = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/40?img=1",
    name: "Alexander Smith",
    action: "liked your post",
    time: "2m ago",
    read: false,
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/40?img=2",
    name: "Olivia Johnson",
    action: "commented on your photo",
    time: "5m ago",
    read: false,
  },
  {
    id: 3,
    avatar: "https://i.pravatar.cc/40?img=3",
    name: "Benjamin Williams",
    action: "sent you a friend request",
    time: "10m ago",
    read: true,
  },
];
export default function MainWrapper({ home = false, children }) {
  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [active, setActive] = useState(""); // Default active item
  const router = useRouter();
  const pathname = usePathname();

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest(".notifications-container")) {
      setShowNotifications(false);
    }
  };

  useEffect(() => {
    if (showNotifications) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showNotifications]);

  // Set active based on current URL
  useEffect(() => {
    if (pathname) {
      const activeItem = menuItems.find((item) => pathname.includes(item.path));
      if (activeItem) {
        setActive(activeItem.text);
      }
    }
  }, [pathname]);

  const menuItems = [
    { icon: <FaHome className="w-6 h-6" />, text: "Home", path: "/home" },
    {
      icon: <FaUserPlus className="w-6 h-6" />,
      text: "All User",
      path: "/users",
    },
    {
      icon: <FaCog className="w-6 h-6" />,
      text: "Settings",
      path: "/settings",
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      text: "Messaging",
      path: "/messenger",
    },
    {
      icon: <FaUserCircle className="w-6 h-6" />,
      text: "Profile",
      path: "/profile",
    },
  ];
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <aside className="hidden md:flex md:w-64 bg-white shadow-lg flex-col p-5">
        <h1
          className="text-3xl text-orange-600 mb-6"
          style={{
            fontFamily: "Poppins",
            fontSize: "32px",
            fontWeight: 700,
            textAlign: "left",
            textDecorationSkipInk: "none",
            padding: "8px",
          }}
        >
          Ashberri
        </h1>

        <nav className="space-y-3">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => router.push(item.path)}
              className={`flex items-center justify-start gap-3 rounded-[100px] transition-all duration-300 cursor-pointer
            ${
              active === item.text
                ? "w-[170px] h-[60px] bg-gradient-to-r from-[#A87DFF] to-[#CEC2E6] text-white hover:from-[#9570E5] hover:to-[#B8A9D6]"
                : "w-[170px] h-[60px] text-gray-700 bg-white  hover:bg-gray-100 hover:border-gray-300"
            }`}
              style={{
                fontFamily: "Roboto",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "1.5",
                padding: "0 20px",
              }}
            >
              <span
                className={`text-xl ${
                  active === item.text ? "text-white" : "text-gray-600"
                }`}
              >
                {item.icon}
              </span>
              <span className="flex-1 text-left">{item.text}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t py-3 px-6">
        <div className="flex justify-between items-center">
          {menuItems.map((item, index) => {
            const isActive = pathname?.includes(item.path);
            return (
              <button
                key={index}
                onClick={() => router.push(item.path)}
                className={`flex items-center justify-center gap-1 p-2 mx-2 rounded-full w-[170px] h-[50px] transition-all duration-300
              ${
                isActive
                  ? "text-white"
                  : "text-black hover:bg-gray-100 hover:border-gray-300"
              }`}
                style={{
                  background: isActive
                    ? "linear-gradient(90deg, #CEC2E6 0%, #A87DFF 100%)"
                    : "transparent",
                }}
              >
                {item.icon}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="fixed top-0 left-0 w-full flex items-center justify-between bg-white shadow-md p-5 z-10">
          <div className="text-2xl font-bold text-orange-600  md:block">
            Ashberri
          </div>

          <div className="flex items-center bg-gray-100 border border-gray-400 rounded-full px-3 py-2 w-2/4 md:w-3/5">
            <BiSearch className="text-orange-500 text-lg" />
            <input
              type="text"
              placeholder="Search here..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none px-2 w-full text-black"
            />
          </div>

          <div className="flex items-center gap-4 notifications-container relative">
            <button
              className="p-2 rounded-full transition"
              style={{
                width: "40px",
                height: "40px",
                color: "purple",
              }}
              onClick={toggleNotifications}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-purple-700 rounded-full flex items-center justify-center mr-4">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <span className="absolute -top-2 -right-5 bg-[#024DC0] text-white text-xs rounded-full w-8 h-6 flex items-center justify-center">
                  129
                </span>
              </div>
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-16 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Notifications
                    </h3>
                    <span className="text-sm text-blue-600 cursor-pointer hover:text-blue-800">
                      Mark all as read
                    </span>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 transition cursor-pointer ${
                        !notification.read ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={notification.avatar}
                          alt=""
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">
                            <span className="font-semibold">
                              {notification.name}
                            </span>{" "}
                            {notification.action}
                          </p>
                          <span className="text-xs text-gray-500">
                            {notification.time}
                          </span>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <button className="w-full text-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}

<img
  src="https://i.pravatar.cc/40"
  alt="Profile"
  className="w-10 h-10 rounded-full border border-gray-300 hidden sm:block"
              style={{
                width: "40px",
                height: "40px",
                position: "relative",
                top: "2.67px",
                left: "5.89px",
                opacity: 1,
              }}
            />
          </div>
        </header>

        <main className="flex-1 p-6 mt-[4.5rem] container mx-auto overflow-y-auto max-h-screen">
          {children}
        </main>
      </div>
      {home && (
        <aside className="w-full sm:w-64 bg-white-300 shadow-lg p-5 mt-10 block hidden sm:block">
          <h2 className="text-xl font-bold text-gray-800 mb-4 mt-8">Friends</h2>
          <div className="space-y-3 overflow-auto">
            {friends.map((friend) => (
              <div
                key={friend.id}
                onClick={() => router.push("/messenger")}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 transition cursor-pointer"
              >
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
                <div className="flex-1">
                  <span className="text-gray-900 font-medium">
                    {friend.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      )}
    </div>
  );
}
