import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { Cookie, Home, Info, Zap, Lock, Unlock } from 'lucide-react';

// Import the existing slot machine component
//import CookieFlavorSlotMachine from './CookieFlavorSlotMachine';

// Home Page Component
function HomePage() {
  return (
    <div className="container mx-auto px-6 py-12 text-center">
      <h1 className="text-4xl font-bold mb-6 text-amber-900">Welcome to Sweet Serendipity Bakery</h1>
      <div className="max-w-4xl mx-auto">
        <img 
          src="assets/backgroundcookies.jpg" 
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
      <div className="max-w-4xl grid md:grid-cols-2 gap-6">
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
//Generator
const Button = ({ children, onClick, disabled, variant = 'default', className = '' }) => {
  const baseStyles = "px-4 py-2 rounded transition-colors";
  const variantStyles = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
  };

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
};

const DOUGH_TYPES = [
  { name: 'Sugar Cookie', emoji: '🍪' },
  { name: 'Chocolate Cookie', emoji: '🍫' },
  { name: 'Peanut Butter Cookie', emoji: '🥜' }
];

const TOPPINGS = [
  { name: 'Chocolate Chips', emoji: '🍫' },
  { name: 'Sprinkles', emoji: '🌈' },
  { name: 'Caramel Drizzle', emoji: '🍯' },
  { name: 'Crushed Nuts', emoji: '🥜' },
  { name: 'Marshmallow', emoji: '☁️' },
  { name: 'Sea Salt', emoji: '🧂' },
  { name: 'Coconut Flakes', emoji: '🥥' },
  { name: 'Dried Fruit', emoji: '🍇' },
  { name: 'White Chocolate', emoji: '⚪' },
  { name: 'Cinnamon Sugar', emoji: '🌿' }
];

function AnimatedReel({ isSpinning, finalTopping, isLocked, options }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let animationInterval;
    
    if (isSpinning && !isLocked) {
      animationInterval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % options.length);
      }, 100);
    }

    return () => {
      if (animationInterval) clearInterval(animationInterval);
    };
  }, [isSpinning, isLocked, options]);

  const prevTopping = options[(currentIndex - 1 + options.length) % options.length];
  const currentTopping = isSpinning && !isLocked
    ? options[currentIndex] 
    : finalTopping;
  const nextTopping = options[(currentIndex + 1) % options.length];

  return (
    <div className="w-20 h-28 m-1 border border-gray-300 flex flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center">
        <div className="text-3xl">{prevTopping.emoji}</div>
        <div className="text-3xl">{currentTopping.emoji}</div>
        <div className="text-3xl">{nextTopping.emoji}</div>
      </div>
    </div>
  );
}

