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
  /** Jobber Client Hub link for the deposit invoice. */
  paymentUrl: string | null;
  /** Set when the Jobber invoice could not be raised at booking time. */
  invoiceError: string | null;
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
  depositInvoiceId: string | null;
  depositInvoiceUrl: string | null;
  balanceInvoiceId: string | null;
  balanceInvoiceUrl: string | null;
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
    method: string;
    amount: string;
    jobberInvoiceId: string | null;
    jobberInvoiceNumber: string | null;
    clientHubUri: string | null;
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
      transformResponse: (response: ApiResponse<BookingResponse>) =>
        response.data,
    }),
    getBookings: build.query<BookingLogItem[], void>({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<BookingLogItem[]>) =>
        response.data,
      providesTags: ["Job"], // Reuses Job tag to force list refresh on update
    }),
    simulateDepositPaid: build.mutation<any, string>({
      query: (id) => ({
        url: `/bookings/${id}/simulate-deposit-paid`,
        method: "POST",
      }),
      transformResponse: (response: ApiResponse<any>) => response.data,
      invalidatesTags: ["Job"],
    }),
    simulateJobComplete: build.mutation<any, string>({
      query: (jobberJobId) => ({
        url: "/bookings/jobber-webhook",
        method: "POST",
        body: {
          topic: "JOB_CLOSED",
          resourceId: jobberJobId,
        },
      }),
      transformResponse: (response: ApiResponse<any>) => response.data,
      invalidatesTags: ["Job"],
    }),
    completeOffline: build.mutation<{ message: string; booking: any }, string>({
      query: (id) => ({
        url: `/bookings/${id}/complete-offline`,
        method: "POST",
      }),
      transformResponse: (
        response: ApiResponse<{ message: string; booking: any }>,
      ) => response.data,
      invalidatesTags: ["Job"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingsQuery,
  useSimulateDepositPaidMutation,
  useSimulateJobCompleteMutation,
  useCompleteOfflineMutation,
} = bookingAPI;
