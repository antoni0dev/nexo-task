import { Exchange } from '../lib/types';
import { useGetPairDataQuery } from '../features/cryptoPairs/binanceApiSlice';
import {
  extractPriceFromData,
  formatSearchPairForExchange,
  getErrorMessage,
} from '../lib/utils';

export const useBinanceData = (
  exchange: Exchange,
  searchPair: string,
  skip: boolean
) => {
  const formattedSearchPair = formatSearchPairForExchange(exchange, searchPair);
  const { data, isLoading, error } = useGetPairDataQuery(formattedSearchPair, {
    skip,
  });

  const price = extractPriceFromData(exchange, data);
  const formattedError = error ? getErrorMessage(error) : null;

  return { data, price, isLoading, error: formattedError };
};
