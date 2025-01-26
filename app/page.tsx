import Link from 'next/link'
import Image from 'next/image'
import Carousel from './components/Carousel'

const sections = [
  { id: 'electronics', name: 'Electronics', image: '/placeholder.svg?height=300&width=400' },
  { id: 'clothing', name: 'Clothing', image: '/placeholder.svg?height=300&width=400' },
  { id: 'books', name: 'Books', image: '/placeholder.svg?height=300&width=400' },
  { id: 'home', name: 'Home & Garden', image: '/placeholder.svg?height=300&width=400' },
]

export default function Home() {
  return (
    <div className="flex flex-col">
      <Carousel />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Shop by Category</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sections.map((section) => (
            <Link key={section.id} href={`/section/${section.id}`}>
              <div className="bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transform hover:-translate-y-1">
                <Image src={section.image} alt={section.name} width={400} height={300} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{section.name}</h2>
                  
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

