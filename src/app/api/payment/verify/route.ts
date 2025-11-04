import { NextRequest, NextResponse } from "next/server";

/**
 * 포트원 V2 결제 검증 API
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { impUid, merchantUid, expectedAmount } = body;

    if (!impUid || !merchantUid || !expectedAmount) {
      return NextResponse.json(
        {
          success: false,
          error: "필수 파라미터가 누락되었습니다.",
        },
        { status: 400 }
      );
    }

    const apiSecret = process.env.PORTONE_API_SECRET;
    const storeId = process.env.NEXT_PUBLIC_PORTONE_STORE_ID;

    if (!apiSecret || !storeId) {
      return NextResponse.json(
        {
          success: false,
          error: "포트원 API 설정이 올바르지 않습니다.",
        },
        { status: 500 }
      );
    }

    // 포트원 V2 API로 결제 정보 조회
    const paymentData = await getPortOneV2Payment(impUid, apiSecret);

    if (!paymentData) {
      return NextResponse.json(
        {
          success: false,
          error: "결제 정보를 조회할 수 없습니다.",
        },
        { status: 404 }
      );
    }

    // 결제 금액 검증
    const amountMatch = paymentData.amount.total === expectedAmount;
    const statusValid = paymentData.status === "PAID";

    if (!amountMatch) {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          error: "결제 금액이 일치하지 않습니다.",
        },
        { status: 400 }
      );
    }

    if (!statusValid) {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          error: "결제가 완료되지 않았습니다.",
        },
        { status: 400 }
      );
    }

    // 검증 성공
    return NextResponse.json({
      success: true,
      verified: true,
      payment: {
        impUid: paymentData.id,
        merchantUid: paymentData.merchantId || paymentData.paymentId,
        amount: paymentData.amount.total,
        status: paymentData.status,
        paidAt: paymentData.paidAt,
        method: paymentData.method?.type,
      },
    });
  } catch (error) {
    console.error("결제 검증 오류:", error);
    return NextResponse.json(
      {
        success: false,
        error: "결제 검증 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}

/**
 * 포트원 V2 API로 결제 정보 조회
 */
async function getPortOneV2Payment(paymentId: string, apiSecret: string) {
  try {
    const res = await fetch(`https://api.portone.io/payments/${paymentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `PortOne ${apiSecret}`,
      },
    });

    if (!res.ok) {
      console.error("포트원 API 응답 오류:", res.status);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("결제 정보 조회 오류:", error);
    return null;
  }
}
