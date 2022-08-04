import React from 'react'
import { useAppSelector } from '../hooks/redux'

const FavoritePage = () => {
  const { favorites } = useAppSelector(state => state.github)
  if(favorites.length === 0 ) return <p className='text-center'>No items...</p>
  return (
    <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
    <ul className='list-none'>
{favorites.map(f => 
  <li key={f} className='border py-3 px-5 rounded cursor-pointer mb-2 hover:shadow-md hover:bg-gray-100 transition-all'>
    <a href={f} target='_blank' rel="noreferrer">{f}</a>
    </li>)
  }
    </ul>
    </div>
  )
}

export default FavoritePage