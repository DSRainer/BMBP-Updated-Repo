import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const heroSlides = [
  {
    id: 1,
    title: "Create the Party of Your Dreams",
    subtitle: "For every special occasion",
    image: "carousel1.jpg", // Placeholder image
    buttonText: "Book Now",
    bgColor: "bg-pink-300",
    textColor: "text-pink-800",
    buttonColor: "bg-pink-500",
  },
  {
    id: 2,
    title: "Make Every Memory Memorable",
    subtitle: "With Us",
    image: "carousel3.jpg", // Placeholder image
    buttonText: "Explore Packages",
    bgColor: "bg-blue-300",
    textColor: "text-blue-800",
    buttonColor: "bg-blue-500",
  },
  {
    id: 3,
    title: "Live & Breathe a Fun Night",
    subtitle: "with our Artists",
    image: "carousel2.PNG", // Placeholder image
    buttonText: "Discover Themes",
    bgColor: "bg-purple-200",
    textColor: "text-purple-800",
    buttonColor: "bg-purple-500",
  },
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  return (
    <section className="relative w-full h-[600px] lg:h-[600px] md:h-[500px] overflow-hidden">
      <div className="relative w-full h-full">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${slide.bgColor} ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-repeat bg-center animate-pulse-slow" style={{backgroundImage: "url('/path-to-your-pattern.svg')", opacity: 0.05}}></div>
            <div className="container mx-auto px-4 h-full flex flex-col md:flex-row items-center justify-center md:justify-between text-center md:text-left lg:mt-3">
              {/* Image Section (Mobile) */}
              <div className="md:hidden w-full max-w-xs mx-auto mb-6 h-64">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover rounded-lg shadow-lg blur-md"
                />
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-lg transition-opacity duration-500 opacity-0"
                  onLoad={(e) => e.currentTarget.style.opacity = '1'}
                />
              </div>

              {/* Text Content */}
              <div className="z-10 flex flex-col items-center md:items-start max-w-md">
                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-serif font-bold ${slide.textColor}`}>
                  {slide.title}
                </h1>
                <p className={`mt-4 text-lg ${slide.textColor} opacity-80 font-mono italic`}>
                  {slide.subtitle}
                </p>
                <Button
                  size="lg"
                  className={`mt-8 ${slide.buttonColor} text-white font-serif hover:opacity-90 font-semibold px-8 py-4 rounded-full shadow-lg text-lg`}
                >
                  {slide.buttonText}
                </Button>
              </div>

              {/* Image Section (Desktop) */}
              <div className="hidden md:block w-3/5 h-full relative">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover rounded-2xl shadow-2xl blur-md"
                />
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl shadow-2xl transition-opacity duration-500 opacity-0"
                  onLoad={(e) => e.currentTarget.style.opacity = '1'}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white/90 border border-gray-200 text-gray-600 shadow-lg z-20 rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white/90 border border-gray-200 text-gray-600 shadow-lg z-20 rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight className="w-5 h-5" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-red-500 w-8" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;



