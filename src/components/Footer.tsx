import { Phone, Mail, Facebook, Twitter, Youtube, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-[#FFF8F4]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About PartyOne */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-red-800">About BookMyBirthdayParty</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              BMBP is your go-to for event planning and management, making celebrations seamless and memorable.
            </p>
            <div className="space-y-2">
              <p className="text-gray-600 text-sm">Get connected with us on the social network!</p>
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <Facebook className="w-4 h-4 text-white" />
                </a>
                <a href="#" className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <Twitter className="w-4 h-4 text-white" />
                </a>
                <a href="#" className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <Youtube className="w-4 h-4 text-white" />
                </a>
                <a href="#" className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <Instagram className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Home */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-red-800">Home</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 text-sm hover:text-red-800 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-red-800 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-red-800">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 text-sm hover:text-red-800 transition-colors">Refund & Cancellation</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-red-800 transition-colors">Recent Bookings</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-red-800">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-600" />
                <span className="text-gray-600 text-sm">+91 93534 09904</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-600" />
                <span className="text-gray-600 text-sm">info@bookmybirthdayparty.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 mt-8 pt-8 flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-gray-600 text-sm">
            ©Studiox97 Pvt. Ltd 2025
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 