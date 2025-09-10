"use client";

import { ProductDetailInfo as ProductDetailInfoType } from "../adapters/ProductDetailAdapter";

interface ProductDetailInfoProps {
  htmlContent: ProductDetailInfoType["detailDescription"];
}

export default function ProductDetailInfo({
  htmlContent,
}: ProductDetailInfoProps) {
  return (
    <div className="w-full">
      <div
        className="previewContainer"
        dangerouslySetInnerHTML={{ __html: htmlContent || "" }}
      />
      <style jsx>{`
        .previewContainer {
          font-family: inherit;
          line-height: 1.6;
        }

        /* 미리보기 헤더 스타일 */
        .previewContainer :global(h1) {
          font-size: 2rem;
          font-weight: 700;
          margin: 1rem 0 0.5rem 0;
          line-height: 1.2;
          color: #1f2937;
        }

        .previewContainer :global(h2) {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0.875rem 0 0.5rem 0;
          line-height: 1.3;
          color: #374151;
        }

        .previewContainer :global(h3) {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0.75rem 0 0.5rem 0;
          line-height: 1.4;
          color: #4b5563;
        }

        .previewContainer :global(h4) {
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0.625rem 0 0.5rem 0;
          line-height: 1.4;
          color: #6b7280;
        }

        .previewContainer :global(h5) {
          font-size: 1rem;
          font-weight: 600;
          margin: 0.5rem 0 0.5rem 0;
          line-height: 1.5;
          color: #6b7280;
        }

        .previewContainer :global(h6) {
          font-size: 0.875rem;
          font-weight: 600;
          margin: 0.5rem 0 0.5rem 0;
          line-height: 1.5;
          color: #9ca3af;
        }

        /* 미리보기 텍스트 스타일 */
        .previewContainer :global(p) {
          margin: 0.5rem 0;
          line-height: 1.6;
        }

        .previewContainer :global(strong),
        .previewContainer :global(b) {
          font-weight: 700;
        }

        .previewContainer :global(em),
        .previewContainer :global(i) {
          font-style: italic;
        }

        .previewContainer :global(u) {
          text-decoration: underline;
        }

        /* 미리보기 리스트 스타일 */
        .previewContainer :global(ul) {
          margin: 0.5rem 0;
          padding-left: 1.5rem;
          list-style-type: disc;
        }

        .previewContainer :global(ol) {
          margin: 0.5rem 0;
          padding-left: 1.5rem;
          list-style-type: decimal;
        }

        .previewContainer :global(li) {
          margin: 0.25rem 0;
        }

        /* 미리보기 인용구 스타일 */
        .previewContainer :global(blockquote) {
          margin: 1rem 0;
          padding: 0.75rem 1rem;
          border-left: 4px solid #3b82f6;
          background-color: #eff6ff;
          font-style: italic;
        }

        /* 미리보기 이미지 스타일 */
        .previewContainer :global(img) {
          max-width: 100%;
          height: auto;
          margin: 0.5rem 0;
          border-radius: 0.375rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        /* 미리보기 링크 스타일 */
        .previewContainer :global(a) {
          color: #3b82f6;
          text-decoration: underline;
        }

        .previewContainer :global(a:hover) {
          color: #1d4ed8;
        }

        /* 미리보기 테이블 스타일 */
        .previewContainer :global(table) {
          border-collapse: collapse;
          width: 100%;
          margin: 1rem 0;
          font-size: 0.875rem;
        }

        .previewContainer :global(th),
        .previewContainer :global(td) {
          border: 1px solid #e5e7eb;
          padding: 0.5rem;
          text-align: left;
        }

        .previewContainer :global(th) {
          background-color: #f9fafb;
          font-weight: 600;
        }

        /* 미리보기 코드 스타일 */
        .previewContainer :global(code) {
          background-color: #f3f4f6;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-family: "Courier New", monospace;
          font-size: 0.875rem;
        }

        .previewContainer :global(pre) {
          background-color: #f3f4f6;
          padding: 1rem;
          border-radius: 0.375rem;
          overflow-x: auto;
          margin: 1rem 0;
        }

        .previewContainer :global(pre code) {
          background-color: transparent;
          padding: 0;
        }

        /* 미리보기 구분선 스타일 */
        .previewContainer :global(hr) {
          border: none;
          border-top: 2px solid #e5e7eb;
          margin: 1.5rem 0;
        }

        /* div 요소들의 기본 스타일 */
        .previewContainer :global(div) {
          line-height: 1.6;
        }

        .previewContainer :global(br) {
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}
