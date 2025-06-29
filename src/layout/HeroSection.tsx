import { HeroData } from '@/types/interface'
import React from 'react'



function HeroSection({image, txt1, txt2} : HeroData) {
  return (
    <div className='h-[50vh] lg:h-[60vh] bg-themed_button relative text-white'>
    <img className='h-full w-full object-cover' src={image} alt="company-place" />
      <div className='absolute top-0 h-full w-full z-[2] bg-black/55' />
      <div className='flex flex-col items-center justify-center px-4 absolute top-0 
        h-full w-full z-[3] bg-transparent space-y-1 '>
        <p className='text-4xl lg:text-6xl font-bold font-roboto'>{txt1 || "Haul Trucks"}</p>
        <p className='font-light text-xl lg:text-2xl 2xl:text-4xl'>{txt2 || "Move with us..."}</p>
      </div>
    </div>
  )
}

export default HeroSection
