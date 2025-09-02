"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts, getProduct, getCategories } from "../api/client-api";
import { ProductListParams } from "../types/product";

// 상품 목록 조회
export function useProductList(params: ProductListParams = {}) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
  });
}

// 상품 상세 조회
export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });
}

// 카테고리 목록 조회
export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}
