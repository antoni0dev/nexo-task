import { FC } from 'react';
import HistoricalDataModal from './HistoricalDataDetails';
import { capitalizeString } from '../lib/utils';
import { useDispatch } from 'react-redux';
import { openModal, setChildren } from '../features/modalSlice';

interface Props {
  exchangeName: string;
  price: number | null;
  historicalTradeData: { [key: string]: UnifiedTrade[] } | undefined;
}

const ExchangeRateCard: FC<Props> = ({
  exchangeName,
  price,
  historicalTradeData,
}) => {
  const dispatch = useDispatch();

  const formattedPrice = `$${price?.toLocaleString(undefined, {
    maximumFractionDigits: 4,
  })}`;

  const handleDetailsClick = () => {
    dispatch(
      setChildren(
        <HistoricalDataModal
          historicalTradeData={
            historicalTradeData && historicalTradeData[exchangeName]
          }
        />
      )
    );
    dispatch(openModal());
  };

  return (
    <div className='rounded-xl shadow-2xl p-6 bg-gradient-to-br from-gray-600 to-gray-900 transform transition-all duration-300 hover:scale-105'>
      <h3 className='text-2xl font-bold mb-4 text-gray-100 px-4 py-2 rounded-full'>
        {capitalizeString(exchangeName)}
      </h3>
      <div className='flex justify-between items-center mt-4 '>
        <div>
          <span className='text-gray-100 font-bold cursor-pointer underline hover:no-underline'>
            {formattedPrice}
          </span>
          <p className='text-gray-300 mt-2'>Current Price</p>
        </div>
      </div>
      <button
        onClick={handleDetailsClick}
        className='mt-6 bg-transparent border-2 border-gray-300 text-gray-200 rounded-full px-6 py-3 hover:bg-gray-700 hover:text-gray-100 focus:outline-none focus:ring focus:ring-gray-500 transition duration-300'
      >
        View Details
      </button>
    </div>
  );
};

export default ExchangeRateCard;
