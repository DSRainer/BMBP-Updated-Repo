import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Youtube, Linkedin, Github, Heart, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-[#FFF8F4] text-gray-900">
      <Header />

      {/* About Hero */}
      <section className="container mx-auto px-4 py-14 md:py-20">
        <h1 className="text-3xl md:text-5xl font-extrabold text-center tracking-tight mb-6">
          About BookMyBirthdayParty
        </h1>
        <p className="max-w-4xl mx-auto text-center text-base md:text-xl text-gray-700 leading-relaxed">
          What began as a father's love for making birthdays magical turned into a full-blown passion project with his daughter by his side.
          Daniel always went the extra mile to make birthdays special for his kids. That love for celebrations sparked something bigger when his daughter Allegra, now a Communication Design graduate, brought her creative vision to the table.
          Together, this father–daughter duo founded Book My Birthday Party, a seamless, joy-filled party planning experience. With Daniel's years of entrepreneurial insight and Allegra's fresh ideas, they're turning chaos into celebration, one magical birthday at a time.
        </p>
      </section>

      {/* Brand Showcase */}
      <section className="container mx-auto px-4 py-8 md:py-14">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-10">@BookMyBirthdayParty</h2>
        <div className="max-w-xl mx-auto rounded-2xl shadow-xl bg-white p-8 md:p-12 mb-8">
          <img
            src="/BMBP-Trademark-Transparent.png"
            alt="BookMyBirthdayParty Logo"
            className="mx-auto max-h-48 object-contain"
          />
        </div>
        <p className="max-w-3xl mx-auto text-center text-gray-700">
          We believe every celebration should be special and stress-free. Our passion is crafting unforgettable moments and turning your dream party into a reality. From intimate gatherings to grand events, our team handles every detail with creativity and care.
        </p>
      </section>

      {/* Values */}
      <section className="container mx-auto px-4 py-10 md:py-16">
        <h3 className="text-2xl md:text-4xl font-extrabold text-center mb-10">Our Values</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Passion",
              text:
                "We pour our heart into every celebration, ensuring each party reflects your unique vision and style.",
              icon: <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />,
              gradient: "from-red-100 to-white",
            },
            {
              title: "Excellence",
              text:
                "We strive for perfection in every detail, from planning to execution, delivering exceptional experiences.",
              icon: <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />,
              gradient: "from-yellow-100 to-white",
            },
            {
              title: "Community",
              text:
                "We believe in bringing people together and creating moments that strengthen bonds and create lasting memories.",
              icon: <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />,
              gradient: "from-blue-100 to-white",
            },
          ].map((card) => (
            <div
              key={card.title}
              className={`bg-gradient-to-br ${card.gradient} rounded-2xl p-8 text-center shadow-lg transform hover:scale-105 transition-transform duration-300`}
            >
              {card.icon}
              <h4 className="text-2xl font-bold mb-3">{card.title}</h4>
              <p className="text-gray-700 leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission + Impact */}
      <section className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h3 className="text-2xl md:text-4xl font-extrabold mb-4">Our Mission</h3>
            <p className="text-gray-700 mb-6 max-w-xl">
              To be Mumbai's premier one-stop solution for children's birthday celebrations that delivers a complete experience, right from setup to cleanup.
            </p>
            <Link to="/">
              <Button className="bg-[#6C4CF2] hover:bg-[#5b3fe0] rounded-full px-6 md:px-8 text-white">
                Start Planning Your Party
              </Button>
            </Link>
          </div>
          <div>
            <img
              src="/girl_shower.jpg"
              alt="Mission"
              className="rounded-2xl shadow-2xl w-full object-cover"
            />
          </div>
        </div>

        {/* Impact */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-5 text-center">
          {[
            { stat: "5000+", label: "Happy Customers" },
            { stat: "10+", label: "Years Experience" },
            { stat: "15000+", label: "Parties Planned" },
            { stat: "4.9", label: "Average Rating" },
          ].map((i) => (
            <div key={i.label} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-2xl md:text-3xl font-extrabold text-gray-900">{i.stat}</div>
              <div className="text-gray-600 mt-1 text-sm md:text-base">{i.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="container mx-auto px-4 py-10 md:py-16">
        <h3 className="text-2xl md:text-4xl font-extrabold text-center mb-10">Meet Our Team</h3>
        <p className="max-w-3xl mx-auto text-center text-gray-700 mb-10">
          Our passionate team of event specialists, creatives, and technology experts work together to make your celebrations extraordinary with decades of combined experience.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { name: "Daniel", role: "CHIEF CELEBRATION OFFICER", img: "/team-daniel-new.png" },
            { name: "Allegra", role: "CHIEF IMAGINATION OFFICER", img: "/team-allegra-new.png" },
            { name: "Mavis", role: "CHIEF AESTHETIC OFFICER", img: "/team-mavis-new.png" },
            { name: "Jyotsna", role: "CHIEF STORYTELLING OFFICER", img: "/team-jyotsna-new.png" },
          ].map((m) => (
            <div key={m.name} className="relative group rounded-2xl overflow-hidden shadow-md">
              <img src={m.img} alt={m.name} className="h-fit w-fit object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="font-extrabold text-lg">{m.name}</div>
                <div className="text-xs opacity-90">{m.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="container mx-auto px-4 py-12 md:py-16 text-center">
        <h3 className="text-2xl md:text-4xl font-extrabold mb-3">Ready to Plan Your Dream Party?</h3>
        <p className="text-gray-700 max-w-4xl mx-auto mb-6 md:mb-8">
          Let our experienced team help you create an unforgettable celebration that your guests will talk about for years to come.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link to="/">
            <Button className="bg-[#6C4CF2] hover:bg-[#5b3fe0] rounded-full px-6 md:px-8 text-white">
              Start Planning Now
            </Button>
          </Link>
          <Link to="/#contact-form">
            <Button variant="outline" className="rounded-full px-6 md:px-8 border-2">
              Contact Our Team
            </Button>
          </Link>
        </div>
      </section>

      {/* Minimal Footer Bar */}
      <footer className="border-t bg-[#FFF8F4]">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-5 text-gray-700">
            <Instagram className="w-5 h-5" />
            <Facebook className="w-5 h-5" />
            <Youtube className="w-5 h-5" />
            <Linkedin className="w-5 h-5" />
            <Github className="w-5 h-5" />
          </div>
          <p className="text-xs md:text-sm text-gray-600 text-center md:text-right">
            All rights reserved by Exclusively by Team BMBP
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;



