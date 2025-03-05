import { baseApi } from "../baseApi";

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query({
      query: () => `/chat`,
    }),
    getChatById: builder.query({
      query: (id) => `/chat/thread/?thread_id=` + id,
    }),
    createChat: builder.mutation({
      query: (data) => ({
        url: `/chat/create/`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateChatMutation,
  useGetChatsQuery,
  useLazyGetChatByIdQuery,
} = chatApi;
