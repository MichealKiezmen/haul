import { TruckObject } from '@/types/interface'
import React from 'react'



function TruckCard({id, driver, status, location} : TruckObject) {
  return (
    <div className='rounded-xl h-[280px] lg:h-[300px] w-[300px] sm:w-[400px] transition-all shadow-xl/30 hover:shadow-xl/20 '>
    <div className='flex items-center justify-center h-[100px] bg-black/75 text-white text-center px-5 py-3 '>
        <p className='text-3xl font-bold '>{id}</p>
    </div>
    <div className='py-8 px-4 space-y-2'>
        <p className='text-2xl font-semibold'>{driver}</p>
        <div className='flex'>
            <p>status: <span className='font-light'>{status}</span></p>
            <div className={`my-auto ml-2  h-3 w-3 rounded-full 
                ${status === "In Transit" ? "bg-themed_transit animate-ping border-2" 
                : status === "Idle" ? "bg-themed_idle border-1"  
                    : "bg-themed_maintenance border-1" }
                `} />
        </div>
        <p className='text-sm'>last known location: <span className='text-lg font-semibold'>{location?.city}</span></p>
    </div>
    </div>
  )
}

export default TruckCard
