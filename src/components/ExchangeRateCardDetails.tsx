import TradeDetail from './TradeDetail';
import Message from './Message';
import { capitalizeString } from '../lib/utils';

const ExchangeRateCardDetails = ({
  name,
  data,
}: {
  name: string;
  data: any;
}) => {
  return (
    <div key={name} className='bg-white border p-4 rounded shadow'>
      <h2 className='text-2xl font-bold bg-gray-700 text-white mb-4 p-4 rounded'>
        {capitalizeString(name)}
      </h2>
      <ul className='divide-y divide-gray-200'>
        {data.historyData && data.historyData[name] ? (
          data.historyData[name].map((trade: UnifiedTrade, idx: number) => {
            return <TradeDetail key={idx} trade={trade} />;
          })
        ) : data.historicalError ? (
          <Message variant='error' message={data.historicalError} />
        ) : (
          <Message variant='error' message='No data available' />
        )}
      </ul>
    </div>
  );
};

export default ExchangeRateCardDetails;
