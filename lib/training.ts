// Training Module Content

export interface LessonSlide {
  type: 'content' | 'quiz' | 'example';
  title: string;
  content: string;
  icon?: string;
  options?: string[];
  correctAnswer?: number;
  explanation?: string;
  incorrectExplanation?: string;
}

export interface TrainingModule {
  id: number;
  title: string;
  description: string;
  icon: string;
  duration: string;
  lessons: LessonSlide[];
}

export const trainingModules: TrainingModule[] = [
  {
    id: 1,
    title: 'The Power of Appreciation',
    description: 'Understand the case for meaningful recognition and what it does to team culture',
    icon: 'Lightbulb',
    duration: '5 min',
    lessons: [
      {
        type: 'content',
        title: 'Why This Matters',
        content: 'Appreciation is not just a nice-to-have — it is a core driver of team performance, retention, and psychological safety. The question is not whether to give it, but how to give it in a way that genuinely lands.',
        icon: 'Hand',
      },
      {
        type: 'content',
        title: 'What the Research Shows',
        content: 'Employees who feel consistently appreciated are:\n\n• 50% more productive\n• 3x more likely to stay at their organisation\n• Significantly more engaged in their day-to-day work\n\nThat last point — three times more likely to stay — makes appreciation one of the highest-leverage retention tools available to any manager.',
        icon: 'BarChart3',
      },
      {
        type: 'content',
        title: 'The Ripple Effect',
        content: 'Appreciation compounds. When you recognise someone well:\n\n1. They feel genuinely valued and motivated to contribute\n2. They are more likely to pass that recognition on to others\n3. The entire team\'s culture shifts toward openness and trust\n\nOne well-timed, specific acknowledgement can reshape how a person shows up for weeks.',
        icon: 'Waves',
      },
      {
        type: 'quiz',
        title: 'Quick Check',
        content: 'What percentage more productive are employees who feel consistently appreciated?',
        options: ['5%', '50%', '15%', '45%'],
        correctAnswer: 1,
        explanation: 'Correct. A 50% productivity lift is significant — and it costs nothing beyond attention and intentionality.',
        incorrectExplanation: 'Not quite. Research shows a 50% productivity boost for employees who feel genuinely appreciated. That is a substantial return on something that costs nothing but time and thought.',
      },
      {
        type: 'example',
        title: 'In Practice',
        content: 'María noticed that her colleague Sven had spent hours the previous evening troubleshooting a critical integration issue ahead of a product release. Rather than a quick message in the team channel, she wrote to him directly:\n\n"Sven, I really appreciated how you stayed on top of that integration issue last night. Because of your thoroughness, the release went smoothly and the team could focus on the launch. That kind of ownership has a real impact — thank you."',
        icon: 'Sparkles',
      },
      {
        type: 'content',
        title: 'What to Take Away',
        content: 'Effective appreciation is specific, timely, and costs nothing — but its impact on motivation, trust, and team culture is measurable:\n\n• Raises individual motivation\n• Strengthens working relationships\n• Improves team performance over time\n• Builds an environment where people genuinely want to contribute',
        icon: 'Target',
      },
    ],
  },
  {
    id: 2,
    title: 'Understanding Appreciation Styles',
    description: 'Explore the five ways people prefer to receive recognition — and why matching style to person matters',
    icon: 'Target',
    duration: '7 min',
    lessons: [
      {
        type: 'content',
        title: 'One Size Does Not Fit All',
        content: 'People do not respond to recognition the same way. What feels meaningful to one person can feel uncomfortable — or even counterproductive — to another. Getting appreciation right means understanding the individual, not just choosing a gesture.',
        icon: 'Drama',
      },
      {
        type: 'content',
        title: 'The 5 Appreciation Styles',
        content:
          'Fire — Thrives on visible, public recognition in front of peers and leaders\n\n' +
          'Moon — Values genuine, personal appreciation delivered privately\n\n' +
          'Wind — Cherishes thoughtful, well-crafted written recognition they can revisit\n\n' +
          'Water — Feels most recognised through tangible rewards and shared experiences\n\n' +
          'Lightning — Energised by development opportunities and clear pathways for growth',
        icon: 'Palette',
      },
      {
        type: 'quiz',
        title: 'Apply It',
        content: 'A colleague who identifies with the Moon style has just gone above and beyond on a project. What should you avoid?',
        options: [
          'Sending them a personal, thoughtful message',
          'Calling them out in a team meeting without warning',
          'Having a dedicated 1:1 conversation to acknowledge their effort',
          'Writing a private note capturing the specific impact of their work',
        ],
        correctAnswer: 1,
        explanation: 'Exactly right. Someone with a Moon style values private, genuine recognition. Public call-outs — even well-intentioned ones — can feel exposing rather than affirming.',
        incorrectExplanation: 'Not quite. The answer is "Calling them out in a team meeting without warning." A Moon-style colleague values private recognition. Public praise, even when well-meant, can feel uncomfortable rather than affirming.',
      },
      {
        type: 'content',
        title: 'The Best Way to Know',
        content: 'The most direct route to knowing someone\'s preference? Ask them. A simple "how do you prefer to receive recognition?" opens a valuable conversation.\n\nIf they have completed the appreciation quiz on this platform, their primary style and preferred channels are already saved in their profile — use that information.',
        icon: 'Lightbulb',
      },
    ],
  },
  {
    id: 3,
    title: 'Crafting Recognition That Resonates',
    description: 'Learn what separates generic appreciation from recognition that genuinely lands — and practise applying it',
    icon: 'Sparkles',
    duration: '6 min',
    lessons: [
      {
        type: 'content',
        title: 'What Makes It Land?',
        content: 'Appreciation that actually resonates tends to be:\n\n• Specific — you name the exact action or behaviour\n• Sincere — you only say what you genuinely mean\n• Timely — it is given close to when the moment happened\n• Personal — it is delivered in the way the recipient prefers',
        icon: 'Star',
      },
      {
        type: 'example',
        title: 'Generic vs. Specific',
        content: 'Generic: "Good job on the presentation!"\n\nSpecific: "I really appreciated how you reframed the data in last Thursday\'s stakeholder presentation. The way you connected the numbers to the business outcome made the recommendation much easier for the leadership team to act on. That took real judgement."',
        icon: 'FileText',
      },
      {
        type: 'quiz',
        title: 'Which One Works?',
        content: 'Which appreciation message is most effective?',
        options: [
          '"Thanks for your help."',
          '"I really appreciated how you stepped in during the client call on Monday. Your calm handling of their concerns prevented the relationship from becoming strained. That made a real difference."',
          '"You\'re a star!"',
          '"Great work as always."',
        ],
        correctAnswer: 1,
        explanation: 'The second message works because it names a specific moment, describes the impact, and explains why it mattered. That is the combination that makes appreciation feel genuine.',
        incorrectExplanation: 'The most effective message is the second one. It names a specific situation, describes the impact it had, and explains why it mattered. Generic phrases like "great work" are easy to give but hard to receive meaningfully.',
      },
      {
        type: 'content',
        title: 'The Three-Part Framework',
        content: 'Every effective appreciation message contains three elements:\n\n• The specific action or behaviour you observed\n• The impact it had — on the project, the team, or the outcome\n• Why it mattered — to you personally, or to the wider goal\n\nYou do not need to be elaborate. Even a short message lands well when it hits all three.',
        icon: 'Target',
      },
    ],
  },
  {
    id: 4,
    title: 'Timing & Context',
    description: 'Understand how timing and context shape whether appreciation lands — or misses',
    icon: 'Clock',
    duration: '5 min',
    lessons: [
      {
        type: 'content',
        title: 'Timing Changes Everything',
        content: 'The best appreciation is timely:\n\n• Directly after a notable achievement\n• During or just after a difficult or high-pressure period\n• When someone goes beyond what was asked of them\n\nRecognition given days or weeks later loses its connection to the moment — and can feel like an afterthought rather than genuine acknowledgement.',
        icon: 'Clock',
      },
      {
        type: 'content',
        title: 'Calibrate to the Situation',
        content: 'Context shapes the right approach:\n\n• Major achievement → more considered, formal recognition\n• Consistent, quiet effort → brief but genuine acknowledgement\n• High-stress moment → a supportive, private note\n• Team win → a public celebration, if the person welcomes it\n\nMatching the weight of your appreciation to the size of the moment shows good judgement.',
        icon: 'Drama',
      },
      {
        type: 'quiz',
        title: 'When Is the Right Moment?',
        content: 'A colleague stayed late to help you resolve a critical issue before a product deadline. When should you show appreciation?',
        options: [
          'Save it for their next performance review',
          'Right away — while the impact is still fresh',
          'At the end of the week, once everything has settled',
          'Only if they mention it themselves',
        ],
        correctAnswer: 1,
        explanation: 'Right away is right. Recognition given close to the moment is far more meaningful than delayed praise. The connection between action and acknowledgement matters.',
        incorrectExplanation: 'The best time is right away. Recognition that lands close to the moment feels genuine and connected. Waiting — even until the end of the week — weakens that link.',
      },
      {
        type: 'content',
        title: 'Your Appreciation Checklist',
        content: 'Before sending appreciation, check:\n\n• Is it specific — do I name what they actually did?\n• Is it timely — am I giving it close to when it happened?\n• Does it match their style — am I using the channel they prefer?\n• Is it sincere — do I genuinely mean it?\n\nIf the answer to all four is yes, send it.',
        icon: 'Check',
      },
    ],
  },
];