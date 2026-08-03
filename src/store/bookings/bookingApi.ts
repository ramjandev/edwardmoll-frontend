import { baseAPI } from "../BaseApi/baseAPI";

export interface CreateBookingPayload {
  quoteId: string;
  movingDate: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  fcmToken?: string;
}

export interface BookingResponse {
  bookingId: string;
  depositAmount: number;
  balanceAmount: number;
  totalAmount: number;
  status: string;
  requestedDate: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

export interface BookingLogItem {
  id: string;
  status: string;
  requestedDate: string;
  depositAmount: string;
  balanceAmount: string;
  totalAmount: string;
  jobberJobId: string | null;
  stripePaymentMethodId: string | null;
  createdAt: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    jobberCustomerId: string | null;
    addressLine1?: string;
    city?: string;
    state?: string;
    zip?: string;
  };
  quote: {
    estimatedTotal: string;
    houseSize: string;
    stairs: number;
    distance: string;
    heavyItems: string[];
    rawInputs?: any;
  };
  payments: Array<{
    id: string;
    type: string;
    status: string;
    amount: string;
    stripePaymentIntentId: string;
    paidAt: string | null;
  }>;
}

import type { ApiResponse } from "../quotes/quoteApi";

export const bookingAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createBooking: build.mutation<BookingResponse, CreateBookingPayload>({
      query: (data) => ({
        url: "/bookings",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: ApiResponse<BookingResponse>) => response.data,
    }),
    getBookings: build.query<BookingLogItem[], void>({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<BookingLogItem[]>) => response.data,
      providesTags: ["Job"], // Reuses Job tag to force list refresh on update
    }),
    mockPaySuccess: build.mutation<{ message: string; booking: any }, string>({
      query: (id) => ({
        url: `/bookings/${id}/mock-pay-success`,
        method: "POST",
      }),
      transformResponse: (response: ApiResponse<{ message: string; booking: any }>) => response.data,
      invalidatesTags: ["Job"],
    }),
    simulateJobComplete: build.mutation<{ processed: boolean; result?: any }, string>({
      query: (jobberJobId) => ({
        url: "/bookings/jobber-webhook",
        method: "POST",
        body: {
          topic: "JOB_COMPLETED",
          resourceId: jobberJobId,
        },
      }),
      transformResponse: (response: ApiResponse<{ processed: boolean; result?: any }>) => response.data,
      invalidatesTags: ["Job"],
    }),
    completeOffline: build.mutation<{ message: string; booking: any }, string>({
      query: (id) => ({
        url: `/bookings/${id}/complete-offline`,
        method: "POST",
      }),
      transformResponse: (response: ApiResponse<{ message: string; booking: any }>) => response.data,
      invalidatesTags: ["Job"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingsQuery,
  useMockPaySuccessMutation,
  useSimulateJobCompleteMutation,
  useCompleteOfflineMutation,
} = bookingAPI;
