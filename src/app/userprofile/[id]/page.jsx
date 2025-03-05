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
import MainWrapper from "../../components/MainWrapper";
import { Post } from "../../components/Post";
import { useGetUserPostsQuery } from "../../rtkQuery/api/endpoints/postsApi";
import {
  useGetFriendsQuery,
  useSendFriendRequestMutation,
  useUnfriendMutation,
  useUserByIdInfoWithFriendStatusQuery,
} from "../../rtkQuery/api/endpoints/friendsApi";
import { useDispatch, useSelector } from "react-redux";
import { baseApi } from "../../rtkQuery/api/baseApi";
import { useUpdateUserMutation } from "../../rtkQuery/api/endpoints/accountApi";
import { enqueueSnackbar } from "notistack";
import { useParams, useRouter } from "next/navigation";

const UserProfile = () => {
  const { id } = useParams();
  const auth = useSelector((state) => state.auth);
  const [profileImage, setProfileImage] = useState(
    auth?.user?.user_profile?.file
  ); // Default image
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("posts");
  const dispatch = useDispatch();
  const {
    isLoading: getPostloading,
    error: getPostError,
    data: getPostData,
  } = useGetUserPostsQuery(id);
  const { data: getUserData } = useUserByIdInfoWithFriendStatusQuery(id);
  const [sendFriendRequest, {}] = useSendFriendRequestMutation();

  const [unfriend, {}] = useUnfriendMutation();

  const handleUnfriend = async () => {
    enqueueSnackbar("Unfriend Successfully", {
      variant: "success",
    });
    const response = await unfriend({ receiver: id });
    dispatch(
      baseApi.util.updateQueryData(
        "userByIdInfoWithFriendStatus",
        id,
        (draft) => {
          draft[0].friend_status = "Not friends";
        }
      )
    );
  };
  const handleSendRequest = async () => {
    enqueueSnackbar("Friend Request Sent Succesfully", {
      variant: "success",
    });
    const response = await sendFriendRequest({ receiver: id });
    dispatch(
      baseApi.util.updateQueryData(
        "userByIdInfoWithFriendStatus",
        id,
        (draft) => {
          draft[0].friend_status = "Pending";
        }
      )
    );
  };
  return (
    <MainWrapper>
      <div className="flex min-h-screen bg-gray-100">
        <div className="w-full flex-1 p-4 pb-20 md:pb-4">
          {/* Rest of the content remains the same */}
          {/* Profile Section */}
          <div className="bg-white rounded-lg p-6 mb-8 shadow-md flex flex-col md:flex-row items-center justify-between container">
            {/* Profile Picture and Name */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex flex-col items-center gap-2">
                <img
                  src={(getUserData && getUserData[0].image) || "user.png"}
                  alt="Profile"
                  className="w-20 h-20 bg-gray-200 rounded-full object-cover"
                />
                <h1 className="text-[20px] font-semibold text-[#161499]">
                  {(getUserData && getUserData[0].ProfileName) || ""}
                </h1>
              </div>

              {/* Total Friends and Posts */}
              <div className="flex gap-10 mt-4 md:mt-0 md:ml-20">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[20px] font-extrabold text-[#161499]">
                    {(getUserData && getUserData[0].total_friends) || 0}
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

            {/* Buttons */}
            <div className="mt-4 md:mt-0">
              {id != auth?.user?.user_profile?.id &&
                (getUserData && getUserData[0].friend_status === "Pending" ? (
                  <button className="bg-[#A87DFF] text-white-700 px-6 py-2 rounded-lg text-lg font-medium shadow-inner shadow-black/25">
                    Cancel
                  </button>
                ) : getUserData &&
                  getUserData[0].friend_status === "We Are Friends" ? (
                  <div className="flex flex-col md:flex-row gap-2">
                    <button
                      onClick={() => router.push("/messenger?user=" + id)}
                      className="bg-[#A87DFF] text-white-700 px-6 py-2 rounded-lg text-lg font-medium shadow-inner shadow-black/25"
                    >
                      Message
                    </button>
                    <button
                      onClick={handleUnfriend}
                      className="bg-[#A87DFF] text-white-700 px-6 py-2 rounded-lg text-lg font-medium shadow-inner shadow-black/25"
                    >
                      Unfriend
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleSendRequest}
                    className="bg-[#A87DFF] text-white-700 px-6 py-2 rounded-lg text-lg font-medium shadow-inner shadow-black/25"
                  >
                    Add Friend
                  </button>
                ))}
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
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 container">
            <Post getPostData={getPostData} />
          </div>
        </div>
      </div>
    </MainWrapper>
  );
};

export default UserProfile;
