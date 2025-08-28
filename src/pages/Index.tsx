import getApiUrl from "@/lib/api";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import ProductSection from "@/components/ProductSection";
import CallbackButton from "@/components/CallbackButton";
import ContactForm from "@/components/ContactForm";
import { Testimonial } from "@/components/ui/testimonial-card";
import Footer from "@/components/Footer";
import SearchResults from "@/components/SearchResults";
import { Product } from "@/lib/products"; // Keep Product interface for type safety

function Index() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedDropdownItem, setSelectedDropdownItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProductsAndCategories = async () => {
      try {
        const productsApi = getApiUrl("/products");
        console.log("Fetching products from:", productsApi.url);
        const productsResponse = await fetch(productsApi.url, productsApi.options);
        console.log("Products response status:", productsResponse.status);
        const productsText = await productsResponse.text();
        console.log("Products raw response text:", productsText);
        if (!productsResponse.ok) {
          throw new Error(`HTTP error! status: ${productsResponse.status}, body: ${productsText}`);
        }
        const productsData = JSON.parse(productsText);
        console.log("Products data:", productsData);
        setAllProducts(productsData);

        const categoriesApi = getApiUrl("/products/categories");
        console.log("Fetching categories from:", categoriesApi.url);
        const categoriesResponse = await fetch(categoriesApi.url, categoriesApi.options);
        console.log("Categories response status:", categoriesResponse.status);
        const categoriesText = await categoriesResponse.text();
        console.log("Categories raw response text:", categoriesText);
        if (!categoriesResponse.ok) {
          throw new Error(`HTTP error! status: ${categoriesResponse.status}, body: ${categoriesText}`);
        }
        const categoriesData = JSON.parse(categoriesText);
        console.log("Categories data:", categoriesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProductsAndCategories();
  }, []);

  const handleDropdownItemClick = (item: string) => {
    setSelectedDropdownItem(item);
    setSearchQuery("");
  };

  const handleLogoClick = () => {
    setSelectedDropdownItem(null);
    setSearchQuery("");
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedDropdownItem(null);
  };

  useEffect(() => {
    let filtered: Product[] = [];
    if (searchQuery) {
      filtered = allProducts.filter(p =>
        (p.name && p.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    } else if (selectedDropdownItem) {
      const category = categories.find(cat => cat.name.toLowerCase() === selectedDropdownItem.toLowerCase());
      if (category) {
        filtered = allProducts.filter(p => p.category_id === category.category_id);
      } else {
        // Handle specific cases that don't directly map to a single category name
        switch (selectedDropdownItem) {
          case "Kids Birthday":
            const themesCategory = categories.find(cat => cat.name === "Themes");
            if (themesCategory) {
              filtered = allProducts.filter(p => p.category_id === themesCategory.category_id).slice(0, 4);
            }
            break;
          case "Adult Birthday":
            const themesCategoryAdult = categories.find(cat => cat.name === "Themes");
            if (themesCategoryAdult) {
              filtered = allProducts.filter(p => p.category_id === themesCategoryAdult.category_id).slice(4, 8);
            }
            break;
          case "Balloon Decorations":
            // Assuming 'Balloon Surprise' is a product, not a category
            filtered = allProducts.filter(p => p.title === "Balloon Surprise");
            break;
          case "Flower Decorations":
            // Assuming 'Flower Decorations' is a product, not a category
            filtered = allProducts.filter(p => p.title === "Yellow Marigold Garland Decor");
            break;
          case "Backdrop Decorations":
            // Assuming these are specific products, not a category
            filtered = allProducts.filter(p => ["Simple Superman Theme Decoration", "Pink Birthday Bedroom Decoration", "Mickey Mouse Birthday Theme Decoration"].includes(p.title));
            break;
          default:
            filtered = [];
        }
      }
    }
    setFilteredProducts(filtered);

    if (filtered.length > 0) {
      setTimeout(() => {
        const element = document.getElementById(searchQuery ? "search-results" : "filtered-section");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [selectedDropdownItem, searchQuery, allProducts, categories]);

  const getProductsByCategory = (categoryName: string) => {
    const category = categories.find(cat => cat.name === categoryName);
    if (category) {
      return allProducts.filter(p => p.category_id === category.category_id);
    }
    return [];
  };

  return (
    <div className="min-h-screen bg-[#FFF8F4]">
      <Header onDropdownItemClick={handleDropdownItemClick} onLogoClick={handleLogoClick} onSearch={handleSearch} />
      <HeroCarousel />
      
      {searchQuery ? (
        <SearchResults results={filteredProducts} />
      ) : filteredProducts.length > 0 ? (
        <ProductSection
          id="filtered-section"
          title={selectedDropdownItem || ""}
          products={filteredProducts}
        />
      ) : (
        <>
          <ProductSection 
            title="Theme Decoration" 
            categoryName="Themes"
            products={getProductsByCategory("Themes")} 
          />

          <ProductSection
              title="Mascots"
              categoryName="Mascots"
              products={getProductsByCategory("Mascots")}
          />
          
          <ProductSection 
            title="House Warming Decoration" 
            categoryName="House Warming"
            products={getProductsByCategory("House Warming")}
            bgColor="bg-secondary/30"
          />
          
          <ProductSection 
            title="Birthday Decoration" 
            categoryName="Birthday"
            products={getProductsByCategory("Birthday")}
          />
          
          <ProductSection 
            title="Baby Shower Decoration" 
            categoryName="Baby Shower"
            products={getProductsByCategory("Baby Shower")}
            bgColor="bg-accent/20"
          />
        </>
      )}
      
      <ContactForm />
      <section className="py-16 bg-[#FFF8F4]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Testimonial
              name="Sarah Johnson"
              role="Product Manager"
              company="Amazun"
              rating={5}
              image="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=256&h=256&q=80"
              testimonial="This library has completely transformed how we build our UI components. The attention to detail and smooth animations make our application stand out. Highly recommended!"
            />
            <Testimonial
              name="John Doe"
              role="Software Engineer"
              company="Goggle"
              rating={4}
              image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256&q=80"
              testimonial="The components are well documented and easy to customize. The code quality is top-notch and the support is excellent. I'm very happy with my purchase."
            />
            <Testimonial
              name="Emily Chen"
              role="UX Designer"
              company="Microsift"
              rating={5}
              image="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=256&h=256&q=80"
              testimonial="The accessibility features and design system consistency are impressive. It's saved us countless hours in development time."
            />
          </div>
        </div>
      </section>
      <Footer />
      <CallbackButton />
    </div>
  );
}

export default Index;