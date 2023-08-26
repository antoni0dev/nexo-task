interface CryptoPair {
  symbol: string;
}

interface BinanceData {
  lastPrice: string;
  price: string;
  qty?: string;
  time?: number;
  isBuyerMaker?: boolean;
}

interface KrakenData {
  result: {
    [key: string]: {
      c: string[];
    } & {
      [index: number]: string | number | 'b' | 's';
    };
  };
}

type KrakenTradeDetail = [string, string, number, 'b' | 's'];

interface HuobiData {
  tick: {
    close: number;
  };
  data?: HuobiItem[];
}

interface HuobiItem {
  data: HuobiTradeDetail[];
}

interface HuobiTradeDetail {
  price: string;
  amount: string;
  ts: number;
  direction: 'buy' | 'sell';
}

type BitfinexData = Array<{
  BID?: string;
  ASK?: string;
  MTS: number;
}>;

type ExchangeData = BinanceData | KrakenData | HuobiData | BitfinexData;

type UnifiedTrade = {
  price: string;
  quantity: string;
  timestamp: number;
  tradeType?: 'buy' | 'sell';
};

type BinanceTrade = {
  price: string;
  qty: string;
  time: number;
  isBuyerMaker: boolean;
};

type KrakenTrade = unknown;

type BitfinexTrade = {
  BID?: string;
  ASK?: string;
  MTS: number;
};

type HuobiTrade = {
  price: string;
  amount: string;
  ts: number;
  direction: 'buy' | 'sell';
};
