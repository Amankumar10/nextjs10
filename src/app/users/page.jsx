"use client";
import React, { useEffect, useState } from "react";
import { UserCircle } from "lucide-react";
import MainWrapper from "../components/MainWrapper";
import {
  useAddRejectFriendMutation,
  useAllUserInfoWithFriendStatusQuery,
  useCancelFriendRequestMutation,
  useSendFriendRequestMutation,
} from "../rtkQuery/api/endpoints/friendsApi";
import { useDispatch } from "react-redux";
import { baseApi } from "../rtkQuery/api/baseApi";
import { usePathname, useRouter } from "next/navigation";

const FriendRequestsPage = () => {
  const {
    isLoading,
    error,
    data: userData,
    refetch,
  } = useAllUserInfoWithFriendStatusQuery();
  const [addRejectFriend, {}] = useAddRejectFriendMutation();
  const [sendFriendRequest, {}] = useSendFriendRequestMutation();
  const [cancelFriendRequest, {}] = useCancelFriendRequestMutation();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  // Refetch data only if the URL matches a specific path
  useEffect(() => {
    if (pathname === "/") {
      refetch();
    }
  }, [pathname]); // Trigger when the pathname changes
  const handleAddRejectFriend = async ({ sender, action }) => {
    const response = await addRejectFriend({ sender, action });
    dispatch(
      baseApi.util.updateQueryData(
        "allUserInfoWithFriendStatus",
        undefined,
        (draft) => {
          const index = draft.findIndex((v) => v.id === sender);
          if (index !== -1) {
            draft.splice(index, 1); // Remove the object at the found index
          }
        }
      )
    );
  };

  const handleSendRequest = async (receiver) => {
    const response = await sendFriendRequest({ receiver });
    dispatch(
      baseApi.util.updateQueryData(
        "allUserInfoWithFriendStatus",
        undefined,
        (draft) => {
          const index = draft.findIndex((v) => v.id === receiver);
          if (index !== -1) {
            draft[index].friend_status = "Pending";
          }
        }
      )
    );
  };

  const handleCancelRequest = async (receiver) => {
    const response = await cancelFriendRequest({ receiver });
    dispatch(
      baseApi.util.updateQueryData(
        "allUserInfoWithFriendStatus",
        undefined,
        (draft) => {
          const index = draft.findIndex((v) => v.id === receiver);
          if (index !== -1) {
            draft[index].friend_status = "Friend Request Not Sent";
          }
        }
      )
    );
  };

  return (
    <MainWrapper>
      <section className="px-4 md:mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-black mt-7">
          Friend Request
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userData
            ?.filter((user) => user.friend_status === "Friend Request Received")
            .map((user) => (
              <div
                key={user.id}
                className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center"
              >
                <img className="w-16 h-16" src={user.image} />
                <p
                  onClick={() => router.push("/userprofile/" + user.id)}
                  className="my-2 text-black hover:underline cursor-pointer"
                >
                  {user.ProfileName}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      handleAddRejectFriend({
                        sender: user.id,
                        action: "accept",
                      })
                    }
                    className="px-3 py-1 bg-green-100 text-green-700 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      handleAddRejectFriend({
                        sender: user.id,
                        action: "reject",
                      })
                    }
                    className="px-3 py-1 bg-red-100 text-red-700 rounded"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>

      <section className="px-4">
        <h2 className="text-2xl font-semibold mb-4 text-black">
          People you may know
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {userData
            ?.filter(
              (user) =>
                user.friend_status == "Friend Request Not Sent" ||
                user.friend_status == "Pending"
            )
            .map((user, i) => (
              <div
                key={user.id}
                className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center"
              >
                <img className="w-16 h-16" src={user.image} />

                <p
                  onClick={() => router.push("/userprofile/" + user.id)}
                  className="my-2 text-black hover:underline cursor-pointer"
                >
                  {user.ProfileName}
                </p>
                <button
                  onClick={() =>
                    user.friend_status == "Pending"
                      ? handleCancelRequest(user.id)
                      : handleSendRequest(user.id)
                  }
                  className={`px-3 py-1 rounded w-full text-center bg-purple-100 text-purple-700`}
                >
                  {user.friend_status == "Pending" ? "Cancel" : "Add Friend"}
                </button>
              </div>
            ))}
        </div>
      </section>
    </MainWrapper>
  );
};

export default FriendRequestsPage;
