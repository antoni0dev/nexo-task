import { useState } from 'react';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className='flex items-center justify-center mt-10'>
      <div className='relative'>
        <input
          type='text'
          placeholder='Enter cryptocurrency pair, e.g., BTC/USD'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className='p-2 pl-10 w-96 border rounded shadow-lg focus:outline-none focus:border-blue-300 rounded-lg'
        />
        <span className='absolute left-3 top-1/2 transform -translate-y-1/2'>
          <svg
            className='w-6 h-6 text-gray-400'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-6a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
