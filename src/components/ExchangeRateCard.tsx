import { FC } from 'react';
import { capitalizeString } from '../lib/constants';

interface Props {
  exchangeName: string;
  price: number;
  onDetailsClick: () => void;
}

const ExchangeRateCard: FC<Props> = ({
  exchangeName,
  price,
  onDetailsClick,
}) => {
  const formattedPrice = `$${price.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return (
    <div className='border rounded-lg shadow-md p-4 bg-white'>
      <div className='flex justify-between items-center'>
        <span className='text-xl font-semibold'>
          {capitalizeString(exchangeName)}
        </span>
        <span className='text-2xl font-bold'>{formattedPrice}</span>
      </div>
      <button
        onClick={onDetailsClick}
        className='mt-3 bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200'
      >
        View Details
      </button>
    </div>
  );
};

export default ExchangeRateCard;
