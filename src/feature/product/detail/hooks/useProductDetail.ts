import { getProduct } from "@/shared/api/server-api";
import { useQuery } from "@tanstack/react-query";
import { ProductDetailAdapter } from "../adapters/ProductDetailAdapter";

export default function useProductDetail(id: string) {
  return useQuery({
    queryKey: ["productDetail", id],
    queryFn: async () => {
      const data = await getProduct(id);
      if (!data) {
        return null;
      }

      return ProductDetailAdapter.toClient(data);
    },
  });
}
