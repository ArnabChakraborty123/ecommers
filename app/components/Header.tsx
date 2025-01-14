'use client'

import Link from 'next/link'
import { useCart } from '../context/CartContext'

const Header = () => {
  const { cart } = useCart()

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="bg-gray-900 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Dark E-commerce</Link>
        
        <ul className="flex space-x-4">
          <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
          <li>
            <Link href="/cart" className="hover:text-gray-300 relative">
              Cart
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </li>
          <li>
            <Link href="/login" className="hover:text-gray-300 bg-blue-600 text-white py-1 px-3 rounded-md">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
