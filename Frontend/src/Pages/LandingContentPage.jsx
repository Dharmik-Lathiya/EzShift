import React from 'react';
import LandingHeader from '../Component/Landing/LandingHeader';
import LandingFooter from '../Component/Landing/LandingFooter';

export default function LandingContentPage() {
  return (
    <>
      <LandingHeader />

      <main className="bg-gray-50 min-h-screen">
    
        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">Contect Us Company</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8 text-center">
            Welcome to our digital home! We are a passionate team dedicated to creating innovative solutions and providing exceptional service. Our mission is to empower our clients by delivering products that are not only powerful but also intuitive and easy to use.
          </p>
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Our Journey</h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            Founded in 2025, we started with a simple idea: to make technology accessible and beneficial for everyone. From our humble beginnings in a small office, we have grown into a thriving organization, but our core values of integrity, collaboration, and customer focus have remained unchanged.
          </p>
        </section>

        {/* Map Section */}
        <section className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">Find Us In Person</h2>
            <p className="text-gray-600 text-lg mb-8 text-center">
              We are located in the heart of the city. Feel free to visit us during business hours.
            </p>
            <div className="overflow-hidden rounded-lg shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118147.68744211158!2d70.73699664426217!3d22.27346377229551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c98ac7140001%3A0x3210738555132d19!2sRajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1727353590000!5m2!1sen!2sin"
                width="100%"
                height="450"
                className="border-0 w-full"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Office Location in Rajkot"
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </>
  );
}
