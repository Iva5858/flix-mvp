#!/usr/bin/env node
/**
 * Export quiz results from Firestore to CSV
 * Run: node scripts/export-quiz-results.mjs
 * Or:  npm run export-quiz-results
 *
 * Requires .env.local with Firebase config (NEXT_PUBLIC_FIREBASE_*)
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// Load .env.local
function loadEnv() {
  try {
    const envPath = join(rootDir, '.env.local');
    const content = readFileSync(envPath, 'utf8');
    content.split('\n').forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const eq = trimmed.indexOf('=');
        if (eq > 0) {
          const key = trimmed.slice(0, eq).trim();
          let value = trimmed.slice(eq + 1).trim();
          if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
          }
          process.env[key] = value;
        }
      }
    });
  } catch (e) {
    console.error('Could not load .env.local. Make sure it exists with NEXT_PUBLIC_FIREBASE_* variables.');
    process.exit(1);
  }
}

loadEnv();

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Escape CSV value (wrap in quotes if contains comma, newline, or quote)
function escapeCsv(value) {
  if (value == null) return '';
  const s = String(value);
  if (s.includes(',') || s.includes('\n') || s.includes('"')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

async function main() {
  if (!firebaseConfig.projectId) {
    console.error('Missing Firebase config. Check .env.local');
    process.exit(1);
  }

  console.log('Connecting to Firestore...');
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  const db = getFirestore(app);

  const snapshot = await getDocs(collection(db, 'appreciationQuizResponses'));
  const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

  console.log(`Found ${docs.length} quiz result(s).`);

  if (docs.length === 0) {
    console.log('No data to export.');
    return;
  }

  // Find max number of question responses
  let maxResponses = 0;
  docs.forEach((doc) => {
    const responses = doc.questionResponses || [];
    if (responses.length > maxResponses) maxResponses = responses.length;
  });

  // Build header row
  const headers = [
    'documentId',
    'userId',
    'primaryArchetype',
    'secondaryPreferences',
    'visibility',
    'completedAt',
  ];
  for (let i = 0; i < maxResponses; i++) {
    headers.push(`question_${i + 1}_id`, `question_${i + 1}_text`, `question_${i + 1}_answerType`, `question_${i + 1}_answer`);
  }

  const rows = [headers.map(escapeCsv).join(',')];

  docs.forEach((doc) => {
    let completedAt = '';
    if (doc.completedAt) {
      if (typeof doc.completedAt.toDate === 'function') {
        completedAt = doc.completedAt.toDate().toISOString();
      } else if (doc.completedAt.seconds != null) {
        completedAt = new Date(doc.completedAt.seconds * 1000).toISOString();
      } else {
        completedAt = String(doc.completedAt);
      }
    }
    const secondary = Array.isArray(doc.secondaryPreferences)
      ? doc.secondaryPreferences.join(' | ')
      : '';

    const row = [
      escapeCsv(doc.id),
      escapeCsv(doc.userId ?? ''),
      escapeCsv(doc.primaryArchetype ?? ''),
      escapeCsv(secondary),
      escapeCsv(doc.visibility ?? ''),
      escapeCsv(completedAt),
    ];

    const responses = doc.questionResponses || [];
    for (let i = 0; i < maxResponses; i++) {
      const r = responses[i];
      if (r) {
        const answer =
          r.answerType === 'archetype'
            ? r.archetypeAnswer ?? r.answerText ?? ''
            : r.answerType === 'open-ended'
              ? r.openEndedAnswer ?? ''
              : r.answerType === 'skipped'
                ? 'Skipped'
                : '';
        row.push(escapeCsv(r.questionId ?? ''), escapeCsv(r.questionText ?? ''), escapeCsv(r.answerType ?? ''), escapeCsv(answer));
      } else {
        row.push('', '', '', '');
      }
    }

    rows.push(row.join(','));
  });

  const csv = rows.join('\n');
  const outPath = join(rootDir, `quiz-results-${new Date().toISOString().slice(0, 10)}.csv`);
  writeFileSync(outPath, csv, 'utf8');

  console.log(`Exported to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
