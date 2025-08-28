import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  content: string;
  name: string;
  date: string;
  avatar: string;
}

const TestimonialsCarousel = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      content: "The birthday decorations were absolutely lovely, and we were pleased with overall look! The only feedback I have is regarding cake table; since it wasn't part of original theme, I specifically asked for it, but it simply didn't look good. It wasn't quite as visually appropriate as the rest setup.",
      name: "Sangita Malav",
      date: "1 Jun 2025",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face"
    },
    {
      id: 2,
      content: "Very well organized. The team was on time. The anchor was good. He was able to keep the kids engage into the game activities. The balloon modelling and tatoo artist were very good. Highly recommended for further birthday and other events.",
      name: "Silvi Dheer",
      date: "22 Feb 2025",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
    },
    {
      id: 3,
      content: "We recently celebrated our son's birthday at home, and PartyOne did an exceptional job with the decorations! The setup was vibrant, creative, and beautifully done, making the day feel extra special. Every detail was thoughtfully arranged, and the atmosphere they created truly brought joy to our celebration. Thank you, PartyOne, for making the event memorable—we highly recommend your services!",
      name: "Sandeep J. Sonawane",
      date: "4 Jun 2025",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Our Customers Say on Google
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-gray-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-gray-50"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-12">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-300 ${
                  index === currentIndex ? "scale-105" : "scale-100"
                }`}
              >
                <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-6">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {testimonial.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel; 