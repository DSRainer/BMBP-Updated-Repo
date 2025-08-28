import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { Product } from "@/lib/products"; // Import the updated Product interface

interface ProductSectionProps {
  title: string;
  products: Product[];
  bgColor?: string;
  id?: string;
  categoryName?: string;
}

const ProductSection = ({ title, products, bgColor = "bg-background", id, categoryName }: ProductSectionProps) => {
  return (
    <section id={id} className={`py-12 bg-[#FFF8F4]`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            {title}
          </h2>
          <Link to={`/view-all/${encodeURIComponent(categoryName || title)}`}>
            <Button variant="outline" className="flex items-center gap-2 group">
              <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
              View All
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.product_id} // Use product_id for the key
              product_id={product.product_id}
              name={product.name}
              price={product.price}
              image_url={product.image_url}
              is_active={product.is_active}
              description={product.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;