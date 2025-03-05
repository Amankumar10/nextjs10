import { baseApi } from "../baseApi";

export const friendsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allUserInfoWithFriendStatus: builder.query({
      query: () => `/account/AllUserInfoWithFriendStatus/`,
    }),
    userByIdInfoWithFriendStatus: builder.query({
      query: (id) => `/account/UserByIdInfoWithFriendStatus/?id=` + id,
    }),
    getFriends: builder.query({
      query: (search = "") => `/friend/?search=` + search,
    }),
    addRejectFriend: builder.mutation({
      query: (data) => ({
        url: `/friend/accept_or_reject_friendrequest/`,
        method: "POST",
        body: data,
      }),
    }),
    unfriend: builder.mutation({
      query: (data) => ({
        url: `/friend/unfriend/`,
        method: "POST",
        body: data,
      }),
    }),
    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: `/friend/friend-request/`,
        method: "POST",
        body: data,
      }),
    }),
    cancelFriendRequest: builder.mutation({
      query: (data) => ({
        url: `/friend/cancel-friend-request/`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAllUserInfoWithFriendStatusQuery,
  useGetFriendsQuery,
  useAddRejectFriendMutation,
  useUnfriendMutation,
  useSendFriendRequestMutation,
  useUserByIdInfoWithFriendStatusQuery,
  useLazyGetFriendsQuery,
  useCancelFriendRequestMutation,
} = friendsApi;
