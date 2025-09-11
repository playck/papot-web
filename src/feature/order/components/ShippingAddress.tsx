"use client";

import { ShippingAddress as ShippingAddressType } from "@/shared/types/order";
import { Input } from "@/shared/components";
import { useOrderStore } from "@/feature/order/store/order";

interface ShippingAddressProps {
  shippingAddress: ShippingAddressType;
}

export default function ShippingAddress({
  shippingAddress,
}: ShippingAddressProps) {
  const { updateShippingAddress } = useOrderStore();

  const handleInputChange = (
    field: keyof ShippingAddressType,
    value: string
  ) => {
    updateShippingAddress({
      ...shippingAddress,
      [field]: value,
    });
  };

  return (
    <div className="bg-white rounded-lg border border-neutral-200 p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-neutral-900">배송지 정보</h2>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <Input
              label="받는 분"
              type="text"
              value={shippingAddress.recipientName}
              onChange={(e) =>
                handleInputChange("recipientName", e.target.value)
              }
              placeholder="받는 분 이름을 입력하세요"
            />
          </div>

          <div className="col-span-1">
            <Input
              label="연락처"
              type="tel"
              value={shippingAddress.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="연락처를 입력하세요"
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1">
            <Input
              label="우편번호"
              type="text"
              value={shippingAddress.zipCode}
              onChange={(e) => handleInputChange("zipCode", e.target.value)}
              placeholder="12345"
            />
          </div>
          <div className="col-span-3">
            <Input
              label="주소"
              type="text"
              value={shippingAddress.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="주소를 입력하세요"
            />
          </div>
        </div>

        <Input
          label="상세주소"
          type="text"
          value={shippingAddress.detailAddress}
          onChange={(e) => handleInputChange("detailAddress", e.target.value)}
          placeholder="상세주소를 입력하세요"
        />

        <Input
          label="배송 요청사항"
          type="text"
          value={shippingAddress.deliveryRequest || ""}
          onChange={(e) => handleInputChange("deliveryRequest", e.target.value)}
          placeholder="배송 요청사항을 입력하세요 (선택사항)"
        />
      </div>
    </div>
  );
}
