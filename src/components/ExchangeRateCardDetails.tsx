import { v4 as uuidv4 } from 'uuid';
import TradeDetail from './TradeDetail';
import Message from './Message';

const ExchangeRateCardDetails = ({
  name,
  data,
}: {
  name: string;
  data: any;
}) => {
  return (
    <div key={name} className='bg-white p-4 rounded shadow'>
      <h2 className='text-xl font-semibold mb-4'>{name}</h2>
      <ul className='divide-y divide-gray-200'>
        {data.historyData ? (
          data.historyData.data.map((trade: UnifiedTrade) => (
            <TradeDetail key={uuidv4()} trade={trade} />
          ))
        ) : (
          <Message variant='error' message='No data available' />
        )}
      </ul>
    </div>
  );
};

export default ExchangeRateCardDetails;
