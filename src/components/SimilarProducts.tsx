import getApiUrl from "@/lib/api";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { Product } from "@/lib/products";

interface SimilarProductsProps {
  currentProductId: number;
  category: string;
}

const SimilarProducts = ({ currentProductId, category }: SimilarProductsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        console.log("SimilarProducts: category prop received:", category);

        // First, fetch categories to get the category_id for the given category name
        const categoriesApi = getApiUrl("/products/categories");
        const categoriesResponse = await fetch(categoriesApi.url, categoriesApi.options);
        const categoriesData = await categoriesResponse.json();
        console.log("SimilarProducts: categoriesData from API:", categoriesData);

        const targetCategory = categoriesData.find((cat: any) => cat.name === category);
        console.log("SimilarProducts: targetCategory found:", targetCategory);

        if (targetCategory) {
          // Then, fetch products filtered by that category_id
          const productsApi = getApiUrl(`/products?category_id=${targetCategory.category_id}`);
          const productsResponse = await fetch(productsApi.url, productsApi.options);
          const productsData = await productsResponse.json();
          console.log("SimilarProducts: productsData for category:", productsData);

          // Ensure productsData is an array before filtering
          if (Array.isArray(productsData)) {
            const filtered = productsData.filter(
              (p: Product) => p.product_id !== currentProductId
            );
            console.log("SimilarProducts: filtered products:", filtered);
            setSimilarProducts(filtered);
          } else {
            console.warn("SimilarProducts: productsData is not an array:", productsData);
            setSimilarProducts([]); // Set to empty array to prevent further errors
          }
        }
      } catch (error) {
        console.error("Error fetching similar products:", error);
      }
    };

    fetchSimilarProducts();
  }, [category, currentProductId]);

  if (similarProducts.length === 0) {
    return null;
  }

  const slidesPerView = isMobile ? 2 : 4;

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev >= similarProducts.length - slidesPerView ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev <= 0 ? similarProducts.length - slidesPerView : prev - 1
    );
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Similar Products
          </h2>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
              disabled={similarProducts.length <= slidesPerView}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
              disabled={similarProducts.length <= slidesPerView}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)` }}
          >
            {similarProducts.map((product) => (
              <div key={product.product_id} className={`${isMobile ? 'w-1/2' : 'w-1/4'} flex-shrink-0 px-2`}>
                <ProductCard
                  product_id={product.product_id}
                  name={product.name}
                  price={product.price}
                  image_url={product.image_url}
                  is_active={product.is_active}
                  description={product.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimilarProducts;