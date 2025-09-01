import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignInRequest, SignUpRequest } from "../type";
import { signIn, signUp } from "../api";

export function useSignUp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SignUpRequest) => signUp(data),
    onSuccess: (data) => {
      // 성공 시 사용자 정보 캐시 업데이트
      if (data.user) {
        queryClient.setQueryData(["user"], data.user);
      }
    },
    onError: (error: Error) => {
      console.error("회원가입 오류:", error.message);
    },
  });
}

export function useSignIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SignInRequest) => signIn(data),
    onSuccess: (data) => {
      // 성공 시 사용자 정보 캐시 업데이트
      if (data.user) {
        queryClient.setQueryData(["user"], data.user);
      }
    },
    onError: (error: Error) => {
      console.error("로그인 오류:", error.message);
    },
  });
}
