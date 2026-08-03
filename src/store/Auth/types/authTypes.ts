export type RegisterUserRequest = {
  email: string;
  password: string;
  name: string;
  phone: string;
};

export interface LoginResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface VerifyOtpResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: VerifyOtpData;
}

export interface VerifyOtpData {
  message: string;
  resetToken: string;
}
// types/api.ts
export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
export interface PaginatedApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta: PaginationMeta;
}

// login user

export interface UserData {
  userId: string;
  email: string;
  name: string;
  role: string;
  status: string;
  googleAuth: boolean;
  language: string | null;
  profileImage: string | null;
  avatar: string | null;
  operationsRole: string | null;
  isVerified: boolean;
  timezone: string | null;
  phone: string | null;
  address: string | null;
  country: string | null;
  tasksRemainderEmail: boolean;
  taskAssignEmail: boolean;
  createAt: string;
  updatedAt: string;
}

export type UserProfileResponse = ApiResponse<UserData>;
