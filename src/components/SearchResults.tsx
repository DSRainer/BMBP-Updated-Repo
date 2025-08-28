
import ProductCard from "./ProductCard";
import { Product } from "@/lib/products";

interface SearchResultsProps {
  results: Product[];
}

const SearchResults = ({ results }: SearchResultsProps) => {
  if (results.length === 0) {
    return <div className="text-center py-12">No products found.</div>;
  }

  return (
    <section id="search-results" className="py-12 bg-[#FFF8F4]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
          Search Results
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((product) => (
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
    </section>
  );
};

export default SearchResults;
