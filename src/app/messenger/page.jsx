"use client";
import { useState } from "react";
import {
  Home,
  Settings,
  UserPlus,
  Bell,
  Search,
  Send,
  PaperclipIcon,
  MessageSquare,
  Menu,
  ArrowLeft,
} from "lucide-react";
import { Smile } from "lucide-react";
import MainWrapper from "../components/MainWrapper";

export default function MessagingPage() {
  const [activeTab, setActiveTab] = useState("primary");
  const [currentChat, setCurrentChat] = useState("Twin Bee");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatListVisible, setIsChatListVisible] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  const messages = [
    {
      id: 1,
      text: "I was wondering if you remembered our last balloon fest.",
      type: "received",
      time: "1m ago",
    },
    {
      id: 2,
      text: "Yeah, you've got the picture 📸 we took from there....",
      type: "sent",
    },
    {
      id: 3,
      text: "We took a lot of pictures, but this was one of my favorites ❤️",
      type: "sent",
    },
    {
      id: 4,
      text: "My return to Scotland is scheduled for the end of the month.\nThat makes me even more sad. It is imperative that we go\ntogether, seek medical leave together",
      type: "received",
    },
  ];

  const chats = [
    {
      id: 1,
      name: "Mubark Androz",
      message: "Check out Draft for new..",
      online: true,
      hasImage: true,
    },
    {
      id: 2,
      name: "Althaf Joke",
      message: "Yep I've got ticket's for..",
      online: true,
      hasImage: true,
    },
    {
      id: 3,
      name: "Twin Bee",
      message: "I'm flying back to scotland by th..",
      online: false,
      hasImage: true,
      active: true,
    },
    {
      id: 4,
      name: "Ml Gamer Alth",
      message: "Alright it's on the way for t..",
      online: false,
      hasImage: true,
    },
    {
      id: 5,
      name: "Phram Physco",
      message: "She Just cheated me 😛",
      online: true,
      hasImage: true,
    },
    {
      id: 6,
      name: "Nafiya Raz",
      message: "I love that❤️",
      online: false,
      hasImage: true,
    },
  ];

  const handleChatSelect = (chatName) => {
    setCurrentChat(chatName);
    setIsChatListVisible(false); // Hide chat list on mobile after selection
  };

  const NotificationDropdown = () => {
    const notifications = [
      {
        id: 1,
        type: "like",
        user: "Arya Stark",
        action: "liked your post",
        content: "Winter is here! ❄️",
        timeAgo: "2m ago",
        isUnread: true,
        avatar: "user.png",
      },
      {
        id: 2,
        type: "friend",
        user: "Daenerys Targaryen",
        action: "accepted your friend request",
        timeAgo: "15m ago",
        isUnread: true,
        avatar: "user.png",
      },
      {
        id: 3,
        type: "comment",
        user: "Tyrion Lannister",
        action: "commented on your post",
        content: "A very insightful observation...",
        timeAgo: "1h ago",
        isUnread: true,
        avatar: "user.png",
      },
    ];

    return (
      <div className="fixed inset-0 z-50 lg:absolute lg:inset-auto lg:right-0 lg:mt-2 lg:w-80 w-full max-w-md mx-auto bg-white border border-gray-100 rounded-lg shadow-lg lg:shadow-xl">
        {/* Header for Mobile */}
        <div className="lg:hidden p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setShowNotifications(false)} // Close dropdown on mobile
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Notifications List */}
        <div className="p-4 lg:p-4 max-h-[70vh] overflow-y-auto">
          <div className="space-y-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-3 p-3 rounded-lg ${
                  notification.isUnread ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition-colors cursor-pointer`}
              >
                {/* User Avatar */}
                <div className="flex-shrink-0">
                  <img
                    src={notification.avatar}
                    alt={notification.user}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </div>

                {/* Notification Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">{notification.user}</span>{" "}
                    {notification.action}
                  </p>
                  {notification.content && (
                    <p className="text-sm text-gray-500 mt-1">
                      {notification.content}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    {notification.timeAgo}
                  </p>
                </div>

                {/* Unread Indicator */}
                {notification.isUnread && (
                  <div className="flex-shrink-0">
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <MainWrapper>
      {/* Mobile Sidebar */}
      <aside
        className={`${
          isMobileMenuOpen
            ? "fixed inset-0 z-50 flex flex-col bg-white"
            : "hidden"
        } lg:hidden`}
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-orange-500">Ashberri</h1>
          <button
            className="text-gray-500"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 h-full">
        {/* Chat List - conditionally visible on mobile */}
        <div
          className={`${
            isChatListVisible ? "block" : "hidden"
          } md:block w-full md:w-80 border-r border-gray-100 bg-white`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
              <button
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search here..."
                className="w-full rounded-full border border-gray-200 py-2 pl-10 pr-4 text-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            {/* Chat List */}
            <div className="space-y-2">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                    chat.active ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                  onClick={() => handleChatSelect(chat.name)}
                >
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <img
                        src="user.png"
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    {chat.online && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900">{chat.name}</h3>
                    <p className="text-sm text-gray-500 truncate">
                      {chat.message}
                    </p>
                  </div>
                  {chat.hasImage && (
                    <div className="h-6 w-6 bg-gray-100 rounded-full flex items-center justify-center">
                      <PaperclipIcon className="h-4 w-4 text-gray-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area - conditionally visible on mobile */}
        <div
          className={`${
            !isChatListVisible ? "block" : "hidden"
          } md:block flex-1 bg-pink-50 relative `}
        >
          <div className="border-b border-gray-100 bg-white p-4">
            <div className="flex items-center gap-3">
              <button
                className="md:hidden"
                onClick={() => setIsChatListVisible(true)}
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <img
                  src="user.png"
                  alt={currentChat}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{currentChat}</h3>
                <p className="text-sm text-gray-500">Active 1m ago</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="p-4 space-y-4 pb-24">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "sent" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl p-3 ${
                    message.type === "sent"
                      ? "bg-green-100 text-gray-800"
                      : "bg-blue-100 text-gray-800"
                  }`}
                >
                  <p className="whitespace-pre-line">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 bg-white p-4 ">
            <div className="flex items-center gap-2">
              <Smile className="h-6 w-6 text-purple-500" />
              <PaperclipIcon className="h-6 w-6 text-purple-500" />
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border-none bg-gray-100 p-2 rounded-full focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <button className="text-purple-500">
                <Send className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Notification - hidden on mobile */}
      <div className="hidden lg:flex fixed right-6 top-6 items-center gap-4">
        <div className="relative">
          <button
            className="w-10 h-10 bg-purple-700 rounded-full flex items-center justify-center"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="w-6 h-6 text-white" />
          </button>
          <span className="absolute -top-2 -right-3 bg-[#024DC0] text-white text-xs rounded-full w-8 h-6 flex items-center justify-center">
            129
          </span>
          {showNotifications && <NotificationDropdown />}
        </div>

        <div className="h-10 w-10 rounded-full overflow-hidden">
          <img
            src="user.png"
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </MainWrapper>
  );
}
