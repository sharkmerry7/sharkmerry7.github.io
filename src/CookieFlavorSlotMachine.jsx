import React, { useState, useEffect } from 'react';
import { Lock, Unlock } from 'lucide-react';

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

const AnimatedReel = ({ isSpinning, finalTopping, isLocked, options }) => {
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
    <div className="w-24 h-32 m-2 border-2 flex flex-col items-center justify-center overflow-hidden relative">
      <div 
        className={`absolute inset-0 flex flex-col items-center justify-center transition-transform duration-100 ${
          isSpinning && !isLocked ? '-translate-y-1/2' : ''
        }`}
      >
        <div className="flex flex-col items-center">
          <div className="text-4xl">{prevTopping.emoji}</div>
          <p className="text-xs mt-1 text-center">{prevTopping.name}</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-4xl">{currentTopping.emoji}</div>
          <p className="text-xs mt-1 text-center">{currentTopping.name}</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-4xl">{nextTopping.emoji}</div>
          <p className="text-xs mt-1 text-center">{nextTopping.name}</p>
        </div>
      </div>
    </div>
  );
};

const CookieFlavorSlotMachine = () => {
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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
      <h1 className="text-2xl font-bold mb-4">Midnight Munchies Custom Cookie Creator</h1>
      
      <div className="flex justify-center mb-6">
        <div className="border-2 border-gray-300 rounded-lg p-2 mr-2">
          <h2 className="text-sm font-semibold mb-2">Dough Flavor</h2>
          <div className="flex flex-col items-center">
            <AnimatedReel 
              isSpinning={reelSpinning[0]}
              finalTopping={finalToppings[0]}
              isLocked={reelLocked[0]}
              options={DOUGH_TYPES}
            />
            <Button 
              onClick={() => toggleLock(0)}
              variant="ghost"
              className="mt-2"
            >
              {reelLocked[0] ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="border-2 border-gray-300 rounded-lg p-2">
          <h2 className="text-sm font-semibold mb-2">Munchie Mix'ins</h2>
          <div className="flex">
            {finalToppings.slice(1).map((topping, index) => (
              <div key={index} className="flex flex-col items-center">
                <AnimatedReel 
                  isSpinning={reelSpinning[index + 1]}
                  finalTopping={topping}
                  isLocked={reelLocked[index + 1]}
                  options={TOPPINGS}
                />
                <Button 
                  onClick={() => toggleLock(index + 1)}
                  variant="ghost"
                  className="mt-2"
                >
                  {reelLocked[index + 1] ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        {finalToppings.map((_, index) => (
          <Button 
            key={index}
            onClick={() => stopReel(index)}
            disabled={!isAnySpinning || reelLocked[index] || !reelSpinning[index]}
            className="w-24 m-2 bg-gray-200 hover:bg-gray-300"
          >
            Stop
          </Button>
        ))}
      </div>

      <Button 
        onClick={generateCombination} 
        disabled={isAnySpinning}
        className="w-full"
      >
        {isAnySpinning ? 'Spinning...' : 'Generate Flavor'}
      </Button>

      {!isAnySpinning && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <h2 className="font-semibold mb-2">Your Unique Cookie Flavor:</h2>
          <p className="font-bold">
            {finalToppings[0].name} with {finalToppings[1].name}, {finalToppings[2].name}, and {finalToppings[3].name}
          </p>
        </div>
      )}
    </div>
  );
};

export default CookieFlavorSlotMachine;