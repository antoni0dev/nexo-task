import { useMemo, useState } from 'react';
import { useGetAllPairsQuery } from '../features/cryptoPairs/binanceApiSlice';
import {
  getErrorMessage,
  partitionExchangeDataBySuccess,
  sortExchangeData,
} from '../lib/utils';
import { useExchangeData } from '../hooks/useExchangeData';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import ExchangeRateCard from '../components/ExchangeRateCard';
import Message from '../components/Message';
import { priceErrorMessage } from '../lib/utils';
import { useDispatch } from 'react-redux';
import { apis } from '../lib/constants';

const HomePage = () => {
  const dispatch = useDispatch();
  const [searchPair, setSearchPair] = useState('');
  const [sortedItems, setSortedItems] = useState<
    ExchangeDataStructure[] | null
  >(null);

  // Data is cached for as long as the component is mounted, e.g. subscribed
  const {
    data,
    isLoading: isGetAllPairsLoading,
    error: getAllPairsError,
  } = useGetAllPairsQuery({});

  // All data for the various exchanges. When searchPair is false (""), "skip" should be set to true to skip fetching
  const { exchangeData, isLoading: isExchangeDataLoading } = useExchangeData(
    searchPair,
    !searchPair
  );

  const handleSearchPair = (value: string) => {
    setSearchPair(value);
  };

  const handleClearSearch = () => {
    apis.forEach((api) => {
      dispatch(api.util.resetApiState());
    });

    setSearchPair('');
  };

  const handleSort = (
    key: keyof ExchangeDataStructure['data'],
    desc: boolean
  ) => {
    const sortedData = sortExchangeData(exchangeData, key, desc);
    setSortedItems(sortedData);
  };

  // Check if the items have to be sorted depending on state
  const itemsToDisplay = sortedItems ?? exchangeData;

  // Split successful from error exchange responses
  const [successfulEntries, errorEntries] = useMemo(
    () => partitionExchangeDataBySuccess(itemsToDisplay),
    [itemsToDisplay]
  );

  return (
    <>
      {isGetAllPairsLoading ? (
        <Loader />
      ) : getAllPairsError ? (
        <Message variant='error' message={getErrorMessage(getAllPairsError)} />
      ) : (
        <>
          {!searchPair && (
            <SearchBar
              allPairs={data}
              searchTerm={searchPair}
              onSearch={handleSearchPair}
            />
          )}

          {/* Only when searchPair.length > 0 the exchanges' hooks will run */}
          {searchPair &&
            (isExchangeDataLoading ? (
              <Loader />
            ) : (
              exchangeData && (
                <div className='container mx-auto py-8 flex flex-col gap-3'>
                  <h1 className='text-4xl font-bold italic mb-8 text-center text-gray-700 px-6 py-3'>
                    {searchPair} Rates
                  </h1>
                  <div>
                    <button
                      className='bg-gray-700 border-2 border-gray-300 text-gray-100 rounded-xl px-6 py-4 hover:bg-gray-700 hover:text-gray-100 focus:outline-none focus:ring focus:ring-gray-500 transition duration-300'
                      onClick={() => handleSort('price', false)}
                    >
                      Sort by Ascending
                    </button>

                    <button
                      className='bg-gray-700 border-2 border-gray-300 text-gray-100 rounded-xl px-6 py-4 hover:bg-gray-700 hover:text-gray-100 focus:outline-none focus:ring focus:ring-gray-500 transition duration-300'
                      onClick={() => handleSort('price', true)}
                    >
                      Sort by Descending
                    </button>
                  </div>
                  {successfulEntries.map(({ name, data }) => (
                    <ExchangeRateCard
                      key={name}
                      exchangeName={name}
                      price={data.price}
                      historicalTradeData={data.historyData}
                    />
                  ))}
                  {/* Render Error Entries */}
                  {errorEntries.map(({ name }) => (
                    <Message
                      key={name}
                      variant='error'
                      message={priceErrorMessage(name, searchPair)}
                    />
                  ))}
                  <button
                    onClick={handleClearSearch}
                    className='mt-6 bg-gray-700 bg-gray-500 border-2 border-gray-300 text-gray-300 rounded-xl px-6 py-4 hover:bg-gray-700 hover:text-gray-100 focus:outline-none focus:ring focus:ring-gray-500 transition duration-300'
                  >
                    Clear Search
                  </button>
                </div>
              )
            ))}
        </>
      )}
    </>
  );
};

export default HomePage;
