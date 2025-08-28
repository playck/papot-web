"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "홈", href: "/" },
    { name: "식물", href: "/plants" },
    { name: "꽃", href: "/flowers" },
    { name: "화분", href: "/pots" },
    { name: "가드닝", href: "/gardening" },
    { name: "이벤트", href: "/events" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* 로고 */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
                <span className="text-lg font-bold">P</span>
              </div>
              <span className="text-xl font-bold text-foreground">Papot</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
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
            <button className="hidden sm:flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
              <Search className="h-4 w-4" />
              <span className="sr-only">검색</span>
            </button>

            <button className="relative h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground flex">
              <ShoppingCart className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary-600 text-xs text-white flex items-center justify-center">
                0
              </span>
              <span className="sr-only">장바구니</span>
            </button>

            <button className="h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground flex">
              <User className="h-4 w-4" />
              <span className="sr-only">사용자 메뉴</span>
            </button>

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
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary-600 hover:bg-accent rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {/* 모바일에서만 보이는 검색 */}
              <button className="sm:hidden px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary-600 hover:bg-accent rounded-md text-left flex items-center space-x-2">
                <Search className="h-4 w-4" />
                <span>검색</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
