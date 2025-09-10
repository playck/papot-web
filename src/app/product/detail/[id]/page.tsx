import { notFound } from "next/navigation";
import { getProduct } from "@/shared/api/server-api";
import { ProductDetailAdapter } from "@/feature/product/detail/adapters/ProductDetailAdapter";
import ProductDetailView from "@/feature/product/detail/components/ProductDetailView";

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const rawProduct = await getProduct(params.id);

  if (!rawProduct) {
    return notFound();
  }

  const product = ProductDetailAdapter.toClient(rawProduct);

  if (!product) {
    return notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProductDetailView
        product={{
          id: product.id,
          imageUrls: product.imageUrls,
          name: product.name,
          price: product.price,
          discountedPrice: product.discountedPrice,
          hasDiscount: product.hasDiscount,
          discountRate: product.discountRate,
          quantity: product.quantity,
          detailDescription: product.detailDescription || "",
        }}
        productId={params.id}
      />
    </div>
  );
}
