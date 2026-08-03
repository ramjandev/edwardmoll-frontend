import { baseAPI } from "../BaseApi/baseAPI";
import type { ApiResponse } from "../quotes/quoteApi";

export interface SendNotificationPayload {
  customerId: string;
  bookingId?: string;
  channel: "EMAIL" | "SMS" | "PUSH";
  type: string;
  title?: string;
  body: string;
}

export interface RegisterFcmTokenPayload {
  customerId?: string;
  adminUserId?: string;
  token: string;
}

export const notificationAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    sendNotification: build.mutation<any, SendNotificationPayload>({
      query: (data) => ({
        url: "/notifications/send",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: ApiResponse<any>) => response.data,
    }),
    registerFcmToken: build.mutation<any, RegisterFcmTokenPayload>({
      query: (data) => ({
        url: "/notifications/register-token",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: ApiResponse<any>) => response.data,
    }),
  }),
});

export const { useSendNotificationMutation, useRegisterFcmTokenMutation } = notificationAPI;
