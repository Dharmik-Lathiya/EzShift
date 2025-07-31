import React from 'react'

export default function LandingPerformance() {
  return (
    <section className="performance-section relative w-full min-h-screen bg-black">
      {/* Black gradient transition area */}
      <div className="w-full h-40 bg-gradient-to-b from-black via-black/80 to-red-900/30"></div>
      
      {/* Main content area with gradient */}
      <div className="relative w-full min-h-screen bg-gradient-to-br from-black via-red-900 to-black overflow-hidden">
        {/* Simple Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50"></div>
          
          {/* Simple animated particles */}
          <div className="absolute top-20 left-10 w-1 h-1 bg-red-500 rounded-full animate-pulse opacity-40"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-red-400 rounded-full animate-ping opacity-30"></div>
          <div className="absolute top-60 left-1/4 w-1 h-1 bg-red-600 rounded-full animate-pulse opacity-50"></div>
          <div className="absolute top-80 right-1/3 w-1 h-1 bg-red-500 rounded-full animate-ping opacity-40"></div>
          
          {/* Simple gradient orbs */}
          <div className="absolute top-32 left-1/3 w-24 h-24 bg-gradient-to-r from-red-600/10 to-transparent rounded-full blur-lg"></div>
          <div className="absolute bottom-32 right-1/4 w-32 h-32 bg-gradient-to-l from-red-500/8 to-transparent rounded-full blur-xl"></div>
        </div>

        <div className="text-center pt-20 pl-4 pr-4 md:pl-8 md:pr-8 md:pb-20 pb-16 relative z-10">
          <div className="animate-fade-in-up">
            <h2 className="text-red-400 font-bold md:text-5xl text-3xl mb-6">
              Performance That Speaks
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-16">
              Experience lightning-fast delivery with our cutting-edge technology and dedicated fleet of vehicles.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-black/60 backdrop-blur-sm border border-red-500/20 rounded-xl p-6 
              hover:border-red-500/40 hover:bg-black/80 transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
              style={{animationDelay: '0.2s'}}>
              <div className="text-red-400 text-4xl mb-4">
                <i className="fa-solid fa-arrow-up-right-dots"></i>
              </div>
              <div className="text-red-300 text-2xl font-bold mb-2">5109+</div>
              <div className="text-gray-400">Successful Deliveries</div>
            </div>
            
            <div className="bg-black/60 backdrop-blur-sm border border-red-500/20 rounded-xl p-6 
              hover:border-red-500/40 hover:bg-black/80 transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
              style={{animationDelay: '0.4s'}}>
              <div className="text-red-400 text-4xl mb-4">
                <i className="fa-brands fa-slack"></i>
              </div>
              <div className="text-red-300 text-2xl font-bold mb-2">100m+</div>
              <div className="text-gray-400">Miles Covered</div>
            </div>
            
            <div className="bg-black/60 backdrop-blur-sm border border-red-500/20 rounded-xl p-6 
              hover:border-red-500/40 hover:bg-black/80 transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
              style={{animationDelay: '0.6s'}}>
              <div className="text-red-400 text-4xl mb-4">
                <i className="fa-solid fa-bolt"></i>
              </div>
              <div className="text-red-300 text-2xl font-bold mb-2">99.99%</div>
              <div className="text-gray-400">Uptime Guarantee</div>
            </div>
            
            <div className="bg-black/60 backdrop-blur-sm border border-red-500/20 rounded-xl p-6 
              hover:border-red-500/40 hover:bg-black/80 transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
              style={{animationDelay: '0.8s'}}>
              <div className="text-red-400 text-4xl mb-4">
                <i className="fa-solid fa-star"></i>
              </div>
              <div className="text-red-300 text-2xl font-bold mb-2">4.9★</div>
              <div className="text-gray-400">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
