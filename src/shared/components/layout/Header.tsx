"use client";

import { useState, useMemo } from "react";
import { useCategories } from "@/shared/hooks/useCategories";
import Logo from "./header/Logo";
import DesktopNav from "./header/DesktopNav";
import CartButton from "./header/CartButton";
import UserMenu from "./header/UserMenu";
import MobileMenuButton from "./header/MobileMenuButton";
import MobileMenu from "./header/MobileMenu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { categories } = useCategories();

  const menuItems = useMemo(() => {
    return categories.map((category) => ({
      name: category.name,
      href: `/product/category/${category.name}`,
    }));
  }, [categories]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-10xl mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Logo />
            <DesktopNav menuItems={menuItems} />

            {/* 우측 액션 버튼들 */}
            <div className="flex items-center space-x-4">
              <CartButton />
              <div className="hidden md:block">
                <UserMenu />
              </div>
              <MobileMenuButton
                isOpen={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* 모바일 메뉴 - container 밖에서 렌더링 */}
      <MobileMenu
        isOpen={isMenuOpen}
        menuItems={menuItems}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
};

export default Header;
