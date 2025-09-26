import React from 'react';
import LandingHeader from '../Component/Landing/LandingHeader';
import LandingFooter from '../Component/Landing/LandingFooter';

export default function LandingAboutPage() {
  return (
    <>
      <LandingHeader />

      <main className="bg-gray-50">
        {/* Hero Section */}
        <section className="bg-white py-20">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">About Our Company</h1>
            <p className="text-lg text-gray-600">
              We are passionate about delivering innovative solutions and exceptional services that make a real difference.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our mission is to empower individuals and businesses with technology that is both powerful and easy to use. We strive to provide products and services that exceed expectations and foster growth.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1581091215363-32a3be54f6c3?auto=format&fit=crop&w=800&q=80" 
                alt="Our mission" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </section>

        {/* Journey Section */}
        <section className="bg-white py-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Our Journey</h2>
            <p className="text-gray-600 text-lg leading-relaxed text-center max-w-3xl mx-auto">
              Founded in 2025, we started with a simple idea: to make technology accessible and beneficial for everyone. From a small office to a thriving organization, our core values of integrity, collaboration, and customer focus have remained unchanged. We continue to grow while staying true to our mission of innovation and excellence.
            </p>
          </div>
        </section>

        {/* Team / Values Section */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-2">Integrity</h3>
                <p className="text-gray-600">We always act honestly and uphold strong moral principles in everything we do.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
                <p className="text-gray-600">Teamwork drives our success. We value working together to achieve common goals.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-gray-600">We embrace creativity and continuously improve our solutions for our clients.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </>
  );
}
