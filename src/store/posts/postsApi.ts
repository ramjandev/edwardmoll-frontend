import { baseAPI } from "../BaseApi/baseAPI";

export interface Comment {
  id: string;
  postId: string;
  parentId?: string | null;
  author: string;
  content: string;
  createdAt: string;
  replies?: Comment[];
}

export interface Post {
  id: string;
  _id?: string;
  title: string;
  slug: string;
  content: string;
  coverImage?: string;
  likesCount?: number;
  comments?: Comment[];
  isPublished?: boolean;
  publishedAt?: string;
  status?: "Draft" | "Published";
  createdAt: string;
}

export const postsApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<Post[], void>({
      query: () => ({
        url: "/posts",
        method: "GET",
      }),
      providesTags: ["Post" as any],
    }),
    getPostBySlug: build.query<Post, string>({
      query: (slug) => ({
        url: `/posts/${slug}`,
        method: "GET",
      }),
      providesTags: (_result, _error, slug) => [{ type: "Post" as any, id: slug }],
    }),
    getAllPosts: build.query<Post[], void>({
      query: () => ({
        url: "/posts/admin/all",
        method: "GET",
      }),
      providesTags: ["Post" as any],
    }),
    createPost: build.mutation<Post, Partial<Post>>({
      query: (data) => ({
        url: "/posts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post" as any],
    }),
    updatePost: build.mutation<Post, { id: string; data: Partial<Post> }>({
      query: ({ id, data }) => ({
        url: `/posts/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Post" as any],
    }),
    deletePost: build.mutation<void, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post" as any],
    }),
    likePost: build.mutation<{ id: string; likesCount: number }, { id: string; action?: "like" | "unlike" }>({
      query: ({ id, action = "like" }) => ({
        url: `/posts/${id}/like`,
        method: "POST",
        body: { action },
      }),
      invalidatesTags: ["Post" as any],
    }),
    addComment: build.mutation<Comment, { postId: string; author: string; content: string; parentId?: string }>({
      query: ({ postId, ...body }) => ({
        url: `/posts/${postId}/comments`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Post" as any],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostBySlugQuery,
  useGetAllPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useAddCommentMutation,
} = postsApi;
