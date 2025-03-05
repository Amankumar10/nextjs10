"use client";

import React, { useEffect, useState } from "react";

import { FaHome, FaUserPlus, FaCog, FaUserCircle } from "react-icons/fa";
import { MessageSquare } from "lucide-react";

import { BiSearch } from "react-icons/bi";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import FullPageLoader from "./FullPageLoading";
import { useGetFriendsQuery } from "../rtkQuery/api/endpoints/friendsApi";
import { useLazyGetSearchUsersQuery } from "../rtkQuery/api/endpoints/searchApi";
import Notifications from "./Notifications";

const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

export default function MainWrapper({ home = false, children }) {
  const [search, setSearch] = useState("");
  const [isScrollDisabled, setIsScrollDisabled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { data: getFriends, refetch } = useGetFriendsQuery();
  const [getSearchUsers, { isLoading, error, data }] =
    useLazyGetSearchUsersQuery();

  const [active, setActive] = useState(""); // Default active item
  const router = useRouter();
  const pathname = usePathname();

  // Refetch data only if the URL matches a specific path
  useEffect(() => {
    if (pathname === "/") {
      refetch();
    }
    if (pathname === "/messenger") {
      setIsScrollDisabled(true);
    } else {
      setIsScrollDisabled(false);
    }
  }, [pathname]); // Trigger when the pathname changes

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
      const activeItem = menuItems.find((item) => pathname == item.path);
      if (activeItem) {
        setActive(activeItem.text);
      }
    }
  }, [pathname]);

  const fetchSuggestions = async (query) => {
    if (query) {
      setLoading(true);
      const response = await getSearchUsers(query).unwrap();
      setLoading(false);
      setSuggestions(response);
    } else {
      setSuggestions([]);
    }
  };

  const debouncedSearch = debounce(fetchSuggestions, 300);
  useEffect(() => {
    debouncedSearch(search);
  }, [search]);

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion.name);
    router.push("/userprofile/" + suggestion.id);
    setSuggestions([]);
    // Optionally, you can trigger a search or navigate to a result page here
  };

  const menuItems = [
    { icon: <FaHome className="w-6 h-6" />, text: "Home", path: "/" },
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

  if (!user) return <FullPageLoader />;
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
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t py-3 px-6 z-1">
        <div className="flex justify-between items-center">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.path;
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
          <div className="text-2xl font-bold text-orange-600 hidden md:block">
            Ashberri
          </div>

          <div className="flex items-center bg-gray-100 border border-gray-400 rounded-full px-3 py-2 md:w-3/5 relative">
            <BiSearch className="text-orange-500 text-lg" />
            <input
              type="text"
              placeholder="Search here..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none px-2 text-black"
            />
            {/* {loading && <div className="mt-2">Loading...</div>} */}
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 mt-2 max-h-60 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {/* User Avatar */}
                    <img
                      src={suggestion.file} // Replace with the actual image URL from your data
                      alt={suggestion.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    {/* User Details */}
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {suggestion.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {suggestion.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Notifications />
        </header>

        <main
          className={`flex-1 p-6 mt-[4.5rem] container mx-auto ${
            isScrollDisabled ? "no-scroll" : "overflow-y-auto"
          } max-h-screen`}
        >
          {children}
        </main>
      </div>
      {home && (
        <aside className="hidden md:block w-64 bg-white shadow-lg p-5 mt-10 h-screen sticky top-0">
          <h2 className="text-xl font-bold text-gray-800 mb-4 mt-8">Friends</h2>
          <div
            className="space-y-3 overflow-y-auto max-h-[calc(100vh-180px)] pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            style={{
              scrollbarWidth: "thin",
              msOverflowStyle: "none",
            }}
          >
            {getFriends?.friend?.map((friend) => (
              <div
                key={friend.id}
                onClick={() => router.push("/messenger?user=" + friend.user_id)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 transition cursor-pointer"
              >
                <img
                  src={friend.image}
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
