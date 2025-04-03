import { create } from "zustand";

import { login, checkAuth, logout, register } from "@/services/authServices";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  registerUser: async (
    username,
    first_name,
    last_name,
    email,
    phone_number,
    password
  ) => {
    set({ error: null });
    try {
      const response = await register(
        username,
        first_name,
        last_name,
        email,
        phone_number,
        password
      );
      return { success: true };
    } catch (err) {
      set({ error: err.response?.data?.message || "Registration Failed!" });
      return { success: false, message: err.response?.data?.message };
    }
  },

  login: async (username, password) => {
    set({ loading: true, error: null });
    try {
      const response = await login(username, password);
      set({ user: response.data.user, isAuthenticated: true });
      return { success: true };
    } catch (err) {
      set({ error: err.response?.data?.message || "Login Failed!" });
      return { success: false, message: err.response?.data?.message };
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
