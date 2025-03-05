"use client";
import { useEffect, useState } from "react";
import MainWrapper from "./components/MainWrapper";
import { FaCamera, FaSmile } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import {
  useCreatePostMutation,
  useGetPostsQuery,
} from "./rtkQuery/api/endpoints/postsApi";
import { baseApi } from "./rtkQuery/api/baseApi";
import { Post } from "./components/Post";

const HomePage = () => {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname(); // Get the current URL path

  const dispatch = useDispatch();
  const [postContent, setPostContent] = useState(""); // State for post text
  const [postImage, setPostImage] = useState(null); // State for uploaded image
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [createPost, { isLoading, isError, error }] = useCreatePostMutation();

  const {
    isLoading: getPostloading,
    error: getPostError,
    data: getPostData,
    refetch,
  } = useGetPostsQuery();
  useEffect(() => {
    document.title = "Home"; // Update the title
  }, []);

  // Refetch data only if the URL matches a specific path
  useEffect(() => {
    if (pathname === "/") {
      refetch();
    }
  }, [pathname]); // Trigger when the pathname changes

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL for the image
    }
  };

  const handleRemoveImage = () => {
    setPostImage(null);
    setImagePreview(null);
  };

  const handlePostSubmit = async () => {
    if (!postContent.trim() && !postImage) return; // Don't submit if both text and image are empty
    try {
      const formData = new FormData();
      formData.append("content", postContent);
      if (postImage) formData.append("image", postImage);
      const response = await createPost(formData).unwrap();
      // Manually update cache to show new post immediately
      dispatch(
        baseApi.util.updateQueryData("getPosts", undefined, (draft) => {
          draft.results.unshift(response.data); // Add new post to the start
        })
      );
    } catch (err) {
      console.error("post failed:", err);
    }
    // Here, you can handle the post submission logic (e.g., send to an API)
    console.log("Post Content:", postContent);
    console.log("Post Image:", postImage);

    // Reset the form after submission
    setPostContent("");
    setPostImage(null);
    setImagePreview(null);
  };

  return (
    <>
      <MainWrapper home={true}>
        <div className="w-full max-w-3xl mx-auto px-2 sm:px-4 lg:px-6 overflow-y-auto">
          {/* Create Post Card */}
          <div className="bg-white border border-gray-300 shadow-md p-2 sm:p-4 rounded-xl">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <img
                src={user?.user_profile?.file || "https://i.pravatar.cc/40"}
                alt="User"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-300"
              />
              <input
                type="text"
                placeholder="What's on your mind minsara?"
                className="bg-gray-100 w-full flex-1 px-2 sm:px-4 py-2 rounded-lg outline-none border border-gray-300 text-black text-sm sm:text-base"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-3 relative">
                <img
                  src={imagePreview}
                  alt="Uploaded"
                  className="w-full h-48 sm:h-64 object-cover rounded-lg"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 hover:bg-gray-100 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}

            <hr className="my-3 border-gray-300" />

            <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-8 mt-2">
              {/* Photo/Video Upload Button */}
              <label className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition text-sm sm:text-base cursor-pointer">
                <FaCamera className="text-lg sm:text-xl" />
                <span className="font-medium">Photo/Video</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>

              {/* Feeling/Activity Button */}
              {/* <button className="flex items-center gap-2 text-yellow-600 hover:text-yellow-700 transition text-sm sm:text-base">
                <FaSmile className="text-lg sm:text-xl" />
                <span className="font-medium">Feeling/Activity</span>
              </button> */}
            </div>

            {/* Post Button */}
            <button
              onClick={handlePostSubmit}
              className="w-full bg-blue-500 text-white py-2 text-sm sm:text-base rounded-lg mt-3 hover:bg-blue-600 transition"
              disabled={!postContent.trim() && !postImage} // Disable if both text and image are empty
            >
              Post
            </button>
          </div>

          {/* Posts Section */}
          <div className="mt-4 sm:mt-6 space-y-10">
            <div className="w-full flex flex-col gap-6">
              <Post getPostData={getPostData} />
            </div>
          </div>
        </div>
      </MainWrapper>
    </>
  );
};

export default HomePage;
