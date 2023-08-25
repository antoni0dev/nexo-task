import { useBinanceData } from '../hooks/useBinanceData';
import { useBitfinexData } from '../hooks/useBitfinexData';
import { useHuobiData } from '../hooks/useHuobiData';
import { useKrakenData } from '../hooks/useKrakenData';
import { Exchange } from '../lib/types';

export const useExchangeData = (pair: string, skip = false) => {
  const binanceData = useBinanceData(Exchange.BINANCE, pair, skip);
  const bitfinexData = useBitfinexData(Exchange.BITFINEX, pair, skip);
  const huobiData = useHuobiData(Exchange.HUOBI, pair, skip);
  const krakenData = useKrakenData(Exchange.KRAKEN, pair, skip);

  const exchangeData = [
    { name: Exchange.BINANCE, data: binanceData },
    { name: Exchange.BITFINEX, data: bitfinexData },
    { name: Exchange.HUOBI, data: huobiData },
    { name: Exchange.KRAKEN, data: krakenData },
  ];

  const isLoading = exchangeData.some(({ data }) => data.isLoading);
  const errors = exchangeData.map(({ data }) => data.error).filter(Boolean);

  return { exchangeData, isLoading, errors };
};
