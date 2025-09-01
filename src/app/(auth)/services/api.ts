"use client";

import { SignUpRequest, SignInRequest, User } from "./type";
import { supabase } from "@/services/supabase/client";

// 회원가입
export async function signUp({ name, email, password }: SignUpRequest) {
  const { data, error } = await supabase.auth.signUp({
    email: email.toLowerCase().trim(),
    password,
    options: {
      data: {
        user_name: name.trim(),
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return {
    user: data.user
      ? {
          id: data.user.id,
          userName: data.user.user_metadata?.user_name || "",
          email: data.user.email!,
          createdAt: new Date(data.user.created_at),
          updatedAt: new Date(data.user.updated_at || data.user.created_at),
        }
      : null,
    session: data.session,
  };
}

// 로그인
export async function signIn({ email, password }: SignInRequest) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.toLowerCase().trim(),
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return {
    user: data.user
      ? {
          id: data.user.id,
          userName:
            data.user.user_metadata?.user_name ||
            data.user.email?.split("@")[0] ||
            "",
          email: data.user.email!,
          createdAt: new Date(data.user.created_at),
          updatedAt: new Date(data.user.updated_at || data.user.created_at),
        }
      : null,
    session: data.session,
  };
}

// 로그아웃
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

// 현재 사용자 정보 가져오기
export async function getUser(): Promise<User | null> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return {
    id: user.id,
    userName: user.user_metadata?.user_name || user.email?.split("@")[0] || "",
    email: user.email!,
    createdAt: new Date(user.created_at),
    updatedAt: new Date(user.updated_at || user.created_at),
  };
}

// 세션 가져오기
export async function getSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw new Error(error.message);
  }

  return session;
}

// 인증 상태 변화 리스너
export function onAuthStateChange(callback: (user: User | null) => void) {
  return supabase.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
      const user: User = {
        id: session.user.id,
        userName:
          session.user.user_metadata?.user_name ||
          session.user.email?.split("@")[0] ||
          "",
        email: session.user.email!,
        createdAt: new Date(session.user.created_at),
        updatedAt: new Date(session.user.updated_at || session.user.created_at),
      };
      callback(user);
    } else {
      callback(null);
    }
  });
}
