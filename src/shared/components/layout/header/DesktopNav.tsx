import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { CategoryWithChildren } from "@/shared/types/category";

interface DesktopNavProps {
  categories: CategoryWithChildren[];
}

export default function DesktopNav({ categories }: DesktopNavProps) {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      {categories.map((category) => {
        const hasChildren = category.children && category.children.length > 0;

        return (
          <div key={category.id} className="relative group">
            <Link
              href={`/product/category/${category.name}`}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary-600 flex items-center gap-1"
            >
              {category.name}
              {hasChildren && (
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              )}
            </Link>

            {/* 하위 카테고리 드롭다운 */}
            {hasChildren && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 min-w-[180px] bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {category.children?.map((subCategory) => (
                  <Link
                    key={subCategory.id}
                    href={`/product/category/${subCategory.name}`}
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                  >
                    {subCategory.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
