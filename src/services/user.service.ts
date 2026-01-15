import { getApi, putApi } from "./axios.service";

export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

export type UserProfile = {
  id: number;
  address: string;
  tokenBalance: number;
  mbusdBalance: number;
  referralCode: string;
  firstName: string;
  lastName: string;
  username: string;
  intro: string;
};

export type UpdateUserProfilePayload = {
  firstName?: string;
  lastName?: string;
  username?: string;
  intro?: string;
};

const USERS_BASE = "/api/v1/users";

const unwrapResponse = <T,>(response: ApiResponse<T>): T => {
  if (!response?.success) {
    throw new Error(response?.message || "Request failed");
  }
  if (response.data === undefined) {
    throw new Error("Missing response data");
  }
  return response.data;
};

export const getCurrentUser = async (): Promise<UserProfile> => {
  const response = await getApi(`${USERS_BASE}/me`);
  return unwrapResponse<UserProfile>(response);
};

export const updateUserProfile = async (
  payload: UpdateUserProfilePayload
): Promise<UserProfile> => {
  const response = await putApi(`${USERS_BASE}/me`, payload);
  return unwrapResponse<UserProfile>(response);
};

export const checkUsernameExists = async (username: string): Promise<boolean> => {
  const response = await getApi(
    `${USERS_BASE}/exists/username/${encodeURIComponent(username)}`
  );
  const data = unwrapResponse<{ exists: boolean }>(response);
  return data.exists;
};
