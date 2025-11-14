import { applyDevLoggingInterceptor } from "@/utils/interceptor";
import { BACKEND_BASE_URL } from "@/constants/api";
import axios from "axios";

export const __DEV__ = process.env.NODE_ENV === "development";

export const instance = axios.create({
  baseURL: BACKEND_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

applyDevLoggingInterceptor(instance);
