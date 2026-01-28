// Appreciation Archetypes System

export type ArchetypeId = 'spotlight-seeker' | 'quiet-achiever' | 'word-collector' | 'reward-enthusiast' | 'growth-chaser';

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
  // 🌟 The Spotlight Seeker
  'spotlight-seeker': {
    id: 'spotlight-seeker',
    emoji: '🌟',
    name: 'The Spotlight Seeker',
    description: 'Thrives on external validation and visible recognition in front of others.',
    preferredRecognition: [
      'Shoutouts in team meetings',
      'Recognition in company newsletters or updates',
      'Social media or org-wide shoutouts',
      'Visible awards or certificates',
    ],
    do: [
      'Celebrate wins in team meetings',
      'Give shoutouts where their peers and leaders can see them',
      'CC senior leadership on praise emails when appropriate',
      'Feature them in company or team communications',
      'Create visible awards or certificates for their contributions',
    ],
    dont: [
      'Keep their contributions completely invisible to the wider team',
      'Only ever appreciate them in private channels',
      'Assume they feel valued without any visible recognition',
      'Delay recognition until the impact has faded from view',
    ],
    suggestedChannels: [
      'Team meetings and all-hands',
      'Company newsletters or internal blogs',
      'Public Slack/Teams channels',
      'Awards ceremonies or recognition rituals',
    ],
    suggestedPhrases: [
      'I want to recognize [Name] in front of the team for their outstanding work on [project].',
      'Big shoutout to [Name] for going above and beyond on [task]—this had a huge impact on [outcome].',
      'Let\'s all celebrate [Name]\'s achievement in [area]; their effort really lifted the whole team.',
      'I\'m highlighting [Name] in our update because their contribution to [initiative] made a visible difference.',
    ],
  },

  // 🤫 The Quiet Achiever
  'quiet-achiever': {
    id: 'quiet-achiever',
    emoji: '🤫',
    name: 'The Quiet Achiever',
    description: 'Values genuine, personal connection and prefers recognition in private spaces.',
    preferredRecognition: [
      '1:1 conversations',
      'Private, thoughtful messages',
      'Handwritten or personal notes',
      'Quiet acknowledgement of behind-the-scenes work',
    ],
    do: [
      'Schedule dedicated appreciation time in 1:1s',
      'Send private notes or messages that feel personal and sincere',
      'Acknowledge their behind-the-scenes efforts explicitly',
      'Ask them directly how they prefer to be recognized',
      'Protect their preference for privacy when recognizing them',
    ],
    dont: [
      'Call them out unexpectedly in large public forums',
      'Put them on the spot with big public praise',
      'Share details of their work without checking their comfort level',
      'Assume that what motivates others will work the same for them',
    ],
    suggestedChannels: [
      '1:1 meetings',
      'Direct messages (chat tools)',
      'Private email',
      'Handwritten or physical notes',
    ],
    suggestedPhrases: [
      'I wanted to personally thank you for [specific contribution]—it made a real difference to [impact].',
      'I really appreciated how you handled [situation]; your approach showed [strengths or qualities].',
      'Your contribution to [project] didn\'t go unnoticed, even if it was behind the scenes. It mattered because [reason].',
      'I value the way you consistently [behavior]; it has a quiet but powerful impact on the team.',
    ],
  },

  // ✍️ The Word Collector
  'word-collector': {
    id: 'word-collector',
    emoji: '✍️',
    name: 'The Word Collector',
    description: 'Cherishes thoughtful, well-crafted words they can revisit and reflect on.',
    preferredRecognition: [
      'Detailed emails describing their impact',
      'Written notes highlighting specific examples',
      'Documentation callouts or written shoutouts',
      'Messages they can save and reread later',
    ],
    do: [
      'Write detailed messages with concrete examples of their impact',
      'Explain the \"why\" behind your appreciation',
      'Capture their contributions in writing so they can revisit it later',
      'Highlight their unique strengths and what they bring to the team',
    ],
    dont: [
      'Rely only on generic phrases like \"great job\" or \"nice work\"',
      'Skip the details of what they did and why it mattered',
      'Rush through written recognition without thought or care',
      'Assume a quick verbal thank-you is enough on its own',
    ],
    suggestedChannels: [
      'Email or long-form messages',
      'Performance notes or feedback documents',
      'Written shoutouts in documentation or team pages',
      'Thank-you cards or written notes',
    ],
    suggestedPhrases: [
      'I wanted to take a moment to write down how much I appreciate your work on [project]. Specifically, when you [example], it led to [impact].',
      'Your thoughtful approach to [situation] really stood out because [reason]; it showed [strengths].',
      'I\'m writing this so you have a record of how important your contribution to [initiative] has been for [team, customer, or outcome].',
      'What I value most about your work is [unique contribution]; it consistently helps us [result].',
    ],
  },

  // 🎁 The Reward Enthusiast
  'reward-enthusiast': {
    id: 'reward-enthusiast',
    emoji: '🎁',
    name: 'The Reward Enthusiast',
    description: 'Feels most recognized when appreciation is paired with tangible rewards or experiences.',
    preferredRecognition: [
      'Small gifts or vouchers',
      'Experiences (team lunches, events, celebrations)',
      'Physical tokens like certificates or trophies',
      'Extra perks such as flexible hours or preferred parking',
    ],
    do: [
      'Pair verbal or written praise with small, thoughtful tokens',
      'Choose rewards that align with their personal interests',
      'Use experiences (like lunches or celebrations) to mark wins',
      'Create visible but meaningful symbols of appreciation',
    ],
    dont: [
      'Rely only on abstract praise with no follow-through',
      'Assume that one-size-fits-all rewards will feel meaningful',
      'Use rewards that don\'t match their tastes or values',
      'Treat rewards as a replacement for sincere appreciation',
    ],
    suggestedChannels: [
      'In-person celebrations or handovers',
      'Gift cards or digital vouchers',
      'Company perk systems',
      'Team events or shared experiences',
    ],
    suggestedPhrases: [
      'I\'d like to show my appreciation with [specific reward] because your work on [project] truly went above and beyond.',
      'Your hard work on [initiative] deserves more than just words, so we\'ve arranged [experience or perk] as a thank-you.',
      'As a token of appreciation for your efforts on [task], we wanted to offer you [reward] that matches your interests.',
      'Let\'s celebrate your contribution to [result] with [team lunch / small gift / experience]—you really earned it.',
    ],
  },

  // 🚀 The Growth Chaser
  'growth-chaser': {
    id: 'growth-chaser',
    emoji: '🚀',
    name: 'The Growth Chaser',
    description: 'Energized by development, stretch opportunities, and clear pathways for growth.',
    preferredRecognition: [
      'New responsibilities or scope',
      'High-visibility or stretch projects',
      'Mentorship and sponsorship',
      'Training, courses, or learning budgets',
    ],
    do: [
      'Connect your appreciation to their long-term growth and career path',
      'Offer learning opportunities or training as part of recognition',
      'Assign high-visibility projects that match their strengths',
      'Discuss next steps, advancement, and future opportunities',
      'Pair praise with concrete development actions (mentorship, coaching, projects)',
    ],
    dont: [
      'Let them stagnate in the same tasks without growth',
      'Offer only verbal praise with no forward-looking action',
      'Ignore their expressed career aspirations or goals',
      'Assume they\'re satisfied without checking in on their development',
    ],
    suggestedChannels: [
      'Career-focused 1:1 conversations',
      'Development plans and growth check-ins',
      'Mentorship or sponsorship programs',
      'Learning platforms and training budgets',
    ],
    suggestedPhrases: [
      'Your work on [project] showed real potential in [skill/area]; I\'d like to explore next-step opportunities with you.',
      'Given what you\'ve achieved on [initiative], I think you\'d excel at [stretch assignment or new responsibility].',
      'I appreciate your impact on [result], and I\'d like to pair that recognition with [course, mentorship, new project] to support your growth.',
      'Let\'s talk about how your contributions to [area] can translate into your next career step—your growth is a priority.',
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
      primaryArchetype: 'growth-chaser',
      secondaryPreferences: ['word-collector'],
      visibility: 'team',
    },
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'Product Manager',
    department: 'Product',
    preferences: {
      primaryArchetype: 'spotlight-seeker',
      secondaryPreferences: ['reward-enthusiast'],
      visibility: 'public',
    },
  },
  {
    id: '3',
    name: 'Michael Brown',
    role: 'Designer',
    department: 'Design',
    preferences: {
      primaryArchetype: 'quiet-achiever',
      secondaryPreferences: ['word-collector'],
      visibility: 'team',
    },
  },
];

