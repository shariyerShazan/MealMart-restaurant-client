import React from "react";
import { FaLeaf, FaTruck, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const FeatureSection: React.FC = () => {
  const features = [
    { icon: <FaLeaf />, title: "Fresh Ingredients", desc: "We use only the freshest ingredients in every meal." },
    { icon: <FaTruck />, title: "Fast Delivery", desc: "Get your food delivered hot & fresh to your doorstep." },
    { icon: <FaStar />, title: "Top Quality", desc: "Our dishes are prepared with high-quality standards." },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-12 text-gray-800">Why Choose MealMart?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.3 }}
              viewport={{ once: true }}
              className="p-6 bg-white rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="text-5xl text-orange-500 mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
