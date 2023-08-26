import { Exchange } from './types';
import { useGetPairDataQuery as useBinanceGetPairQuery } from '../features/cryptoPairs/binanceApiSlice';
import { useGetPairDataQuery as useBitfinexGetPairQuery } from '../features/cryptoPairs/bitfinexApiSlice';
import { useGetPairDataQuery as useKrakenGetPairQuery } from '../features/cryptoPairs/krakenApiSlice';
import { useGetPairDataQuery as useHuobiGetPairQuery } from '../features/cryptoPairs/huobiApiSlice';
import { binanceApi } from '../features/cryptoPairs/binanceApiSlice';
import { bitfinexApi } from '../features/cryptoPairs/bitfinexApiSlice';
import { krakenApi } from '../features/cryptoPairs/krakenApiSlice';
import { huobiApi } from '../features/cryptoPairs/huobiApiSlice';

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

export const apis = [binanceApi, bitfinexApi, krakenApi, huobiApi];
