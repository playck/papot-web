export const formatKoreanPrice = (price: number) => {
  return `${price.toLocaleString("ko-KR")}원`;
};
