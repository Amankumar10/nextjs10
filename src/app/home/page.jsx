"use client";

import { useState, useEffect } from "react";
import MainWrapper from "../components/MainWrapper";
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

const HomePage = () => {
  return (
    <>
      <MainWrapper home={true}>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border border-gray-300 shadow-md p-5 rounded-xl">
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/40"
                alt="User"
                className="w-12 h-12 rounded-full border border-gray-300"
              />
              <input
                type="text"
                placeholder="What's on your mind minsara?"
                className="bg-gray-100 flex-1 px-4 py-3 rounded-lg outline-none border border-gray-300  text-black"
              />
            </div>

            <hr className="my-4 border-gray-300" />

            <div className="flex justify-start gap-x-10 mt-3">
              <button className="flex items-center gap-3 text-blue-600 hover:text-blue-700 transition">
                <FaCamera className="text-xl" />
                <span className="font-medium">Photo/Video</span>
              </button>
              <button className="flex items-center gap-3 text-yellow-600 hover:text-yellow-700 transition">
                <FaSmile className="text-xl" />
                <span className="font-medium">Feeling/Activity</span>
              </button>
            </div>
          </div>
          <div className="mt-6 space-y-6 flex justify-center">
            <div className="w-full">
              {[1].map((post) => (
                <div
                  key={post}
                  className="bg-white border border-gray-300 shadow-md p-6 rounded-xl"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={`https://i.pravatar.cc/80?img=${post}`}
                      alt="User"
                      className="w-12 h-12 rounded-full border border-gray-300"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">John Doe</h3>
                      <p className="text-sm text-gray-500">5 mins ago</p>
                    </div>
                  </div>

                  <p className="text-gray-800 mb-4">It's Coming ❄️</p>

                  <img
                    src={`https://picsum.photos/600/400?random=${post}`}
                    alt="Post"
                    className="w-full h-64 object-cover rounded-lg"
                  />

                  <div className="flex justify-between items-center mt-5 text-gray-600">
                    {[
                      {
                        icon: <FaThumbsUp />,
                        text: "22k",
                        color: "hover:text-blue-500",
                      },

                      {
                        icon: <FaShare />,
                        text: "124",
                        color: "hover:text-green-500",
                      },
                    ].map((btn, index) => (
                      <button
                        key={index}
                        className={`flex items-center gap-2 flex-1 justify-center transition ${btn.color}`}
                      >
                        <span className="text-lg">{btn.icon}</span>
                        <span className="font-medium">{btn.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MainWrapper>
    </>
  );
};

export default HomePage;
