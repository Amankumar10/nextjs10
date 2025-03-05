"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  useCreateCommentMutation,
  useGetCommentsQuery,
} from "../rtkQuery/api/endpoints/postsApi";
import { useDispatch, useSelector } from "react-redux";
import { baseApi } from "../rtkQuery/api/baseApi";
import { formatDistanceToNow } from "date-fns";

export const CommentSection = ({ postId, onClose }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { data: comments, isLoading, error } = useGetCommentsQuery(postId);
  const [createComment, {}] = useCreateCommentMutation();
  const commentsEndRef = useRef(null);
  const [newComment, setNewComment] = useState("");

  // Scroll to the latest comment when comments update
  useEffect(() => {
    if (commentsEndRef.current) {
      commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments]);

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;
    const comment = {
      content: newComment,
      post_id: postId,
      user_id: auth.user.user_profile.id,
    };

    const response = await createComment({
      post_id: postId,
      data: comment,
    }).unwrap();
    dispatch(
      baseApi.util.updateQueryData("getComments", postId, (draft) => {
        if (draft) {
          draft.push(response); // Add new comment to the cache
        }
      })
    );

    dispatch(
      baseApi.util.updateQueryData("getPosts", undefined, (draft) => {
        draft.results.forEach((v) => {
          if (v.id === postId.id) {
            v.last_comment = response; // ✅ Modify the object directly
          }
        });
      })
    );
    // setComments([...comments, comment]);
    setNewComment("");
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
          {comments?.map((comment, index) => (
            <div
              key={comment.id}
              ref={index === comments.length - 1 ? commentsEndRef : null} // Attach ref to last comment
              className="mb-4 text-black"
            >
              <div className="flex items-center gap-2">
                <img
                  src={comment.user_image}
                  alt={comment.user_image}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-sm font-semibold">{comment.user_name}</p>
                  <p className="text-sm text-gray-600">{comment.content}</p>
                  <p className="text-xs text-gray-400">
                    {formatDistanceToNow(new Date(comment.timestamp), {
                      addSuffix: true,
                    })}
                  </p>
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
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};
