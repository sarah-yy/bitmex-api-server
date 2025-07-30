export interface StatsItem {
  rootSymbol: string;
  currency: string;
  volume24h: number;
  turnover24h: number;
  openInterest: number;
  openValue: number;
}

export interface StatsHistoryItem {
  date: string;
  rootSymbol: string;
  currency: string;
  volume: number;
  turnover :number;
}

export interface StatsHistoryUSDItem {
  rootSymbol: string;
  currency: string;
  turnover24h: number;
  turnover30d: number;
  turnover365d: number;
  turnover: number;
}