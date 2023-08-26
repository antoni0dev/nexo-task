import { Exchange } from './types';

// Error Messages
const ERROR_MESSAGES = {
  UNKNOWN_ERROR: 'An unknown error occurred',
  UNKNOWN_EXCHANGE: 'Unknown exchange',
};

/**
 * Retrieve the error message from an error object.
 */
export const getErrorMessage = (error: any): string => {
  return (
    error.data?.message ||
    error.message ||
    error.error ||
    ERROR_MESSAGES.UNKNOWN_ERROR
  );
};

/**
 * Format the search pair according to the exchange's naming convention.
 */
export const formatSearchPairForExchange = (
  exchangeName: Exchange,
  searchPair: string
): string => {
  switch (exchangeName) {
    case Exchange.BINANCE:
    case Exchange.KRAKEN:
      return searchPair;
    case Exchange.HUOBI:
      return searchPair.toLowerCase();
    case Exchange.BITFINEX:
      return `t${searchPair}`;
    default:
      throw new Error(ERROR_MESSAGES.UNKNOWN_EXCHANGE);
  }
};

/**
 * Extracts the price data from the raw data specific to an exchange.
 */
export const extractPriceFromData = (
  exchangeName: Exchange,
  data: ExchangeData
): number | null => {
  if (!data || ('status' in data && data.status === 'error')) return null;

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
      return +(data as BitfinexData)[3];
    default:
      throw new Error(ERROR_MESSAGES.UNKNOWN_EXCHANGE);
  }
};

/**
 * Assert that a parameter is not undefined.
 */
export function invariant(value: unknown): asserts value {
  if (!value) {
    throw new Error('Invariant violation');
  }
}

/**
 * Normalize trade data to a unified format.
 */
export const normalizeTradeData = (
  data: any,
  exchangeName: Exchange
): { [key: string]: UnifiedTrade[] } => {
  const unifiedData: { [key: string]: UnifiedTrade[] } = {};

  const flattenData = (arr: any[]) => ([] as any[]).concat(...arr);

  switch (exchangeName) {
    case Exchange.BINANCE:
      unifiedData[exchangeName] = data.map((item: BinanceData) => ({
        price: item.price,
        quantity: item.qty,
        timestamp: item.time,
        tradeType: item.isBuyerMaker ? 'buy' : 'sell',
      }));
      break;
    case Exchange.KRAKEN: {
      const krakenResult = data.result;
      const tradingPair = Object.keys(krakenResult)[0];
      const trades = krakenResult[tradingPair];

      unifiedData[exchangeName] = trades.map((trade: any) => ({
        price: trade.price,
        quantity: trade.volume,
        timestamp: trade.time,
        tradeType: trade.buySell === 'b' ? 'buy' : 'sell',
      }));
      break;
    }
    case Exchange.BITFINEX:
      unifiedData[exchangeName] = data.map((item: BitfinexTrade) => ({
        price: item.BID || item.ASK,
        quantity: 'N/A',
        timestamp: item.MTS,
        tradeType: item.BID ? 'buy' : 'sell',
      }));
      break;
    case Exchange.HUOBI: {
      const huobiTradeData = flattenData(
        data?.data?.map((item: HuobiItem) => item?.data || []) || []
      );
      unifiedData[exchangeName] = huobiTradeData.map(
        (trade: HuobiTradeDetail) => ({
          price: String(trade.price),
          quantity: String(trade.amount),
          timestamp: trade.ts,
          tradeType: trade.direction,
        })
      );
      break;
    }
    default:
      throw new Error(ERROR_MESSAGES.UNKNOWN_EXCHANGE);
  }

  return unifiedData;
};
