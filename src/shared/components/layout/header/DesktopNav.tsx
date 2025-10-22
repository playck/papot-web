import Link from "next/link";

interface DesktopNavProps {
  menuItems: Array<{ name: string; href: string }>;
}

export default function DesktopNav({ menuItems }: DesktopNavProps) {
  return (
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
  );
}
