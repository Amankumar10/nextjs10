import { baseApi } from "../baseApi";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => `/notifications/`,
    }),
    markAllRead: builder.mutation({
      query: () => ({
        url: `/notifications/mark-read-all/`,
        method: "POST",
        body: {},
      }),
    }),
    markRead: builder.mutation({
      query: (data) => ({
        url: `/notifications/mark-read/`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkAllReadMutation,
  useMarkReadMutation,
} = notificationApi;
