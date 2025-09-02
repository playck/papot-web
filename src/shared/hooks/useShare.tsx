interface ShareOptions {
  title: string;
  text?: string;
  url?: string;
}

export default function useShare() {
  const handleShare = async ({ title, text, url }: ShareOptions) => {
    try {
      const shareUrl = url || window.location.href;
      const shareText = text || `${title} - 특가 상품을 확인해보세요!`;

      if (navigator.share) {
        await navigator.share({
          title: title,
          text: shareText,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert("링크가 클립보드에 복사되었습니다!");
      }

      return { success: true };
    } catch (error) {
      console.error("공유 처리 중 오류:", error);

      alert("공유 기능을 사용할 수 없습니다. URL을 직접 복사해주세요.");
      return { success: false, error };
    }
  };

  return {
    share: handleShare,
  };
}
