import React from "react";
import { motion } from "framer-motion";

const UserFeedback: React.FC = () => {
  const feedbacks = [
    {
      name: "Sara Williams",
      feedback: "Amazing food and super fast delivery! MealMart has become my go-to for dinner.",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "James Smith",
      feedback: "Great variety of meals. The ordering process is seamless and easy to use.",
      img: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
      name: "Emily Johnson",
      feedback: "Highly recommend MealMart! Delicious meals and very responsive customer service.",
      img: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-12 text-gray-900">What Our Users Say</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {feedbacks.map((user, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.3, type: "spring", stiffness: 80 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow cursor-pointer"
            >
              <img
                src={user.img}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover mb-4"
                onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/150")}
              />
              <p className="text-gray-700 mb-4 italic">"{user.feedback}"</p>
              <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserFeedback;
