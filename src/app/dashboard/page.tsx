"use client"

import Header from '@/layout/Header'
import HeroSection from '@/layout/HeroSection'
import React, { useEffect, useState } from 'react'
import { fetchData } from '@/helper/makeRequests'
import Truck from '@/components/truck/Truck'
import FilterBar from '@/components/reusables/FilterBar'
import dynamic from 'next/dynamic'


const BarChartComponent = dynamic(() => import('@/components/charts/BarChartComponent'), {
  ssr: false,
  loading: () => <p>Loading Chart...</p>
});

function DashBoard() {

    const [truckData, setTruckData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [filterValue, setFilterValue] = useState("")

    async function handleChange(e : React.ChangeEvent<HTMLInputElement>) {
        const {value} = e.target
        setFilterValue(value)

        if(value === "All") return 

        if(value.length > 0){
            const result = truckData.filter(({status}) => {
                return status.toLowerCase() === value.trim().toLowerCase()
            })
            setTruckData(result)
        }
    }
    

    async function getTrucks(){
        setLoading(true)
        const result = await fetchData("https://oluwaseun-test.free.beeceptor.com/api/trucks/")
        setTruckData(result?.data || [])
        setLoading(false)
    }

    useEffect(() => {
        if(!filterValue || filterValue === "All"){
            getTrucks()
        }
        
    },[filterValue])

  return (
    <div>
      <Header />
      <HeroSection 
      image={`https://res.cloudinary.com/rentdirectcloud/image/upload/v1751113232/haul/cfnoghvmedy0yobdtomb.png`}
       />

       <div className='flex flex-col sm:flex-row sm:space-x-8'>
          <div className='md:w-2/5 xl:w-[30%]'>
            {truckData.length > 0 && <BarChartComponent data={truckData} />}
          </div>

            <div className='my-14 md:w-3/5 xl:w-[70%]'>
            <h1 className='font-bold text-center sm:text-left text-3xl'>Truck Inventories</h1>
            <div className='flex flex-col items-center sm:items-start justify-center mt-10'>
                <FilterBar onChange={handleChange} />
                <Truck data={truckData} isLoading={loading} />
            </div>
          </div>
       </div>

    </div>
  )
}

export default DashBoard
