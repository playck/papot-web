"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, User, Lock, Leaf } from "lucide-react";
import { useSignUp } from "../services/hooks/useLogin";

export default function SignUpPage() {
  const router = useRouter();
  const signUpMutation = useSignUp();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // 에러 메시지 제거
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (formData.password.length < 6) {
      newErrors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호 확인을 입력해주세요.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await signUpMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      alert("회원가입이 완료되었습니다! 이메일을 확인해주세요.");
      router.push("/signin");
    } catch (error) {
      // Supabase 에러 메시지 처리
      const errorMessage =
        error instanceof Error
          ? error.message
          : "회원가입 중 오류가 발생했습니다.";

      if (errorMessage.includes("already registered")) {
        setErrors({ email: "이미 사용 중인 이메일입니다." });
      } else if (errorMessage.includes("Password")) {
        setErrors({ password: "비밀번호가 너무 약합니다." });
      } else {
        alert("회원가입 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 로고 및 헤더 */}
        <div className="text-center mb-10">
          <Link
            href="/"
            className="inline-flex items-center justify-center mb-4"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white mr-3">
              <Leaf className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold text-primary-700">Papot</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground mb-2">회원가입</h1>
          <p className="text-muted-foreground">
            화분과 함께하는 특별한 라이프를 시작해보세요
          </p>
        </div>

        {/* 회원가입 폼 */}
        <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 이름 입력 */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground mb-2"
              >
                이름
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-500 transition-colors ${
                    errors.name ? "border-red-500" : "border-border"
                  }`}
                  placeholder="이름을 입력 해 주세요."
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* 이메일 입력 */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                이메일
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-500 transition-colors ${
                    errors.email ? "border-red-500" : "border-border"
                  }`}
                  placeholder="example@email.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* 비밀번호 입력 */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground mb-2"
              >
                비밀번호
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-500 transition-colors ${
                    errors.password ? "border-red-500" : "border-border"
                  }`}
                  placeholder="최소 6자 이상 입력 해 주세요."
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* 비밀번호 확인 */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-foreground mb-2"
              >
                비밀번호 확인
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-500 transition-colors ${
                    errors.confirmPassword ? "border-red-500" : "border-border"
                  }`}
                  placeholder="비밀번호를 다시 입력해주세요"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* 회원가입 버튼 */}
            <button
              type="submit"
              disabled={signUpMutation.isPending}
              className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {signUpMutation.isPending ? "회원가입 중..." : "회원가입"}
            </button>
          </form>

          {/* 로그인 링크 */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              이미 계정이 있으신가요?{" "}
              <Link
                href="/signin"
                className="text-primary-600 hover:text-primary-700 font-medium hover:underline transition-colors"
              >
                로그인하기
              </Link>
            </p>
          </div>
        </div>

        {/* 하단 텍스트 */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            회원가입을 통해{" "}
            <Link href="/terms" className="text-primary-600 hover:underline">
              이용약관
            </Link>{" "}
            및{" "}
            <Link href="/privacy" className="text-primary-600 hover:underline">
              개인정보처리방침
            </Link>
            에 동의하게 됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
