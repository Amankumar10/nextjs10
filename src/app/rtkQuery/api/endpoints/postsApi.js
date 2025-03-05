import { baseApi } from "../baseApi";

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({
        url: "/post/create/",
        method: "POST",
        body: data,
      }),
    }),
    getPosts: builder.query({
      query: () => `/post`,
    }),
    getUserPosts: builder.query({
      query: (userId) => `/post/user/?user_id=` + userId,
    }),
    getComments: builder.query({
      query: (postId) => `/post/comment/post_id/${postId}`,
    }),
    createComment: builder.mutation({
      query: ({ post_id, data }) => ({
        url: `/post/comment/post_id/${post_id}/`,
        method: "POST",
        body: data,
      }),
    }),
    postLike: builder.mutation({
      query: ({ post_id }) => ({
        url: `/post/like/${post_id}/`,
        method: "POST",
        body: {},
      }),
    }),
    postShare: builder.mutation({
      query: ({ post_id }) => ({
        url: `/post/share/${post_id}/`,
        method: "POST",
        body: {},
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useGetCommentsQuery,
  useCreateCommentMutation,
  usePostLikeMutation,
  usePostShareMutation,
  useGetUserPostsQuery,
} = postApi;
