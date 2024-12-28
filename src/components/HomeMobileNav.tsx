'use client'
import React, { useState, useEffect } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon, Moon, Sun, ShoppingCart } from "lucide-react";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { navigation } from '../../constant';
import { DialogTitle } from '@radix-ui/react-dialog'

function HomeMobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    setIsLoggedIn(!!user);

    const theme = localStorage.getItem("theme");
    setDarkMode(
      theme === "dark" || 
      (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    router.push("/login");
  };

  const closeNavigation = () => setOpenNavigation(false);

  return (
    <section className="w-full max-w-[264px] z-50">
      <div className="flex flex-col md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <MenuIcon
              size={36}
              className="cursor-pointer sm:hidden text-white hover:text-cyan-400 transition"
            />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-black bg-opacity-90 backdrop-blur-md border-gray-700 shadow-lg"
          >
             <DialogTitle className="sr-only">Menu</DialogTitle> 
            <Link href="/" className="flex items-center gap-2">
              <p className="text-[24px] font-bold text-white px-2 mt-2">
                Mihir Ecommerce
              </p>
            </Link>
            <div className="flex flex-col justify-between h-[calc(100vh-72px)] overflow-y-auto">
              <SheetClose asChild>
                <section className="flex flex-col gap-6 text-white mt-4">
                  {navigation
                    .filter(item =>
                      isLoggedIn ? true : item.title !== "Cart" && item.title !== "Products"
                    )
                    .map(item => {
                      const isActive = pathname === item.route;
                      return (
                        <SheetClose asChild key={item.route}>
                          <Link
                            href={item.route}
                            onClick={closeNavigation}
                            className={cn(
                              "flex gap-4 items-center p-4 rounded-lg w-full max-w-60 transition hover:bg-cyan-500",
                              { 'bg-cyan-600': isActive }
                            )}
                          >
                            {item.title === "Cart" ? (
                              <ShoppingCart size={24} className="text-gray-600 dark:text-gray-300" />
                            ) : (
                              <span>{item.title}</span>
                            )}
                          </Link>
                        </SheetClose>
                      );
                    })}
                </section>
              </SheetClose>

              <div className="flex justify-between items-center mt-6 px-4">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  aria-label="Toggle Theme"
                  className="text-gray-900 dark:text-white hover:text-cyan-400 transition"
                >
                  {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                </button>
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="px-4 py-2 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
}

export default HomeMobileNav;
