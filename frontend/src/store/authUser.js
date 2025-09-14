import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,

  signup: async (credentials) => {
    try {
      set({ isSigningUp: true });
      console.log(credentials);
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message || "An error occured");
      set({ isSigningUp: false, user: null });
    }
  },
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isLoggingIn: false });
      toast.success("Logged in successfully");
    } catch (error) {
      set({ isLoggingIn: false, user: null });
      toast.error(error.response.data.message || "Login failed");
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("api/v1/auth/logout");
      set({ user: null, isLoggingOut: true });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ isLoggingOut: true });
      toast.error(error.response.data.message || "Logout failed");
    }
  },

  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
      if (error.response?.status !== 401) {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    }
  },
  setUser: (user) => set({ user }),
}));
