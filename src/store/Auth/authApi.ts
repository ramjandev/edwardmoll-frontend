import { baseAPI } from "../BaseApi/baseAPI";
import type {
  LoginResponse,
  RegisterUserRequest,
  UserProfileResponse,
  VerifyOtpResponse,
} from "./types/authTypes";

export const authAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, { email: string; password: string }>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    registerUser: build.mutation<void, RegisterUserRequest>({
      query: (data) => ({
        url: `/auth/register`,
        method: "POST",
        body: data,
      }),
    }),
    //password
    forgotPassword: build.mutation<void, { email: string }>({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    refreshToken: build.mutation<void, { refreshToken: string }>({
      query: (data) => ({
        url: "/auth/refresh",
        method: "POST",
        body: data,
      }),
    }),
    verify: build.mutation<VerifyOtpResponse, { email: string; code: string }>({
      query: (data) => ({
        url: "/auth/verify-reset-code",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: build.mutation<void, { token: string; newPassword: string }>(
      {
        query: (data) => ({
          url: "/auth/reset-password",
          method: "POST",
          body: data,
        }),
      },
    ),
    changePassword: build.mutation<
      void,
      { oldPassword: string; newPassword: string }
    >({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
    getMe: build.query<UserProfileResponse, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterUserMutation,
  useForgotPasswordMutation,
  useRefreshTokenMutation,
  useVerifyMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useGetMeQuery,
} = authAPI;
