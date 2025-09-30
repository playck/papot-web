"use client";

import { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { Search, X } from "lucide-react";

export interface AddressData {
  zipCode: string;
  address: string;
}

interface AddressSearchProps {
  onAddressSelect: (addressData: AddressData) => void;
  buttonText?: string;
}

type SearchAddressData = {
  zonecode: string;
  roadAddress: string;
  jibunAddress: string;
  userSelectedType: "R" | "J";
};

export default function AddressSearch({ onAddressSelect }: AddressSearchProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleComplete = (data: SearchAddressData) => {
    const fullAddress =
      data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;

    onAddressSelect({
      zipCode: data.zonecode,
      address: fullAddress,
    });

    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <Search size={16} />
        주소 찾기
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}
        >
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-neutral-200">
              <h3 className="text-lg font-semibold text-neutral-900">
                주소 검색
              </h3>
              <button
                onClick={handleClose}
                className="p-1 hover:bg-neutral-100 rounded-full transition-colors"
              >
                <X size={20} className="text-neutral-600" />
              </button>
            </div>
            <div className="h-96">
              <DaumPostcode
                onComplete={handleComplete}
                onClose={handleClose}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
