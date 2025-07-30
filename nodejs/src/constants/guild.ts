export interface CoinItem {
  currency: string;
  amount: number;
}

export interface GuildItem {
  code: string;
  name: string;
  imgUrl: string | null;
  description: string | null;
  created: string;
  isPrivate: boolean;
  archived: boolean;
  emoji: string | null;
  logoUrl: string | null;
  mobileHeroImgUrl: string | null;
  socials: {
    discord?: string;
    telegram?: string;
    twitter?: string;
  },
  guildPotBalance?: CoinItem[],
  memberCount: number;
  memberCapacity: number;
  potDistributionPercent: number;
  potDistributionType: string;
  potTraderId: string | null;
  rank: number;
  pnl: number;
  volume: number;
  volumeUSDT: number;
  volumeTaker: number;
  roi: number;
  ADV30Day: number;
  ADV30DayRank: number;
  roiRank: number;
  volumeRank: number;
  potPnl: number;
  potVolume: number;
  potRoi: number;
}