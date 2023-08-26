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
    case Exchange.KRAKEN: {
      return searchPair;
    }
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
      return parseFloat((data as BinanceData).price);
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

export const capitalizeString = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Provide an error message for when the price cannot be formatted
 */
export const priceErrorMessage = (exchangeName: string, pair: string) => {
  const formattedName = capitalizeString(exchangeName);

  return `Price details are unavailable or do not exist at all for ${pair} on ${formattedName}`;
};

/**
 * Sort exchange data by key (in our case "price")
 */
export const sortExchangeData = (
  exchangeData: ExchangeDataStructure[],
  key: keyof ExchangeDataStructure['data'],
  desc: boolean = false
): ExchangeDataStructure[] => {
  return exchangeData.sort((a, b) => {
    const aValue =
      key in a
        ? a[key as keyof ExchangeData]
        : a.data[key as keyof ExchangeDataStructure['data']];
    const bValue =
      key in b
        ? b[key as keyof ExchangeData]
        : b.data[key as keyof ExchangeDataStructure['data']];

    if (aValue > bValue) return desc ? -1 : 1;
    if (aValue < bValue) return desc ? 1 : -1;
    return 0;
  });
};

/**
 * Partition exchange data into successful and unsuccessful responses.
 * This ensures that error responses always appear at the bottom.
 *
 * @param {ExchangeDataStructure[]} itemsToDisplay - Data to partition.
 * @returns {ExchangeDataStructure[][]} - An array where the first element is successful entries and the second is error entries.
 */
export const partitionExchangeDataBySuccess = (
  itemsToDisplay: ExchangeDataStructure[]
): [ExchangeDataStructure[], ExchangeDataStructure[]] => {
  const partitions = itemsToDisplay.reduce<{
    success: ExchangeDataStructure[];
    errors: ExchangeDataStructure[];
  }>(
    (acc, item) => {
      (item.data.price ? acc.success : acc.errors).push(item);
      return acc;
    },
    { success: [], errors: [] }
  );

  return [partitions.success, partitions.errors];
};
