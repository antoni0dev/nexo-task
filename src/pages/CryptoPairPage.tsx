import { useExchangeData } from '../hooks/useExchangeData';
import { useParams } from 'react-router-dom';
import { getErrorMessage, invariant } from '../lib/utils';
import { priceErrorMessage } from '../lib/utils';
import ExchangeRateCard from '../components/ExchangeRateCard';
import Loader from '../components/Loader';
import Message from '../components/Message';

const CryptoPairPage = () => {
  const { pair } = useParams();
  invariant(pair);

  const { exchangeData, isLoading, errors } = useExchangeData(pair);

  return isLoading ? (
    <Loader />
  ) : errors ? (
    errors.map((error) => (
      <Message variant='error' message={getErrorMessage(error)} />
    ))
  ) : (
    <div className='container mx-auto py-8'>
      <h1 className='text-4xl font-bold mb-8 text-center'>
        {pair.toUpperCase()} Rates
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {exchangeData.map(({ name, data }) => (
          <div key={name}>
            {data.price ? (
              <ExchangeRateCard
                exchangeName={name}
                price={data.price}
                historicalTradeData={data.historyData}
              />
            ) : (
              <Message
                variant='error'
                message={priceErrorMessage(name, pair)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoPairPage;
