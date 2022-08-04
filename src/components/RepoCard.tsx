import React, { useState } from 'react'
import { useActions } from '../hooks/actions'
import { useAppSelector } from '../hooks/redux';
import { IRepo } from '../models/models'

const RepoCard = ({repo}: {repo:IRepo}) => {
  const {addFavorite, removeFavorite} = useActions();
  const {favorites} = useAppSelector(state => state.github);
  const [isFavorite, setIsFavorite] = useState(favorites.includes(repo.html_url));

  const addToFavorites = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    addFavorite(repo.html_url)
    setIsFavorite(true)
  }

  const removeFromFavorites = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    removeFavorite(repo.html_url)
    setIsFavorite(false)
  }

  return (
    <div className='border py-3 px-5 rounded cursor-pointer mb-2 hover:shadow-md hover:bg-gray-100 transition-all'>
        <a href={repo.html_url} target='_blank'>
        <h2 className='text-lg font-bold'>{repo.full_name}</h2>
        <p className='text-sm'>
            Forks: <span className='font-bold mr-2'>{repo.forks}</span>
            Watchers: <span className='font-bold'>{repo.watchers}</span>
        </p>
        <p className='text-sm font-thin'>{repo?.description}</p>
        {!isFavorite ?
        <button 
        onClick={addToFavorites}
        className='py-2 px-4 bg-yellow-400 rounded hover:shadow-md transition-all'
        >
          Add
        </button>
        :
        <button 
        onClick={removeFromFavorites}
        className='py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all'
        >
          Remove
        </button>
        }
        </a>
    </div>
  )
}

export default RepoCard