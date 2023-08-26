import { Link, useParams } from 'react-router-dom';
import { useExchangeData } from '../hooks/useExchangeData';
import Loader from '../components/Loader';
import {
  invariant,
  partitionExchangeDataBySuccess,
  sortExchangeData,
} from '../lib/utils';
import ExchangeRateCardDetails from '../components/ExchangeRateCardDetails';
import { PATHS } from '../lib/constants';
import { useMemo, useState } from 'react';

const DetailsPage = () => {
  const [sortedItems, setSortedItems] = useState<ExchangeDataStructure[]>();
  const { pair } = useParams();
  invariant(pair);

  const { exchangeData, isLoading } = useExchangeData(pair);

  const handleSort = (
    key: keyof ExchangeDataStructure['data'],
    desc: boolean
  ) => {
    const sortedData = sortExchangeData(exchangeData, key, desc);
    setSortedItems(sortedData);
  };

  const itemsToDisplay = sortedItems ?? exchangeData;

  // Split successful from error exchange responses
  const [successfulEntries, errorEntries] = useMemo(
    () => partitionExchangeDataBySuccess(itemsToDisplay),
    [itemsToDisplay]
  );

  return isLoading ? (
    <Loader />
  ) : (
    <div className='p-6'>
      <div className='flex justify-between align-center'>
        <h1 className='text-3xl font-bold mb-6'>Details for {pair}</h1>
        <Link to={PATHS.home}>
          <button className='bg-gray-700 bg-gray-500 border-2 border-gray-300 text-gray-100 rounded-xl px-6 py-4 hover:bg-gray-700 hover:text-gray-100 focus:outline-none focus:ring focus:ring-gray-500 transition duration-300'>
            Go Home
          </button>
        </Link>
      </div>
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
      <div className='grid grid-cols-1  gap-6'>
        {successfulEntries.map(({ name, data }) => (
          <ExchangeRateCardDetails data={data} name={name} key={name} />
        ))}
        {errorEntries.map(({ name, data }) => (
          <ExchangeRateCardDetails data={data} name={name} key={name} />
        ))}
      </div>
    </div>
  );
};

export default DetailsPage;
