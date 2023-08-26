import { FC } from 'react';
import TradeDetail from './TradeDetail';
import Message from './Message';

interface Props {
  historicalTradeData: UnifiedTrade[] | undefined;
}

const HistoricalDataDetails: FC<Props> = ({ historicalTradeData }) => {
  return (
    <div className='p-6 overflow-y-auto'>
      <h2 className='text-xl font-semibold mb-4'>Historical Trades</h2>
      <ul className='divide-y divide-gray-200'>
        {historicalTradeData && historicalTradeData.length > 0 ? (
          historicalTradeData.map((trade) => (
            <TradeDetail key={trade.timestamp} trade={trade} />
          ))
        ) : (
          <Message variant='error' message='No data available' />
        )}
      </ul>
    </div>
  );
};

export default HistoricalDataDetails;
