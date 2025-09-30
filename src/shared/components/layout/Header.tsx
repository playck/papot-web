"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Search, ShoppingCart, User, LogOut } from "lucide-react";
import { useAuth } from "@/shared/hooks/useAuth";
import { signOut } from "@/app/(auth)/services/api";
import { useCart } from "@/feature/cart/hooks";
import { MENU_ITEMS } from "@/shared/constants/menu";

const Header = () => {
  const { user, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { totalItems } = useCart();

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-10xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* 로고 */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/papot-logo.png"
                alt="Papot"
                width={32}
                height={32}
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary-600 hover:underline underline-offset-4"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* 우측 액션 버튼들 */}
          <div className="flex items-center space-x-4">
            <Link
              href="/cart"
              className="relative h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground flex"
            >
              <ShoppingCart className="h-4 w-4" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary-600 text-xs text-white flex items-center justify-center">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
              <span className="sr-only">장바구니</span>
            </Link>

            {/* 사용자 메뉴 */}
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
                <div className="flex items-center space-x-2">
                  <Link
                    href="/signin"
                    className="text-sm font-medium text-muted-foreground hover:text-primary-600 transition-colors"
                  >
                    로그인
                  </Link>
                  <Link
                    href="/signup"
                    className="text-sm font-medium bg-primary-600 text-white px-3 py-1 rounded-md hover:bg-primary-700 transition-colors"
                  >
                    회원가입
                  </Link>
                </div>
              )}
            </div>

            {/* 모바일 메뉴 버튼 */}
            <button
              className="md:hidden h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground flex"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
              <span className="sr-only">메뉴</span>
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <nav className="flex flex-col space-y-1 py-4">
              {MENU_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary-600 hover:bg-accent rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button className="sm:hidden px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary-600 hover:bg-accent rounded-md text-left flex items-center space-x-2">
                <Search className="h-4 w-4" />
                <span>검색</span>
              </button>

              {/* 모바일 사용자 메뉴 */}
              {user && (
                <>
                  <div className="border-t border-border pt-2 mt-2">
                    <p className="px-2 py-1 text-xs text-muted-foreground">
                      {user.userName}
                    </p>
                  </div>
                  <Link
                    href="/mypage"
                    className="px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary-600 hover:bg-accent rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    마이페이지
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary-600 hover:bg-accent rounded-md"
                  >
                    로그아웃
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
