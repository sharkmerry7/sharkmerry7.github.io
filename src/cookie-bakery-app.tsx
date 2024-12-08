import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { Cookie, Home, Info, Zap } from 'lucide-react';

// Import the existing slot machine component
import CookieFlavorSlotMachine from './CookieFlavorSlotMachine';

// Home Page Component
function HomePage() {
  return (
    <div className="container mx-auto px-6 py-12 text-center">
      <h1 className="text-4xl font-bold mb-6 text-amber-900">Welcome to Sweet Serendipity Bakery</h1>
      <div className="max-w-2xl mx-auto">
        <img 
          src="/api/placeholder/800/400" 
          alt="Bakery interior" 
          className="rounded-lg shadow-lg mb-6"
        />
        <p className="text-xl text-gray-700 mb-6">
          Where creativity meets deliciousness! We're not just baking cookies, we're crafting experiences.
        </p>
        <div className="flex justify-center space-x-4">
          <Link 
            to="/menu" 
            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition flex items-center"
          >
            <Cookie className="mr-2" /> Explore Our Menu
          </Link>
          <Link 
            to="/flavor-generator" 
            className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition flex items-center"
          >
            <Zap className="mr-2" /> Try Flavor Generator
          </Link>
        </div>
      </div>
    </div>
  );
}

// Menu Page Component
function MenuPage() {
  const menuItems = [
    { 
      name: 'Classic Chocolate Chip', 
      description: 'Our signature cookie with rich chocolate chips',
      price: '$2.50',
      icon: '🍫'
    },
    { 
      name: 'Lavender Shortbread', 
      description: 'Delicate shortbread with hints of lavender',
      price: '$3.00',
      icon: '🌿'
    },
    { 
      name: 'Matcha White Chocolate', 
      description: 'Exotic green tea cookie with white chocolate',
      price: '$3.50',
      icon: '🍵'
    },
    { 
      name: 'Salted Caramel Surprise', 
      description: 'Buttery cookie with caramel and sea salt',
      price: '$3.25',
      icon: '🍯'
    }
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center text-amber-900">Our Delectable Menu</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {menuItems.map((item, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-md p-6 flex items-center hover:shadow-lg transition"
          >
            <div className="text-5xl mr-4">{item.icon}</div>
            <div>
              <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <span className="font-bold text-teal-700">{item.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// About Us Page Component
function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center text-amber-900">About Sweet Serendipity</h1>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center mb-6">
          <img 
            src="/api/placeholder/300/300" 
            alt="Bakery founders" 
            className="w-48 h-48 rounded-full mr-6 object-cover"
          />
          <div>
            <h2 className="text-2xl font-semibold mb-2">Our Story</h2>
            <p className="text-gray-700">
              Founded in 2018 by two passionate bakers, Sweet Serendipity began as a small kitchen 
              experiment and grew into a beloved local bakery. We believe in pushing the boundaries 
              of traditional baking while maintaining the warmth of homemade treats.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold mb-2">Our Mission</h3>
            <p className="text-gray-600">
              To create unexpected, delightful cookie experiences that bring joy and surprise 
              to our customers' days.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Our Values</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Creativity in every bite</li>
              <li>Locally sourced ingredients</li>
              <li>Sustainable baking practices</li>
              <li>Community connection</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}





// Main App Component with Navigation
function BakeryApp() {
  return (
    <Router>
      <div className="min-h-screen bg-amber-50">
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center text-2xl font-bold text-amber-900">
              <Cookie className="mr-2" /> Sweet Serendipity
            </Link>
            <div className="space-x-4">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `hover:text-amber-700 ${isActive ? 'text-amber-900 font-bold' : 'text-gray-600'}`
                }
              >
                Home
              </NavLink>
              <NavLink 
                to="/menu" 
                className={({ isActive }) => 
                  `hover:text-amber-700 ${isActive ? 'text-amber-900 font-bold' : 'text-gray-600'}`
                }
              >
                Menu
              </NavLink>
              <NavLink 
                to="/flavor-generator" 
                className={({ isActive }) => 
                  `hover:text-amber-700 ${isActive ? 'text-amber-900 font-bold' : 'text-gray-600'}`
                }
              >
                Flavor Generator
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  `hover:text-amber-700 ${isActive ? 'text-amber-900 font-bold' : 'text-gray-600'}`
                }
              >
                About
              </NavLink>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/flavor-generator" element={<CookieFlavorSlotMachine />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>

        <footer className="bg-white py-6 mt-12 border-t">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-600">
              © 2024 Sweet Serendipity Bakery | Baking Happiness, One Cookie at a Time
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default BakeryApp;
