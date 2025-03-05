"use client";

import { Bell } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  useGetNotificationsQuery,
  useMarkAllReadMutation,
  useMarkReadMutation,
} from "../rtkQuery/api/endpoints/notificationApi";
import { formatDistanceToNow } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { baseApi } from "../rtkQuery/api/baseApi";
const Notifications = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { data: getNotifications } = useGetNotificationsQuery();
  const [markAllRead, {}] = useMarkAllReadMutation();
  const [markRead, {}] = useMarkReadMutation();
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

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

  useEffect(() => {
    // Replace 'ws://your-django-backend/ws/notifications/' with your WebSocket URL
    const socket = new WebSocket(
      "ws://127.0.0.1:8000/notification/?token=" + token
    );

    socket.onopen = () => {
      console.log("WebSocket connection established.");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      dispatch(
        baseApi.util.updateQueryData("getNotifications", undefined, (draft) => {
          draft.notifications.unshift({
            ...data,
            image:
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/media/` + data.image,
          }); // Add new post to the start
          draft.unread_count += 1;
        })
      );
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleMarkReadNotifications = async () => {
    const response = await markAllRead().unwrap();
    dispatch(
      baseApi.util.updateQueryData("getNotifications", undefined, (draft) => {
        draft.unread_count = 0;
        draft.notifications.forEach((v) => {
          v.read = true;
        });
      })
    );
  };

  const handleMarkRead = async (id) => {
    const response = await markRead({ id }).unwrap();
    dispatch(
      baseApi.util.updateQueryData("getNotifications", undefined, (draft) => {
        draft.notifications.forEach((v) => {
          if (v.id === id && !v.read) {
            v.read = true;
          }
        });
        draft.unread_count -= 1;
      })
    );
  };
  return (
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
            {getNotifications?.unread_count || 0}
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
              <span
                onClick={handleMarkReadNotifications}
                className="text-sm text-blue-600 cursor-pointer hover:text-blue-800"
              >
                Mark all as read
              </span>
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {getNotifications?.notifications?.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleMarkRead(notification.id)}
                className={`p-4 hover:bg-gray-50 transition cursor-pointer ${
                  !notification.read ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <img
                    src={
                      notification.image ||
                      "https://avatar.iran.liara.run/public/38"
                    }
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-semibold">
                        {notification.user_name}
                      </span>{" "}
                      {notification.title}
                    </p>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(notification.created_at), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* <div className="p-4 border-t border-gray-200">
            <button className="w-full text-center text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All Notifications
            </button>
          </div> */}
        </div>
      )}

      <img
        src={user?.user_profile?.file || "https://i.pravatar.cc/40"}
        alt="Profile"
        className="w-10 h-10 rounded-full border border-gray-300"
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
  );
};
export default Notifications;
