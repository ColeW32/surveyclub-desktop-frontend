export interface OnboardingSlide {
  layout: 'split' | 'stats' | 'price';
  title: string;
  subtitle?: string;
  description: string;
  subDescription?: string;
  slideText?: {
    firstLine: string;
    secondLine: string;
    boldText?: string;
  };
  showProgress: boolean;
  showBack: boolean;
  progress: number;
}

const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    layout: 'split',
    title: 'Other Survey Apps',
    subtitle: 'For a $2.00 Survey',
    description: 'This means if you cash out $10.00, the app earned $33.33',
    subDescription: 'This adds up.',
    showProgress: false,
    showBack: false,
    progress: 0,
  },
  {
    layout: 'split',
    title: 'Survey Club',
    subtitle: 'For a $2.00 Survey',
    description: 'This means if you cash out $10.00, Survey Club earns $0.52 profit (used to pay for transfer fees)',
    subDescription: 'This adds up.',
    showProgress: false,
    showBack: false,
    progress: 0,
  },
  {
    layout: 'stats',
    title: 'How Survey Club Works',
    slideText: {
      firstLine: 'Over',
      secondLine: '3.1 x',
      boldText: 'Faster Earning',
    },
    description: 'If you earn $15 with some other app, you would have made $50 with Survey Club.',
    showProgress: true,
    showBack: true,
    progress: 0.45,
  },
  {
    layout: 'price',
    title: 'How Survey Club Works',
    slideText: {
      firstLine: "How much does it cost? It's only:",
      secondLine: '$0.99',
    },
    description: 'The average Survey Club member makes',
    subDescription: '$32.35 per month',
    showProgress: true,
    showBack: true,
    progress: 1.0,
  },
];

export default ONBOARDING_SLIDES;
