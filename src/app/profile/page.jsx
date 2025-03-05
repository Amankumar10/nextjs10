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
import { Post } from "../components/Post";
import { useGetPostsQuery } from "../rtkQuery/api/endpoints/postsApi";
import {
  useGetFriendsQuery,
  useUnfriendMutation,
} from "../rtkQuery/api/endpoints/friendsApi";
import { useDispatch, useSelector } from "react-redux";
import { baseApi } from "../rtkQuery/api/baseApi";
import { useUpdateUserMutation } from "../rtkQuery/api/endpoints/accountApi";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";

const SocialMediaPage = () => {
  const auth = useSelector((state) => state.auth);
  const [profileImage, setProfileImage] = useState(
    auth?.user?.user_profile?.file
  ); // Default image

  const [activeTab, setActiveTab] = useState("posts");
  const { data: getFriends } = useGetFriendsQuery();
  const dispatch = useDispatch();
  const {
    isLoading: getPostloading,
    error: getPostError,
    data: getPostData,
  } = useGetPostsQuery();
  const [unfriend, {}] = useUnfriendMutation();
  const [updateUser, {}] = useUpdateUserMutation();
  const router = useRouter();

  // Handle file selection
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
    enqueueSnackbar("Image uploaded successfully", { variant: "success" });
    const response = await updateUser(formData);
    setProfileImage(response.data.file); // Update the profile picture
  };

  const handleUnfriend = async (id, user_id) => {
    const response = await unfriend({ receiver: user_id });
    enqueueSnackbar("Unfriend successully", { variant: "success" });
    dispatch(
      baseApi.util.updateQueryData("getFriends", undefined, (draft) => {
        const index = draft.friend.findIndex((v) => v.id === id);
        if (index !== -1) {
          draft.friend.splice(index, 1); // Remove the object at the found index
        }
      })
    );
  };

  return (
    <MainWrapper>
      <div className="flex min-h-screen bg-gray-100">
        <div className="w-full flex-1 p-4 pb-20 md:pb-4">
          {/* Rest of the content remains the same */}
          {/* Profile Section */}
          <div className="bg-white rounded-lg p-6 mb-8 shadow-md flex items-center justify-between container">
            <div className="flex items-center">
              {/* Profile Picture and Name */}
              <div className="flex flex-col items-center gap-2">
                {/* Hidden file input */}
                <input
                  type="file"
                  id="profile-image-upload"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />

                {/* Clickable profile picture */}
                <label
                  htmlFor="profile-image-upload"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={profileImage || "user.png"} // Use uploaded image or default
                    alt="Profile"
                    className="w-20 h-20 bg-gray-200 rounded-full object-cover"
                  />
                </label>

                {/* User name */}
                <h1 className="text-[20px] font-semibold text-[#161499]">
                  {auth?.user?.user_profile?.name}
                </h1>
              </div>

              {/* Total Friends and Posts */}
              <div className="flex  gap-10 ml-20">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[20px] font-extrabold text-[#161499]">
                    {getFriends?.total_friend || 0}
                  </span>

                  <span className="text-[18px] text-[#161499]">Friends</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[20px] font-extrabold text-[#161499]">
                    {getPostData?.count || 0}
                  </span>
                  <span className="text-[18px] text-[#161499]">Posts</span>
                </div>
              </div>
            </div>
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
            {activeTab === "posts" ? (
              <Post getPostData={getPostData} />
            ) : getFriends?.friend ? (
              getFriends.friend.map((friend) => (
                <div
                  key={friend.id}
                  className="bg-white rounded-lg p-4 shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 w-full">
                      <img
                        src={friend.image}
                        alt="Profile"
                        className="w-10 h-10 bg-gray-200 rounded-full object-cover"
                      />
                      <div className="flex items-center justify-between w-full">
                        <div
                          onClick={() =>
                            router.push("/userprofile/" + friend.user_id)
                          }
                          className="font-semibold text-black hover:underline cursor-pointer"
                        >
                          {friend.name}
                        </div>
                        <button
                          onClick={() =>
                            handleUnfriend(friend.id, friend.user_id)
                          }
                          style={{ background: "#FF4D85" }}
                          className="text-white rounded text-center px-2"
                        >
                          Unfriend
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg p-4 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 w-full">
                    <div className="font-semibold text-black">
                      Make some friends
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainWrapper>
  );
};

export default SocialMediaPage;
