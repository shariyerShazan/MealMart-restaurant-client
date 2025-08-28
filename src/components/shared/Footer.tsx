import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if(email.trim()) {
      alert(`Subscribed with ${email}`);
      setEmail("");
    }
  };

  return (
    <footer className=" w-[90%] mx-auto  pt-6">
      <div className=" border-t-1 pt-6 border-t-gray-900 mx-auto ">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          
          {/* Logo & Description */}
          <div className="flex-1">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
             <span className=" text-shadow-[-2px_2px_2px_#000]">Meal<span className="text-orange-500">Mart</span></span>
          </h2>
            <p className="text-gray-400 max-w-sm">
              Discover and enjoy delicious meals from your favorite restaurants. We bring the best dishes to your doorstep.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="hover:text-orange-500 transition"><FaFacebookF size={25}/></a>
              <a href="#" className="hover:text-orange-500 transition"><FaTwitter size={25}/></a>
              <a href="#" className="hover:text-orange-500 transition"><FaInstagram size={25}/></a>
              <a href="#" className="hover:text-orange-500 transition"><FaLinkedinIn size={25}/></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              <li><a href="/" className="hover:text-orange-500 transition">Home</a></li>
              <li><a href="/about" className="hover:text-orange-500 transition">About</a></li>
              <li><a href="/restaurants" className="hover:text-orange-500 transition">Restaurants</a></li>
              <li><a href="/contact" className="hover:text-orange-500 transition">Contact</a></li>
              <li><a href="/faq" className="hover:text-orange-500 transition">FAQ</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-4">Subscribe to our Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Get latest updates about new restaurants, offers, and promotions.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="flex-1 px-4 py-2 rounded-l-full border  border-myColor text-gray-800"
              />
              <button 
                onClick={handleSubscribe}
                className="bg-myColor px-3 py-2 rounded-r-full text-white font-semibold hover:bg-orange-600 transition"
              >
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-12 py-3 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} MealMart. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
