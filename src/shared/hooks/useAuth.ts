"use client";

import { useState, useEffect } from "react";
import { getUser, onAuthStateChange } from "@/app/(auth)/services/api";
import { User } from "@/app/(auth)/services/type";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("사용자 정보 로드 실패:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();

    // 인증 상태 변화 감지
    const {
      data: { subscription },
    } = onAuthStateChange((userData) => {
      setUser(userData);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}
