"use client";

import { MapPin } from "lucide-react";

export function AddressManagement() {
  return (
    <div className="bg-white rounded-lg border border-neutral-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-neutral-900">배송지 관리</h3>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          + 새 배송지 추가
        </button>
      </div>
      <div className="space-y-3">
        <div className="border border-neutral-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-neutral-400 mt-0.5" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-neutral-900">집</p>
                  <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs rounded-full">
                    기본
                  </span>
                </div>
                <p className="text-sm text-neutral-600">홍길동</p>
                <p className="text-sm text-neutral-600">
                  서울시 강남구 테헤란로 123, 456호
                </p>
                <p className="text-sm text-neutral-600">010-1234-5678</p>
              </div>
            </div>
            <button className="text-sm text-neutral-500 hover:text-neutral-700">
              수정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
