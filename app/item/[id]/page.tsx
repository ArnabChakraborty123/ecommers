'use client'

import React from 'react'
import Image from 'next/image'
import { useCart } from '../../context/CartContext'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CreditCard, Truck, RefreshCcw, DollarSign } from 'lucide-react'

const items = [
  { 
    id: 1, 
    name: 'Smartphone', 
    price: 599, 
    description: 'Latest model with advanced features', 
    image: '/placeholder.svg?height=600&width=800', 
    colors: ['Black', 'White', 'Blue'], 
    sizes: ['128GB', '256GB', '512GB'],
    reviews: [
      { id: 1, user: 'John D.', rating: 5, comment: 'Great phone, love the features!' },
      { id: 2, user: 'Sarah M.', rating: 4, comment: 'Good value for money, but battery life could be better.' },
    ]
  },
  // ... (add more items here)
]

const ServiceFeature = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger className="flex items-center gap-2">
        {icon}
        <span className="text-sm">{text}</span>
      </TooltipTrigger>
      <TooltipContent>
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

export default function ItemPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { addToCart } = useCart()
  const item = items.find(i => i.id === parseInt(id))
  const [selectedColor, setSelectedColor] = React.useState(item?.colors[0])
  const [selectedSize, setSelectedSize] = React.useState(item?.sizes[0])

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
          <Image src={item.image || "/placeholder.svg"} alt={item.name} width={800} height={600} className="w-full h-auto rounded-lg" />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{item.name}</h1>
          <p className="text-3xl font-bold mb-4">${item.price}</p>
          <p className="text-gray-400 mb-4">{item.description}</p>
          
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Color:</h2>
            <div className="flex space-x-2">
              {item.colors.map(color => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-blue-500' : 'border-gray-600'}`}
                  style={{backgroundColor: color.toLowerCase()}}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Size:</h2>
            <div className="flex space-x-2">
              {item.sizes.map(size => (
                <button
                  key={size}
                  className={`px-3 py-1 rounded ${selectedSize === size ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 mb-6"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>

          <div className="space-y-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">EMI & Payment Info</h3>
                <p className="text-sm text-gray-400">EMI starting from $20/month</p>
                <p className="text-sm text-gray-400">No Cost EMI available on select credit cards</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">Offers</h3>
                <p className="text-sm text-gray-400">Get 5% cashback on ACME Bank Credit Cards</p>
                <p className="text-sm text-gray-400">Special pricing and GST invoice for business purchases</p>
              </CardContent>
            </Card>

            <div className="flex justify-between items-center">
              <ServiceFeature icon={<RefreshCcw size={20} />} text="7 Day Replacement" />
              <ServiceFeature icon={<Truck size={20} />} text="Free Delivery" />
              <ServiceFeature icon={<CreditCard size={20} />} text="Pay on Delivery" />
              <ServiceFeature icon={<DollarSign size={20} />} text="1 Year Warranty" />
            </div>
          </div>
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

