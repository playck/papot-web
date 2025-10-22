/**
 * 현재 날짜에서 지정된 일수만큼 이후의 날짜를 포맷팅하여 반환
 * @param daysToAdd - 현재 날짜로부터 며칠 후인지
 * @returns "월/일(요일)" 형식의 문자열 (예: "10/27(월)")
 */
export function getDateAfterDays(daysToAdd: number): string {
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + daysToAdd);

  const month = futureDate.getMonth() + 1;
  const date = futureDate.getDate();
  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][
    futureDate.getDay()
  ];

  return `${month}/${date} (${dayOfWeek})`;
}

/**
 * 배송 예정일 조회 (현재 날짜 + 5일)
 * @returns "월/일(요일)" 형식의 문자열
 */
export function getDeliveryDate(): string {
  return getDateAfterDays(5);
}
