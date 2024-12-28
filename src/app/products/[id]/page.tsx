'use client' 
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios';
import HomeHeader from '@/components/HomeHeader';
import { Loader } from '@/components/Loader';
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button';

interface Product {
  id: number
  title: string
  price: number
  category: string
  image: string
  description: string
  rating: {
    rate: number
    count: number
  }
}

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null)
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { toast } = useToast()
  
  useEffect(() => {
    // Check if user is logged in by looking for user data in localStorage
    const user = localStorage.getItem('currentUser');
    if (user) {
      setIsLoggedIn(true);
    }

    if (!id) {
      setError('No product ID provided');
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to fetch product details');
      } 
    };

    fetchProduct();
  }, [id]);

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find((item: { id: number }) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }

    localStorage.setItem('cart', JSON.stringify(cart))

    toast({
      title: 'Product added to cart!',
      description: `${product.title} has been added to your cart.`,
    })
  }

  if (!product) return <div className='max-h-screen flex items-center justify-center' > <Loader/> </div>

  return (
    <>
    <HomeHeader/>
    <div className="container p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md max-w-7xl mx-auto mt-20">
  
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <img
          src={product.image}
          alt={product.title}
          width={300}
          height={300}
          className="object-contain border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
        />
        
        <div className="ml-0 mt-6 md:ml-8 md:mt-0">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">
        {product.title}
      </h1>
          <p className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
            ${product.price.toFixed(2)}
          </p>
          <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">
            Category: <span className="font-normal">{product.category}</span>
          </p>
          <p className="mt-4 text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            {product.description}
          </p>
          <div className="mt-6 flex items-center text-sm text-gray-700 dark:text-gray-300">
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.75 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
              </svg>
              <span className="ml-1 font-medium">{product.rating.rate.toFixed(1)}</span>
            </span>
            <span className="ml-4">({product.rating.count} reviews)</span>
          </div>
          <div className='mt-12'>
          {isLoggedIn && (
            <Button
              onClick={() => addToCart(product)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white "
            >
              Add to Cart
            </Button>
          )}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
