import { baseAPI } from "../BaseApi/baseAPI";
import type {
  CreateJobPayload,
  CreateJobResponse,
  GetJobByIdResponse,
  GetJobsParams,
  GetJobsResponse,
  UpdateJobPayload,
  UpdateJobResponse,
  UpdateJobStatusPayload,
  UpdateJobStatusResponse,
} from "./types/jobTypes";

export const jobAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createJob: build.mutation<CreateJobResponse, CreateJobPayload>({
      query: (data) => ({
        url: `/job`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Job"],
    }),

    getJobs: build.query<GetJobsResponse, GetJobsParams>({
      query: (params) => ({
        url: `/job`,
        method: "GET",
        params,
      }),
      providesTags: ["Job"],
    }),

    getJobById: build.query<GetJobByIdResponse, string>({
      query: (id) => ({
        url: `/job/${id}`,
        method: "GET",
      }),
      providesTags: ["Job"],
    }),

    updateJob: build.mutation<
      UpdateJobResponse,
      { id: string; data: UpdateJobPayload }
    >({
      query: ({ id, data }) => ({
        url: `/job/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Job"],
    }),

    deleteJob: build.mutation<void, string>({
      query: (id) => ({
        url: `/job/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Job"],
    }),

    updateJobStatus: build.mutation<
      UpdateJobStatusResponse,
      { id: string; data: UpdateJobStatusPayload }
    >({
      query: ({ id, data }) => ({
        url: `/job/${id}/status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Job"],
    }),
  }),
});

export const {
  useCreateJobMutation,
  useGetJobsQuery,
  useGetJobByIdQuery,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useUpdateJobStatusMutation,
} = jobAPI;
