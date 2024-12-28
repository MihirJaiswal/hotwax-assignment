import Link from 'next/link'
import HomeNav from './HomeNav'
import HomeMobileNav from './HomeMobileNav'
import Image from 'next/image'

const HomeHeader: React.FC = () => {
  return (
    <header className='fixed w-full top-0 z-50 bg-mainb backdrop-blur-sm border-b border-gray-600 bg-white dark:bg-black'>
      <div className='flex justify-between items-center px-5 lg:px-7.5 xl:px-10 py-4'>
        <Link href="/" className='flex items-center'>
          <Image
            src="/logo.jpg"
            alt="Logo"
            width={40}
            height={40}
            className="mr-2"
            />
        </Link>
        <nav className='hidden lg:block'>
          <HomeNav />
        </nav>
        <div className='flex items-center gap-5'>
          
          <div className='lg:hidden'>
            <HomeMobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}

export default HomeHeader