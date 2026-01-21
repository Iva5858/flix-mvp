// Training Module Content

export interface LessonSlide {
  type: 'content' | 'quiz' | 'example';
  title: string;
  content: string;
  emoji?: string;
  options?: string[];
  correctAnswer?: number;
  explanation?: string;
}

export interface TrainingModule {
  id: number;
  title: string;
  description: string;
  emoji: string;
  duration: string;
  lessons: LessonSlide[];
}

export const trainingModules: TrainingModule[] = [
  {
    id: 1,
    title: 'The Power of Appreciation',
    description: 'Learn why appreciation matters in the workplace',
    emoji: '💡',
    duration: '5 min',
    lessons: [
      {
        type: 'content',
        title: 'Welcome! 👋',
        content: 'Appreciation isn\'t just nice to have—it\'s essential for building a thriving workplace culture. Let\'s explore why it matters.',
        emoji: '👋',
      },
      {
        type: 'content',
        title: 'Why Appreciation Matters',
        content: 'Research shows that employees who feel appreciated are:\n\n• 50% more productive\n• 3x more likely to stay at their company\n• Significantly more engaged in their work',
        emoji: '📊',
      },
      {
        type: 'content',
        title: 'The Ripple Effect',
        content: 'When you appreciate someone, it creates a positive ripple effect:\n\n1. They feel valued and motivated\n2. They\'re more likely to appreciate others\n3. The entire team culture improves',
        emoji: '🌊',
      },
      {
        type: 'quiz',
        title: 'Quick Check',
        content: 'What percentage of employees are more productive when they feel appreciated?',
        options: ['25%', '50%', '75%', '100%'],
        correctAnswer: 1,
        explanation: 'Correct! Employees who feel appreciated are 50% more productive. That\'s a huge impact!',
      },
      {
        type: 'example',
        title: 'Real Example',
        content: 'Sarah noticed her teammate Alex stayed late to help finish a project. Instead of just saying "thanks," she wrote:\n\n"Alex, I really appreciated how you went above and beyond yesterday. Your help made all the difference, and I learned a lot from your approach. Thank you!"',
        emoji: '✨',
      },
      {
        type: 'content',
        title: 'Key Takeaway',
        content: 'Appreciation is a superpower! It costs nothing but creates immense value:\n\n✓ Boosts morale\n✓ Strengthens relationships\n✓ Improves team performance\n✓ Creates a positive culture',
        emoji: '🎯',
      },
    ],
  },
  {
    id: 2,
    title: 'Understanding Appreciation Styles',
    description: 'Discover different ways people like to be recognized',
    emoji: '🎯',
    duration: '7 min',
    lessons: [
      {
        type: 'content',
        title: 'Everyone is Different',
        content: 'Not everyone appreciates recognition in the same way. Some love public praise, while others prefer private feedback. Understanding these differences is key!',
        emoji: '🎭',
      },
      {
        type: 'content',
        title: 'The 5 Appreciation Styles',
        content: '🎤 Public Praise - Loves being recognized in front of others\n\n💬 Private Feedback - Prefers 1:1 conversations\n\n📝 Written Words - Values thoughtful messages\n\n🎁 Tangible Rewards - Appreciates small gifts\n\n🚀 Growth-Oriented - Motivated by opportunities',
        emoji: '🎨',
      },
      {
        type: 'quiz',
        title: 'Think About It',
        content: 'If someone prefers private feedback, what should you avoid?',
        options: [
          'Sending them a personal message',
          'Calling them out in a team meeting',
          'Having a 1:1 conversation',
          'Writing them a thoughtful note',
        ],
        correctAnswer: 1,
        explanation: 'Exactly! People who prefer private feedback would feel uncomfortable with public recognition. Always respect their preference!',
      },
      {
        type: 'content',
        title: 'Pro Tip',
        content: 'The best way to know someone\'s preference? Ask them! Or check if they\'ve set their preferences in their profile.',
        emoji: '💡',
      },
    ],
  },
  {
    id: 3,
    title: 'Giving Effective Feedback',
    description: 'Master the art of meaningful recognition',
    emoji: '✨',
    duration: '6 min',
    lessons: [
      {
        type: 'content',
        title: 'What Makes Appreciation Effective?',
        content: 'Great appreciation is:\n\n✓ Specific - Mention what exactly you appreciated\n✓ Sincere - Mean what you say\n✓ Timely - Given soon after the action\n✓ Personal - Tailored to the recipient',
        emoji: '⭐',
      },
      {
        type: 'example',
        title: 'Good vs. Great',
        content: '❌ Generic: "Good job!"\n\n✅ Specific: "I really appreciated how you handled that difficult client call yesterday. Your patience and clear communication turned a tense situation into a positive outcome."',
        emoji: '📝',
      },
      {
        type: 'quiz',
        title: 'Which is Better?',
        content: 'Which appreciation message is more effective?',
        options: [
          '"Thanks for your help."',
          '"I really appreciated how you stayed late to help me debug that issue. Your systematic approach helped us solve it much faster than I could have alone."',
          '"You\'re awesome!"',
          '"Nice work."',
        ],
        correctAnswer: 1,
        explanation: 'Perfect! The second option is specific, sincere, and explains the impact. That\'s what makes appreciation meaningful!',
      },
      {
        type: 'content',
        title: 'Remember',
        content: 'Effective appreciation focuses on:\n\n• The specific action or behavior\n• The impact it had\n• Why it mattered to you or the team',
        emoji: '🎯',
      },
    ],
  },
  {
    id: 4,
    title: 'Timing & Context',
    description: 'Know when and how to show appreciation',
    emoji: '⏰',
    duration: '5 min',
    lessons: [
      {
        type: 'content',
        title: 'Timing Matters',
        content: 'The best appreciation is timely:\n\n• Right after an achievement\n• During or right after a challenging situation\n• When someone goes above and beyond\n\nDon\'t wait too long—the moment matters!',
        emoji: '⏰',
      },
      {
        type: 'content',
        title: 'Context is Key',
        content: 'Consider the situation:\n\n• Is it a big achievement? → More formal recognition\n• Small gesture? → Quick, casual appreciation\n• During stress? → Supportive, encouraging tone\n• Celebration time? → Enthusiastic and public',
        emoji: '🎭',
      },
      {
        type: 'quiz',
        title: 'When to Appreciate?',
        content: 'Your colleague just helped you solve a tricky problem. When should you show appreciation?',
        options: [
          'Wait until the end of the week',
          'Right away, while it\'s fresh',
          'Only during performance reviews',
          'Never, they were just doing their job',
        ],
        correctAnswer: 1,
        explanation: 'Yes! Appreciate right away while the impact is fresh. This makes it more meaningful and memorable.',
      },
      {
        type: 'content',
        title: 'You\'ve Got This!',
        content: 'Remember:\n\n✓ Appreciate promptly\n✓ Match the context\n✓ Consider the recipient\'s style\n✓ Be genuine',
        emoji: '🎉',
      },
    ],
  },
];

