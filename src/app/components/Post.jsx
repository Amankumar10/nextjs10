"use client";
import React, { useRef, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { FaThumbsUp, FaShare, FaComment } from "react-icons/fa";
import { CommentSection } from "./CommentSection";
import {
  useCreateCommentMutation,
  usePostLikeMutation,
  usePostShareMutation,
} from "../rtkQuery/api/endpoints/postsApi";
import { useDispatch, useSelector } from "react-redux";
import { baseApi } from "../rtkQuery/api/baseApi";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export const Post = ({ getPostData }) => {
  const { id } = useParams();
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  const [createComment, {}] = useCreateCommentMutation();
  const [postLike, {}] = usePostLikeMutation();
  const [postShare, {}] = usePostShareMutation();

  const dispatch = useDispatch();
  const [newComments, setNewComments] = useState({});
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);

  const handleCommentChange = (postId, value) => {
    setNewComments((prev) => ({
      ...prev,
      [postId]: value, // Store comment for each post by ID
    }));
  };

  const handleAddComment = async (postId) => {
    if (newComments[postId.id].trim() === "") return;

    const comment = {
      content: newComments[postId.id],
      post_id: postId.id,
      user_id: auth.user.user_profile.id,
    };

    const response = await createComment({
      post_id: postId.id,
      data: comment,
    }).unwrap();
    // Add API call or logic here
    setNewComments((prev) => ({
      ...prev,
      [postId.id]: "", // Clear only the input for this post
    }));
    dispatch(
      baseApi.util.updateQueryData("getPosts", undefined, (draft) => {
        draft.results.forEach((v) => {
          if (v.id === postId.id) {
            v.last_comment = response; // ✅ Modify the object directly
            v.analytics.comments += 1; // ✅ Modify the object directly
          }
        });
      })
    );
    dispatch(
      baseApi.util.updateQueryData("getUserPosts", id, (draft) => {
        draft.results.forEach((v) => {
          if (v.id === postId.id) {
            v.last_comment = response; // ✅ Modify the object directly
            v.analytics.comments += 1; // ✅ Modify the object directly
          }
        });
      })
    );
  };

  const handleLike = async (postId) => {
    const response = await postLike({
      post_id: postId,
    });
    if (response.data.status === 201) {
      dispatch(
        baseApi.util.updateQueryData("getPosts", undefined, (draft) => {
          draft.results.forEach((v) => {
            if (v.id === postId) {
              v.analytics.likes += 1; // ✅ Modify the object directly
            }
          });
        })
      );
      dispatch(
        baseApi.util.updateQueryData("getUserPosts", id, (draft) => {
          draft.results.forEach((v) => {
            if (v.id === postId) {
              v.analytics.likes += 1; // ✅ Modify the object directly
            }
          });
        })
      );
    } else {
      dispatch(
        baseApi.util.updateQueryData("getUserPosts", id, (draft) => {
          draft.results.forEach((v) => {
            if (v.id === postId) {
              v.analytics.likes -= 1; // ✅ Modify the object directly
            }
          });
        })
      );
      dispatch(
        baseApi.util.updateQueryData("getPosts", undefined, (draft) => {
          draft.results.forEach((v) => {
            if (v.id === postId) {
              v.analytics.likes -= 1; // ✅ Modify the object directly
            }
          });
        })
      );
    }
  };

  const handlePostShare = async (postId) => {
    dispatch(
      baseApi.util.updateQueryData("getPosts", undefined, (draft) => {
        draft.results.forEach((v) => {
          if (v.id === postId) {
            v.analytics.shares += 1; // ✅ Modify the object directly
          }
        });
      })
    );
    dispatch(
      baseApi.util.updateQueryData("getUserPosts", id, (draft) => {
        draft.results.forEach((v) => {
          if (v.id === postId) {
            v.analytics.shares += 1; // ✅ Modify the object directly
          }
        });
      })
    );
    const response = await postShare({
      post_id: postId,
    });
  };
  return (
    <>
      {getPostData?.results?.map((post) => (
        <div
          key={post.id}
          className="bg-white border border-gray-300 shadow-md p-3 sm:p-4 rounded-xl"
        >
          {/* Post Header */}
          <div className="flex items-center gap-2 sm:gap-3 mb-3">
            <img
              src={post.created_by_image}
              alt="User"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-300"
            />
            <div>
              <h3
                onClick={() => router.push("/userprofile/" + post.user_id)}
                className="font-semibold text-gray-900 text-sm sm:text-base cursor-pointer hover:underline"
              >
                {post.created_by_name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                {formatDistanceToNow(new Date(post.timestamp), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>

          {/* Post Content */}
          <p className="text-gray-800 mb-3 text-sm sm:text-base">
            {post.content}
          </p>
          {post.image && (
            <img
              src={post.image}
              alt="Post"
              className="w-full h-48 sm:h-64 object-cover rounded-lg"
            />
          )}

          {/* Post Actions */}
          <hr />
          <div className="flex justify-between items-center mt-3 sm:mt-4 text-gray-600">
            {[
              {
                icon: "👍",
                text: post.analytics.likes,
                color: "hover:text-blue-500",
                onClick: handleLike,
              },
              {
                icon: "💬",
                text: post.analytics.comments,
                color: "hover:text-green-500",
                onClick: (id) => id,
              },
              {
                icon: <FaShare />,
                text: post.analytics.shares,
                color: "hover:text-green-500",
                onClick: handlePostShare,
              },
            ].map((btn, index) => (
              <button
                key={index}
                onClick={() => btn.onClick(post.id)}
                className={`flex items-center gap-1 flex-1 justify-center transition ${btn.color} text-sm sm:text-base`}
              >
                <span className="text-base sm:text-lg">{btn.icon}</span>
                <span className="font-medium">{btn.text}</span>
              </button>
            ))}
          </div>

          {/* Comment Section */}
          <div className="mt-4">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              {/* <img
                src="https://i.pravatar.cc/30"
                alt="Commenter"
                className="w-8 h-8 rounded-full border border-gray-300"
              /> */}
              <div className="flex-1 w-full sm:w-auto">
                <input
                  type="text"
                  value={newComments[post.id] ?? ""} // Use empty string as fallback
                  placeholder="Write a comment..."
                  className="bg-gray-100 w-full px-3 py-2 rounded-lg outline-none border border-gray-300 text-black text-sm"
                  onChange={(e) => handleCommentChange(post.id, e.target.value)}
                />
              </div>
              <button
                onClick={() => handleAddComment(post)}
                className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition text-sm w-full sm:w-auto"
              >
                Comment
              </button>
            </div>

            {/* Comments List */}
            <div className="mt-4 space-y-3">
              {Object.keys(post?.last_comment).length > 0 && (
                <div
                  key={post.last_comment.id}
                  className="flex items-start gap-2"
                  onClick={() => setActiveCommentPostId(post.id)}
                >
                  <img
                    src={post.last_comment.user_image || ""}
                    alt="Commenter"
                    className="w-8 h-8 rounded-full border border-gray-300"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <h4 className="font-semibold text-xs sm:text-sm text-black">
                        {post.last_comment.user_name}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-800 break-words">
                        {post.last_comment.content}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      {activeCommentPostId && (
        <CommentSection
          postId={activeCommentPostId}
          onClose={() => setActiveCommentPostId(null)}
        />
      )}
    </>
  );
};
