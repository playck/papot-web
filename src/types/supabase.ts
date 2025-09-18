export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4";
  };
  public: {
    Tables: {
      cart_items: {
        Row: {
          cart_id: string;
          created_at: string | null;
          id: string;
          product_id: string;
          product_image: string | null;
          product_name: string;
          quantity: number;
          total_price: number;
          unit_price: number;
          updated_at: string | null;
        };
        Insert: {
          cart_id: string;
          created_at?: string | null;
          id?: string;
          product_id: string;
          product_image?: string | null;
          product_name: string;
          quantity: number;
          total_price: number;
          unit_price: number;
          updated_at?: string | null;
        };
        Update: {
          cart_id?: string;
          created_at?: string | null;
          id?: string;
          product_id?: string;
          product_image?: string | null;
          product_name?: string;
          quantity?: number;
          total_price?: number;
          unit_price?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "cart_items_cart_id_fkey";
            columns: ["cart_id"];
            isOneToOne: false;
            referencedRelation: "carts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "cart_items_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
      carts: {
        Row: {
          created_at: string | null;
          id: string;
          total_amount: number;
          total_quantity: number;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          total_amount?: number;
          total_quantity?: number;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          total_amount?: number;
          total_quantity?: number;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "carts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      categories: {
        Row: {
          created_at: string;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      order_items: {
        Row: {
          created_at: string;
          id: string;
          order_id: string;
          product_description: string | null;
          product_discount_rate: number | null;
          product_id: string;
          product_image_url: string | null;
          product_name: string;
          product_price: number;
          quantity: number;
          total_price: number;
          unit_price: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          order_id: string;
          product_description?: string | null;
          product_discount_rate?: number | null;
          product_id: string;
          product_image_url?: string | null;
          product_name: string;
          product_price: number;
          quantity: number;
          total_price: number;
          unit_price: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          order_id?: string;
          product_description?: string | null;
          product_discount_rate?: number | null;
          product_id?: string;
          product_image_url?: string | null;
          product_name?: string;
          product_price?: number;
          quantity?: number;
          total_price?: number;
          unit_price?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_order_items_order";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_order_items_product";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
      orders: {
        Row: {
          coupon_discount: number;
          created_at: string;
          customer_id: string;
          delivery_request: string | null;
          final_price: number;
          id: string;
          order_number: string;
          point_discount: number;
          recipient_name: string;
          recipient_phone: string;
          shipping_address: string;
          shipping_detail_address: string | null;
          shipping_fee: number;
          shipping_zip_code: string;
          status: string;
          total_product_price: number;
          updated_at: string;
        };
        Insert: {
          coupon_discount?: number;
          created_at?: string;
          customer_id: string;
          delivery_request?: string | null;
          final_price?: number;
          id?: string;
          order_number: string;
          point_discount?: number;
          recipient_name: string;
          recipient_phone: string;
          shipping_address: string;
          shipping_detail_address?: string | null;
          shipping_fee?: number;
          shipping_zip_code: string;
          status?: string;
          total_product_price?: number;
          updated_at?: string;
        };
        Update: {
          coupon_discount?: number;
          created_at?: string;
          customer_id?: string;
          delivery_request?: string | null;
          final_price?: number;
          id?: string;
          order_number?: string;
          point_discount?: number;
          recipient_name?: string;
          recipient_phone?: string;
          shipping_address?: string;
          shipping_detail_address?: string | null;
          shipping_fee?: number;
          shipping_zip_code?: string;
          status?: string;
          total_product_price?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_orders_customer";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      product_images: {
        Row: {
          created_at: string | null;
          display_order: number;
          id: string;
          image_url: string;
          is_primary: boolean | null;
          product_id: string;
        };
        Insert: {
          created_at?: string | null;
          display_order?: number;
          id?: string;
          image_url: string;
          is_primary?: boolean | null;
          product_id: string;
        };
        Update: {
          created_at?: string | null;
          display_order?: number;
          id?: string;
          image_url?: string;
          is_primary?: boolean | null;
          product_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
      products: {
        Row: {
          badges: Json | null;
          category_id: number | null;
          created_at: string | null;
          description: string;
          detail_description: string | null;
          discount_rate: number | null;
          id: string;
          image_urls: string[] | null;
          is_published: boolean | null;
          name: string;
          price: number;
          quantity: number;
          updated_at: string | null;
          uploaded_by: string | null;
        };
        Insert: {
          badges?: Json | null;
          category_id?: number | null;
          created_at?: string | null;
          description: string;
          detail_description?: string | null;
          discount_rate?: number | null;
          id?: string;
          image_urls?: string[] | null;
          is_published?: boolean | null;
          name: string;
          price: number;
          quantity?: number;
          updated_at?: string | null;
          uploaded_by?: string | null;
        };
        Update: {
          badges?: Json | null;
          category_id?: number | null;
          created_at?: string | null;
          description?: string;
          detail_description?: string | null;
          discount_rate?: number | null;
          id?: string;
          image_urls?: string[] | null;
          is_published?: boolean | null;
          name?: string;
          price?: number;
          quantity?: number;
          updated_at?: string | null;
          uploaded_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          phone: string | null;
          user_name: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          id: string;
          phone?: string | null;
          user_name?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          phone?: string | null;
          user_name?: string | null;
        };
        Relationships: [];
      };
      user_addresses: {
        Row: {
          address: string;
          address_name: string | null;
          created_at: string;
          detail_address: string | null;
          id: string;
          is_default: boolean | null;
          phone: string;
          recipient_name: string;
          updated_at: string;
          user_id: string;
          zip_code: string;
        };
        Insert: {
          address: string;
          address_name?: string | null;
          created_at?: string;
          detail_address?: string | null;
          id?: string;
          is_default?: boolean | null;
          phone: string;
          recipient_name: string;
          updated_at?: string;
          user_id: string;
          zip_code: string;
        };
        Update: {
          address?: string;
          address_name?: string | null;
          created_at?: string;
          detail_address?: string | null;
          id?: string;
          is_default?: boolean | null;
          phone?: string;
          recipient_name?: string;
          updated_at?: string;
          user_id?: string;
          zip_code?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_user_addresses_user";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
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
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;

// 편의를 위한 타입 별칭
export type Product = Database["public"]["Tables"]["products"]["Row"];
export type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];
export type ProductUpdate = Database["public"]["Tables"]["products"]["Update"];

export type Cart = Database["public"]["Tables"]["carts"]["Row"];
export type CartInsert = Database["public"]["Tables"]["carts"]["Insert"];
export type CartUpdate = Database["public"]["Tables"]["carts"]["Update"];

export type CartItem = Database["public"]["Tables"]["cart_items"]["Row"];
export type CartItemInsert =
  Database["public"]["Tables"]["cart_items"]["Insert"];
export type CartItemUpdate =
  Database["public"]["Tables"]["cart_items"]["Update"];

export type Order = Database["public"]["Tables"]["orders"]["Row"];
export type OrderInsert = Database["public"]["Tables"]["orders"]["Insert"];
export type OrderUpdate = Database["public"]["Tables"]["orders"]["Update"];

export type OrderItem = Database["public"]["Tables"]["order_items"]["Row"];
export type OrderItemInsert =
  Database["public"]["Tables"]["order_items"]["Insert"];
export type OrderItemUpdate =
  Database["public"]["Tables"]["order_items"]["Update"];

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];
export type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];

export type UserAddress = Database["public"]["Tables"]["user_addresses"]["Row"];
export type UserAddressInsert =
  Database["public"]["Tables"]["user_addresses"]["Insert"];
export type UserAddressUpdate =
  Database["public"]["Tables"]["user_addresses"]["Update"];

export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type CategoryInsert =
  Database["public"]["Tables"]["categories"]["Insert"];
export type CategoryUpdate =
  Database["public"]["Tables"]["categories"]["Update"];

export type ProductImage =
  Database["public"]["Tables"]["product_images"]["Row"];
export type ProductImageInsert =
  Database["public"]["Tables"]["product_images"]["Insert"];
export type ProductImageUpdate =
  Database["public"]["Tables"]["product_images"]["Update"];
