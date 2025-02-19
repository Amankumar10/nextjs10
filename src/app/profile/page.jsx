"use client";
import React, { useState } from "react";
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
} from "lucide-react";
import { FaShare } from "react-icons/fa";
import MainWrapper from "../components/MainWrapper";

const SocialMediaPage = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);

  const posts = [
    {
      id: 1,
      author: "John Snow",
      timeAgo: "5 mins",
      content: "It's Coming ❄️",
      likes: "22k",
      comments: "15k",
      shares: "124",
    },
    {
      id: 2,
      author: "John Snow",
      timeAgo: "5 mins",
      content: "It's Coming ❄️",
      likes: "22k",
      comments: "15k",
      shares: "124",
    },
    {
      id: 3,
      author: "John Snow",
      timeAgo: "5 mins",
      content: "It's Coming ❄️",
      likes: "22k",
      comments: "15k",
      shares: "124",
    },
    {
      id: 4,
      author: "John Snow",
      timeAgo: "5 mins",
      content: "Winter is here! ❄️",
      likes: "18k",
      comments: "12k",
      shares: "124",
    },
    {
      id: 5,
      author: "John Snow",
      timeAgo: "5 mins",
      content: "Winter is here! ❄️",
      likes: "18k",
      comments: "12k",
      shares: "124",
    },
    {
      id: 6,
      author: "John Snow",
      timeAgo: "5 mins",
      content: "Winter is here! ❄️",
      likes: "18k",
      comments: "12k",
      shares: "124",
    },
  ];
  const friends = [
    {
      id: 1,
      name: "John Snow",
    },
    {
      id: 2,
      name: "John Snow",
    },
    {
      id: 3,
      name: "John Snow",
    },
    {
      id: 4,
      name: "John Snow",
    },
    {
      id: 5,
      name: "John Snow",
    },
    {
      id: 6,
      name: "John Snow",
    },
  ];

  const CommentSection = ({ postId, onClose }) => {
    const [comments, setComments] = useState([
      {
        id: 1,
        user: "Tyrion Lannister",
        comment: "A very insightful observation...",
        timeAgo: "1h ago",
      },
      {
        id: 2,
        user: "Arya Stark",
        comment: "Winter is here! ❄️",
        timeAgo: "2m ago",
      },
    ]);

    const [newComment, setNewComment] = useState("");

    const handleAddComment = () => {
      if (newComment.trim()) {
        setComments([
          ...comments,
          {
            id: comments.length + 1,
            user: "You",
            comment: newComment,
            timeAgo: "Just now",
          },
        ]);
        setNewComment("");
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-black">Comments</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
          <div className="max-h-64 overflow-y-auto mb-4">
            {comments.map((comment) => (
              <div key={comment.id} className="mb-4 text-black">
                <div className="flex items-center gap-2">
                  <img
                    src="user.png"
                    alt={comment.user}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-semibold">{comment.user}</p>
                    <p className="text-sm text-gray-600">{comment.comment}</p>
                    <p className="text-xs text-gray-400">{comment.timeAgo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 border border-gray-300 rounded-lg p-2 text-black"
            />
            <button
              onClick={handleAddComment}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <MainWrapper>
      <div className="flex min-h-screen bg-gray-100">
        <div className="w-full flex-1 p-4 pb-20 md:pb-4">
          {/* Rest of the content remains the same */}
          {/* Profile Section */}
          <div className="bg-white rounded-lg p-6 mb-8 shadow-md flex items-center justify-between container">
            <div className="flex items-center gap-4">
              <img
                src="user.png"
                alt="Profile"
                className="w-20 h-20 bg-gray-200 rounded-full object-cover"
              />
              <h1 className="text-[27px] font-semibold text-[#161499]">
                John Doe
              </h1>
              <h1 className="text-[27px] font-semibold text-[#161499]">
                42 posts
              </h1>
            </div>
            <button className="bg-[#A87DFF] text-white-700 px-6 py-2 rounded-lg text-lg font-medium shadow-inner shadow-black/25 ">
              Cancel
            </button>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b flex gap-8">
              <button
                onClick={() => setActiveTab("posts")}
                className={`px-4 py-2 border-b-2 ${
                  activeTab === "posts"
                    ? "border-orange-500 text-orange-500"
                    : "text-black"
                } `}
              >
                Posts
              </button>
              <button
                onClick={() => setActiveTab("friends")}
                className={`px-4 py-2 border-b-2 ${
                  activeTab === "friends"
                    ? "border-orange-500 text-orange-500"
                    : "text-black"
                } `}
              >
                Your Friends
              </button>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 container">
            {activeTab === "posts"
              ? posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-lg p-4 shadow-md"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <img
                          src="user.png"
                          alt="Profile"
                          className="w-10 h-10 bg-gray-200 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-semibold text-black">
                            {post.author}
                          </div>
                          <div className="text-sm text-gray-500">
                            {post.timeAgo}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="mb-4 text-black">{post.content}</p>
                    <img
                      src="center.png"
                      alt="Banner"
                      className="w-full h-[200px] bg-gray-200 rounded-lg mb-4 object-cover"
                    />
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div>👍 {post.likes}</div>
                      <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => setActiveCommentPostId(post.id)}
                      >
                        💬 {post.comments}
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaShare className="hover:text-green-500 cursor-pointer" />
                        <span> {post.shares} </span>
                      </div>
                    </div>

                    {/* Render Comment Section if this post is active */}
                    {activeCommentPostId === post.id && (
                      <CommentSection
                        postId={post.id}
                        onClose={() => setActiveCommentPostId(null)}
                      />
                    )}
                  </div>
                ))
              : friends.map((friend) => (
                  <div
                    key={friend.id}
                    className="bg-white rounded-lg p-4 shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 w-full">
                        <img
                          src="user.png"
                          alt="Profile"
                          className="w-10 h-10 bg-gray-200 rounded-full object-cover"
                        />
                        <div className="flex items-center justify-between w-full">
                          <div className="font-semibold text-black">
                            {friend.name}
                          </div>
                          <button
                            style={{ background: "#FF4D85" }}
                            className="text-white rounded text-center px-2"
                          >
                            Unfriend
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </MainWrapper>
  );
};

export default SocialMediaPage;
