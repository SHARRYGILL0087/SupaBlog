'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from "@/app/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet"
import { ModeToggle } from './ModToggle';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { logout } from '@/redux/slices/isloginSlice';
import axios from 'axios';


export default function Navbar() {
  const isLogin = useSelector((state: RootState) => state.isLoginSlice.isLogin)
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    try {
      const res = await axios.get("api/user/logout")
      console.log(res.data)
      if(res.data){
        dispatch(logout())
      }
    } catch (error) {
      console.log("Error while looging out" , error)
    }
  }

  return (
    <nav className="p-4 sticky top-0 z-50 border-b   backdrop-blur-md ">
      <div className="container w-[90vw] mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className='flex gap-1'>
          <svg className="w-8 h-8 text-primary animate-spin-slow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
            <path d="M12 2a10 10 0 0 1 10 10" />
          </svg>
          <Link href="/" className="text-2xl font-bold tracking-wide">
            SupaBlog
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className='flex gap-2.5'>
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="hover:text-gray-600 transition-colors">
              Home
            </Link>
            <Link href="/blog" className="hover:text-gray-600 transition-colors">
              Blog
            </Link>
            <Link href="/" className="hover:text-gray-600 transition-colors">
              About
            </Link>
            <Link href="/" className="hover:text-gray-600 transition-colors">
              Contact
            </Link>

            {/* Mobile Menu Button */}
            {!isLogin ? (<div className='space-x-2.5 pt-1'>
              <Link href={'/user/login'}>
                <Button className='cursor-pointer' variant="outline">LogIn</Button>
              </Link>
              <Link href={'/user/signup'}>
                <Button className='cursor-pointer' variant="outline">SignUp</Button>
              </Link>
            </div>) : (
              <Link href={'/'}>
                <Button onClick={handleLogout} className='cursor-pointer' variant="outline">LogOut</Button>
              </Link>
            )}

          </div>

          <div className='pt-1'>
            <ModeToggle />
          </div>





          <Sheet>
            <SheetTrigger>
              <button
                className="md:hidden focus:outline-none pt-1.5"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>SupaBlog</SheetTitle>
                <SheetDescription>
                  <div className='flex flex-col gap-5 mt-5 justify-center items-center'>
                    <Link href="/" className="hover:text-gray-600 transition-colors">
                      Home
                    </Link>
                    <Link href="/blog" className="hover:text-gray-600 transition-colors">
                      Blog
                    </Link>
                    <Link href="/" className="hover:text-gray-600 transition-colors">
                      About
                    </Link>
                    <Link href="/" className="hover:text-gray-600 transition-colors">
                      Contact
                    </Link>

                    {/* Mobile Menu Button */}
                    <div className='space-x-2.5 pt-1'>
                      <Button className='cursor-pointer' variant="outline">LogIn</Button>
                      <Button className='cursor-pointer' variant="outline">SignUp</Button>
                    </div>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

        </div>


      </div>


    </nav>
  );
}