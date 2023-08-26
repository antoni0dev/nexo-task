import { FC } from 'react';

interface Props {
  trade: UnifiedTrade;
}

const TradeDetail: FC<Props> = ({ trade }) => {
  return (
    <li className='py-4'>
      <div className='grid grid-cols-2 gap-4'>
        <span className='text-gray-600'>Trade Type</span>
        <span
          className={`font-semibold ${
            trade.tradeType === 'sell' ? 'text-red-500' : 'text-green-500'
          }`}
        >
          {trade.tradeType}
        </span>
        <span className='text-gray-600'>Price</span>
        <span className='font-semibold text-black'>
          {`$${trade.price?.toLocaleString()}` ?? 'Unknown'}
        </span>
        <span className='text-gray-600'>Timestamp</span>
        <span className='text-gray-500'>
          {trade.timestamp ? new Date(trade.timestamp).toLocaleString() : 'N/A'}
        </span>
      </div>
    </li>
  );
};

export default TradeDetail;
