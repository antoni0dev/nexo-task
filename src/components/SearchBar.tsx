import { FC, useMemo, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';

interface Props {
  allPairs: CryptoPair[];
  searchTerm: string;
  onSearch: (currSearchVal: string) => void;
}

const SearchBar: FC<Props> = ({ allPairs, searchTerm, onSearch }) => {
  const [inputVal, setInputVal] = useState(searchTerm);
  const debouncedInputVal = useDebounce(inputVal, 500); // debounce delay 500ms

  const filteredPairs = useMemo(
    () =>
      allPairs
        .filter(({ symbol }) =>
          symbol.toLowerCase().includes(debouncedInputVal.toLowerCase())
        )
        .slice(0, 10), // limit to 10 suggestions
    [allPairs, debouncedInputVal]
  );

  const handleSuggestionClick = (suggestion: string) => {
    onSearch(suggestion);
    setInputVal('');
  };

  return (
    <div className='flex items-center justify-center mt-10'>
      <div className='relative w-96'>
        <input
          type='text'
          placeholder='Enter cryptocurrency pair, e.g., BTCUSDT'
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className='p-2 pl-10 w-full border rounded shadow-lg focus:outline-none focus:border-gray-300'
        />

        {inputVal && (
          <div className='absolute mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg divide-y divide-gray-200'>
            {filteredPairs.length > 0 ? (
              filteredPairs.map((pair) => (
                <div
                  key={pair.symbol}
                  onClick={() => handleSuggestionClick(pair.symbol)}
                  className='cursor-pointer p-2 hover:bg-gray-200'
                >
                  {pair.symbol}
                </div>
              ))
            ) : (
              <div className='p-2 text-gray-600'>
                No pairs matching your search were found.
              </div>
            )}
          </div>
        )}

        <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
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
