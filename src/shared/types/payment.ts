export type PaymentMethod =
  | "card" // 신용/체크카드
  | "trans" // 실시간 계좌이체
  | "vbank" // 가상계좌
  | "phone" // 휴대폰 소액결제
  | "kakaopay" // 카카오페이
  | "tosspay" // 토스페이
  | "naverpay" // 네이버페이
  | "payco"; // 페이코

export type PaymentStatus =
  | "ready" // 결제 대기
  | "paid" // 결제 완료
  | "failed" // 결제 실패
  | "cancelled"; // 결제 취소

export interface PaymentRequest {
  merchantUid: string; // 주문번호 (고유값)
  amount: number; // 결제 금액
  name: string; // 주문명
  buyerName: string; // 구매자 이름
  buyerTel: string; // 구매자 전화번호
  buyerEmail: string; // 구매자 이메일
  buyerAddr?: string; // 구매자 주소
  buyerPostcode?: string; // 구매자 우편번호
  paymentMethod?: PaymentMethod; // 결제 수단
}

export interface PaymentResponse {
  success: boolean;
  impUid?: string; // 포트원 거래 고유번호
  merchantUid?: string; // 주문번호
  paidAmount?: number; // 실제 결제 금액
  error?: string; // 에러 메시지
}

export interface PaymentVerifyRequest {
  impUid: string; // 포트원 거래 고유번호
  merchantUid: string; // 주문번호
  expectedAmount: number; // 예상 결제 금액
}

export interface PaymentVerifyResponse {
  success: boolean;
  verified: boolean;
  payment?: {
    impUid: string;
    merchantUid: string;
    amount: number;
    status: PaymentStatus;
    paidAt?: number;
    method?: PaymentMethod;
  };
  error?: string;
}
