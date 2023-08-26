import { useParams } from 'react-router-dom';
import { useExchangeData } from '../hooks/useExchangeData';
import Loader from '../components/Loader';
import { getErrorMessage, invariant } from '../lib/utils';
import ExchangeRateCardDetails from '../components/ExchangeRateCardDetails';
import Message from '../components/Message';

const DetailsPage = () => {
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
    <div className='p-6'>
      <h1 className='text-3xl font-bold mb-6'>Details for {pair}</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {exchangeData.map(({ name, data }) => (
          <ExchangeRateCardDetails data={data} name={name} />
        ))}
      </div>
    </div>
  );
};

export default DetailsPage;
