import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/account/login/",
        method: "POST",
        body: credentials,
      }),
    }),
    verifyEmail: builder.query({
      query: (token) => `/account/verify-email/${token}/`,
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/account/register/",
        method: "POST",
        body: userData,
      }),
    }),
    getUser: builder.query({
      query: () => `/account/profile/`,
    }),
    updateUser: builder.mutation({
      query: (userData) => ({
        url: "/account/profile/",
        method: "PATCH",
        body: userData,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/account/change-password/",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/account/reset-password/",
        method: "POST",
        body: data,
      }),
    }),
    resetConfirmPassword: builder.mutation({
      query: (data) => ({
        url: "/account/reset-password-confirm/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetUserQuery,
  useLazyGetUserQuery,
  useUpdateUserMutation,
  useChangePasswordMutation,
  useLazyVerifyEmailQuery,
  useForgotPasswordMutation,
  useResetConfirmPasswordMutation,
} = authApi;
