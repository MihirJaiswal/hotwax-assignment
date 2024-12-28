import HomeHeader from '@/components/HomeHeader';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50  dark:bg-gradient-to-br dark:from-cyan-950 dark:via-blue-950 dark:to-black">
      <HomeHeader/>
      <Hero/>
      <Footer/>
    </div>
  )
}





