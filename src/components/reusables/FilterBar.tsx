import React from 'react'

function FilterBar({onChange} : any) {
  return (
      <form>
        <p className='mt-5 mb-2 text-xl lg:text-2xl'>Filter By Status</p>
        <div className='flex justify-center w-full' >
            <select onChange={onChange} className='border-black
             border-2 px-3 py-3  w-[300px] sm:w-[400px] xl:w-[500px] rounded-lg'>
                <option value="All">All Trucks</option>
                <option value="Idle">Idle</option>
                <option value="In Transit">In Transit</option>
                <option value="Maintenance">Maintenance</option>
            </select>
        </div>
      </form>
  )
}

export default FilterBar
