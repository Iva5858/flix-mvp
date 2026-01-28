# Firebase Firestore Setup Guide

This guide will help you set up Firebase Firestore to save quiz results.

## Step 1: Install Firebase

Run the following command in your project directory:

```bash
npm install firebase
```

## Step 2: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard to create your project

## Step 3: Enable Firestore Database

1. In your Firebase project, go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development) or configure security rules as needed
4. Select a location for your database
5. Click "Enable"

## Step 4: Get Your Firebase Configuration

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click the web icon (`</>`) to add a web app
4. Register your app with a nickname (e.g., "Flix MVP")
5. Copy the Firebase configuration object

## Step 5: Set Up Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and fill in your Firebase configuration:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

3. Replace the placeholder values with your actual Firebase configuration values

## Step 6: Configure Firestore Security Rules (Optional but Recommended)

In Firebase Console, go to Firestore Database > Rules and update them:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to quiz results
    match /quizResults/{document=**} {
      allow read, write: if true; // For development - restrict in production
    }
    
    // Allow read/write access to user preferences
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      // Or for development: allow read, write: if true;
    }
  }
}
```

**Important:** The rules above allow public read/write access for development. For production, implement proper authentication and security rules.

## Step 7: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Complete the preference quiz
3. Click "Save Preferences"
4. Check your Firestore database in Firebase Console to verify the data was saved

## Data Structure

### Quiz Results Collection (`quizResults`)
Each document contains:
- `userId`: User identifier (or "anonymous")
- `primaryArchetype`: Primary appreciation archetype
- `secondaryPreferences`: Array of secondary archetypes
- `visibility`: Visibility preference ('public', 'team', 'private')
- `completedAt`: Timestamp of completion
- `openEndedResponses`: Optional object with open-ended answers
- `skippedQuestions`: Optional array of skipped question indices

### Users Collection (`users`)
Each document contains:
- `preferences`: User preferences object
- `quizResults`: Latest quiz result
- `lastUpdated`: Timestamp of last update

## Troubleshooting

### Error: "Firebase: Error (auth/api-key-not-valid)"
- Make sure your `.env.local` file has the correct Firebase API key
- Restart your development server after changing environment variables

### Error: "Firebase: Error (permission-denied)"
- Check your Firestore security rules
- Make sure you've enabled Firestore in your Firebase project

### Data not saving
- Check the browser console for errors
- Verify your Firebase configuration is correct
- Ensure Firestore is enabled in your Firebase project

## Next Steps

- Add Firebase Authentication to identify users
- Implement user-specific data retrieval
- Add analytics to track quiz completions
- Set up proper security rules for production
