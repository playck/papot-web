"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useAuth } from "@/shared/hooks/useAuth";
import { signOut } from "@/app/(auth)/services/api";
import { CategoryWithChildren } from "@/shared/types/category";

interface MobileMenuProps {
  isOpen: boolean;
  categories: CategoryWithChildren[];
  onClose: () => void;
}

export default function MobileMenu({
  isOpen,
  categories,
  onClose,
}: MobileMenuProps) {
  const { user } = useAuth();
  const [expandedCategoryId, setExpandedCategoryId] = useState<number | null>(
    null
  );

  const handleSignOut = async () => {
    try {
      await signOut();
      onClose();
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  const toggleCategory = (categoryId: number) => {
    setExpandedCategoryId(
      expandedCategoryId === categoryId ? null : categoryId
    );
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-[45] md:hidden"
        onClick={onClose}
      />

      <div className="fixed top-16 left-0 right-0 bg-background border-b border-border shadow-lg z-[55] md:hidden">
        <nav className="flex flex-col py-4 px-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="space-y-1">
            <p className="px-2 pb-1 text-xs font-semibold text-neutral-500 uppercase">
              카테고리
            </p>
            {categories.map((category) => {
              const hasChildren =
                category.children && category.children.length > 0;
              const isExpanded = expandedCategoryId === category.id;

              return (
                <div key={category.id}>
                  {hasChildren ? (
                    <>
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="w-full flex items-center justify-between px-2 py-2 text-sm font-medium text-muted-foreground transition-colors rounded-md"
                      >
                        <span>{category.name}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isExpanded && (
                        <div className="ml-4 mt-1 space-y-1">
                          {category.children?.map((subCategory) => (
                            <Link
                              key={subCategory.id}
                              href={`/product/category/${subCategory.name}`}
                              className="block px-2 py-1.5 text-sm text-neutral-600 hover:text-primary-600 transition-colors rounded-md"
                              onClick={onClose}
                            >
                              {subCategory.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={`/product/category/${category.name}`}
                      className="block px-2 py-2 text-sm font-medium text-muted-foreground transition-colors rounded-md"
                      onClick={onClose}
                    >
                      {category.name}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {user && (
            <div className="space-y-1 mt-4 pt-4 border-t border-border">
              <p className="px-2 pb-1 text-xs font-semibold text-neutral-500 uppercase">
                마이메뉴
              </p>
              <Link
                href="/mypage"
                className="block px-2 py-2 text-sm font-medium text-muted-foreground transition-colors rounded-md"
                onClick={onClose}
              >
                마이페이지
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full text-left px-2 py-2 text-sm font-medium text-muted-foreground transition-colors rounded-md"
              >
                로그아웃
              </button>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}
