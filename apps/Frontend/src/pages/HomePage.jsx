import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section with Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative bg-gradient-to-r from-blue-600 to-indigo-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <motion.span
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="block"
              >
                Training & Placement Cell
              </motion.span>
              <motion.span
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="block text-indigo-200"
              >
                NIT Kurukshetra
              </motion.span>
            </h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-3 max-w-md mx-auto text-base text-indigo-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
            >
              Connecting bright minds with industry leaders. Streamlined
              recruitment process for students and recruiters.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8"
            >
              <div className="rounded-md shadow">
                <Link
                  to="/signup"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10 transition-all duration-300 hover:scale-105"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section with Scroll Animation */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerChildren}
        className="py-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeIn} className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need in one place
            </p>
          </motion.div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {["Students", "Recruiters", "Admins"].map((role, index) => (
                <motion.div
                  key={role}
                  variants={fadeIn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900">
                      For {role}
                    </h3>
                    <div className="mt-5">
                      <ul className="space-y-3">
                        {[1, 2, 3, 4].map((item) => (
                          <motion.li
                            key={item}
                            variants={{
                              hidden: { opacity: 0, x: -10 },
                              visible: { opacity: 1, x: 0 },
                            }}
                            className="flex items-start"
                          >
                            <span className="text-green-500">✓</span>
                            <span className="ml-2">Feature {item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Statistics Section with Counter Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-indigo-800"
      >
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {[
              { number: "500+", label: "Companies" },
              { number: "1000+", label: "Placements" },
              { number: "50 LPA", label: "Highest Package" },
              { number: "95%", label: "Placement Rate" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ scale: 1.1 }}
                className="text-center"
              >
                <motion.span
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-4xl font-extrabold text-white"
                >
                  {stat.number}
                </motion.span>
                <p className="mt-2 text-xl font-medium text-indigo-200">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Footer with Fade In Animation */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white"
      >
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-base text-gray-400">
              © 2024 NIT Kurukshetra. All rights reserved.
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Home;
