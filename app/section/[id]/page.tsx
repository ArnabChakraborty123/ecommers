import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const items = {
  electronics: [
    { id: 1, name: 'Smartphone', price: 599, description: 'Latest model with advanced features', image: '/placeholder.svg?height=300&width=400' },
    { id: 2, name: 'Laptop', price: 999, description: 'Powerful and lightweight', image: '/placeholder.svg?height=300&width=400' },
    { id: 3, name: 'Smartwatch', price: 299, description: 'Track your fitness and stay connected', image: '/placeholder.svg?height=300&width=400' },
  ],
  clothing: [
    { id: 4, name: 'T-Shirt', price: 29, description: 'Comfortable cotton t-shirt', image: '/placeholder.svg?height=300&width=400' },
    { id: 5, name: 'Jeans', price: 79, description: 'Classic denim jeans', image: '/placeholder.svg?height=300&width=400' },
    { id: 6, name: 'Sneakers', price: 89, description: 'Stylish and comfortable sneakers', image: '/placeholder.svg?height=300&width=400' },
  ],
  books: [
    { id: 7, name: 'Novel', price: 19, description: 'Bestselling fiction novel', image: '/placeholder.svg?height=300&width=400' },
    { id: 8, name: 'Cookbook', price: 29, description: 'Delicious recipes for every occasion', image: '/placeholder.svg?height=300&width=400' },
    { id: 9, name: 'Self-Help Book', price: 24, description: 'Improve your life with practical advice', image: '/placeholder.svg?height=300&width=400' },
  ],
  home: [
    { id: 10, name: 'Coffee Maker', price: 79, description: 'Brew perfect coffee at home', image: '/placeholder.svg?height=300&width=400' },
    { id: 11, name: 'Bedding Set', price: 129, description: 'Luxurious and comfortable bedding', image: '/placeholder.svg?height=300&width=400' },
    { id: 12, name: 'Indoor Plant', price: 39, description: 'Bring nature into your home', image: '/placeholder.svg?height=300&width=400' },
  ],
}

export default function SectionPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const sectionItems = items[id as keyof typeof items] || []

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center capitalize">{params.id}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sectionItems.map((item) => (
          <Link key={item.id} href={`/item/${item.id}`}>
            <div className="bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transform hover:-translate-y-1">
              <Image src={item.image} alt={item.name} width={400} height={300} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                <p className="text-gray-400 mb-2">{item.description}</p>
                <p className="text-lg font-bold">${item.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

