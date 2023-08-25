interface CryptoPair {
  symbol: string;
}

interface BinanceData {
  lastPrice: string;
}

interface KrakenData {
  result: {
    [key: string]: {
      c: string[];
    };
  };
}

interface HuobiData {
  tick: {
    close: number;
  };
}

type BitfinexData = any[];

type ExchangeData = BinanceData | KrakenData | HuobiData | BitfinexData;
