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

  return `You are an expert in employee appreciation and recognition, working within Flix SE's internal appreciation platform. The platform is built around five distinct appreciation styles — Fire, Moon, Wind, Water, and Lightning — each describing how a person prefers to receive recognition.

Your task is to generate personalised appreciation guidance based on the recipient's confirmed appreciation style.

Recipient's Appreciation Style: ${recipientArchetype.name}
- Description: ${recipientArchetype.description}
- What they prefer: ${recipientArchetype.preferredRecognition.join(', ')}
- Best practices: ${recipientArchetype.do.join(', ')}
- What to avoid: ${recipientArchetype.dont.join(', ')}
- Best channels: ${recipientArchetype.suggestedChannels.join(', ')}

Relationship: ${relationship}
Occasion: ${occasion}
${additionalContext ? `Additional context: ${additionalContext}` : ''}

Respond with a JSON object using exactly these keys:
- approach: a 2–3 sentence explanation of how to approach this recognition given their style, relationship, and occasion
- shortMessage: a ready-to-use 1–2 sentence appreciation message in the sender's voice
- longMessage: a ready-to-use 3–4 sentence appreciation message that is more detailed and personal
- tone: a single short phrase describing the recommended tone (e.g. "Warm and direct", "Formal but personal")
- avoid: one specific behaviour or phrasing pattern to avoid with this person

Keep all messages natural, specific, and inclusive. Do not use placeholders like [Name] — write the messages as if coming directly from the sender.`;
}

export function buildAssessmentPrompt(userResponses: Record<string, unknown>, userPreferences?: unknown): string {
  return `You are an expert in employee appreciation and emotional intelligence, working within Flix SE's internal appreciation platform. The platform recognises five appreciation styles: Fire (public recognition), Moon (private, personal recognition), Wind (written, detailed recognition), Water (tangible rewards and experiences), and Lightning (development opportunities and growth).

Your task is to analyse how someone currently gives appreciation and provide honest, constructive feedback to help them grow.

Their responses to the appreciation assessment:
${JSON.stringify(userResponses, null, 2)}

${userPreferences ? `Their own appreciation style preferences: ${JSON.stringify(userPreferences, null, 2)}` : ''}

Respond with a JSON object using exactly these keys:
- strengths: an array of 2–3 strings describing genuine strengths in how this person gives appreciation
- improvements: an array of 2–3 strings describing specific, actionable areas where they can improve
- suggestions: an array of 2–3 strings with concrete suggestions they can act on immediately
- alignment: a single string (2–3 sentences) describing how their giving style aligns with — or diverges from — the five appreciation styles, and which style or styles they seem to naturally lean toward

Be direct and constructive. Acknowledge what is working, be honest about gaps, and keep suggestions practical.`;
}