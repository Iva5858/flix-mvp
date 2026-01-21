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
          content: 'You are an expert in employee appreciation and recognition. Provide helpful, respectful, and inclusive guidance.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content || '';
    
    // Parse the response (simple parsing - in production, use structured output)
    return parseAppreciationGuidance(content);
  } catch (error) {
    console.error('Error generating appreciation guidance:', error);
    // Return fallback guidance
    return getFallbackGuidance(recipientArchetype, relationship, occasion);
  }
}

export async function generateAssessmentFeedback(
  userResponses: Record<string, any>,
  userPreferences?: any
): Promise<AssessmentFeedback> {
  try {
    const prompt = buildAssessmentPrompt(userResponses, userPreferences);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert in employee appreciation and emotional intelligence. Provide encouraging, constructive feedback.',
        },
        {
          role: 'user',
          content: prompt,
      },
      ],
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content || '';
    return parseAssessmentFeedback(content);
  } catch (error) {
    console.error('Error generating assessment feedback:', error);
    return getFallbackAssessmentFeedback();
  }
}

function parseAppreciationGuidance(content: string): AppreciationGuidance {
  // Simple parsing - in production, use structured output or better parsing
  const lines = content.split('\n').filter(line => line.trim());
  
  return {
    approach: lines.find(l => l.includes('approach') || l.match(/^\d+\./)) || 'Provide thoughtful, personalized recognition.',
    shortMessage: lines.find(l => l.includes('short') || l.includes('brief')) || 'Thank you for your excellent work!',
    longMessage: lines.find(l => l.includes('long') || l.includes('detailed')) || 'I wanted to take a moment to express my appreciation for your contributions.',
    tone: lines.find(l => l.includes('tone')) || 'Warm and genuine',
    avoid: lines.find(l => l.includes('avoid') || l.includes("don't")) || 'Avoid being generic or insincere.',
  };
}

function parseAssessmentFeedback(content: string): AssessmentFeedback {
  const lines = content.split('\n').filter(line => line.trim());
  
  return {
    strengths: lines.filter(l => l.includes('strength') || l.match(/^\+/)).slice(0, 3) || ['You show genuine appreciation'],
    improvements: lines.filter(l => l.includes('improve') || l.match(/^-/)).slice(0, 3) || ['Consider personalizing your approach'],
    suggestions: lines.filter(l => l.includes('suggest') || l.match(/^•/)).slice(0, 3) || ['Try to match your style to recipient preferences'],
    alignment: lines.find(l => l.includes('align')) || 'Your style works well with various preferences',
  };
}

function getFallbackGuidance(
  archetype: AppreciationArchetype,
  relationship: string,
  occasion: string
): AppreciationGuidance {
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

