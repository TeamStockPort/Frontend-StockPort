import { signIn } from "@/lib/apis/auth";
import type { UseMutationCallback } from "@/lib/apis/types";
import { useMutation } from "@tanstack/react-query";

export const useSignIn = (callbacks?: UseMutationCallback) => {
  return useMutation({
    mutationFn: signIn,
    onError: (error: Error) => {
      if (callbacks?.onError) {
        callbacks.onError(error);
      }
    },
  });
};
