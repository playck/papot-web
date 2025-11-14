"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

type TermType = "service" | "privacy" | "finance" | "refund";

interface TermMenuItem {
  id: TermType;
  title: string;
  required?: boolean;
}

const termMenuItems: TermMenuItem[] = [
  { id: "service", title: "이용약관" },
  { id: "privacy", title: "개인정보 수집 및 이용", required: true },
  { id: "finance", title: "전자금융거래 이용약관" },
  { id: "refund", title: "환불/취소 정책" },
];

function TermsContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") as TermType | null;

  const [selectedTerm, setSelectedTerm] = useState<TermType>(
    tabParam && ["service", "privacy", "finance", "refund"].includes(tabParam)
      ? tabParam
      : "privacy"
  );

  useEffect(() => {
    if (
      tabParam &&
      ["service", "privacy", "finance", "refund"].includes(tabParam)
    ) {
      setSelectedTerm(tabParam);
    }
  }, [tabParam]);

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 pb-36">
      <h1 className="text-3xl font-bold mb-8">이용약관</h1>

      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* 왼쪽 사이드바 메뉴 */}
        <aside className="md:w-64 flex-shrink-0">
          <nav className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {termMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedTerm(item.id)}
                className={`w-full text-left px-4 py-3 border-b border-gray-200 last:border-b-0 transition-colors cursor-pointer ${
                  selectedTerm === item.id
                    ? "bg-gray-900 text-white font-semibold"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                {item.title}
              </button>
            ))}
          </nav>
        </aside>

        {/* 오른쪽 약관 내용 */}
        <main className="flex-1 bg-white border border-gray-200 rounded-lg p-6 md:p-8">
          {selectedTerm === "service" && <ServiceTermContent />}
          {selectedTerm === "privacy" && <PrivacyTermContent />}
          {selectedTerm === "finance" && <FinanceTermContent />}
          {selectedTerm === "refund" && <RefundTermContent />}
        </main>
      </div>
    </div>
  );
}

export default function TermsPage() {
  return (
    <Suspense
      fallback={
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      }
    >
      <TermsContent />
    </Suspense>
  );
}

function ServiceTermContent() {
  return (
    <div className="prose prose-sm max-w-none space-y-6">
      <h2 className="text-2xl font-bold mb-6">이용약관</h2>

      <section>
        <h3 className="text-lg font-semibold mb-3">제1조 (목적)</h3>
        <p className="text-gray-700 leading-relaxed">
          본 약관은 파팟이 운영하는 온라인 쇼핑몰(이하 “파팟”)에서 제공하는
          서비스를 이용함에 있어, 파팟과 이용자의 권리·의무 및 책임사항을
          규정하는 것을 목적으로 합니다.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">제2조 (정의)</h3>
        <p className="text-gray-700 leading-relaxed mb-2">
          본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            &quot;파팟&quot;은 식물 화분 및 도자기 등의 상품을 판매하는 온라인
            쇼핑몰입니다.
          </li>
          <li>
            &quot;이용자&quot;란 파팟에 접속하여 본 약관에 따라 파팟이 제공하는
            서비스를 이용하는 회원 및 비회원을 말합니다.
          </li>
          <li>
            &quot;회원&quot;이란 파팟에 개인정보를 제공하여 회원 등록을 한
            자로서, 파팟의 서비스를 지속적으로 이용할 수 있는 고객을 말합니다.
          </li>
          <li>
            &quot;비회원&quot;이란 회원가입 없이 파팟이 제공하는 서비스를
            이용하는 자를 말합니다.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">
          제3조 (약관의 명시, 설명 및 개정)
        </h3>
        <ul className="list-decimal list-inside space-y-2 text-gray-700">
          <li>
            파팟은 이 약관의 내용, 상호, 대표자 성명, 영업소 소재지(소비자
            불만처리 주소 포함), 전화번호, 전자우편주소, 사업자등록번호,
            통신판매업신고번호 등을 이용자가 쉽게 확인할 수 있도록 쇼핑몰 초기
            화면에 게시합니다.
          </li>
          <li>
            파팟은 「전자상거래 등에서의 소비자보호에 관한 법률」, 「약관의
            규제에 관한 법률」, 「전자거래기본법」, 「정보통신망 이용촉진 및
            정보보호 등에 관한 법률」 등 관련 법령을 위반하지 않는 범위 내에서
            본 약관을 개정할 수 있습니다.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">제4조 (서비스의 제공)</h3>
        <p className="text-gray-700 leading-relaxed mb-2">
          파팟은 다음과 같은 서비스를 제공합니다.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>재화 또는 용역에 대한 정보 제공 및 구매계약 체결</li>
          <li>구매계약이 체결된 재화 또는 용역의 배송</li>
          <li>기타 파팟이 정하는 관련 서비스</li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">제5조 (회원가입)</h3>
        <ul className="list-decimal list-inside space-y-2 text-gray-700">
          <li>
            이용자는 파팟이 정한 가입 양식에 따라 회원정보를 기입하고, 본 약관에
            동의함으로써 회원가입을 신청합니다.
          </li>
          <li>
            파팟은 다음 각 호에 해당하지 않는 한, 회원으로 등록합니다.
            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
              <li>이전에 회원자격을 상실한 이력이 있는 경우</li>
              <li>등록 내용에 허위, 누락 또는 오기가 있는 경우</li>
              <li>기술상 회원등록이 어려운 경우</li>
            </ul>
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">
          제6조 (회원 탈퇴 및 자격 상실)
        </h3>
        <ul className="list-decimal list-inside space-y-2 text-gray-700">
          <li>
            회원은 언제든지 탈퇴를 요청할 수 있으며, 파팟은 즉시 회원 탈퇴를
            처리합니다.
          </li>
          <li>
            회원이 다음 각 호에 해당하는 경우, 파팟은 회원자격을 제한 또는
            정지시킬 수 있습니다.
            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
              <li>가입 시 허위 내용을 등록한 경우</li>
              <li>구매 대금 등 채무를 기일 내 지급하지 않은 경우</li>
              <li>다른 이용자의 서비스 이용을 방해하거나 정보를 도용한 경우</li>
              <li>
                법령 또는 본 약관이 금지하거나 공서양속에 반하는 행위를 한 경우
              </li>
            </ul>
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">제7조 (배송)</h3>
        <ul className="list-decimal list-inside space-y-2 text-gray-700">
          <li>
            파팟은 상품의 배송 방법, 배송비, 배송 기간 등을 명시하며, 약정된
            배송기간을 초과한 경우 이용자의 손해를 배상합니다.
          </li>
          <li>
            배송비는 5만원 이상 구매 시 무료이며, 5만원 미만 시 3,000원이
            부과됩니다. 도서산간 지역은 추가 배송비가 발생할 수 있습니다.
          </li>
          <li>
            배송 중 파손 또는 오배송이 발생한 경우, 파팟은 이에 대한 책임을 지며
            이용자는 고객센터(010-5205-8631, playck@naver.com)로 문의하여 재배송
            또는 환불을 요청할 수 있습니다.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">제8조 (청약철회 등)</h3>
        <ul className="list-decimal list-inside space-y-2 text-gray-700">
          <li>
            이용자는 상품 수신 확인일로부터 7일 이내에 청약을 철회할 수
            있습니다.
          </li>
          <li>
            단, 다음의 경우에는 반품 및 교환이 불가능합니다.
            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
              <li>이용자의 책임으로 상품이 멸실 또는 훼손된 경우</li>
              <li>이용자의 사용으로 상품의 가치가 현저히 감소한 경우</li>
              <li>시간이 지나 재판매가 곤란해진 경우</li>
              <li>
                식물 등 변질 우려가 있는 상품이 이용자 부주의로 고사 또는 손상된
                경우
              </li>
            </ul>
          </li>
          <li>
            청약철회 시 반환에 필요한 비용은 이용자가 부담하나, 표시·광고 내용과
            다르거나 계약과 다르게 이행된 경우에는 파팟이 부담합니다.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">제9조 (환불)</h3>
        <p className="text-gray-700 leading-relaxed mb-3">
          이용자가 구매를 취소하거나 청약을 철회한 경우, 파팟은 3영업일 이내에
          결제 대금을 환급합니다. 지연 시에는 「전자상거래 등에서의 소비자보호에
          관한 법률 시행령」에서 정한 지연이자율을 적용합니다.
        </p>
        <p className="text-gray-700 leading-relaxed">
          환불 처리 기간은 결제 수단에 따라 다르며, 신용카드는 3~5영업일,
          계좌이체 및 가상계좌는 3영업일 이내 처리됩니다.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">제10조 (개인정보 보호)</h3>
        <ul className="list-decimal list-inside space-y-2 text-gray-700">
          <li>파팟은 서비스 제공에 필요한 최소한의 개인정보만 수집합니다.</li>
          <li>회원가입 시 불필요한 정보를 미리 수집하지 않습니다.</li>
          <li>
            개인정보를 수집·이용할 때에는 목적을 고지하고 동의를 받습니다.
          </li>
          <li>
            개인정보 보호 및 이용에 관한 사항은 관련 법령과 파팟의
            개인정보처리방침을 따릅니다.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">제11조 (전자금융거래)</h3>
        <p className="text-gray-700 leading-relaxed">
          파팟의 전자결제 및 금융거래는 전자금융거래법 등 관련 법령을 준수하며,
          전자금융거래 이용약관을 따릅니다.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">제12조 (회사의 의무)</h3>
        <ul className="list-decimal list-inside space-y-2 text-gray-700">
          <li>
            파팟은 법령과 본 약관을 준수하며, 안정적으로 서비스를 제공합니다.
          </li>
          <li>
            이용자의 개인정보를 안전하게 보호하기 위해 보안시스템을 갖춥니다.
          </li>
          <li>
            이용자의 동의 없이 영리목적의 광고성 이메일을 발송하지 않습니다.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">제13조 (회원의 의무)</h3>
        <p className="text-gray-700 leading-relaxed mb-2">
          이용자는 다음 행위를 해서는 안 됩니다.
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>허위 정보의 등록 또는 변경</li>
          <li>타인의 정보 도용</li>
          <li>파팟 게시정보의 무단 변경</li>
          <li>파팟 및 제3자의 지적재산권 침해</li>
          <li>파팟 또는 제3자의 명예를 훼손하거나 업무를 방해하는 행위</li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">제14조 (면책조항)</h3>
        <ul className="list-decimal list-inside space-y-2 text-gray-700">
          <li>
            천재지변 등 불가항력 사유로 서비스를 제공할 수 없는 경우, 파팟은
            책임을 지지 않습니다.
          </li>
          <li>
            이용자의 귀책사유로 인한 서비스 장애에 대해 파팟은 책임을 지지
            않습니다.
          </li>
          <li>
            이용자가 게시한 정보의 신뢰도·정확성 등에 대해 파팟은 책임을 지지
            않습니다.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">제15조 (분쟁 해결)</h3>
        <ul className="list-decimal list-inside space-y-2 text-gray-700">
          <li>
            파팟은 이용자의 정당한 의견이나 불만을 처리하고 피해를 보상하기 위한
            고객센터를 운영합니다.
          </li>
          <li>
            불만사항 접수 시 신속하게 처리하며, 지연되는 경우 사유와 일정을
            안내합니다.
          </li>
          <li>
            전자상거래 분쟁 발생 시, 이용자는 공정거래위원회 또는 지방자치단체
            분쟁조정기관의 조정에 신청할 수 있습니다.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">
          제16조 (재판권 및 준거법)
        </h3>
        <ul className="list-decimal list-inside space-y-2 text-gray-700">
          <li>
            본 약관 및 서비스 관련 분쟁은 파팟의 소재지 관할 법원을 제1심
            법원으로 합니다.
          </li>
          <li>
            파팟과 이용자 간의 전자상거래에 대해서는 대한민국 법률을 적용합니다.
          </li>
        </ul>
      </section>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600">시행일자: 2025년 1월 1일</p>
      </div>
    </div>
  );
}

// 개인정보처리방침 내용
function PrivacyTermContent() {
  return (
    <div className="prose prose-sm max-w-none space-y-6">
      <h2 className="text-2xl font-bold mb-6">개인정보 수집 및 이용</h2>

      <section>
        <p className="text-gray-700 leading-relaxed">
          파팟(이하 &quot;파팟&quot;)은 정보주체의 자유와 권리 보호를 위해
          「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여, 적법하게
          개인정보를 처리하고 안전하게 관리하고 있습니다.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">수집항목 및 수집목적</h3>
        <div className="bg-gray-50 px-4 py-2 rounded-lg mb-4">
          <p className="text-gray-700 mb-2">
            <strong>필수항목:</strong> 이름, 이메일, 비밀번호, 휴대전화번호,
            배송지 주소
          </p>
          <p className="text-gray-700 mb-2">
            <strong>선택항목:</strong> 생년월일
          </p>
          {/* <p className="text-gray-700">
            <strong>자동 수집 항목:</strong> IP주소, 쿠키, 서비스 이용 기록,
            접속 로그
          </p> */}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">
          수집항목 수집목적 보유 및 이용기간
        </h3>
        <p className="text-gray-700 mb-3">
          (필수) 로그인ID, 비밀번호, 이름, 생년월일, 휴대전화번호, 이메일 회원
          서비스 제공 및 본인 인증 회원탈퇴 시까지 단, 관계법령의 규정에 의하여
          보존할 필요가 있는 경우 관계법령이 정한 기간
        </p>
        <p className="text-gray-700 leading-relaxed mb-2">
          필요한 경우 다음과 같이 관계법령에서 정한 일정한 기간 동안 회원정보를
          보관합니다:
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
          <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
          <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
          <li>표시, 광고에 관한 기록: 6개월</li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">개인정보의 처리 목적</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            <strong>회원 가입 및 관리:</strong> 회원 가입의사 확인, 회원제
            서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리
          </li>
          <li>
            <strong>재화 또는 서비스 제공:</strong> 물품 배송, 서비스 제공,
            계약서·청구서 발송, 콘텐츠 제공, 요금결제·정산
          </li>
          <li>
            <strong>마케팅 및 광고:</strong> 신규 서비스 개발 및 맞춤 서비스
            제공, 이벤트 및 광고성 정보 제공
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">개인정보의 제3자 제공</h3>
        <p className="text-gray-700 leading-relaxed">
          파팟은 정보주체의 개인정보를 명시한 범위 내에서만 처리하며, 정보주체의
          동의, 법률의 특별한 규정 등에 해당하는 경우에만 개인정보를 제3자에게
          제공합니다.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">개인정보처리의 위탁</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>결제 처리: 포트원(PortOne)</li>
          <li>배송 업무: 배송 업체 (주문 시 선택한 업체)</li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">개인정보 보호책임자</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700">
            <strong className="block mb-2">개인정보 보호책임자</strong>
            성명: 이수경
            <br />
            직책: 대표
            <br />
            이메일: playck@naver.com
            <br />
            전화번호: 010-5205-8631
          </p>
        </div>
      </section>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          공고일자: 2025년 1월 1일
          <br />
          시행일자: 2025년 1월 1일
        </p>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        * 동의를 거부할 수 있으며, 거부하시는 경우 회원 전용 서비스 이용에
        제한이 있을 수 있습니다.
      </div>
    </div>
  );
}

// 전자금융거래 이용약관 내용
function FinanceTermContent() {
  return (
    <div className="prose prose-sm max-w-none space-y-6">
      <h2 className="text-2xl font-bold mb-6">전자금융거래 이용약관</h2>

      <section>
        <h3 className="text-lg font-semibold mb-3">제1조 (목적)</h3>
        <p className="text-gray-700 leading-relaxed">
          본 약관은 파팟(이하 &quot;파팟&quot;)이 제공하는 전자금융거래 서비스를
          이용함에 있어 파팟과 이용자 간의 전자금융거래에 관한 기본적인 사항을
          정함을 목적으로 합니다.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">제2조 (용어의 정의)</h3>
        <ul className="list-decimal list-inside space-y-2 text-gray-700">
          <li>
            &quot;전자금융거래&quot;라 함은 파팟이 전자적 장치를 통하여 제공하는
            금융상품 및 서비스를 이용자가 전자적 장치를 통하여 비대면·자동화된
            방식으로 직접 이용하는 거래를 말합니다.
          </li>
          <li>
            &quot;이용자&quot;라 함은 본 약관에 동의하고 파팟이 제공하는
            전자금융거래 서비스를 이용하는 자를 말합니다.
          </li>
          <li>
            &quot;접근매체&quot;라 함은 전자금융거래에 있어서 거래지시를 하거나
            이용자 및 거래내용의 진실성과 정확성을 확보하기 위하여 사용되는 수단
            또는 정보를 말합니다.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">제3조 (접근매체의 관리)</h3>
        <ul className="list-decimal list-inside space-y-2 text-gray-700">
          <li>
            파팟은 전자금융거래 서비스 제공 시 접근매체를 선정하여 이용자의
            신원, 권한 및 거래지시의 내용 등을 확인할 수 있습니다.
          </li>
          <li>
            이용자는 접근매체를 제3자에게 대여하거나 사용을 위임하거나 양도 또는
            담보 목적으로 제공할 수 없습니다.
          </li>
          <li>
            이용자는 자신의 접근매체를 제3자에게 누설 또는 노출하거나
            방치하여서는 안되며, 접근매체의 도용이나 위조 또는 변조를 방지하기
            위하여 충분한 주의를 기울여야 합니다.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">제4조 (거래내용의 확인)</h3>
        <ul className="list-decimal list-inside space-y-2 text-gray-700">
          <li>
            파팟은 이용자와 미리 약정한 전자적 방법을 통하여 이용자의 거래내용을
            확인할 수 있도록 하며, 이용자의 요청이 있는 경우에는 요청을 받은
            날로부터 2주 이내에 거래내용에 관한 서면을 교부합니다.
          </li>
          <li>
            서면교부 대상기간은 서면교부 요구일로부터 과거 5년간으로 합니다.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">제5조 (오류의 정정)</h3>
        <ul className="list-decimal list-inside space-y-2 text-gray-700">
          <li>
            이용자는 전자금융거래 서비스를 이용함에 있어 오류가 있음을 안 때에는
            파팟에 대하여 그 정정을 요구할 수 있습니다.
          </li>
          <li>
            파팟은 오류의 정정요구를 받은 때에는 이를 즉시 조사하여 처리한 후
            정정요구를 받은 날부터 2주 이내에 그 결과를 이용자에게 알려
            드립니다.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">제6조 (회사의 책임)</h3>
        <p className="text-gray-700 leading-relaxed">
          접근매체의 위조나 변조로 발생한 사고로 인하여 이용자에게 발생한 손해에
          대하여 파팟이 배상책임을 집니다. 다만 이용자가 접근매체를 누설하거나
          방치한 경우 그 책임의 전부 또는 일부를 이용자가 부담하게 할 수
          있습니다.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">
          제7조 (분쟁처리 및 분쟁조정)
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-gray-700">
            <strong className="block mb-2">분쟁처리 책임자</strong>
            성명: 이수경
            <br />
            전화번호: 010-5205-8631
            <br />
            이메일: playck@naver.com
          </p>
        </div>
        <p className="text-gray-700 leading-relaxed">
          이용자는 금융감독원의 금융분쟁조정위원회에 조정을 신청할 수 있습니다.
        </p>
      </section>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600">시행일자: 2025년 1월 1일</p>
      </div>
    </div>
  );
}

// 환불/취소 정책 내용
function RefundTermContent() {
  return (
    <div className="prose prose-sm max-w-none space-y-6">
      <h2 className="text-2xl font-bold mb-6">환불/취소 정책</h2>

      <section>
        <h3 className="text-lg font-semibold mb-3">청약철회</h3>
        <p className="text-gray-700 leading-relaxed mb-3">
          재화 등을 공급받은 날부터 7일 이내에는 청약의 철회를 할 수 있습니다.
          다음 각 호에 해당하는 경우에는 반품 및 교환을 할 수 없습니다:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>이용자에게 책임 있는 사유로 재화 등이 멸실 또는 훼손된 경우</li>
          <li>
            이용자의 사용 또는 일부 소비에 의하여 재화 등의 가치가 현저히 감소한
            경우
          </li>
          <li>
            시간의 경과에 의하여 재판매가 곤란할 정도로 재화 등의 가치가 현저히
            감소한 경우
          </li>
          <li>
            생물의 경우, 배송 완료 후 이용자의 부주의로 인한 식물의 고사 또는
            손상
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">환불 처리</h3>
        <p className="text-gray-700 leading-relaxed mb-3">
          재화 등을 반환받은 경우 3영업일 이내에 이미 지급받은 재화 등의 대금을
          환급합니다.
        </p>
        <div className="space-y-2 text-gray-700">
          <p>
            <strong>신용카드:</strong> 취소 완료 후 3~5 영업일 이내 카드사 승인
            취소
          </p>
          <p>
            <strong>실시간 계좌이체:</strong> 취소 완료 후 3영업일 이내 환불
          </p>
          <p>
            <strong>가상계좌:</strong> 환불 계좌 확인 후 3영업일 이내 환불
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">배송 및 반품비용</h3>
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <p className="text-gray-700 mb-3">
            <strong className="block mb-2">배송비</strong>
            - 기본 배송비: 무료 (8만원 이상 구매 시)
            <br />
            - 5만원 미만 구매 시: 5,000원
            <br />- 도서산간 지역: 추가 배송비 발생 가능
          </p>
          <p className="text-gray-700">
            <strong className="block mb-2">반품비용</strong>
            - 단순 변심에 의한 반품: 왕복 배송비(10,000원) 고객 부담
            <br />- 상품 하자/오배송: 파팟 부담
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">주문 취소</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            <strong>결제 완료 전:</strong> 언제든지 무료로 취소 가능
          </li>
          <li>
            <strong>결제 완료 후, 배송 준비 전:</strong> 마이페이지에서 직접
            취소하거나 고객센터를 통해 취소 가능
          </li>
          <li>
            <strong>배송 시작 후:</strong> 취소가 불가능하며, 상품 수령 후 반품
            절차 진행
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">식물 상품 특별 안내</h3>
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
          <div className="text-gray-700 leading-relaxed">
            <strong className="block mb-2">
              식물은 생물 특성상 다음 사항에 유의해 주시기 바랍니다:
            </strong>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>
                배송 중 발생할 수 있는 약간의 잎 손상이나 흙 흘림은 교환/환불
                사유가 되지 않습니다.
              </li>
              <li>
                식물의 고사는 배송 완료 후 7일 이내에만 교환/환불이 가능하며,
                사진 첨부가 필요합니다.
              </li>
              <li>
                고객의 관리 소홀로 인한 식물 손상은 교환/환불이 불가능합니다.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">고객센터</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700">
            환불/취소 관련 문의사항이 있으시면 아래 고객센터로 연락주시기
            바랍니다.
            <br />
            <br />
            <strong>전화:</strong> 010-5205-8631 (평일 12:00 - 20:00, 목요일
            휴무)
            <br />
            <strong>이메일:</strong> playck@naver.com
          </p>
        </div>
      </section>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600">시행일자: 2025년 1월 1일</p>
      </div>
    </div>
  );
}
