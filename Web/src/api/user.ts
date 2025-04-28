import { baseApi } from "@/api";
import { AuthResponse, LoginRequest } from "@/types";
import { RegisterRequest } from "@/types";
// Hàm gọi API đăng nhập
export const loginUser = async (
  data: LoginRequest
): Promise<AuthResponse | null> => {
  try {
    const response = await baseApi.post<AuthResponse, LoginRequest>(
      "/api/auth/login",
      data
    );

    if (response.status !== 200) {
      console.error("Lỗi khi đăng nhập:", response.data.message);
      return null;
    }

    return response.data; // Trả về accessToken và role
  } catch (error) {
    console.error("Lỗi khi gọi API đăng nhập", error);
    return null;
  }
};
export const registerUser = async (
  data: RegisterRequest
): Promise<AuthResponse | null> => {
  try {
    const response = await baseApi.post<AuthResponse, RegisterRequest>(
      "/api/auth/register",
      data
    );

    // Kiểm tra nếu status không phải 201
    if (response.status !== 201) {
      console.error("Lỗi khi đăng ký:", response.data.message);
      return null;
    }

    return response.data; // Trả về accessToken và role (nếu cần)
  } catch (error) {
    console.error("Lỗi khi gọi API đăng ký", error);
    return null;
  }
};
