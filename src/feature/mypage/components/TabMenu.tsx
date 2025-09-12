"use client";

export type TabMenu = "orders" | "profile";

interface TabMenuProps {
  activeTab: TabMenu;
  onTabChange: (tab: TabMenu) => void;
}

export function TabMenu({ activeTab, onTabChange }: TabMenuProps) {
  const tabs = [
    { id: "orders" as const, label: "구매내역" },
    { id: "profile" as const, label: "내정보관리" },
  ];

  return (
    <div className="border-b border-neutral-200 mb-6">
      <nav className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
              activeTab === tab.id
                ? "border-primary-600 text-primary-600"
                : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
