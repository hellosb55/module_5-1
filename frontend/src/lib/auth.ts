import { User, RegisterRequest, LoginRequest, AuthResponse } from '@/types/auth';

const TOKEN_KEY = 'auth_token';

// Token management functions
export function saveToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
}

export function removeToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
  }
}

// API helper function with authorization header
async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Handle 401 errors by removing token
  if (response.status === 401) {
    removeToken();
  }

  return response;
}

// Register a new user
export async function register(data: RegisterRequest): Promise<User> {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Registration failed');
  }

  return response.json();
}

// Login user and get access token
export async function login(data: LoginRequest): Promise<AuthResponse> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Login failed');
  }

  return response.json();
}

// Get current authenticated user
export async function getCurrentUser(): Promise<User> {
  const response = await fetchWithAuth('/api/auth/me');

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to get user');
  }

  return response.json();
}

// Logout user by removing token
export function logout(): void {
  removeToken();
}
