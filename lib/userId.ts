// User ID generation and management

const USER_ID_KEY = 'flix_user_id';
const USER_ID_COUNTER_KEY = 'flix_user_id_counter';

/**
 * Generate a unique user ID
 * Uses localStorage to persist user ID across sessions
 * Format: "user-{number}" (e.g., "user-1", "user-2")
 */
export function getOrCreateUserId(): string {
  // Check if user already has an ID
  if (typeof window !== 'undefined') {
    const existingUserId = localStorage.getItem(USER_ID_KEY);
    if (existingUserId) {
      return existingUserId;
    }

    // Generate new user ID
    let counter = 1;
    const storedCounter = localStorage.getItem(USER_ID_COUNTER_KEY);
    
    if (storedCounter) {
      counter = parseInt(storedCounter, 10) + 1;
    }
    
    const newUserId = `user-${counter}`;
    
    // Store the new user ID and update counter
    localStorage.setItem(USER_ID_KEY, newUserId);
    localStorage.setItem(USER_ID_COUNTER_KEY, counter.toString());
    
    return newUserId;
  }
  
  // Fallback for server-side rendering
  return 'anonymous';
}

/**
 * Get the current user ID without creating a new one
 */
export function getUserId(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(USER_ID_KEY);
  }
  return null;
}

/**
 * Reset user ID (useful for testing or logout)
 */
export function resetUserId(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_ID_KEY);
  }
}
