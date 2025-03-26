
import React from 'react';
import { ShoppingBag, Coffee, Book, Utensils, Pizza, Gift } from 'lucide-react';

const categories = [
  {
    title: 'Groceries',
    icon: ShoppingBag,
    description: 'Fresh produce and pantry staples from your neighborhood stores',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80',
    color: 'bg-blue-50'
  },
  {
    title: 'Cafés',
    icon: Coffee,
    description: 'Artisanal coffees and treats from local cafés and bakeries',
    image: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80',
    color: 'bg-blue-100'
  },
  {
    title: 'Stationery',
    icon: Book,
    description: 'Books, notebooks, and office supplies from nearby shops',
    image: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80',
    color: 'bg-blue-50'
  },
  {
    title: 'Restaurants',
    icon: Utensils,
    description: 'Delicious meals from your favorite local restaurants',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
    color: 'bg-blue-100'
  },
  {
    title: 'Fast Food',
    icon: Pizza,
    description: 'Quick bites and comfort food from local eateries',
    image: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80',
    color: 'bg-blue-50'
  },
  {
    title: 'Specialty Stores',
    icon: Gift,
    description: 'Unique finds from specialty boutiques in your neighborhood',
    image: 'https://images.unsplash.com/photo-1516401266446-6432a8a07d41?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
    color: 'bg-blue-100'
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-blue-50/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-800">
            Shop Locally, <span className="text-blue-500">Across Categories</span>
          </h2>
          <p className="text-lg text-blue-600/80 max-w-2xl mx-auto">
            Discover a wide range of products and services from various local businesses in your neighborhood.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div 
              key={category.title}
              className={`feature-card ${category.color} animate-fade-in hover:shadow-xl group overflow-hidden`}
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="h-48 mb-4 rounded-lg overflow-hidden relative">
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-full bg-blue-500 shadow-sm text-white">
                  <category.icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-xl text-blue-800">{category.title}</h3>
              </div>
              <p className="text-blue-700/80">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
