import getApiUrl from "@/lib/api";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import NotFound from "./NotFound";
import Filter from "@/components/Filter";
import { Product } from "@/lib/products";

const ViewAll = () => {
  const { category } = useParams<{category: string}>();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({ minPrice: "", maxPrice: "", rating: "" });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const api = getApiUrl(`/products?category=${category}&product_type=BASE`);
        const response = await fetch(api.url, api.options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
        setFilteredProducts([]);
      }
    };

    if (category) {
      fetchProducts();
    }
  }, [category]);

  if (!category) {
    return <NotFound />;
  }

  const decodedCategory = decodeURIComponent(category);

  useEffect(() => {
    let productsToFilter = [...products];

    if (filters.minPrice) {
      productsToFilter = productsToFilter.filter(p => p.salePrice >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      productsToFilter = productsToFilter.filter(p => p.salePrice <= parseInt(filters.maxPrice));
    }
    if (filters.rating) {
      productsToFilter = productsToFilter.filter(p => p.rating >= parseFloat(filters.rating));
    }

    setFilteredProducts(productsToFilter);
  }, [filters, products]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  const handleClearFilters = () => {
    setFilters({ minPrice: "", maxPrice: "", rating: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-primary">{decodedCategory}</span>
        </nav>
        <h1 className="text-3xl font-bold text-foreground mb-6">{decodedCategory}</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="col-span-1">
            <Filter onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />
          </div>
          <div className="col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.product_id}
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
        </div>
      </div>
    </div>
  );
};

export default ViewAll;
