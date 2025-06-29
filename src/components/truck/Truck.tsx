import { TruckObject } from '@/types/interface'
import React, { useEffect, useState } from 'react'
import TruckCard from './TruckCard'
import Link from 'next/link'

function Truck({data, isLoading} : any) {

    const [trucksList, setTrucksList] = useState([])


    useEffect(() => {
        setTrucksList(data || [])
    },[data, isLoading])

  return (
    <>
    {isLoading ?
    <div className='mx-auto my-16'>
        <div className='mx-auto animate-spin  h-20 w-20 border-t-2 rounded-full mb-4' />
        <p className='font-semibold text-lg'>Fetching Data</p>
    </div>
    :
    <div>
    {trucksList.length > 0 ? 
    
    <div className='lg:my-8 grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-x-12 p-4 sm:px-0 place-items-center'>
    {trucksList.map(({id, driver, status, location}: TruckObject) => {
        return <Link href={`/trucks/${id}`} className="my-8" key={id}>
            <TruckCard id={id} driver={driver} status={status} location={location} />
        </Link>
    })}
    </div>
    :
        <p className='font-semibold text-xl lg:text-3xl text-center my-16'>No Data</p>

    }
    </div>
    }
    </>

  )
}

export default Truck
