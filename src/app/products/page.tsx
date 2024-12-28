import Navbar from '@/components/HomeHeader'
import Products from '@/components/Product'

export default function page() {
  return (
    <div className='bg-white dark:bg-gradient-to-br dark:from-cyan-950 dark:via-blue-950 dark:to-black'>
        <Navbar/>
      <div className='mt-12'>
      <Products/>
      </div>
    </div>
  )
}
