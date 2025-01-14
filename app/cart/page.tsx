'use client'

import { useCart } from '../context/CartContext'
import Link from 'next/link'

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. <Link href="/" className="text-blue-500 hover:underline">Continue shopping</Link></p>
      ) : (
        <>
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center mb-4 pb-4 border-b border-gray-700 last:border-b-0 last:mb-0 last:pb-0">
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-400">Quantity: {item.quantity}</p>
                  <p className="text-lg">${item.price * item.quantity}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Total: ${total}</h2>
            <button
              onClick={clearCart}
              className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              Clear Cart
            </button>
          </div>
          <div className="flex justify-end">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  )
}

