"use client"

import { useEffect } from "react"
import Image from "next/image"
import { useCart } from "../context/CartContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { Package, Truck, CreditCard } from "lucide-react"

const OrderStatusBadge = ({ status }: { status: string }) => {
  const colorMap: { [key: string]: string } = {
    Delivered: "bg-green-500",
    Processing: "bg-yellow-500",
    Shipped: "bg-blue-500",
    Cancelled: "bg-red-500",
  }

  return <Badge className={`${colorMap[status] || "bg-gray-500"}`}>{status}</Badge>
}

export default function OrderPage() {
  const { cart } = useCart()

  useEffect(() => {
    // In a real app, you would submit the order to your backend here
    console.log("Submitting order:", cart)
  }, [cart])

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Order</h1>
      {cart.length === 0 ? (
        <p className="text-gray-400">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Order #{Math.floor(Math.random() * 10000)}</CardTitle>
                <OrderStatusBadge status="Processing" />
              </div>
              <p className="text-sm text-gray-400">Placed on {new Date().toLocaleDateString()}</p>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="items">
                  <AccordionTrigger>Order Details</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      {cart.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <Image src="/placeholder.svg" alt={item.name} width={80} height={80} className="rounded-md" />
                          <div className="flex-grow">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-gray-400">Color: {item.color}</p>
                            <p className="text-sm text-gray-400">Size: {item.size}</p>
                            <p className="text-sm text-gray-400">Pack Size: {item.packSize}</p>
                            <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                          </div>
                          <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Separator className="my-4" />
              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 mr-2" />
                    <span className="text-sm">{cart.length} items</span>
                  </div>
                  <div className="flex items-center">
                    <Truck className="h-5 w-5 mr-2" />
                    <span className="text-sm">Processing</span>
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    <span className="text-sm">Paid</span>
                  </div>
                </div>
                <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

