import { Menu, X } from "lucide-react";

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function MobileMenuButton({
  isOpen,
  onClick,
}: MobileMenuButtonProps) {
  return (
    <button
      className="md:hidden h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-color flex"
      onClick={onClick}
    >
      {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      <span className="sr-only">메뉴</span>
    </button>
  );
}
