import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ClientDashboardHeroSection() {
  const [activeTab, setActiveTab] = useState('residential');
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 10,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const features = [
    {
      icon: "🚚",
      title: "Reliable Transportation",
      description: "Our fleet of well-maintained vehicles ensures your belongings are transported safely and securely with GPS tracking.",
      gradient: "from-blue-500/10 to-cyan-500/10"
    },
    {
      icon: "📦",
      title: "Secure Packing",
      description: "We use high-quality packing materials to protect your items during the move with bubble wrap, foam, and custom crates.",
      gradient: "from-green-500/10 to-emerald-500/10"
    },
    {
      icon: "🛡️",
      title: "Insurance Coverage",
      description: "Complete insurance coverage for your peace of mind during the entire moving process with full damage protection.",
      gradient: "from-purple-500/10 to-violet-500/10"
    },
    {
      icon: "⏱️",
      title: "Timely Delivery",
      description: "We ensure timely delivery so you can settle into your new home without delays, with real-time tracking updates.",
      gradient: "from-orange-500/10 to-red-500/10"
    },
    {
      icon: "👥",
      title: "Professional Team",
      description: "Our experienced and trained professionals handle your belongings with utmost care and attention to detail.",
      gradient: "from-pink-500/10 to-rose-500/10"
    },
    {
      icon: "💰",
      title: "Affordable Pricing",
      description: "Competitive pricing with transparent costs and no hidden fees for all our services with flexible payment options.",
      gradient: "from-yellow-500/10 to-amber-500/10"
    }
  ];

  const services = {
    residential: [
      {
        icon: "🏠",
        title: "Home Relocation",
        description: "Complete household shifting with furniture assembly, appliance setup, and room organization.",
        price: "Starting from ₹8,000"
      },
      {
        icon: "🏢",
        title: "Apartment Moving",
        description: "Specialized apartment moving services with elevator coordination and space optimization.",
        price: "Starting from ₹6,000"
      },
      {
        icon: "🏡",
        title: "Villa Shifting",
        description: "Premium villa relocation with garden items, pool equipment, and luxury item handling.",
        price: "Starting from ₹15,000"
      }
    ],
    commercial: [
      {
        icon: "🏢",
        title: "Office Relocation",
        description: "Complete office shifting with IT equipment, furniture, and document management.",
        price: "Starting from ₹20,000"
      },
      {
        icon: "🏪",
        title: "Retail Store Moving",
        description: "Retail business relocation with inventory management and display setup.",
        price: "Starting from ₹12,000"
      },
      {
        icon: "🏭",
        title: "Warehouse Shifting",
        description: "Industrial warehouse relocation with heavy machinery and inventory transfer.",
        price: "Starting from ₹50,000"
      }
    ],
    specialized: [
      {
        icon: "🎹",
        title: "Piano Moving",
        description: "Expert piano and musical instrument relocation with climate-controlled transport.",
        price: "Starting from ₹5,000"
      },
      {
        icon: "🖼️",
        title: "Art & Antiques",
        description: "Premium handling of valuable art pieces, antiques, and collectibles.",
        price: "Starting from ₹3,000"
      },
      {
        icon: "🚗",
        title: "Vehicle Transport",
        description: "Safe car and bike transportation with enclosed carriers and insurance.",
        price: "Starting from ₹8,000"
      }
    ]
  };

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai to Pune",
      rating: 5,
      text: "EzShift made our family relocation incredibly smooth. The team was professional, punctual, and took great care of our belongings. Highly recommended!",
      image: "👩‍💼"
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi to Bangalore",
      rating: 5,
      text: "Outstanding service! They packed everything perfectly and delivered on time. The transparent pricing and no hidden costs were a huge relief.",
      image: "👨‍💼"
    },
    {
      name: "Anjali Patel",
      location: "Chennai to Hyderabad",
      rating: 5,
      text: "The best moving experience we've had. The insurance coverage gave us peace of mind, and everything arrived in perfect condition.",
      image: "👩‍🏫"
    },
    {
      name: "Vikram Singh",
      location: "Ahmedabad to Mumbai",
      rating: 5,
      text: "Professional team with excellent customer service. They handled our delicate items with special care. Worth every penny!",
      image: "👨‍🚀"
    }
  ];

  const stats = [
    { number: "50,000+", label: "Happy Customers", icon: "😊" },
    { number: "15+", label: "Years Experience", icon: "⭐" },
    { number: "200+", label: "Cities Covered", icon: "🌏" },
    { number: "99.8%", label: "Safe Delivery", icon: "✅" }
  ];

  const process = [
    {
      step: "01",
      title: "Free Quote",
      description: "Get instant quote online or schedule a free in-home survey for accurate pricing.",
      icon: "📋"
    },
    {
      step: "02",
      title: "Planning",
      description: "Our team creates a customized moving plan based on your specific requirements.",
      icon: "📅"
    },
    {
      step: "03",
      title: "Packing",
      description: "Professional packing using high-quality materials with proper labeling and inventory.",
      icon: "📦"
    },
    {
      step: "04",
      title: "Loading",
      description: "Careful loading with proper equipment and techniques to prevent damage during transport.",
      icon: "🚚"
    },
    {
      step: "05",
      title: "Transport",
      description: "Safe transportation with real-time tracking and regular updates on delivery status.",
      icon: "🛣️"
    },
    {
      step: "06",
      title: "Delivery",
      description: "Timely delivery and unpacking at your new location with setup assistance.",
      icon: "🏠"
    }
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Hero Section */}
      <motion.div 
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div> */}
        
        <div className="relative px-10 py-20 lg:py-32">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center px-4 py-2 mb-6 bg-white/20 backdrop-blur-sm rounded-full border border-white/30"
            >
              <span className="text-sm font-medium">✨ India's #1 Moving Service</span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl lg:text-6xl xl:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
            >
              Move with
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                EzShift
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl lg:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed"
            >
              Experience seamless relocation with our comprehensive house shifting service. 
              From packing to unpacking, we handle every detail with care and precision.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <motion.button
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Free Quote
              </motion.button>
              <motion.button
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Call: +91 98765-43210
              </motion.button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-2xl lg:text-3xl font-bold text-yellow-300">{stat.number}</div>
                  <div className="text-sm text-blue-100">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Animation Elements */}
        <motion.div 
          className="absolute top-20 left-10 text-4xl"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🏠
        </motion.div>
        <motion.div 
          className="absolute top-32 right-20 text-3xl"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          📦
        </motion.div>
        <motion.div 
          className="absolute bottom-20 left-20 text-3xl"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          🚚
        </motion.div>
      </motion.div>

      {/* Why Choose Section */}
      <motion.div 
        className="flex flex-col items-center gap-16 px-10 py-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div 
          className="max-w-4xl w-full text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 mb-6 bg-blue-100 text-blue-600 rounded-full border border-blue-200"
          >
            <span className="text-sm font-semibold">Why Choose Us</span>
          </motion.div>

          <motion.h2 
            variants={itemVariants}
            className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
          >
            Why Choose EzShift?
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto"
          >
            We provide a comprehensive house shifting service, taking care of every detail from packing to unpacking, 
            so you can focus on settling into your new home with complete peace of mind and confidence.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`group p-8 border border-gray-200 rounded-2xl bg-gradient-to-br ${feature.gradient} backdrop-blur-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer relative overflow-hidden`}
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              
              <motion.div 
                className="text-4xl mb-4 inline-block"
                variants={iconVariants}
                whileHover="hover"
              >
                {feature.icon}
              </motion.div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>

              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-transparent rounded-bl-full"></div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Services Section */}
      <motion.div 
        className="bg-white px-10 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center px-4 py-2 mb-6 bg-green-100 text-green-600 rounded-full border border-green-200"
            >
              <span className="text-sm font-semibold">Our Services</span>
            </motion.div>
            <motion.h2 
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800"
            >
              Complete Moving Solutions
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              From residential moves to commercial relocations, we offer specialized services tailored to your unique needs.
            </motion.p>
          </motion.div>

          {/* Service Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 rounded-full p-1">
              {Object.keys(services).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 capitalize ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Service Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {services[activeTab].map((service, index) => (
                <motion.div
                  key={index}
                  className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 group"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-600">{service.price}</span>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      Learn More →
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* How It Works Section */}
      <motion.div 
        className="bg-gradient-to-br from-gray-50 to-blue-50/30 px-10 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center px-4 py-2 mb-6 bg-purple-100 text-purple-600 rounded-full border border-purple-200"
            >
              <span className="text-sm font-semibold">How It Works</span>
            </motion.div>
            <motion.h2 
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800"
            >
              Simple 6-Step Process
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              Our streamlined process ensures a hassle-free moving experience from start to finish.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div 
        className="bg-white px-10 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="inline-flex items-center px-4 py-2 mb-6 bg-yellow-100 text-yellow-600 rounded-full border border-yellow-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold">Customer Reviews</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            What Our Customers Say
          </motion.h2>

          <div className="relative h-64 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                className="absolute inset-0 flex flex-col justify-center"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-6xl mb-4">{testimonials[activeTestimonial].image}</div>
                <p className="text-xl text-gray-600 mb-6 italic leading-relaxed">
                  "{testimonials[activeTestimonial].text}"
                </p>
                <div>
                  <h4 className="text-lg font-bold text-gray-800">
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <p className="text-gray-500">{testimonials[activeTestimonial].location}</p>
                  <div className="flex justify-center mt-2">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">⭐</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeTestimonial === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Move? Let's Get Started!
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 text-blue-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            Get your free quote today and experience the EzShift difference.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="px-10 py-4 bg-white text-blue-600 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Free Quote Now
            </motion.button>
            <motion.button
              className="px-10 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Survey
            </motion.button>
          </motion.div>

          <motion.div 
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">📞</div>
              <div className="font-bold">Call Us</div>
              <div className="text-blue-100">+91 98765-43210</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">📧</div>
              <div className="font-bold">Email Us</div>
              <div className="text-blue-100">info@ezshift.com</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">💬</div>
              <div className="font-bold">WhatsApp</div>
              <div className="text-blue-100">+91 98765-43210</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div 
        className="bg-gray-50 px-10 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center px-4 py-2 mb-6 bg-orange-100 text-orange-600 rounded-full border border-orange-200"
            >
              <span className="text-sm font-semibold">FAQ</span>
            </motion.div>
            <motion.h2 
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600"
            >
              Get answers to common questions about our moving services.
            </motion.p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "How do you calculate moving costs?",
                answer: "Our pricing is based on factors like distance, volume of items, packing requirements, and additional services. We provide transparent quotes with no hidden fees after a free survey."
              },
              {
                question: "Do you provide packing materials?",
                answer: "Yes! We provide all necessary packing materials including boxes, bubble wrap, foam, tape, and specialized materials for fragile items. All materials are included in our service packages."
              },
              {
                question: "Is my furniture and belongings insured during the move?",
                answer: "Absolutely! We provide comprehensive insurance coverage for all your belongings. Our insurance policy covers damage or loss during packing, loading, transportation, and unloading."
              },
              {
                question: "How far in advance should I book your services?",
                answer: "We recommend booking at least 1-2 weeks in advance, especially during peak moving seasons (summer months and year-end). However, we can accommodate urgent moves with 24-48 hours notice."
              },
              {
                question: "Do you offer storage facilities?",
                answer: "Yes, we provide secure, climate-controlled storage facilities for short-term and long-term needs. Our warehouses are monitored 24/7 with advanced security systems."
              },
              {
                question: "Can you move plants and pets?",
                answer: "We can relocate plants with proper care and documentation. For pets, we recommend specialized pet relocation services, though we can coordinate with trusted partners for pet transportation."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Service Areas Section */}
      <motion.div 
        className="bg-white px-10 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center px-4 py-2 mb-6 bg-red-100 text-red-600 rounded-full border border-red-200"
            >
              <span className="text-sm font-semibold">Service Areas</span>
            </motion.div>
            <motion.h2 
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800"
            >
              We Serve Across India
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              From metro cities to tier-2 towns, we provide reliable moving services across 200+ cities in India.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { city: "Mumbai", icon: "🏙️", routes: "150+ routes" },
              { city: "Delhi", icon: "🏛️", routes: "200+ routes" },
              { city: "Bangalore", icon: "🌆", routes: "180+ routes" },
              { city: "Chennai", icon: "🌴", routes: "120+ routes" },
              { city: "Pune", icon: "🎓", routes: "90+ routes" },
              { city: "Hyderabad", icon: "💎", routes: "100+ routes" },
              { city: "Kolkata", icon: "🎭", routes: "80+ routes" },
              { city: "Ahmedabad", icon: "🕌", routes: "70+ routes" }
            ].map((area, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors duration-300 group"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{area.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">{area.city}</h3>
                <p className="text-sm text-gray-500">{area.routes}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 mb-4">Don't see your city? We're expanding rapidly!</p>
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors">
              Check Service Availability
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Tips Section */}
      <motion.div 
        className="bg-gradient-to-br from-green-50 to-blue-50 px-10 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center px-4 py-2 mb-6 bg-green-100 text-green-600 rounded-full border border-green-200"
            >
              <span className="text-sm font-semibold">Moving Tips</span>
            </motion.div>
            <motion.h2 
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800"
            >
              Expert Moving Tips
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              Make your move smoother with these professional tips from our experienced team.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: "📝",
                title: "Create a Moving Checklist",
                tip: "Start planning 8 weeks before moving. Create a detailed checklist and timeline to avoid last-minute stress.",
                category: "Planning"
              },
              {
                icon: "📦",
                title: "Pack Smart",
                tip: "Pack heavy items in small boxes and light items in large boxes. Label all boxes clearly with room and contents.",
                category: "Packing"
              },
              {
                icon: "🏷️",
                title: "Label Everything",
                tip: "Use a color-coding system for different rooms. Keep an inventory list of valuable items for insurance purposes.",
                category: "Organization"
              },
              {
                icon: "🧹",
                title: "Declutter First",
                tip: "Donate or sell items you don't need. This reduces moving costs and makes unpacking easier in your new home.",
                category: "Preparation"
              },
              {
                icon: "💼",
                title: "Pack Essentials Box",
                tip: "Pack a 'first day' box with essentials like toiletries, medications, phone chargers, and a change of clothes.",
                category: "Essential"
              },
              {
                icon: "📸",
                title: "Document Valuables",
                tip: "Take photos of valuable items and electronics before packing. This helps with insurance claims if needed.",
                category: "Protection"
              }
            ].map((tip, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-300">{tip.icon}</div>
                  <div>
                    <div className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-2">{tip.category}</div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {tip.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{tip.tip}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}