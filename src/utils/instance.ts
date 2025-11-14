import { applyDevLoggingInterceptor } from "@/utils/interceptor";
import axios from "axios";

export const __DEV__ = process.env.NODE_ENV === "development";

export const instance = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 5000,
});

applyDevLoggingInterceptor(instance);
