import React from 'react';

interface ExchangeRateCardProps {
  exchangeName: string;
  price: number;
  onDetailsClick: () => void;
}

const ExchangeRateCard: React.FC<ExchangeRateCardProps> = ({
  exchangeName,
  price,
  onDetailsClick,
}) => {
  return (
    <div className='border rounded-lg shadow-md p-4 bg-white mt-4'>
      <div className='flex justify-between items-center'>
        <span className='text-xl font-semibold'>{exchangeName}</span>
        <span className='text-2xl font-bold'>{`$${price.toLocaleString()}`}</span>
      </div>
      {/* TODO: put a link to HistoricalDataModal */}
      <button
        onClick={onDetailsClick}
        className='mt-3 bg-blue-500 text-white rounded px-4 py-2'
      >
        View Details
      </button>
    </div>
  );
};

export default ExchangeRateCard;
