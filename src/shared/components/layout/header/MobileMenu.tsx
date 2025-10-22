import Link from "next/link";
import { useAuth } from "@/shared/hooks/useAuth";
import { signOut } from "@/app/(auth)/services/api";

interface MobileMenuProps {
  isOpen: boolean;
  menuItems: Array<{ name: string; href: string }>;
  onClose: () => void;
}

export default function MobileMenu({
  isOpen,
  menuItems,
  onClose,
}: MobileMenuProps) {
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      onClose();
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
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
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-2 py-2 text-sm font-medium text-muted-foreground transition-colors rounded-md"
                onClick={onClose}
              >
                {item.name}
              </Link>
            ))}
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
