"use client";

import { ReactNode } from "react";
import { Info, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

interface InfoBoxProps {
  children: ReactNode;
  variant?: "info" | "success" | "warning" | "error";
  icon?: ReactNode;
  className?: string;
}

const variantStyles = {
  info: "bg-neutral-50 text-neutral-600",
  success: "bg-primary-50 text-primary-700",
  warning: "bg-yellow-50 text-yellow-700",
  error: "bg-red-50 text-red-700",
};

const defaultIcons = {
  info: <Info className="w-4 h-4" />,
  success: <CheckCircle className="w-4 h-4" />,
  warning: <AlertTriangle className="w-4 h-4" />,
  error: <XCircle className="w-4 h-4" />,
};

export default function InfoBox({
  children,
  variant = "info",
  icon,
  className = "",
}: InfoBoxProps) {
  const displayIcon = icon || defaultIcons[variant];

  return (
    <div className={`p-3 rounded-md ${variantStyles[variant]} ${className}`}>
      <div className="flex items-start gap-2">
        {displayIcon && (
          <div className="flex-shrink-0 mt-0.5">{displayIcon}</div>
        )}
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
}
