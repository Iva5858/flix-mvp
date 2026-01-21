import { NextRequest, NextResponse } from 'next/server';
import { generateAppreciationGuidance } from '@/lib/ai';
import { archetypes, ArchetypeId } from '@/lib/archetypes';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { archetypeId, relationship, occasion, additionalContext } = body;

    if (!archetypeId || !relationship || !occasion) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const archetype = archetypes[archetypeId as ArchetypeId];
    if (!archetype) {
      return NextResponse.json(
        { error: 'Invalid archetype' },
        { status: 400 }
      );
    }

    const guidance = await generateAppreciationGuidance(
      archetype,
      relationship,
      occasion,
      additionalContext
    );

    return NextResponse.json(guidance);
  } catch (error) {
    console.error('Error generating appreciation guidance:', error);
    return NextResponse.json(
      { error: 'Failed to generate guidance' },
      { status: 500 }
    );
  }
}

