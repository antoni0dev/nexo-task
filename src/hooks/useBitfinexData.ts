import { Exchange } from '../lib/types';
import { useGetPairDataQuery } from '../features/cryptoPairs/bitfinexApiSlice';
import {
  extractPriceFromData,
  formatSearchPairForExchange,
  getErrorMessage,
} from '../lib/utils';

export const useBitfinexData = (
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
