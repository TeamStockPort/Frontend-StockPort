/* eslint-disable no-console */
import { type AxiosError, type AxiosInstance } from "axios";
import { __DEV__ } from "./instance";
import type { ApiErrorResponse } from "@/lib/apis/types";

export const applyDevLoggingInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use((config) => {
    if (__DEV__) {
      // 개발 환경에서만 로깅
      console.log("🚀 [Request]", config.method?.toUpperCase(), config.url);
      if (config.data) console.log("📦 [Request Data]", config.data);
      if (config.params) console.log("🔍 [Request Params]", config.params);
    }
    return config;
  });

  instance.interceptors.response.use(
    // 성공 응답 처리
    (response) => {
      if (__DEV__) {
        console.log("✅ [Response]", response.status, response.config.url);
        console.log("📄 [Response Data]", response.data);
      }
      return response;
    },
    // 에러 응답 처리
    (error: AxiosError<ApiErrorResponse>) => {
      if (__DEV__) {
        console.error("❌ [Axios Error]", error.message);
        if (error.response) {
          const errorData = error.response.data;
          console.error("💥 [Error Response]", {
            status: errorData?.status,
            title: errorData?.title,
            detail: errorData?.detail,
            instance: errorData?.instance,
          });
        }
      }
      return Promise.reject(error);
    }
  );
};
