import { useState } from 'react';
import SearchBar from './components/SearchBar';
import { useGetPairDataQuery } from './features/cryptoPairs/binanceApiSlice';

const App = () => {
  const [currSearch, setCurrSearch] = useState('');

  const { getTickerData, isLoading, error } = useGetPairDataQuery();

  return (
    <div>
      <SearchBar />
      {/* Here, you can map over the fetched data and render ExchangeRateCard components */}
      {/* Example: data.map(exchange => <ExchangeRateCard {...exchange} />) */}
    </div>
  );
};

export default App;
