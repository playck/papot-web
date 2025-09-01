export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          price: number;
          discount_rate: number | null;
          quantity: number;
          is_published: boolean;
          category_id: number | null;
          created_at: string;
          updated_at: string;
          badges: string[] | null;
          uploaded_by: string;
          image_urls: string[] | null;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          price: number;
          discount_rate?: number | null;
          quantity?: number;
          is_published?: boolean;
          category_id?: number | null;
          created_at?: string;
          updated_at?: string;
          badges?: string[] | null;
          uploaded_by: string;
          image_urls?: string[] | null;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          price?: number;
          discount_rate?: number | null;
          quantity?: number;
          is_published?: boolean;
          category_id?: number | null;
          created_at?: string;
          updated_at?: string;
          badges?: string[] | null;
          uploaded_by?: string;
          image_urls?: string[] | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// 편의를 위한 타입 별칭
export type Product = Database["public"]["Tables"]["products"]["Row"];
export type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];
export type ProductUpdate = Database["public"]["Tables"]["products"]["Update"];
