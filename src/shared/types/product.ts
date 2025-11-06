export interface Product {
  id: string;
  name: string;
  description?: string;
  detailDescription?: string;
  price: number;
  discountRate?: number;
  quantity: number;
  isPublished: boolean;
  categoryId?: number;
  badges?: string[];
  uploadedBy: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrls: string[];
}

export interface ProductListParams {
  category?: string;
  search?: string;
  limit?: number;
  offset?: number;
  sortBy?: "name" | "price" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  hasMore: boolean;
}
