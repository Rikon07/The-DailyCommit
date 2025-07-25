import { useEffect } from "react";
import axios from "axios";
import useAuth from "./UseAuth";

const axiosSecure = axios.create({
  baseURL: "https://the-daily-commit-server.vercel.app",
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();

  useEffect(() => {
    // Request interceptor: add JWT from localStorage
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor: log out only on real auth errors
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error?.response?.status;
        if (
          (status === 401 || status === 403) &&
          error?.response?.data?.message === "Unauthorized"
        ) {
          logOut();
        }
        return Promise.reject(error);
      }
    );

    // Cleanup
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut]);

  return axiosSecure;
};

export default useAxiosSecure;