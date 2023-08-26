import { Exchange } from '../lib/types';
import {
  useGetPairDataQuery,
  useGetHistoryTradesQuery,
} from '../features/cryptoPairs/binanceApiSlice';
import {
  extractPriceFromData,
  formatSearchPairForExchange,
  getErrorMessage,
  normalizeTradeData,
} from '../lib/utils';

export const useBinanceData = (
  exchange: Exchange,
  searchPair: string,
  skip: boolean
) => {
  const formattedSearchPair = formatSearchPairForExchange(exchange, searchPair);

  const pairDataQuery = useGetPairDataQuery(formattedSearchPair, { skip });
  const historyDataQuery = useGetHistoryTradesQuery(formattedSearchPair, {
    skip,
  });

  const isLoading = pairDataQuery.isLoading || historyDataQuery.isLoading;

  let normalizedHistoryData;
  let price = null;

  if (pairDataQuery.isSuccess && historyDataQuery.isSuccess) {
    normalizedHistoryData = normalizeTradeData(historyDataQuery.data, exchange);
    price = extractPriceFromData(exchange, pairDataQuery.data);
  }

  const formattedError = pairDataQuery.error
    ? getErrorMessage(pairDataQuery.error)
    : null;

  const formattedHistoricalError = historyDataQuery.error
    ? getErrorMessage(historyDataQuery.error)
    : null;

  return {
    data: pairDataQuery.data || null,
    price,
    isLoading,
    error: formattedError,
    historyData: normalizedHistoryData,
    historicalError: formattedHistoricalError,
  };
};
