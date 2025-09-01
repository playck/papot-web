export interface User {
  id: string;
  userName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: Omit<User, "password">;
  token?: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string>;
}
