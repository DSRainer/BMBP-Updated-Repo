import { Star, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product_id: number; // Changed from id
  name: string; // Changed from title
  price: string; // Changed from originalPrice, type changed to string
  image_url: string; // Changed from image
  is_active?: boolean; // Changed from isNew
  description: string;
}

const ProductCard = ({ product_id, name, price, image_url, is_active, description }: ProductCardProps) => {
  const navigate = useNavigate();
  
  // Convert price string to number for display
  const numericPrice = parseFloat(price);

  const handleCardClick = () => {
    navigate(`/product/${product_id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-xl shadow-sm transition-all cursor-pointer border border-gray-200 overflow-hidden flex flex-col"
    >
      <div className="overflow-hidden">
        <img
          src={image_url}
          alt={name}
          className="w-full h-48 md:h-56 object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between p-4">
        <h3 className="font-medium text-gray-800 text-base text-center mb-2 line-clamp-2 min-h-[2.5rem]">
          {name}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-bold text-gray-900">₹{numericPrice.toLocaleString()}</span>
          {/* Removed originalPrice and salePrice display as they are not in backend */}
        </div>
        {/* Removed rating display as it is not in backend */}
      </div>
    </div>
  );
};

export default ProductCard;