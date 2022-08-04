import React, { useEffect, useState } from 'react'
import RepoCard from '../components/RepoCard';
import { useDebounce } from '../hooks/debounceHook';
import { useLazyGetUserReposQuery, useSearchUsersQuery } from '../store/github/github.api';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const debounced = useDebounce(search);
  const { data, isLoading, isError } = useSearchUsersQuery(debounced,{ 
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });

  const [fetchRepos, {isLoading: areReposLoading, data: repos}] = useLazyGetUserReposQuery()

  useEffect(() => {
  setDropdown(debounced.length > 3 && data?.length! > 0);
  }, [debounced]);

  const clickHandler = (username: string) => {
      fetchRepos(username)
      setDropdown(false);
  }
  
  return (
    <>
    <div>HomePage</div>
    <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
      {isError && <p className='text-center text-red-600'>Something went wrong...</p>}

      <div className="relative w-[560px]">
        <input 
        type="text"
        className = "border py-2 px-4 w-full h-[42px] mb-2"
        placeholder="Search for a GitHub username..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />

        {dropdown && <ul className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white overflow-y-scroll">
          {isLoading && <p className='text-center text-gray-600'>Loading...</p>}
          {data?.map(user => (
            <li 
              key={user.id}
              onClick={() => clickHandler(user.login)} 
              className='flex items-center py-2 px-4 hover:bg-gray-500 hover:text-write transition-colors cursor:pointer'>{user.login}</li>
          ))
          }
        </ul>}
        <div className="container">
        {areReposLoading && <p className='text-center'>Repos are loading...</p>}
        {repos?.map(repo => <RepoCard repo={repo}  key={repo.node_id} />)}
      </div>
      </div>
    </div>
    </>
  )
}

export default HomePage