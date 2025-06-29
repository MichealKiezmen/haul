import Link from 'next/link';
import React, { useState } from 'react'
import { IoMdMenu } from "react-icons/io";


function Header() {

  const [isOpen, setIsOpen] = useState(false)

  function toggleMenu(){
      setIsOpen(!isOpen)
  }


  return (
    <div className='flex relative flex-wrap justify-between lg:justify-around px-6 py-3'>
       <Link className='text-xl  lg:text-2xl xl:text-3xl font-bold' href="/">Haul</Link>
      <button className='lg:hidden' onClick={toggleMenu}>
        <IoMdMenu className='text-3xl' />
      </button>

      <div className={`flex flex-col lg:flex-row justify-center items-center w-full lg:w-auto py-7 lg:py-0
      space-x-8 lg:space-x-12 space-y-4 lg:space-y-0 transition-all ease-linear
        ${isOpen ? "opacity-100 h-auto z-[10] bg-[#ecf0f9] ": "opacity-0 h-0 z-[-1]"}
        fixed lg:relative top-[50px] lg:top-0 left-0 lg:h-auto lg:z-[10] lg:opacity-100
        `}>
        <Link className='hover:translate-y-2 transition-all transform' href="/">Home</Link>
        <Link className='hover:translate-y-2 transition-all transform'  href="/dashboard">Dashboard</Link>
      </div>
    </div>
  )
}

export default Header
