// OpenAI API Integration

import OpenAI from 'openai';
import { buildAppreciationPrompt, buildAssessmentPrompt } from './prompts';
import { AppreciationArchetype } from './archetypes';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export interface AppreciationGuidance {
  approach: string;
  shortMessage: string;
  longMessage: string;
  tone: string;
  avoid: string;
}

export interface AssessmentFeedback {
  strengths: string[];
  improvements: string[];
  suggestions: string[];
  alignment: string;
}

export async function generateAppreciationGuidance(
  recipientArchetype: AppreciationArchetype,
  relationship: 'peer' | 'manager' | 'cross-team',
  occasion: 'achievement' | 'support' | 'milestone' | 'general',
  additionalContext?: string
): Promise<AppreciationGuidance> {
  try {
    const prompt = buildAppreciationPrompt({
      recipientArchetype,
      relationship,
      occasion,
      additionalContext,
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert in employee appreciation and recognition. Respond ONLY with a valid JSON object with keys: approach, shortMessage, longMessage, tone, avoid. No markdown, no extra text.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content || '{}';
    const parsed = JSON.parse(content) as Partial<AppreciationGuidance>;
    return {
      approach: parsed.approach || getFallbackGuidance(recipientArchetype, relationship, occasion).approach,
      shortMessage: parsed.shortMessage || getFallbackGuidance(recipientArchetype, relationship, occasion).shortMessage,
      longMessage: parsed.longMessage || getFallbackGuidance(recipientArchetype, relationship, occasion).longMessage,
      tone: parsed.tone || 'Warm and genuine',
      avoid: parsed.avoid || getFallbackGuidance(recipientArchetype, relationship, occasion).avoid,
    };
  } catch (error) {
    console.error('Error generating appreciation guidance:', error);
    return getFallbackGuidance(recipientArchetype, relationship, occasion);
  }
}

export async function generateAssessmentFeedback(
  userResponses: Record<string, unknown>,
  userPreferences?: unknown
): Promise<AssessmentFeedback> {
  try {
    const prompt = buildAssessmentPrompt(userResponses, userPreferences);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert in employee appreciation and emotional intelligence. Respond ONLY with a valid JSON object with keys: strengths (array of strings), improvements (array of strings), suggestions (array of strings), alignment (string). No markdown, no extra text.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content || '{}';
    const parsed = JSON.parse(content) as Partial<AssessmentFeedback>;
    const fallback = getFallbackAssessmentFeedback();
    return {
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths : fallback.strengths,
      improvements: Array.isArray(parsed.improvements) ? parsed.improvements : fallback.improvements,
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : fallback.suggestions,
      alignment: parsed.alignment || fallback.alignment,
    };
  } catch (error) {
    console.error('Error generating assessment feedback:', error);
    return getFallbackAssessmentFeedback();
  }
}

function getFallbackGuidance(
  archetype: AppreciationArchetype,
  relationship: string,
  occasion: string
): AppreciationGuidance {
  void relationship;
  void occasion;
  return {
    approach: `This person prefers ${archetype.name.toLowerCase()}. ${archetype.description}`,
    shortMessage: archetype.suggestedPhrases[0] || 'Thank you for your contribution!',
    longMessage: archetype.suggestedPhrases[archetype.suggestedPhrases.length - 1] || 'I wanted to express my appreciation for your work.',
    tone: 'Warm and genuine',
    avoid: archetype.dont[0] || 'Avoid generic recognition',
  };
}

function getFallbackAssessmentFeedback(): AssessmentFeedback {
  return {
    strengths: ['You show genuine appreciation', 'You recognize others regularly'],
    improvements: ['Consider personalizing your approach', 'Match your style to recipient preferences'],
    suggestions: ['Try different recognition styles', 'Ask colleagues about their preferences'],
    alignment: 'Your style works well with various preferences',
  };
}