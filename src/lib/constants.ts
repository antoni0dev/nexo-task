import { Exchange } from './types';
import { useGetPairDataQuery as useBinanceGetPairQuery } from '../features/cryptoPairs/binanceApiSlice';
import { useGetPairDataQuery as useBitfinexGetPairQuery } from '../features/cryptoPairs/bitfinexApiSlice';
import { useGetPairDataQuery as useKrakenGetPairQuery } from '../features/cryptoPairs/krakenApiSlice';
import { useGetPairDataQuery as useHuobiGetPairQuery } from '../features/cryptoPairs/huobiApiSlice';

export const PATHS = {
  home: '/',
  pair: ':pair',
  details: '/:pair/details',
};

export enum ERROR_MESSAGES {
  UNKNOWN_ERROR = 'An unknown error occurred',
  UNKNOWN_EXCHANGE = 'Unknown exchange',
  INVARIANT_VIOLATION = 'Invariant violation',
}

export const exchanges = {
  [Exchange.BINANCE]: useBinanceGetPairQuery,
  [Exchange.BITFINEX]: useBitfinexGetPairQuery,
  [Exchange.KRAKEN]: useKrakenGetPairQuery,
  [Exchange.HUOBI]: useHuobiGetPairQuery,
};

export const capitalizeString = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const priceErrorMessage = (exchangeName: string, pair: string) => {
  const formattedName = capitalizeString(exchangeName);

  return `Price details are unavailable or do not exist at all for ${pair} on ${formattedName}`;
};
