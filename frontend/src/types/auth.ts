// User interface representing a user from the backend
export interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
}

// Request payload for user registration
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

// Request payload for user login
export interface LoginRequest {
  email: string;
  password: string;
}

// Response from login endpoint
export interface AuthResponse {
  access_token: string;
  token_type: string;
}
