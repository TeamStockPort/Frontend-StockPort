import { signUp } from "@/lib/apis/auth";
import type { UseMutationCallback } from "@/lib/apis/types";
import { useMutation } from "@tanstack/react-query";

export const useSignUp = (callbacks?: UseMutationCallback) => {
  return useMutation({
    mutationFn: signUp,
    onError: (error: Error) => {
      if (callbacks?.onError) {
        callbacks.onError(error);
      }
    },
  });
};
