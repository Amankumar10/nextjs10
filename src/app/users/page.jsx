"use client";
import React, { useState } from "react";
import { UserCircle } from "lucide-react";
import MainWrapper from "../components/MainWrapper";

const FriendRequestsPage = () => {
  return (
    <MainWrapper>
      <section className="px-4 md:mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-black mt-7">
          Friend Request
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center"
            >
              <UserCircle className="w-16 h-16 text-teal-500" />
              <p className="my-2 text-black">Raj</p>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-green-100 text-green-700 rounded">
                  Accept
                </button>
                <button className="px-3 py-1 bg-red-100 text-red-700 rounded">
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
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center"
            >
              <UserCircle className="w-16 h-16 text-teal-500" />
              <p className="my-2 text-black">Raj</p>
              <button
                className={`px-3 py-1 rounded w-full text-center ${
                  i === 4
                    ? "bg-green-100 text-green-700"
                    : i === 2 || i === 8
                    ? "bg-gray-200 text-gray-700"
                    : "bg-purple-100 text-purple-700"
                }`}
              >
                {i === 4
                  ? "Friend"
                  : i === 2 || i === 8
                  ? "Cancel"
                  : "Add Friend"}
              </button>
            </div>
          ))}
        </div>
      </section>
    </MainWrapper>
  );
};

export default FriendRequestsPage;
