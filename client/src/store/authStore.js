import { create } from "zustand";

import { login, checkAuth, logout, register, updateUser, updatePassword, verifyEmailAddress } from "@/services/authServices";

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
      await register(
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

  updateUserDetails: async (username, first_name, last_name, phone_number, email) => {
    try {
      const response = await updateUser(username, first_name, last_name, phone_number, email);
      set({
        user: response.data.user,
      })
    }
    catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to update user details');
    }
  },

  updatePassword: async (current_password, password) => {
    try {
      await updatePassword(current_password, password);
      return ({ success: true })
    }
    catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to update password')
    }
  },

  emailVerify: async (email) => {
    try {
      await verifyEmailAddress(email);
      return ({ success: true });
    }
    catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to verify email. Please try again')
    }
  }
}));

export default useAuthStore;
