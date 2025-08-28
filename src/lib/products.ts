export interface Product {
  product_id: number;
  name: string;
  price: string; // Backend returns price as string
  image_url: string;
  is_active?: boolean;
  description: string;
  category_id: number;

  // Properties that are not directly from backend, making them optional
  originalPrice?: number; // Use price from backend
  salePrice?: number; // Not directly available from backend
  rating?: number; // Not directly available from backend
  images?: string[]; // Not directly available from backend
  amenities?: string[]; // Not directly available from backend
  reviews?: string; // Not directly available from backend
}