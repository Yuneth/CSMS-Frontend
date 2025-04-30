import axios from "axios";
import { getToken } from "../utils/auth";

const API_URL = "http://localhost:8080/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  console.warn(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getBookings = (userId) => axiosInstance.get(`/bookings/user/${userId}`);
export const createBooking = (data) => axiosInstance.post("/bookings", data);
export const updateBooking = (id, data) => axiosInstance.put(`/bookings/${id}`, data);
export const getBookingById = (id) => axiosInstance.get(`/bookings/${id}`);
export const deleteBooking = (id) => axiosInstance.delete(`/bookings/${id}`);
