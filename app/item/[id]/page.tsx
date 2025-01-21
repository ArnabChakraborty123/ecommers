"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useCart } from "../../context/CartContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { CreditCard, Truck, RefreshCcw, DollarSign, ChevronLeft, ChevronRight } from "lucide-react"
import { type ItemData, ApiResponse } from "../../types/item"
import { getItemById } from "../../data/items"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const ServiceFeature = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
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
  const { id } = params
  const { addToCart } = useCart()
  const [item, setItem] = useState<ItemData | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [selectedPackSize, setSelectedPackSize] = useState<string>("")
  const [sizeQuantities, setSizeQuantities] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = getItemById(id)
        setItem(response.data)
        setSelectedColor(response.data.color[0].name)
        setSelectedPackSize(response.data.packsize[0].name)
        const initialSizeQuantities = response.data.size.reduce(
          (acc, size) => {
            acc[size.name] = 0
            return acc
          },
          {} as { [key: string]: number },
        )
        setSizeQuantities(initialSizeQuantities)
      } catch (error) {
        console.error("Error fetching item:", error)
      }
    }

    fetchItem()
  }, [id])

  if (!item) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  const handleQuantityChange = (size: string, quantity: number) => {
    setSizeQuantities((prev) => ({ ...prev, [size]: quantity }))
  }

  const handleAddToCart = () => {
    const totalQuantity = Object.values(sizeQuantities).reduce((sum, quantity) => sum + quantity, 0)
    if (totalQuantity > 0) {
      addToCart({
        id: Number.parseInt(id),
        name: item.brand,
        price: 599, // You might want to add a price field to your API response
        quantity: totalQuantity,
      })
    } else {
      alert("Please select at least one item size and quantity")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src="/placeholder.svg"
            alt={item.brand}
            width={800}
            height={600}
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{item.brand}</h1>
          <p className="text-3xl font-bold mb-4">$599</p>
          <p className="text-gray-400 mb-4">Shape: {item.shape[0].name}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h2 className="text-sm font-semibold mb-2">Color:</h2>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Color" />
                </SelectTrigger>
                <SelectContent>
                  {item.color.map((c) => (
                    <SelectItem key={c.name} value={c.name}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm mt-2">Selected: {selectedColor}</p>
            </div>

            <div>
              <h2 className="text-sm font-semibold mb-2">Pack Size:</h2>
              <Select value={selectedPackSize} onValueChange={setSelectedPackSize}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pack Size" />
                </SelectTrigger>
                <SelectContent>
                  {item.packsize.map((p) => (
                    <SelectItem key={p.name} value={p.name}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm mt-2">Selected: {selectedPackSize}</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-sm font-semibold mb-2">Size and Quantity:</h2>
            <div className="max-h-40 overflow-y-auto bg-gray-800 rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-gray-700 sticky top-0">
                  <tr>
                    <th className="p-2 text-left">Size</th>
                    <th className="p-2 text-left">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {item.size.map((s) => (
                    <tr key={s.name} className="border-b border-gray-700">
                      <td className="p-2">{s.name}</td>
                      <td className="p-2">
                        <Input
                          type="number"
                          min="0"
                          value={sizeQuantities[s.name]}
                          onChange={(e) => handleQuantityChange(s.name, Number.parseInt(e.target.value) || 0)}
                          className="w-20 bg-gray-700 border-gray-600"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700 mb-6" onClick={handleAddToCart}>
            Add to Cart
          </Button>

          <div className="space-y-4">
            <Carousel className="w-full">
              <CarouselContent>
                <CarouselItem>
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4 h-[120px] flex flex-col justify-center">
                      <h3 className="text-lg font-semibold mb-2">EMI & Payment Info</h3>
                      <p className="text-sm text-gray-400">EMI starting from $20/month</p>
                      <p className="text-sm text-gray-400">No Cost EMI available on select credit cards</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem>
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4 h-[120px] flex flex-col justify-center">
                      <h3 className="text-lg font-semibold mb-2">Cashback Offer</h3>
                      <p className="text-sm text-gray-400">Get 5% cashback on ACME Bank Credit Cards</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem>
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4 h-[120px] flex flex-col justify-center">
                      <h3 className="text-lg font-semibold mb-2">Business Offer</h3>
                      <p className="text-sm text-gray-400">Special pricing and GST invoice for business purchases</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2">
                <ChevronLeft className="h-4 w-4" />
              </CarouselPrevious>
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2">
                <ChevronRight className="h-4 w-4" />
              </CarouselNext>
            </Carousel>

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
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold">John D.</p>
            <p className="text-yellow-400">{"★".repeat(5)}</p>
          </div>
          <p className="text-gray-400">Great product, love the features!</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold">Sarah M.</p>
            <p className="text-yellow-400">
              {"★".repeat(4)}
              {"☆".repeat(1)}
            </p>
          </div>
          <p className="text-gray-400">Good value for money, but could be improved in some areas.</p>
        </div>
      </div>
    </div>
  )
}

