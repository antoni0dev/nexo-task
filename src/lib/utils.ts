import { Exchange } from './types';

export const getErrorMessage = (error: any): string => {
  if (error.data && typeof error.data.message === 'string') {
    return error.data.message;
  }

  if (error.message) {
    return error.message;
  }

  if (error.error) {
    return error.error;
  }

  return 'An unknown error occurred';
};

// Formats the search pair for a specific exchange
export const formatSearchPairForExchange = (
  exchangeName: Exchange,
  searchPair: string
): string => {
  switch (exchangeName) {
    case Exchange.BINANCE:
    case Exchange.KRAKEN:
      return searchPair; // Already uppercase by default
    case Exchange.HUOBI:
      return searchPair.toLowerCase();
    case Exchange.BITFINEX:
      return `t${searchPair}`;
    default:
      throw new Error('Unknown exchange');
  }
};

//  Extracts price data from the raw data for a specific exchange.
export const extractPriceFromData = (
  exchangeName: Exchange,
  data: ExchangeData
): number | null => {
  if (!data) return null;

  switch (exchangeName) {
    case Exchange.BINANCE:
      return parseFloat((data as BinanceData).lastPrice);
    case Exchange.KRAKEN: {
      const pair = Object.keys((data as KrakenData).result)[0];
      return parseFloat((data as KrakenData).result[pair].c[0]);
    }
    case Exchange.HUOBI:
      return (data as HuobiData).tick.close;
    case Exchange.BITFINEX:
      return (data as BitfinexData)[6];
    default:
      throw new Error('Unknown exchange');
  }
};

// assert that a param in the url is not undefined
export function invariant(value: unknown): asserts value {
  if (value) {
    return;
  }

  throw new Error('Invariant violation');
}
