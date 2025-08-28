import getApiUrl from "@/lib/api";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Share2, Heart, ShoppingCart, Package as PackageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import SimilarProducts from "@/components/SimilarProducts";
import NotFound from "./NotFound";
import { useCart } from "@/context/CartContext";
import CustomizationModal from "@/components/CustomizationModal";
import PackageSelector from "@/components/PackageSelector";
import { AddOn } from "@/components/CustomizationModal";
import { Product } from "@/lib/products";
import { Package } from "@/context/CartContext";




const ProductDetail = () => {
  const { id } = useParams<{id: string}>();
  const { addToCart } = useCart();
  const [isPackageSelectorOpen, setIsPackageSelectorOpen] = useState(false);
  const [isCustomizationModalOpen, setIsCustomizationModalOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [showAmenities, setShowAmenities] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProductAndCategories = async () => {
      try {
        const productApi = getApiUrl(`/products/${id}`);
        const productResponse = await fetch(productApi.url, productApi.options);
        const productData = await productResponse.json();
        setProduct(productData);

        const categoriesApi = getApiUrl("/products/categories");
        const categoriesResponse = await fetch(categoriesApi.url, categoriesApi.options);
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

      } catch (error) {
        console.error("Error fetching product or categories:", error);
      }
    };

    if (id) {
      fetchProductAndCategories();
    }
  }, [id]);

  if (!product) {
    return <NotFound />;
  }

  // Use properties from the backend response
  const { product_id, name, price, image_url, description, category_id, amenities } = product;
  
  // Placeholder values for properties not directly from backend
  const originalPrice = parseFloat(price) + 500; // Example: add a fixed amount for original price
  const salePrice = parseFloat(price);
  const rating = 4.5; // Placeholder
  const reviews = "100 reviews"; // Placeholder

  const discount = Math.round(((originalPrice - salePrice) / originalPrice) * 100);

  const handleSelectPackage = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsPackageSelectorOpen(false);
    setIsCustomizationModalOpen(true);
  };

  const handleAddToCart = (product: Product, addOns: AddOn[]) => {
    addToCart(product, addOns, selectedPackage);
    setIsCustomizationModalOpen(false);
  };

  // Find the category name for SimilarProducts component
  const productCategory = categories.find(cat => cat.category_id === category_id);
  const categoryName = productCategory ? productCategory.name : "";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-primary">{name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img src={image_url} alt={name} className="w-full h-auto object-cover rounded-lg mb-4" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-gray-700">{rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">({reviews})</span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl font-bold text-primary">₹{salePrice.toLocaleString()}</span>
              {originalPrice > salePrice && (
                <span className="text-xl text-gray-400 line-through">₹{originalPrice.toLocaleString()}</span>
              )}
              {discount > 0 && (
                <Badge variant="destructive">{discount}% OFF</Badge>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">{description}</p>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Category</h3>
              <div className="flex gap-2">
                <Badge variant="secondary">{categoryName}</Badge>
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <Button size="lg" className="bg-primary hover:bg-green-500 text-white w-full" onClick={() => {
                setProduct(product);
                setIsPackageSelectorOpen(true);
              }}>
                <PackageIcon className="w-5 h-5 mr-2" />
                Choose your Package
              </Button>
              <Button size="lg" className="bg-primary hover:bg-green-500 text-white w-full" onClick={() => {
                setProduct(product);
                setIsCustomizationModalOpen(true);
              }}>
                <ShoppingCart className="w-5 h-5 mr-2" />
                Go A La Carte
              </Button>
              <Button size="icon" variant="ghost">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-primary mb-6 cursor-pointer" onClick={() => setShowAmenities(!showAmenities)}>What's Included</h2>
          {showAmenities && amenities && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {amenities.map((amenity: string, index: number) => (
                <div key={index} className="flex items-center gap-3 p-4 border rounded-lg">
                  <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="font-medium">{amenity}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <SimilarProducts currentProductId={product_id} category={categoryName} />

      <PackageSelector
        isOpen={isPackageSelectorOpen}
        onClose={() => setIsPackageSelectorOpen(false)}
        onSelectPackage={handleSelectPackage}
      />

      {product && (
        <CustomizationModal
          isOpen={isCustomizationModalOpen}
          onClose={() => setIsCustomizationModalOpen(false)}
          product={product}
          onAddToCart={handleAddToCart}
          selectedPackage={selectedPackage}
        />
      )}
    </div>
  );
};

export default ProductDetail;