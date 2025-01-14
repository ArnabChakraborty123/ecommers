'use client'

import React from 'react'
import Image from 'next/image'
import { useCart } from '../../context/CartContext'

const items = [
  { id: 1, name: 'Smartphone', price: 599, description: 'Latest model with advanced features', image: '/placeholder.svg?height=600&width=800', colors: ['Black', 'White', 'Blue'], reviews: [
    { id: 1, user: 'John D.', rating: 5, comment: 'Great phone, love the features!' },
    { id: 2, user: 'Sarah M.', rating: 4, comment: 'Good value for money, but battery life could be better.' },
  ]},
  // ... (add more items here)
]

export default function ItemPage({ params }: { params: { id: string } }) {
  const { id } = params; // Updated params access
  const { addToCart } = useCart()
  const item = items.find(i => i.id === parseInt(id))

  if (!item) {
    return <div className="container mx-auto px-4 py-8">Item not found</div>
  }

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image src={item.image} alt={item.name} width={800} height={600} className="w-full h-auto rounded-lg" />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{item.name}</h1>
          <p className="text-2xl font-bold mb-4">${item.price}</p>
          <p className="text-gray-400 mb-4">{item.description}</p>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Available Colors:</h2>
            <div className="flex space-x-2">
              {item.colors.map(color => (
                <div key={color} className="w-8 h-8 rounded-full border border-white" style={{backgroundColor: color}}></div>
              ))}
            </div>
          </div>
          <button 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {item.reviews.map(review => (
          <div key={review.id} className="bg-gray-800 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold">{review.user}</p>
              <p className="text-yellow-400">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
            </div>
            <p className="text-gray-400">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