function CookieFlavorSlotMachine() {
  const [isAnySpinning, setIsAnySpinning] = useState(false);
  const [reelSpinning, setReelSpinning] = useState([false, false, false, false]);
  const [reelLocked, setReelLocked] = useState([false, false, false, false]);
  const [finalToppings, setFinalToppings] = useState([
    DOUGH_TYPES[0],
    TOPPINGS[0],
    TOPPINGS[0],
    TOPPINGS[0]
  ]);

  const generateCombination = () => {
    if (isAnySpinning) return;

    const newSpinning = reelLocked.map((locked) => !locked);
    const newFinalToppings = finalToppings.map((currentTopping, index) => 
      reelLocked[index] 
        ? currentTopping 
        : (index === 0 ? DOUGH_TYPES : TOPPINGS)[Math.floor(Math.random() * (index === 0 ? DOUGH_TYPES : TOPPINGS).length)]
    );

    setReelSpinning(newSpinning);
    setIsAnySpinning(newSpinning.some(spin => spin));
    setFinalToppings(newFinalToppings);

    setTimeout(() => {
      setIsAnySpinning(false);
      setReelSpinning([false, false, false, false]);
    }, 3000);
  };

  const toggleLock = (index) => {
    const newLocked = [...reelLocked];
    newLocked[index] = !newLocked[index];
    setReelLocked(newLocked);
  };

  const stopReel = (index) => {
    if (isAnySpinning && !reelLocked[index]) {
      const newSpinning = [...reelSpinning];
      newSpinning[index] = false;

      const newFinalToppings = [...finalToppings];
      newFinalToppings[index] = (index === 0 ? DOUGH_TYPES : TOPPINGS)[Math.floor(Math.random() * (index === 0 ? DOUGH_TYPES : TOPPINGS).length)];

      setReelSpinning(newSpinning);
      setFinalToppings(newFinalToppings);

      if (newSpinning.every(spin => !spin)) {
        setIsAnySpinning(false);
      }
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-4 bg-white rounded-lg shadow-lg text-center">
      <h1 className="text-4xl font-bold mb-3">Midnight Munchies Custom Cookie Creator</h1>
      
      <div className="flex flex-col items-center">
        <div className="flex justify-center mb-4 w-full">
          <div className="flex flex-col items-center bg-amber-50 border-2 border-gray-300 rounded-lg p-1 mr-1">
            <h2 className="text-xs font-semibold mb-1">Dough Flavor</h2>
            <div className="flex flex-col items-center">
              <AnimatedReel 
                isSpinning={reelSpinning[0]}
                finalTopping={finalToppings[0]}
                isLocked={reelLocked[0]}
                options={DOUGH_TYPES}
              />
              <div className="flex flex-col items-center mt-1">
                <Button 
                  onClick={() => toggleLock(0)}
                  variant="ghost"
                  className="mb-1"
                  disabled={false}
                  //size="sm"
                >
                  {reelLocked[0] ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                </Button>
                {!isAnySpinning && <p className="text-xs text-center">{finalToppings[0].name}</p>}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center bg-amber-50 border-2 border-gray-300 rounded-lg p-1">
            <h2 className="text-xs font-semibold mb-1">Munchie Mix'ins</h2>
            <div className="flex">
              {finalToppings.slice(1).map((topping, index) => (
                <div key={index} className="flex flex-col items-center">
                  <AnimatedReel 
                    isSpinning={reelSpinning[index + 1]}
                    finalTopping={topping}
                    isLocked={reelLocked[index + 1]}
                    options={TOPPINGS}
                  />
                  <div className="flex flex-col items-center mt-1">
                    <Button 
                      onClick={() => toggleLock(index + 1)}
                      variant="ghost"
                      className="mb-1"
                      disabled={false}
                    >
                      {reelLocked[index + 1] ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                    </Button>
                    {!isAnySpinning && <p className="text-xs text-center">{topping.name}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-4 w-full">
          {finalToppings.map((_, index) => (
            <Button 
              key={index}
              onClick={() => stopReel(index)}
              disabled={!isAnySpinning || reelLocked[index] || !reelSpinning[index]}
              className="w-24 m-1 px-1 bg-gray-400 hover:bg-gray-500"
              //size="sm"
            >
              Stop
            </Button>
          ))}
        </div>

        <Button 
          onClick={generateCombination} 
          disabled={isAnySpinning}
          className="w-full max-w-md"
        >
          {isAnySpinning ? 'Spinning...' : 'Generate Flavor'}
        </Button>
      </div>

      {!isAnySpinning && (
        <div className="mt-3 p-2 bg-gray-100 rounded">
          <h2 className="text-sm font-semibold mb-1">Your Unique Cookie Flavor:</h2>
          <p className="text-sm font-bold">
            {finalToppings[0].name} with {finalToppings[1].name}, {finalToppings[2].name}, and {finalToppings[3].name}
          </p>
        </div>
      )}
    </div>
  );
}
// About Us Page Component
function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center text-amber-900">About Sweet Serendipity</h1>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
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
          <div className="max-w-4xl   container mx-auto px-6 py-4 flex justify-between items-center">
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
          <Route path="/" element={<CookieFlavorSlotMachine />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/flavor-generator" element={<HomePage />} />
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
