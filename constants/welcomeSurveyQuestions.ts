export interface SurveyOption {
  id?: string;
  value: string;
}

export interface WelcomeSurveyQuestion {
  type: 'select' | 'year' | 'text';
  question: string;
  title?: string;
  category?: string;
  qualificationCode?: string;
  options?: (string | SurveyOption)[];
  correctAnswer?: string | null;
  explanation?: string;
  isAttribution?: boolean;
  id?: string;
  minYear?: number;
  maxYear?: number;
}

const currentYear = new Date().getFullYear();

const WELCOME_SURVEY_QUESTIONS: WelcomeSurveyQuestion[] = [
  {
    type: 'select',
    question: 'On average per survey - how much more does Survey Club pay per survey vs. other survey apps?',
    title: "You're joining a community over 50,000 Survey Club Members who are earned over $10m in cash outs.",
    options: [
      'Same as other apps',
      '2x Payout vs. other survey apps',
      'Over 3x Payout vs. other apps',
    ],
    correctAnswer: 'Over 3x Payout vs. other apps',
    explanation: "That's right! Survey Club pays out over 3.1x more on average vs. other apps. If you earn $10 in another app, you would have made $31 in Survey Club",
  },
  {
    type: 'select',
    question: 'Sometimes surveys will have trick questions like this one. Watch out! Please select the vegetable from the list below.',
    title: "You're joining a community over 50,000 Survey Club Members who are earned over $10m in cash outs.",
    options: ['Broccoli', 'Apple', 'Banana', 'Strawberry'],
    correctAnswer: 'Broccoli',
    explanation: "That's right! Survey Clubs pays out over 3.1x more on average vs. other apps. If you earn $10 in another app, you would have made $31 in Survey Club",
  },
  {
    type: 'select',
    question: 'It is extremely important that you answer surveys clearly and truthfully.',
    title: 'Your opinions matters and helps thousands of brands make the right decisions.',
    options: ['I will be honest'],
    correctAnswer: 'I will be honest',
    explanation: "That's right! Survey Clubs pays out over 3x more on average vs. other apps.",
  },
  {
    type: 'select',
    question: 'How did you hear about Survey Club?',
    options: [
      'Found on App Store',
      'Friend/Family Referred Me',
      'Facebook',
      'Instagram',
      'Tik Tok',
      'Youtube',
      'Article Online',
      'AI Recommendation',
      'Google Search',
    ],
    correctAnswer: null,
    explanation: "That's right! Survey Clubs pays out over 3x more on average vs. other apps.",
  },
  {
    type: 'select',
    question: 'How can you withdraw / cash out with Survey Club?',
    options: [
      'PayPal',
      'Mastercard',
      'Amazon',
      'Starbucks',
      'All of the above and 6 additional giftcards',
    ],
    correctAnswer: null,
    explanation: 'Cash out your way with Survey Club!',
  },
  {
    type: 'select',
    qualificationCode: '211',
    question: "I'm a ",
    category: 'Gender',
    options: [
      { id: '111', value: 'Male' },
      { id: '112', value: 'Female' },
      { id: '113', value: 'Prefer not to say' },
    ],
  },
  {
    type: 'year',
    qualificationCode: '212',
    question: 'I was born in ',
    category: 'Age',
    minYear: 1940,
    maxYear: currentYear - 15,
  },
  {
    type: 'text',
    qualificationCode: '229',
    question: 'My Zipcode is ',
    category: 'Location',
  },
  {
    type: 'select',
    qualificationCode: '215',
    question: "I'm employed ",
    category: 'Employment',
    options: [
      { id: '114', value: 'Full Time' },
      { id: '113', value: 'Part Time' },
      { id: '115', value: 'Retired' },
      { id: '112', value: 'Student' },
      { id: '111', value: 'Unemployed' },
    ],
  },
  {
    type: 'select',
    qualificationCode: '217',
    question: 'I am ',
    category: 'Household Relationship',
    options: [
      { id: '111', value: 'Single' },
      { id: '112', value: 'Engaged' },
      { id: '113', value: 'Living with a Partner' },
      { id: '114', value: 'Married' },
      { id: '115', value: 'Divorced' },
      { id: '116', value: 'Widowed' },
    ],
  },
  {
    type: 'select',
    qualificationCode: '214',
    question: 'My ethnic background is ',
    category: 'Race',
    options: [
      { id: '111', value: 'White' },
      { id: '112', value: 'Hispanic' },
      { id: '113', value: 'African American' },
      { id: '114', value: 'Asian' },
      { id: '115', value: 'American Indian' },
      { id: '116', value: 'Middle Eastern' },
      { id: '117', value: 'Other Ethnicity' },
    ],
  },
  {
    type: 'select',
    qualificationCode: '213',
    question: 'My household earns approximately per year',
    category: 'Income',
    options: [
      { id: '111', value: ' Under $25,000' },
      { id: '112', value: ' $25,000 - $49,999' },
      { id: '113', value: ' $50,000 - $74,999' },
      { id: '114', value: ' $75,000 - $99,999' },
      { id: '115', value: ' $100,000 - $149,999' },
      { id: '116', value: ' $150,000 or more' },
      { id: '117', value: ' Prefer not to say' },
    ],
  },
];

export default WELCOME_SURVEY_QUESTIONS;
