// Appreciation Archetypes System

export type ArchetypeId = 'public-praise' | 'private-feedback' | 'written-words' | 'tangible-rewards' | 'growth-oriented';

export interface AppreciationArchetype {
  id: ArchetypeId;
  emoji: string;
  name: string;
  description: string;
  preferredRecognition: string[];
  do: string[];
  dont: string[];
  suggestedChannels: string[];
  suggestedPhrases: string[];
}

export const archetypes: Record<ArchetypeId, AppreciationArchetype> = {
  'public-praise': {
    id: 'public-praise',
    emoji: '🎤',
    name: 'Public Praise',
    description: 'Likes public recognition and being celebrated in front of others',
    preferredRecognition: ['Team meetings', 'Shout-outs', 'Public announcements', 'Team channels'],
    do: ['Recognize achievements publicly', 'Give shout-outs in team meetings', 'Celebrate milestones together'],
    dont: ['Keep achievements private', 'Skip public recognition', 'Assume they prefer quiet praise'],
    suggestedChannels: ['Team Slack channel', 'All-hands meeting', 'Team standup'],
    suggestedPhrases: [
      'I want to recognize [Name] for their outstanding work on...',
      'Big shout-out to [Name] for going above and beyond!',
      'Let\'s all celebrate [Name]\'s achievement!',
    ],
  },
  'private-feedback': {
    id: 'private-feedback',
    emoji: '💬',
    name: 'Private Feedback',
    description: 'Prefers 1:1 recognition and personal, thoughtful messages',
    preferredRecognition: ['Personal messages', '1:1 conversations', 'Private notes'],
    do: ['Send personal messages', 'Have private conversations', 'Be thoughtful and specific'],
    dont: ['Call them out publicly', 'Share recognition without permission', 'Make assumptions about their comfort level'],
    suggestedChannels: ['Direct message', 'Private email', '1:1 meeting'],
    suggestedPhrases: [
      'I wanted to personally thank you for...',
      'I really appreciated how you handled...',
      'Your contribution to [project] didn\'t go unnoticed...',
    ],
  },
  'written-words': {
    id: 'written-words',
    emoji: '📝',
    name: 'Written Words',
    description: 'Values thoughtful, well-crafted written recognition',
    preferredRecognition: ['Emails', 'Notes', 'Written messages', 'Documentation'],
    do: ['Write thoughtful messages', 'Be specific and detailed', 'Take time to craft your words'],
    dont: ['Rush your message', 'Use generic phrases', 'Skip the details'],
    suggestedChannels: ['Email', 'Written note', 'Documentation'],
    suggestedPhrases: [
      'I wanted to take a moment to express my appreciation for...',
      'Your thoughtful approach to [situation] really stood out because...',
      'I\'m writing to acknowledge the significant impact you\'ve made on...',
    ],
  },
  'tangible-rewards': {
    id: 'tangible-rewards',
    emoji: '🎁',
    name: 'Tangible Rewards',
    description: 'Appreciates small perks, gifts, and tangible recognition',
    preferredRecognition: ['Gifts', 'Vouchers', 'Small perks', 'Physical tokens'],
    do: ['Offer small tokens of appreciation', 'Provide tangible rewards', 'Show appreciation through actions'],
    dont: ['Only use words', 'Skip tangible recognition', 'Assume they don\'t value gifts'],
    suggestedChannels: ['In-person delivery', 'Gift card', 'Company perks'],
    suggestedPhrases: [
      'I\'d like to show my appreciation with...',
      'Your hard work deserves recognition, so I\'ve arranged...',
      'As a token of appreciation for your efforts...',
    ],
  },
  'growth-oriented': {
    id: 'growth-oriented',
    emoji: '🚀',
    name: 'Growth-Oriented',
    description: 'Motivated by development opportunities and learning',
    preferredRecognition: ['Learning opportunities', 'Development projects', 'Mentorship', 'Challenges'],
    do: ['Offer growth opportunities', 'Provide learning resources', 'Connect them with mentors'],
    dont: ['Only recognize past work', 'Skip development opportunities', 'Assume they\'re satisfied with status quo'],
    suggestedChannels: ['1:1 development discussion', 'Learning platform', 'Mentorship program'],
    suggestedPhrases: [
      'Your growth mindset is inspiring. I\'d like to offer you...',
      'Given your achievements, I think you\'d excel at...',
      'I see potential for you to take on...',
    ],
  },
};

export interface UserPreferences {
  primaryArchetype: ArchetypeId;
  secondaryPreferences: ArchetypeId[];
  visibility: 'public' | 'team' | 'private';
}

export interface User {
  id: string;
  name: string;
  role: string;
  department: string;
  preferences?: UserPreferences;
}

// Mock data for development
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Chen',
    role: 'Software Engineer',
    department: 'Engineering',
    preferences: {
      primaryArchetype: 'growth-oriented',
      secondaryPreferences: ['written-words'],
      visibility: 'team',
    },
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'Product Manager',
    department: 'Product',
    preferences: {
      primaryArchetype: 'public-praise',
      secondaryPreferences: ['tangible-rewards'],
      visibility: 'public',
    },
  },
  {
    id: '3',
    name: 'Michael Brown',
    role: 'Designer',
    department: 'Design',
    preferences: {
      primaryArchetype: 'private-feedback',
      secondaryPreferences: ['written-words'],
      visibility: 'team',
    },
  },
];

