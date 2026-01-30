import React, { useState } from 'react';
import { 
  Coffee, 
  Clock, 
  Star, 
  MapPin, 
  Plus, 
  Minus,
  ShoppingCart,
  Heart,
  Truck,
  DollarSign
} from 'lucide-react';
import Navigation from './Navigation';
import { User } from '../types/User';

interface FoodOrderingProps {
  user: User;
  onLogout: () => void;
}

const FoodOrdering = ({ user, onLogout }: FoodOrderingProps) => {
  const [selectedCategory, setSelectedCategory] = useState('comfort');
  const [cart, setCart] = useState<any[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);

  const categories = [
    { id: 'comfort', name: 'Comfort Food', icon: '🍝', color: 'from-orange-400 to-red-500' },
    { id: 'healthy', name: 'Healthy Options', icon: '🥗', color: 'from-green-400 to-emerald-500' },
    { id: 'beverages', name: 'Mood Boosters', icon: '☕', color: 'from-purple-400 to-pink-500' },
    { id: 'desserts', name: 'Sweet Treats', icon: '🍰', color: 'from-yellow-400 to-orange-500' },
    { id: 'snacks', name: 'Study Snacks', icon: '🍿', color: 'from-blue-400 to-indigo-500' }
  ];

  const restaurants = [
    {
      id: 1,
      name: "Campus Comfort Kitchen",
      category: "comfort",
      rating: 4.8,
      reviews: 234,
      deliveryTime: "15-25 min",
      deliveryFee: 2.99,
      minOrder: 12,
      image: "🏪",
      speciality: "Soul food that hugs your heart",
      comfortLevel: "High",
      items: [
        { id: 1, name: "Mac & Cheese Bowl", price: 8.99, description: "Creamy comfort in a bowl", image: "🧀", moodBoost: "High" },
        { id: 2, name: "Chicken Noodle Soup", price: 7.99, description: "Like a warm hug", image: "🍲", moodBoost: "High" },
        { id: 3, name: "Grilled Cheese & Tomato Soup", price: 9.99, description: "Classic comfort combo", image: "🥪", moodBoost: "Medium" },
        { id: 4, name: "Loaded Baked Potato", price: 6.99, description: "Fluffy potato with all the fixings", image: "🥔", moodBoost: "Medium" }
      ]
    },
    {
      id: 2,
      name: "Mindful Bowls",
      category: "healthy",
      rating: 4.7,
      reviews: 189,
      deliveryTime: "20-30 min",
      deliveryFee: 3.49,
      minOrder: 15,
      image: "🥗",
      speciality: "Nourishing bowls for body and mind",
      comfortLevel: "Medium",
      items: [
        { id: 5, name: "Buddha Bowl", price: 12.99, description: "Quinoa, veggies, and good vibes", image: "🍃", moodBoost: "Medium" },
        { id: 6, name: "Avocado Toast Power Bowl", price: 10.99, description: "Energy-boosting superfood combo", image: "🥑", moodBoost: "Low" },
        { id: 7, name: "Protein Power Smoothie", price: 8.99, description: "Mood-lifting berry blend", image: "🥤", moodBoost: "High" },
        { id: 8, name: "Mediterranean Wrap", price: 9.99, description: "Fresh ingredients, big flavors", image: "🌯", moodBoost: "Low" }
      ]
    },
    {
      id: 3,
      name: "Sweet Escape Café",
      category: "desserts",
      rating: 4.9,
      reviews: 312,
      deliveryTime: "10-20 min",
      deliveryFee: 1.99,
      minOrder: 8,
      image: "🧁",
      speciality: "Desserts that spark joy",
      comfortLevel: "Very High",
      items: [
        { id: 9, name: "Chocolate Therapy Brownie", price: 4.99, description: "Triple chocolate mood lifter", image: "🍫", moodBoost: "Very High" },
        { id: 10, name: "Cookie Dough Ice Cream", price: 6.99, description: "Childhood happiness in a cup", image: "🍦", moodBoost: "Very High" },
        { id: 11, name: "Stress-Less Lemon Cake", price: 5.99, description: "Citrus sunshine slice", image: "🍋", moodBoost: "High" },
        { id: 12, name: "Warm Apple Crisp", price: 7.99, description: "Like grandma's hug", image: "🍎", moodBoost: "High" }
      ]
    }
  ];

  const filteredRestaurants = restaurants.filter(restaurant => 
    selectedCategory === 'all' || restaurant.category === selectedCategory
  );

  const addToCart = (item: any, restaurant: any) => {
    const cartItem = { ...item, restaurantName: restaurant.name, restaurantId: restaurant.id };
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...cartItem, quantity: 1 }]);
    }
  };

  const updateQuantity = (itemId: number, change: number) => {
    setCart(cart.map(item => 
      item.id === itemId 
        ? { ...item, quantity: Math.max(0, item.quantity + change) }
        : item
    ).filter(item => item.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const getMoodBoostColor = (level: string) => {
    switch (level) {
      case 'Very High': return 'bg-pink-100 text-pink-700';
      case 'High': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (selectedRestaurant) {
    return (
      <div className="flex">
        <Navigation user={user} onLogout={onLogout} />
        <main className="flex-1 ml-64 p-8">
          <button
            onClick={() => setSelectedRestaurant(null)}
            className="mb-6 text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Restaurants
          </button>

          {/* Restaurant Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
            <div className="bg-gradient-to-r from-orange-400 to-red-500 p-6 text-white rounded-t-xl">
              <div className="flex items-center">
                <div className="text-4xl mr-4">{selectedRestaurant.image}</div>
                <div>
                  <h1 className="text-2xl font-bold mb-2">{selectedRestaurant.name}</h1>
                  <p className="opacity-90 mb-2">{selectedRestaurant.speciality}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      <span>{selectedRestaurant.rating} ({selectedRestaurant.reviews})</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{selectedRestaurant.deliveryTime}</span>
                    </div>
                    <div className="flex items-center">
                      <Truck className="h-4 w-4 mr-1" />
                      <span>${selectedRestaurant.deliveryFee} delivery</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cart Summary (if items in cart) */}
          {cartItems > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ShoppingCart className="h-6 w-6 text-green-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-green-800">
                      {cartItems} item{cartItems !== 1 ? 's' : ''} in cart
                    </h3>
                    <p className="text-green-600">Subtotal: ${cartTotal.toFixed(2)}</p>
                  </div>
                </div>
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}

          {/* Menu Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedRestaurant.items.map((item: any) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                      <div className="text-2xl ml-4">{item.image}</div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-green-600">${item.price}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMoodBoostColor(item.moodBoost)}`}>
                        {item.moodBoost} Mood Boost
                      </span>
                    </div>

                    {cart.find(cartItem => cartItem.id === item.id) ? (
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="font-medium text-gray-900">
                          {cart.find(cartItem => cartItem.id === item.id)?.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item, selectedRestaurant)}
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex">
      <Navigation user={user} onLogout={onLogout} />
      
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Comfort Food Delivery</h1>
          <p className="text-gray-600">Order mood-boosting meals delivered right to your dorm or study spot</p>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Food Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-6 rounded-xl text-center transition-all transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-br ${category.color} text-white shadow-lg`
                    : 'bg-white border border-gray-200 text-gray-700 hover:shadow-md'
                }`}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="font-semibold text-sm">{category.name}</h3>
              </button>
            ))}
          </div>
        </div>

        {/* Why Comfort Food Helps */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 mb-8 border border-yellow-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Heart className="h-6 w-6 text-red-500 mr-2" />
            Why Comfort Food Helps Mental Health
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Emotional Comfort</h3>
              <p className="text-sm text-gray-600">Familiar foods trigger positive memories and reduce stress hormones</p>
            </div>
            <div>
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quick Energy</h3>
              <p className="text-sm text-gray-600">Provides immediate glucose boost for better cognitive function</p>
            </div>
            <div>
              <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🤗</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Social Connection</h3>
              <p className="text-sm text-gray-600">Sharing meals (even delivered) creates sense of community and care</p>
            </div>
          </div>
        </div>

        {/* Restaurants */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer"
              onClick={() => setSelectedRestaurant(restaurant)}
            >
              <div className="bg-gradient-to-br from-orange-400 to-red-500 h-32 rounded-t-xl flex items-center justify-center text-4xl">
                {restaurant.image}
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{restaurant.name}</h3>
                    <p className="text-sm text-gray-600">{restaurant.speciality}</p>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium text-gray-700 ml-1">{restaurant.rating}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Truck className="h-4 w-4 mr-2" />
                      <span>${restaurant.deliveryFee}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span>${restaurant.minOrder} minimum</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      restaurant.comfortLevel === 'Very High' ? 'bg-pink-100 text-pink-700' :
                      restaurant.comfortLevel === 'High' ? 'bg-green-100 text-green-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {restaurant.comfortLevel} Comfort
                    </span>
                  </div>
                </div>

                <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors">
                  View Menu
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Food Support */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-blue-800 mb-4">Student Food Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-blue-700 mb-2">Campus Food Pantry</h3>
              <p className="text-blue-600 text-sm mb-2">Free groceries and meals for students in need</p>
              <p className="text-blue-800 font-medium">Open: Mon-Fri, 10AM-4PM</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 mb-2">Emergency Meal Vouchers</h3>
              <p className="text-blue-600 text-sm mb-2">Contact Student Services for meal assistance</p>
              <p className="text-blue-800 font-medium">Call: (555) 123-HELP</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FoodOrdering;