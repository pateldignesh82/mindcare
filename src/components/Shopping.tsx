import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Star, 
  Plus, 
  Minus,
  ShoppingCart,
  Filter,
  Search,
  Gift,
  Sparkles
} from 'lucide-react';
import Navigation from './Navigation';
import { User } from '../types/User';

interface ShoppingProps {
  user: User;
  onLogout: () => void;
}

const Shopping = ({ user, onLogout }: ShoppingProps) => {
  const [cart, setCart] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [moodPoints] = useState(1247);

  const categories = [
    { id: 'all', name: 'All Items', icon: '🛍️' },
    { id: 'wellness', name: 'Wellness', icon: '🧘‍♀️' },
    { id: 'comfort', name: 'Comfort', icon: '🛋️' },
    { id: 'beauty', name: 'Self-Care', icon: '💆‍♀️' },
    { id: 'books', name: 'Books', icon: '📚' },
    { id: 'tech', name: 'Tech', icon: '💻' },
    { id: 'rewards', name: 'Rewards', icon: '🎁' }
  ];

  const products = [
    {
      id: 1,
      name: "Stress Relief Aromatherapy Candle Set",
      category: "wellness",
      price: 24.99,
      originalPrice: 34.99,
      discount: 29,
      rating: 4.8,
      reviews: 156,
      image: "🕯️",
      description: "Set of 3 lavender, eucalyptus, and chamomile candles for relaxation",
      moodPointsReward: 50,
      isRecommended: true
    },
    {
      id: 2,
      name: "Weighted Blanket for Anxiety Relief",
      category: "comfort",
      price: 89.99,
      originalPrice: 129.99,
      discount: 31,
      rating: 4.9,
      reviews: 342,
      image: "🛏️",
      description: "15lb weighted blanket designed to reduce anxiety and improve sleep",
      moodPointsReward: 150,
      isRecommended: true
    },
    {
      id: 3,
      name: "Mindfulness Journal & Gratitude Planner",
      category: "books",
      price: 19.99,
      originalPrice: 29.99,
      discount: 33,
      rating: 4.7,
      reviews: 89,
      image: "📖",
      description: "Daily gratitude and mindfulness exercises with guided prompts",
      moodPointsReward: 40,
      isRecommended: false
    },
    {
      id: 4,
      name: "Essential Oil Diffuser",
      category: "wellness",
      price: 39.99,
      originalPrice: 59.99,
      discount: 33,
      rating: 4.6,
      reviews: 234,
      image: "🌸",
      description: "Ultrasonic diffuser with 7 LED colors and timer settings",
      moodPointsReward: 80,
      isRecommended: false
    },
    {
      id: 5,
      name: "Self-Care Spa Gift Set",
      category: "beauty",
      price: 49.99,
      originalPrice: 74.99,
      discount: 33,
      rating: 4.8,
      reviews: 178,
      image: "🛁",
      description: "Bath bombs, face masks, body scrub, and moisturizer set",
      moodPointsReward: 100,
      isRecommended: true
    },
    {
      id: 6,
      name: "Blue Light Blocking Glasses",
      category: "tech",
      price: 29.99,
      originalPrice: 44.99,
      discount: 33,
      rating: 4.5,
      reviews: 267,
      image: "👓",
      description: "Reduce eye strain and improve sleep quality",
      moodPointsReward: 60,
      isRecommended: false
    },
    {
      id: 7,
      name: "Meditation Cushion Set",
      category: "wellness",
      price: 59.99,
      originalPrice: 79.99,
      discount: 25,
      rating: 4.7,
      reviews: 123,
      image: "🪑",
      description: "Comfortable cushion and mat for meditation practice",
      moodPointsReward: 120,
      isRecommended: false
    },
    {
      id: 8,
      name: "Stress Ball & Hand Exercise Kit",
      category: "wellness",
      price: 14.99,
      originalPrice: 24.99,
      discount: 40,
      rating: 4.4,
      reviews: 91,
      image: "🔵",
      description: "Set of stress balls and hand exercisers for tension relief",
      moodPointsReward: 30,
      isRecommended: false
    }
  ];

  const rewardItems = [
    {
      id: 'reward1',
      name: "Free Campus Coffee Voucher",
      pointsCost: 200,
      image: "☕",
      description: "Redeem for any coffee at campus cafés"
    },
    {
      id: 'reward2',
      name: "Study Room Priority Booking",
      pointsCost: 150,
      image: "📚",
      description: "Skip the wait for study room reservations"
    },
    {
      id: 'reward3',
      name: "Counseling Session Discount",
      pointsCost: 500,
      image: "💙",
      description: "25% off your next therapy session"
    },
    {
      id: 'reward4',
      name: "Campus Gym Day Pass",
      pointsCost: 100,
      image: "💪",
      description: "Free access to campus fitness facilities"
    }
  ];

  const filteredProducts = products.filter(product => 
    selectedCategory === 'all' || product.category === selectedCategory
  );

  const addToCart = (product: any) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, change: number) => {
    setCart(cart.map(item => 
      item.id === productId 
        ? { ...item, quantity: Math.max(0, item.quantity + change) }
        : item
    ).filter(item => item.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex">
      <Navigation user={user} onLogout={onLogout} />
      
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Wellness Shopping</h1>
          <p className="text-gray-600">Therapeutic shopping for self-care and mental wellness products</p>
          
          {/* Mood Points Display */}
          <div className="mt-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-4 text-white inline-block">
            <div className="flex items-center">
              <Sparkles className="h-6 w-6 mr-2" />
              <span className="font-bold text-lg">{moodPoints} Mood Points Available</span>
            </div>
            <p className="text-sm opacity-90">Earn points with every purchase!</p>
          </div>
        </div>

        {/* Cart Summary (if items in cart) */}
        {cartItems > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ShoppingCart className="h-6 w-6 text-blue-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-blue-800">
                    {cartItems} item{cartItems !== 1 ? 's' : ''} in cart
                  </h3>
                  <p className="text-blue-600">Total: ${cartTotal.toFixed(2)}</p>
                </div>
              </div>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                View Cart & Checkout
              </button>
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Rewards Section */}
        {selectedCategory === 'rewards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewardItems.map((reward) => (
              <div key={reward.id} className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6 border-2 border-purple-200">
                <div className="text-center">
                  <div className="text-4xl mb-4">{reward.image}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{reward.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                  <div className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold text-lg mb-4">
                    {reward.pointsCost} points
                  </div>
                  <button
                    disabled={moodPoints < reward.pointsCost}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      moodPoints >= reward.pointsCost
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {moodPoints >= reward.pointsCost ? 'Redeem Now' : 'Insufficient Points'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all overflow-hidden">
                {/* Product Badge */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-32 flex items-center justify-center text-4xl">
                    {product.image}
                  </div>
                  {product.isRecommended && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Recommended
                    </div>
                  )}
                  {product.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      -{product.discount}%
                    </div>
                  )}
                  <button className="absolute bottom-2 right-2 bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-all">
                    <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700 ml-1">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({product.reviews} reviews)</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xl font-bold text-gray-900">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice}</span>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm text-green-600">
                        <Sparkles className="h-3 w-3 mr-1" />
                        <span>+{product.moodPointsReward} points</span>
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart */}
                  <div className="flex items-center space-x-2">
                    {cart.find(item => item.id === product.id) ? (
                      <div className="flex items-center space-x-2 flex-1">
                        <button
                          onClick={() => updateQuantity(product.id, -1)}
                          className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="font-medium text-gray-900">
                          {cart.find(item => item.id === product.id)?.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, 1)}
                          className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium ml-2"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(product)}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
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
        )}

        {/* Therapeutic Shopping Benefits */}
        <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Gift className="h-6 w-6 text-green-600 mr-2" />
            Why Therapeutic Shopping Helps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Dopamine Boost</h3>
              <p className="text-sm text-gray-600">Shopping releases feel-good chemicals that improve mood naturally</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Self-Care Focus</h3>
              <p className="text-sm text-gray-600">Curated products that promote mental wellness and self-care</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Reward System</h3>
              <p className="text-sm text-gray-600">Earn mood points for positive reinforcement and motivation</p>
            </div>
          </div>
        </div>

        {/* Special Offers */}
        <div className="mt-8 bg-gradient-to-r from-orange-400 to-pink-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Student Wellness Package</h3>
              <p className="opacity-90 mb-3">Get 40% off when you buy 3+ wellness items together</p>
              <button className="bg-white text-orange-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Shop Bundle Deals
              </button>
            </div>
            <div className="text-6xl opacity-50">📦</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Shopping;