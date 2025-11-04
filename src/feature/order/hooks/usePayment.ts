import { useState } from "react";
import * as PortOne from "@portone/browser-sdk/v2";
import type {
  PaymentRequest,
  PaymentResponse,
  PaymentMethod,
} from "@/shared/types/payment";

interface UsePaymentOptions {
  storeId: string; // 포트원 스토어 아이디
  channelKey: string; // 포트원 채널 키
  onSuccess?: (response: PaymentResponse) => void;
  onError?: (error: string) => void;
}

// 포트원 V2 결제 수단 매핑
const convertPaymentMethod = (
  method?: PaymentMethod
): PortOne.PaymentPayMethod => {
  const methodMap: Record<PaymentMethod, PortOne.PaymentPayMethod> = {
    card: "CARD",
    trans: "TRANSFER",
    vbank: "VIRTUAL_ACCOUNT",
    phone: "MOBILE",
    kakaopay: "EASY_PAY",
    tosspay: "EASY_PAY",
    naverpay: "EASY_PAY",
    payco: "EASY_PAY",
  };

  return method ? methodMap[method] || "CARD" : "CARD";
};

export function usePayment({
  storeId,
  channelKey,
  onSuccess,
  onError,
}: UsePaymentOptions) {
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * 결제 요청
   */
  const requestPayment = async (paymentData: PaymentRequest) => {
    setIsProcessing(true);

    try {
      const response = await PortOne.requestPayment({
        storeId,
        channelKey,
        paymentId: paymentData.merchantUid,
        orderName: paymentData.name,
        totalAmount: paymentData.amount,
        currency: "CURRENCY_KRW",
        payMethod: convertPaymentMethod(paymentData.paymentMethod),
        customer: {
          fullName: paymentData.buyerName,
          phoneNumber: paymentData.buyerTel,
          email: paymentData.buyerEmail,
        },
      });

      // 결제 성공
      if (response && response.code === undefined) {
        const paymentResponse: PaymentResponse = {
          success: true,
          impUid: response.paymentId,
          merchantUid: paymentData.merchantUid,
          paidAmount: paymentData.amount,
        };

        onSuccess?.(paymentResponse);
        return paymentResponse;
      }
      // 결제 실패
      else {
        const errorMessage = response?.message || "결제에 실패했습니다.";
        const paymentResponse: PaymentResponse = {
          success: false,
          error: errorMessage,
        };

        onError?.(errorMessage);
        return paymentResponse;
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "결제 처리 중 오류가 발생했습니다.";

      const paymentResponse: PaymentResponse = {
        success: false,
        error: errorMessage,
      };

      onError?.(errorMessage);
      return paymentResponse;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    requestPayment,
    isProcessing,
  };
}
