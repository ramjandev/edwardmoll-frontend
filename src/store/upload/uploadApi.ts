import { baseAPI } from "../BaseApi/baseAPI";

export const uploadApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    uploadImage: build.mutation<{ url: string }, FormData>({
      query: (data) => ({
        url: "/upload/image",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useUploadImageMutation } = uploadApi;
