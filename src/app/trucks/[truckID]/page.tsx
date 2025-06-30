"use client"


import { fetchData } from '@/helper/makeRequests'
import Header from '@/layout/Header'
import HeroSection from '@/layout/HeroSection'
import { TruckObject } from '@/types/interface'
import { useParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const MapComponent = dynamic(() => import('@/components/map/MapComponent'), {
  ssr: false,
  loading: () => <p>Loading map...</p>
});

function TruckPage() {
    const { truckID } = useParams()
    const [truckData, setTruckData] = useState<TruckObject>({
        id : "",
        driver: "",
        status: "",
        location: {
            city: "",
        },
        truckImage: "",
        route: [],
        currentRouteIndex: 0
    })
    const [loading, setLoading] = useState(false)

    async function fetchDataByID(){
        setLoading(true)
        const result = await fetchData("https://oluwaseun-test.free.beeceptor.com/api/trucks/")
        const data = result?.data || []
        
        setTruckData((data.length > 0 && data.find(({id} : TruckObject) => {
             return id === String(truckID)
        })))
        setLoading(false)
    }

    const getTrucksLiveUpdates = useCallback(() => {

        if(truckData){
          const currentStatus = ["In Transit", "Idle", "Maintenance"]

          const copiedTruckData = {...truckData}
          const randomNum = Math.round(Math.random() * 2)
          copiedTruckData.status = currentStatus[randomNum]
          setTruckData(copiedTruckData)

        }
    
    },[truckData])
    
    
    
        useEffect(() => {
          const timer = setInterval(() => {
              getTrucksLiveUpdates()
          },10000)
    
          return () => {
            clearInterval(timer)
          }
        },[getTrucksLiveUpdates])

    useEffect(() => {
        fetchDataByID()
    //eslint-disable-next-line
    },[truckID])

  return (
    <div>
      <Header />
      <HeroSection
      image={truckData?.truckImage || null}
      txt1={truckData?.driver}
      txt2={`LAT ${truckData?.location?.lat}, LNG ${truckData?.location?.lng}`}
       />

      <div className='my-14 flex 2xl:justify-center'>
        <div className='px-4'>
            <p className='font-semibold text-lg lg:text-2xl'>{`ID: #${truckData.id}`}</p>
            <div className='flex lg:text-2xl'>
                <p>status: <span className='font-light'>{truckData?.status}</span></p>
                <div className={`my-auto ml-2  h-3 w-3 rounded-full 
                    ${truckData?.status === "In Transit" ? "bg-themed_transit animate-ping border-2" 
                    : truckData?.status === "Idle" ? "bg-themed_idle border-1"  
                        : "bg-themed_maintenance border-1" }
                    `} />
            </div>
            <p className='text-sm lg:text-lg'>last known location: <span className='text-lg lg:text-2xl font-semibold'>{truckData?.location?.city}</span></p>
        </div>
      </div>

     
        <div className='flex justify-center px-4 md:px-6 lg:px-10 my-[100px]'>
        {loading ?
        <div className='my-16'>
        <div className='mx-auto animate-spin  h-20 w-20 border-t-2 rounded-full mb-4' />
        <p className='font-semibold text-lg'>Loading Map</p>
      </div>
      :
      <>
       {truckData && 
        <div className='w-full lg:w-3/4 2xl:w-2/4'>
         <MapComponent truck={truckData} />
        </div>
        }
      </>
        }

      </div>


    </div>
  )
}

export default TruckPage
