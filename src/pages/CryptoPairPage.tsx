import { useExchangeData } from '../hooks/useExchangeData';
import { useParams } from 'react-router-dom';
import { invariant } from '../lib/utils';
import { priceErrorMessage } from '../lib/constants';
import ExchangeRateCard from '../components/ExchangeRateCard';
import Loader from '../components/Loader';
import Message from '../components/Message';

const CryptoPairPage = () => {
  const { pair } = useParams();
  invariant(pair);

  const { exchangeData, isLoading } = useExchangeData(pair);

  return isLoading ? (
    <Loader />
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
                onDetailsClick={() => {}}
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
