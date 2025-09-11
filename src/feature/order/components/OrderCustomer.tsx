"use client";

import { OrderCustomer as OrderCustomerType } from "@/shared/types/order";
import { Input } from "@/shared/components";

interface OrderCustomerProps {
  customer: OrderCustomerType;
}

export default function OrderCustomer({ customer }: OrderCustomerProps) {
  const handleInputChange = (field: keyof OrderCustomerType, value: string) => {
    console.log(field, value);
  };

  return (
    <div className="bg-white rounded-lg border border-neutral-200 p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-neutral-900">주문자 정보</h2>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <Input
              label="이름"
              type="text"
              value={customer.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="이름을 입력하세요"
            />
          </div>

          <div className="col-span-2">
            <Input
              label="이메일"
              type="email"
              value={customer.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="이메일을 입력하세요"
            />
          </div>
        </div>

        <Input
          label="휴대폰 번호"
          type="tel"
          value={customer.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          placeholder="휴대폰 번호를 입력하세요 (010-1234-5678)"
        />
      </div>
    </div>
  );
}
