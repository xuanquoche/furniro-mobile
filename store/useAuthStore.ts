import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  access_token: string | null;
  refresh_token: string | null;
  addUser: (data: {
    access_token: string;
    refresh_token: string;
    user: User;
  }) => void;
  deleteUser: () => void;
  updateTokens: (tokens: {
    access_token: string;
    refresh_token: string;
  }) => void;
  addToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  access_token: null,
  refresh_token: null,

  addToken: (token: string) => set({ access_token: token }),

  addUser: ({ access_token, refresh_token, user }) =>
    set({
      user,
      access_token: access_token,
      refresh_token: refresh_token,
    }),

  deleteUser: () =>
    set({
      user: null,
      access_token: null,
      refresh_token: null,
    }),

  updateTokens: ({ access_token, refresh_token }) =>
    set((state) => ({
      ...state,
      accessToken: access_token,
      refresh_token: refresh_token,
    })),
}));
