import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const PopularDishes: React.FC = () => {
  const dishes = [
    { name: "Biryani Special", price: 15, img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80" , path: "/search/sultan%20dine" } ,
    { name: "Smash Burger", price: 12, img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80" , path: "/search/Pizzaburg"  },
    { name: "Vegan Salad", price: 10, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL1-WBv2e8SFSBMSyX69QRtMDchFQNTdsRNA&s" , path: "/search/Captain"  },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-12 text-gray-900 tracking-wide">Our Bestsellings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {dishes.map((dish, idx) => (
            <Link to={dish.path}  key={idx}>
                   <motion.div
             
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.3, type: "spring", stiffness: 80 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl cursor-pointer overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="h-64 overflow-hidden rounded-t-2xl">
                <img
                  src={dish.img}
                  alt={dish.name}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/400x300?text=Image+Not+Found")}
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{dish.name}</h3>
                <p className="text-orange-500 font-bold text-xl">${dish.price}</p>
              </div>
            </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDishes;
