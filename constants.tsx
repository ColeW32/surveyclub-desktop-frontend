
import React from 'react';
import { 
  ClipboardList, 
  Gamepad2, 
  Wallet, 
  History, 
  Tag,
  Zap,
  PlayCircle
} from 'lucide-react';
import { NavItem, Survey } from './types';

export const COLORS = {
  primary: '#c9ff3a', // SurveyClub Brand Green
  background: '#0a0a0a', // Abstrakt Dark
  canvas: '#f8f9fa', // Abstrakt Off-white
  sidebarText: '#9ca3af',
  sidebarHover: '#1f2937',
  activeTab: '#ffffff'
};

export const NAVIGATION_ITEMS = [
  { id: NavItem.EarnCash, label: 'Earn Cash', icon: <Zap size={20} /> },
  { id: NavItem.Surveys, label: 'Daily Surveys', icon: <ClipboardList size={20} /> },
  { id: NavItem.Offers, label: 'Offer Walls', icon: <Tag size={20} /> },
  { id: NavItem.Games, label: 'Play to Earn', icon: <Gamepad2 size={20} /> },
  { id: NavItem.MyGames, label: 'My Games', icon: <PlayCircle size={20} /> },
  { id: NavItem.History, label: 'Earning History', icon: <History size={20} /> },
  { id: NavItem.Withdraw, label: 'Withdraw Cash', icon: <Wallet size={20} /> },
];

export const MOCK_OFFERS = [
  { id: '1', title: 'Chime Account', provider: 'RevU', amount: 125.00, image: 'https://picsum.photos/seed/chime/400/250', category: 'Offer' },
  { id: '2', title: 'Triple Tile', provider: 'MAF', amount: 15.50, image: 'https://picsum.photos/seed/tile/400/250', category: 'Game' },
  { id: '3', title: 'Coin Master', provider: 'AdGem', amount: 45.00, image: 'https://picsum.photos/seed/coin/400/250', category: 'Game' },
  { id: '4', title: 'Consumer Habits', provider: 'Pollfish', amount: 2.50, image: 'https://picsum.photos/seed/survey1/400/250', category: 'Survey' },
  { id: '5', title: 'Monopoly GO!', provider: 'AdJoe', amount: 32.00, image: 'https://picsum.photos/seed/mono/400/250', category: 'Game' },
  { id: '6', title: 'Brand Feedback', provider: 'TheoremReach', amount: 1.75, image: 'https://picsum.photos/seed/survey2/400/250', category: 'Survey' },
];

export const MOCK_MY_GAMES = [
  { id: 'g1', title: 'Triple Tile', provider: 'MAF', amount: 15.50, image: 'https://picsum.photos/seed/tile/400/250', category: 'Game', progress: 65 },
  { id: 'g2', title: 'Monopoly GO!', provider: 'AdJoe', amount: 32.00, image: 'https://picsum.photos/seed/mono/400/250', category: 'Game', progress: 12 },
];

export const MOCK_SURVEYS: Survey[] = [
  { id: 's1', title: 'Shopping Habits', provider: 'BitLab', amount: 2.86, originalAmount: 1.43, multiplier: '2x', time: '6m', rating: 5, isHot: true, userCount: 681 },
  { id: 's2', title: 'Quick Feedback', provider: 'Pollfish', amount: 1.07, time: '1m', rating: 4.9, isQuick: true, userCount: 1072 },
  { id: 's3', title: 'Consumer Tech', provider: 'TheoremReach', amount: 2.86, originalAmount: 1.43, multiplier: '2x', time: '2m', rating: 4.9, isHot: true, userCount: 1990 },
  { id: 's4', title: 'Daily Logistics', provider: 'InBrain', amount: 1.89, originalAmount: 0.94, multiplier: '2x', time: '4m', rating: 4.9, isHot: true, userCount: 1980 },
  { id: 's5', title: 'Media Insights', provider: 'CINT', amount: 1.13, originalAmount: 0.56, multiplier: '2x', time: '3m', rating: 4.1, isHot: true, userCount: 1258 },
  { id: 's6', title: 'Brand Equity', provider: 'TapResearch', amount: 0.78, originalAmount: 0.39, multiplier: '2x', time: '19m', rating: 4.9, isHot: true, userCount: 620 },
];
