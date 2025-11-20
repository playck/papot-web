"use client";

import { PaymentMethod } from "@/shared/types/payment";

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onSelectMethod: (method: PaymentMethod) => void;
}

const paymentMethods: { value: PaymentMethod; label: string; icon: string }[] =
  [
    { value: "card", label: "신용/체크카드", icon: "💳" },
    // { value: "trans", label: "실시간 계좌이체", icon: "🏦" },
  ];

export default function PaymentMethodSelector({
  selectedMethod,
  onSelectMethod,
}: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">결제 수단 선택</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {paymentMethods.map((method) => (
          <button
            key={method.value}
            onClick={() => onSelectMethod(method.value)}
            className={`
              p-4 border-2 rounded-lg transition-all
              flex items-center gap-2 cursor-pointer
              hover:primary-300
              ${
                selectedMethod === method.value
                  ? "border-primary-500 bg-primary-50"
                  : "border-neutral-200"
              }
            `}
          >
            <span className="text-2xl">{method.icon}</span>
            <span className="text-base font-medium">{method.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
