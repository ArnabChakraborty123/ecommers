"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { useCart } from "../../context/CartContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { CreditCard, Truck, RefreshCcw, DollarSign, ChevronLeft, ChevronRight, Check } from "lucide-react"
import { type ItemData, ApiResponse } from "../../types/item"
import { getItemById } from "../../data/items"
import useEmblaCarousel from "embla-carousel-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [openColor, setOpenColor] = useState(false)
  const [openPackSize, setOpenPackSize] = useState(false)

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on("select", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi, onSelect])

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

  const offers = [
    {
      title: "EMI & Payment Info",
      description: ["EMI starting from $20/month", "No Cost EMI available on select credit cards"],
    },
    {
      title: "Cashback Offer",
      description: ["Get 5% cashback on ACME Bank Credit Cards"],
    },
    {
      title: "Business Offer",
      description: ["Special pricing and GST invoice for business purchases"],
    },
  ]

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
              <Popover open={openColor} onOpenChange={setOpenColor}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openColor}
                    className="w-full justify-between"
                  >
                    {selectedColor ? item.color.find((color) => color.name === selectedColor)?.name : "Select color..."}
                    <ChevronLeft className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search color..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No color found.</CommandEmpty>
                      <CommandGroup>
                        {item.color.map((color) => (
                          <CommandItem
                            key={color.name}
                            value={color.name}
                            onSelect={(currentValue) => {
                              setSelectedColor(currentValue === selectedColor ? "" : currentValue)
                              setOpenColor(false)
                            }}
                          >
                            {color.name}
                            <Check
                              className={`ml-auto h-4 w-4 ${selectedColor === color.name ? "opacity-100" : "opacity-0"}`}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <h2 className="text-sm font-semibold mb-2">Pack Size:</h2>
              <Popover open={openPackSize} onOpenChange={setOpenPackSize}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openPackSize}
                    className="w-full justify-between"
                  >
                    {selectedPackSize
                      ? item.packsize.find((size) => size.name === selectedPackSize)?.name
                      : "Select pack size..."}
                    <ChevronLeft className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search pack size..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No pack size found.</CommandEmpty>
                      <CommandGroup>
                        {item.packsize.map((size) => (
                          <CommandItem
                            key={size.name}
                            value={size.name}
                            onSelect={(currentValue) => {
                              setSelectedPackSize(currentValue === selectedPackSize ? "" : currentValue)
                              setOpenPackSize(false)
                            }}
                          >
                            {size.name}
                            <Check
                              className={`ml-auto h-4 w-4 ${selectedPackSize === size.name ? "opacity-100" : "opacity-0"}`}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
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
            <div className="relative">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {offers.map((offer, index) => (
                    <div className="flex-[0_0_100%]" key={index}>
                      <Card className="bg-gray-800 border-gray-700 mx-2">
                        <CardContent className="p-4 h-[120px] flex flex-col justify-center">
                          <h3 className="text-lg font-semibold mb-2">{offer.title}</h3>
                          {offer.description.map((desc, i) => (
                            <p key={i} className="text-sm text-gray-400">
                              {desc}
                            </p>
                          ))}
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800"
                onClick={() => scrollTo(selectedIndex - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800"
                onClick={() => scrollTo(selectedIndex + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex justify-center mt-2">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full mx-1 transition-colors duration-300 ${
                    index === selectedIndex ? "bg-blue-500" : "bg-gray-500"
                  }`}
                  onClick={() => scrollTo(index)}
                />
              ))}
            </div>

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

