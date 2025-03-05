import { baseApi } from "../baseApi";

export const searchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSearchUsers: builder.query({
      query: (search) => "/search/users?q=" + search,
    }),
    getSearchPosts: builder.query({
      query: () => `/search/posts`,
    }),
  }),
});

export const { useLazyGetSearchUsersQuery } = searchApi;
