'use client'
import React, { useState } from "react";
import { Settings, Home, UserPlus, Bell, MoreVertical, User, Edit, MessageCircle, Heart, UserCheck } from "lucide-react";

const SocialMediaPage = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [active, setActive] = useState("Home"); 

  const posts = Array(6).fill({
    author: "John Snow",
    timeAgo: "5 mins",
    content: "It's Coming ❄️",
    image: "center.png"
  });

  const friends = Array(6).fill({
    name: "Arya Stark",
    mutualFriends: "8 mutual friends",
    avatar: "user.png"
  });

  const notifications = [
    {
      id: 1,
      type: "like",
      user: "Arya Stark",
      action: "liked your post",
      content: "Winter is here! ❄️",
      timeAgo: "2m ago",
      isUnread: true,
      avatar: "user.png"
    },
    {
      id: 2,
      type: "friend",
      user: "Daenerys Targaryen",
      action: "accepted your friend request",
      timeAgo: "15m ago",
      isUnread: true,
      avatar: "user.png"
    },
    {
      id: 3,
      type: "comment",
      user: "Tyrion Lannister",
      action: "commented on your post",
      content: "A very insightful observation...",
      timeAgo: "1h ago",
      isUnread: true,
      avatar: "user.png"
    }
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return <Heart className="w-4 h-4 text-red-500" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case 'friend':
        return <UserCheck className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  const menuItems = [
    { name: "Home", icon: <Home className="w-5 h-5" /> },
    { name: "Add User", icon: <UserPlus className="w-5 h-5" /> },
    { name: "Settings", icon: <Settings className="w-5 h-5" /> },
    { name: "Profile", icon: <img src="user.png" alt="Profile" className="w-8 h-8 rounded-full object-cover" /> }
  ];

  const renderContent = () => {
    if (activeTab === 'friends') {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 container">
          {friends.map((friend, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-md">
              <div className="flex items-center gap-4">
                <img src={friend.avatar} alt={friend.name} className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <h3 className="font-semibold text-black">{friend.name}</h3>
                  <p className="text-sm text-gray-500">{friend.mutualFriends}</p>
                  <button className="mt-2 px-4 py-1 bg-purple-600 text-white rounded-full text-sm hover:bg-purple-700 transition-colors">
                    Message
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 container">
        {posts.map((post, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <img src="user.png" alt="Profile" className="w-10 h-10 bg-gray-200 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-black">{post.author}</div>
                  <div className="text-sm text-gray-500">{post.timeAgo}</div>
                </div>
              </div>
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </div>
            <p className="mb-4 text-black">{post.content}</p>
            <img src={post.image} alt="post" className="w-full h-[200px] object-cover rounded-lg mb-4" />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:block w-64 bg-white p-6 fixed h-full shadow-lg">
        <div className="text-2xl font-bold text-orange-500 mb-10">Ashberri</div>
        <div className="space-y-4">
          {menuItems.map((item) => (
            <div
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`flex items-center gap-2 py-2 px-4 rounded-full w-[180px] h-[50px] font-medium transition-all cursor-pointer
                ${active === item.name ? "bg-gradient-to-r from-[#CEC2E6] to-[#A87DFF] text-white scale-105" : "text-gray-700 hover:bg-gray-100"}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full md:ml-64 flex-1 p-4 pb-20 md:pb-4">
        {/* Profile Section */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-md flex flex-col sm:flex-row items-center justify-between container">
          <div className="flex items-center gap-4">
            <div className="w-22 h-20 bg-gray-200 rounded-full relative overflow-hidden">
              <img src="user.png" alt="Profile" className="w-full h-full object-cover" />
              <Edit className="absolute bottom-0 right-0 bg-white p-1 rounded-full w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-[#161499]">John Snow</h1>
              <p className="text-[#161499] font-bold h-5">12 Friends</p>
              <h1 className="text-[#161499] font-bold h-5">122 posts</h1>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b flex gap-8 text-lg font-medium">
          <button className={`px-4 py-2 ${activeTab === 'friends' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-[#161499]'}`} onClick={() => setActiveTab('friends')}>
            Your Friends
          </button>
          <button className={`px-4 py-2 ${activeTab === 'posts' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-[#161499]'}`} onClick={() => setActiveTab('posts')}>
            Posts
          </button>
        </div>

        {/* Dynamic Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default SocialMediaPage;
