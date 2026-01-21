// AI Prompts for Appreciation Guidance

import { AppreciationArchetype } from './archetypes';

export interface AppreciationContext {
  recipientArchetype: AppreciationArchetype;
  relationship: 'peer' | 'manager' | 'cross-team';
  occasion: 'achievement' | 'support' | 'milestone' | 'general';
  additionalContext?: string;
}

export function buildAppreciationPrompt(context: AppreciationContext): string {
  const { recipientArchetype, relationship, occasion, additionalContext } = context;

  return `You are an expert in employee appreciation and recognition. Help craft personalized appreciation guidance.

Recipient's Appreciation Style: ${recipientArchetype.name} (${recipientArchetype.emoji})
- Description: ${recipientArchetype.description}
- Preferred Recognition: ${recipientArchetype.preferredRecognition.join(', ')}
- Do's: ${recipientArchetype.do.join(', ')}
- Don'ts: ${recipientArchetype.dont.join(', ')}

Relationship: ${relationship}
Occasion: ${occasion}
${additionalContext ? `Additional Context: ${additionalContext}` : ''}

Provide guidance in the following format:
1. Best recognition approach (2-3 sentences)
2. Suggested short message (1-2 sentences)
3. Suggested longer message (3-4 sentences)
4. Tone recommendation
5. What to avoid

Be respectful, inclusive, and focus on making appreciation natural and meaningful.`;
}

export function buildAssessmentPrompt(userResponses: Record<string, any>, userPreferences?: any): string {
  return `You are an expert in employee appreciation and emotional intelligence. Analyze how someone gives appreciation and provide constructive feedback.

User's Appreciation Patterns:
${JSON.stringify(userResponses, null, 2)}

${userPreferences ? `User's Preferences: ${JSON.stringify(userPreferences, null, 2)}` : ''}

Provide:
1. Strengths in their appreciation style (2-3 points)
2. Areas for improvement (2-3 points)
3. Specific suggestions for growth
4. How their style aligns with different appreciation preferences

Be encouraging, constructive, and focus on positive behavior change.`;
}

