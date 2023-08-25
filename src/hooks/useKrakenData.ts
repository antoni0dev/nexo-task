import { Exchange } from '../lib/types';
import { useGetPairDataQuery } from '../features/cryptoPairs/krakenApiSlice';
import {
  extractPriceFromData,
  formatSearchPairForExchange,
  getErrorMessage,
} from '../lib/utils';

export const useKrakenData = (
  exchange: Exchange,
  searchPair: string,
  skip: boolean
) => {
  const formattedSearchPair = formatSearchPairForExchange(exchange, searchPair);

  const { data, isLoading, error } = useGetPairDataQuery(formattedSearchPair, {
    skip,
  });

  const price = error ? extractPriceFromData(exchange, data) : null;

  const formattedError = error ? getErrorMessage(error) : null;
  return { data, price, isLoading, error: formattedError };
};
