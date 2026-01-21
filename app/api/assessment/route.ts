import { NextRequest, NextResponse } from 'next/server';
import { generateAssessmentFeedback } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userResponses, userPreferences } = body;

    if (!userResponses) {
      return NextResponse.json(
        { error: 'Missing user responses' },
        { status: 400 }
      );
    }

    const feedback = await generateAssessmentFeedback(userResponses, userPreferences);

    return NextResponse.json(feedback);
  } catch (error) {
    console.error('Error generating assessment feedback:', error);
    return NextResponse.json(
      { error: 'Failed to generate feedback' },
      { status: 500 }
    );
  }
}

