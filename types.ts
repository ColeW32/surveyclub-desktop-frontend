
export enum NavItem {
  EarnCash = 'EarnCash',
  MyGames = 'MyGames',
  Surveys = 'Surveys',
  Offers = 'Offers',
  Games = 'Games',
  History = 'History',
  Withdraw = 'Withdraw',
  Debug = 'Debug'
}

export interface Offer {
  id: string;
  title: string;
  provider: string;
  amount: number;
  image: string;
  category: 'Offer' | 'Game' | 'Survey';
  description?: string;
  progress?: number;
}

export interface Survey {
  id: string;
  title: string;
  provider: string;
  amount: number;
  originalAmount?: number;
  multiplier?: string;
  time: string;
  rating: number;
  isHot?: boolean;
  isQuick?: boolean;
  userCount: number;
}

export interface UserStats {
  balance: number;
  lifetimeEarnings: number;
  surveysCompleted: number;
  activeOffers: number;
}

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  isDebug: boolean;
}
