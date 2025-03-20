import { create } from "zustand";

import { login, checkAuth, logout } from "@/services/authServices";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,

  login: async (username, password) => {
    set({ loading: true });
    try {
      const response = await login(username, password);
      set({ user: response.data.user, isAuthenticated: true });
    } catch (err) {
      console.log(err);
    } finally {
      set({ loading: false });
    }
  },

  checkAuth: async () => {
    set({ loading: true });
    try {
      const response = await checkAuth();
      set({
        user: response.data.user,
        isAuthenticated: response.data.authenticated,
      });
    } catch (err) {
      console.log(err);
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await logout();
      set({ user: null, isAuthenticated: false });
    } catch (err) {
      console.log(err);
    }
  },
}));

export default useAuthStore;
