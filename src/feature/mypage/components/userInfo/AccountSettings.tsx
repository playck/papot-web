"use client";

export function AccountSettings() {
  return (
    <div className="bg-white rounded-lg border border-neutral-200 p-6">
      <h3 className="text-lg font-semibold text-neutral-900 mb-4">계정 설정</h3>
      <div className="space-y-3">
        <button className="w-full text-left px-4 py-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer">
          <p className="font-medium text-neutral-900">비밀번호 변경</p>
          <p className="text-sm text-neutral-600">
            계정 보안을 위해 정기적으로 변경해주세요
          </p>
        </button>
        <button className="w-full text-left px-4 py-3 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-red-600 cursor-pointer">
          <p className="font-medium">회원 탈퇴</p>
          <p className="text-sm text-red-500">
            계정을 삭제하고 모든 데이터를 제거합니다
          </p>
        </button>
      </div>
    </div>
  );
}
