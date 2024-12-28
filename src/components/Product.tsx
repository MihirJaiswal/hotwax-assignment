'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Loader } from './Loader'
import { useToast } from '@/hooks/use-toast'

interface Product {
  id: number
  title: string
  price: number
  category: string
  image: string
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false) // State for login status

  const { toast } = useToast()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products')
        const data = await response.json()
        setProducts(data)
        setFilteredProducts(data)
        const uniqueCategories = Array.from(new Set(data.map((product: Product) => product.category)))
        setCategories(uniqueCategories as string[])
        setLoading(false)
      } catch (error) {
        console.error('Error fetching products:', error)
        setLoading(false)
      }
    }

    fetchProducts()

    // Check user login state
    const user = localStorage.getItem('currentUser')
    setIsLoggedIn(!!user) // Set login status based on presence of user data
  }, [])

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
    setFilteredProducts(filtered)
  }, [selectedCategory, searchQuery, products])

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find((item: { id: number }) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }

    localStorage.setItem('cart', JSON.stringify(cart))

    // Using the toast function correctly
    toast({
      title: 'Product added to cart!',
      description: `${product.title} has been added to your cart.`,
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Products</h1>
      <div className="mb-6 flex flex-wrap items-center gap-4 justify-center">
        <Select
          onValueChange={(value) => setSelectedCategory(value === 'all' ? '' : value)}
          value={selectedCategory || 'all'}
        >
          <SelectTrigger className="w-56">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="text"
          placeholder="Search products..."
          className="w-56"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="flex flex-col h-full">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {product.title}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {product.category}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex justify-center">
              <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
                className="w-full h-48 object-contain"
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-2 mt-auto">
              <p className="text-indigo-600 font-bold text-lg text-center">
                ${product.price.toFixed(2)}
              </p>

              {/* Show Add to Cart button only if user is logged in */}
              {isLoggedIn && (
                <Button
                  onClick={() => addToCart(product)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white w-full"
                >
                  Add to Cart
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
