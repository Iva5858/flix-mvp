# Changelog – User Feedback Updates

The following changes were implemented based on user feedback collected.

---

## Summary of Changes (Table)

| Category | Before | After | Location |
|----------|--------|-------|----------|
| *Multiple Selection* | Single answer per question | Multiple answers per question (select all that apply) | Preference Quiz |
| *Multiple Selection* | ⁠ archetypeAnswer ⁠, ⁠ answerText ⁠ (single) | ⁠ archetypeAnswers ⁠, ⁠ answerTexts ⁠ (arrays) | Firestore schema |
| *Database* | ⁠ quizResults ⁠ collection; quiz data in ⁠ users ⁠ | ⁠ appreciationQuizResponses ⁠ collection; ⁠ users ⁠ stores preferences only | Firestore |
| *Rewording* | Training | Learn | Bottom nav |
| *Rewording* | Appreciation Training | Level Up Your Appreciation | Learn page title |
| *Rewording* | Build your appreciation skills with interactive lessons | Master the art of appreciation with fun, bite-sized lessons | Learn page subtitle |
| *Rewording* | Module Complete! | You crushed it! 🎉 | Lesson completion screen |
| *Rewording* | Back to Training / Next Module | Back to Lessons / Next Lesson | Lesson navigation |
| *Rewording* | Training Completed | Lessons Completed | Profile progress |
| *Rewording* | Complete all modules | Complete all lessons | Tip text |

---

## 1. Multiple Selection on Quiz

*User feedback:* Allow users to select multiple answers per question.

*Changes made:*
•⁠  ⁠Updated the Preference Quiz to support multi-select instead of single-select
•⁠  ⁠Users can now toggle multiple options per question (select all that apply)
•⁠  ⁠Added visual feedback: checkboxes and highlighted state for selected options
•⁠  ⁠Result calculation now counts all selected archetypes across questions to determine primary and secondary preferences
•⁠  ⁠Question responses saved to Firestore include ⁠ archetypeAnswers ⁠ and ⁠ answerTexts ⁠ arrays for multi-select data

---

## 2. Database / Firestore Structure Change

*User feedback:* Store quiz data in a separate collection.

*Changes made:*
•⁠  ⁠Quiz results are now saved to a dedicated collection: *⁠ appreciationQuizResponses ⁠*
•⁠  ⁠The ⁠ users ⁠ collection stores only preferences (no embedded quiz data)
•⁠  ⁠Updated ⁠ saveQuizResults ⁠ to write to ⁠ appreciationQuizResponses ⁠
•⁠  ⁠Updated ⁠ getUserQuizResults ⁠ to read from ⁠ appreciationQuizResponses ⁠
•⁠  ⁠Export script and Firebase setup documentation updated to use the new collection
•⁠  ⁠Firestore security rules updated for ⁠ appreciationQuizResponses ⁠

---

## 3. Rewording – More Fun and Engaging

*User feedback:* Replace “training” language with more fun, engaging copy.

*Changes made:*
•⁠  ⁠*Bottom nav:* “Training” → “Learn” (emoji: 🎓 → ✨)
•⁠  ⁠*Main page:* “Appreciation Training” → “Level Up Your Appreciation”
•⁠  ⁠*Subtitle:* “Build your appreciation skills with interactive lessons” → “Master the art of appreciation with fun, bite-sized lessons”
•⁠  ⁠*Completion screen:* “Module Complete!” → “You crushed it! 🎉”
•⁠  ⁠*Buttons:* “Back to Training” / “Next Module” → “Back to Lessons” / “Next Lesson”
•⁠  ⁠*Profile:* “Training Completed” → “Lessons Completed”
•⁠  ⁠*Tip:* “Complete all modules” → “Complete all lessons”

---

All changes above reflect user feedback collected during product development.