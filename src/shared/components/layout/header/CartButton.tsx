import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/feature/cart/hooks";

export default function CartButton() {
  const { totalItems } = useCart();

  return (
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
  );
}
