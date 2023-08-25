import { useState } from 'react';
import { useGetAllPairsQuery } from '../features/cryptoPairs/binanceApiSlice';
import { getErrorMessage } from '../lib/utils';
import { useExchangeData } from '../hooks/useExchangeData';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import ExchangeRateCard from '../components/ExchangeRateCard';
import Message from '../components/Message';
import { priceErrorMessage } from '../lib/constants';

const HomePage = () => {
  const [searchPair, setSearchPair] = useState('');

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

  return (
    <div>
      {isGetAllPairsLoading ? (
        <Loader />
      ) : getAllPairsError ? (
        getErrorMessage(getAllPairsError)
      ) : (
        <>
          <SearchBar
            allPairs={data}
            searchTerm={searchPair}
            onSearch={handleSearchPair}
          />
          {/* Check for searchPair.length > 0 as only then the exchanges' hooks will run */}
          {!!searchPair &&
            (isExchangeDataLoading ? (
              <Loader />
            ) : (
              exchangeData && (
                <div className='container mx-auto py-8 flex flex-col gap-3'>
                  <h1 className='text-4xl font-bold mb-8 text-center'>
                    {searchPair} Rates
                  </h1>
                  {exchangeData.map(({ name, data }) =>
                    data.price ? (
                      <ExchangeRateCard
                        key={name}
                        exchangeName={name}
                        price={data.price}
                        onDetailsClick={() => {}}
                      />
                    ) : (
                      <Message
                        key={name}
                        variant='error'
                        message={priceErrorMessage(name, searchPair)}
                      />
                    )
                  )}
                </div>
              )
            ))}
        </>
      )}
    </div>
  );
};

export default HomePage;
