import { useState } from "react";
import Link from "next/link";
import { User, LogOut } from "lucide-react";
import { useAuth } from "@/shared/hooks/useAuth";
import { signOut } from "@/app/(auth)/services/api";

export default function UserMenu() {
  const { user, loading } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <div className="relative">
      {loading ? (
        <div className="h-9 w-9 rounded-md bg-muted animate-pulse" />
      ) : user ? (
        <>
          <button
            className="h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground flex"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <User className="h-4 w-4" />
            <span className="sr-only">사용자 메뉴</span>
          </button>

          {/* 사용자 드롭다운 메뉴 */}
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg py-1 z-50">
              <div className="px-4 py-2 border-b border-border">
                <p className="text-sm font-medium text-foreground">
                  {user.userName}님
                </p>
              </div>
              <Link
                href="/mypage"
                className="block px-4 py-2 text-sm text-foreground hover:bg-accent"
                onClick={() => setIsUserMenuOpen(false)}
              >
                마이페이지
              </Link>
              <Link
                href="/orders"
                className="block px-4 py-2 text-sm text-foreground hover:bg-accent"
                onClick={() => setIsUserMenuOpen(false)}
              >
                주문 내역
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>로그아웃</span>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center space-x-4">
          <Link
            href="/signin"
            className="text-sm font-medium text-muted-foreground hover:text-primary-600 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium bg-primary-600 text-white px-3 py-1 rounded-md hover:bg-primary-700 transition-colors"
          >
            Signup
          </Link>
        </div>
      )}
    </div>
  );
}
