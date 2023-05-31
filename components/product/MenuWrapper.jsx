import React from 'react'
import Title from '../ui/Title'
import MenuItem from './MenuItem'
 const MenuWrapper = () => {
  return (
      <div className='container mx-auto  mb-16 '>
          <div className='flex flex-col items-center w-full'>
              <Title addClass="text-[40px]">Our Menu</Title>
              <div className='mt-10'>
                  <button className='px-6 py-2 bg-secondary rounded-3xl text-white text-xs'>All</button>
                  <button className='px-6 py-2 rounded-3xl text-xs'>Burger</button>
                  <button className='px-6 py-2 rounded-3xl text-xs'>Pizza</button>
                  <button className='px-6 py-2 rounded-3xl text-xs'>Drink</button>
              </div>
          </div>
          <div className='mt-8 grid md:grid-cols-3 
          sm:grid-cols-2 grid-cols-1 gap-4'>
              <MenuItem />
              <MenuItem />
              <MenuItem />

          </div>
    </div>
  )
}
export default MenuWrapper