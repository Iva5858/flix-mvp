// Firestore service for saving quiz results

import { 
  collection, 
  addDoc, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  Timestamp,
  FieldValue
} from 'firebase/firestore';
import { db } from './firebase';
import { UserPreferences } from './archetypes';

export interface QuestionResponse {
  questionId: number;
  questionText: string;
  answerType: 'archetype' | 'open-ended' | 'skipped';
  archetypeAnswer?: string;
  openEndedAnswer?: string;
  answerText?: string; // The text of the selected option (for archetype answers)
}

export interface QuizResult {
  userId?: string;
  primaryArchetype: string;
  secondaryPreferences: string[];
  visibility: 'public' | 'team' | 'private';
  completedAt: Timestamp | FieldValue;
  questionResponses: QuestionResponse[];
  openEndedResponses?: Record<number, string>; // Deprecated - kept for backward compatibility
  skippedQuestions?: number[]; // Deprecated - kept for backward compatibility
}

export interface UserQuizData {
  preferences: UserPreferences;
  quizResults: QuizResult;
  lastUpdated: Timestamp | FieldValue;
}

/**
 * Save quiz results to Firestore
 * @param preferences - User preferences from quiz
 * @param questionResponses - Array of all individual question responses
 * @param userId - Optional user ID (can be generated or from auth)
 * @returns Document ID of the saved result
 */
export async function saveQuizResults(
  preferences: UserPreferences,
  questionResponses: QuestionResponse[],
  userId?: string
): Promise<string> {
  try {
    if (!db) {
      throw new Error('Firebase is not initialized. Please check your environment variables and restart the development server.');
    }

    // Import archetypes to get names
    const { archetypes } = await import('./archetypes');

    const quizResult: QuizResult = {
      userId: userId || 'user-0', // Fallback to user-0 if somehow undefined
      primaryArchetype: archetypes[preferences.primaryArchetype]?.name || preferences.primaryArchetype,
      secondaryPreferences: preferences.secondaryPreferences.map(
        id => archetypes[id]?.name || id
      ),
      visibility: preferences.visibility,
      completedAt: serverTimestamp() as Timestamp,
      questionResponses,
    };

    // Save to quiz results collection
    const quizResultsRef = collection(db, 'quizResults');
    const docRef = await addDoc(quizResultsRef, quizResult);

    // If userId is provided, also save/update user preferences
    if (userId && userId !== 'anonymous') {
      await saveUserPreferences(userId, preferences, questionResponses);
    }

    return docRef.id;
  } catch (error) {
    console.error('Error saving quiz results:', error);
    throw error;
  }
}

/**
 * Save or update user preferences
 * @param userId - User ID
 * @param preferences - User preferences
 */
export async function saveUserPreferences(
  userId: string,
  preferences: UserPreferences,
  questionResponses?: QuestionResponse[]
): Promise<void> {
  try {
    if (!db) {
      throw new Error('Firebase is not initialized. Please check your environment variables and restart the development server.');
    }

    // Import archetypes to get names
    const { archetypes } = await import('./archetypes');

    const userRef = doc(db, 'users', userId);
    const userData: UserQuizData = {
      preferences,
      quizResults: {
        primaryArchetype: archetypes[preferences.primaryArchetype]?.name || preferences.primaryArchetype,
        secondaryPreferences: preferences.secondaryPreferences.map(
          id => archetypes[id]?.name || id
        ),
        visibility: preferences.visibility,
        completedAt: serverTimestamp() as Timestamp,
        questionResponses: questionResponses || [],
      },
      lastUpdated: serverTimestamp() as Timestamp,
    };

    await setDoc(userRef, userData, { merge: true });
  } catch (error) {
    console.error('Error saving user preferences:', error);
    throw error;
  }
}

/**
 * Get user preferences from Firestore
 * @param userId - User ID
 * @returns User preferences or null if not found
 */
export async function getUserPreferences(userId: string): Promise<UserPreferences | null> {
  try {
    if (!db) {
      throw new Error('Firebase is not initialized. Please check your environment variables and restart the development server.');
    }

    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data() as UserQuizData;
      return data.preferences;
    }

    return null;
  } catch (error) {
    console.error('Error getting user preferences:', error);
    throw error;
  }
}

/**
 * Get quiz results for a user
 * @param userId - User ID
 * @returns Array of quiz results
 */
export async function getUserQuizResults(userId: string): Promise<QuizResult[]> {
  try {
    if (!db) {
      throw new Error('Firebase is not initialized. Please check your environment variables and restart the development server.');
    }

    const quizResultsRef = collection(db, 'quizResults');
    const q = query(quizResultsRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => doc.data() as QuizResult);
  } catch (error) {
    console.error('Error getting quiz results:', error);
    throw error;
  }
}
