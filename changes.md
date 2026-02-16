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
| *Visual* | Emojis | Lucide icons | App-wide |
| *Visual* | Generic typography | Plus Jakarta Sans | Layout, globals |
| *Visual* | Heavy animations | CSS transitions, minimal motion | App-wide |
| *Visual* | Framer Motion | Removed; CSS `animate-fade-in` | App-wide |
| *Quiz* | 12 questions | 18 questions | Preference Quiz |
| *Quiz* | Original question set | New element-based questions (Wind, Fire, Moon, Lightning, Water) | Preference Quiz |
| *Performance* | Eager Firebase load | Lazy load on quiz save | Preference Quiz |
| *Performance* | Eager PreferenceQuiz load | Dynamic import when quiz starts | Profile page |

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

## 4. Visual Redesign – Minimal, Professional, Tech-Oriented

*User feedback:* Redesign the app to be engaging, minimalistic, professional, and inviting for a tech company. Keep the Flix color palette.

*Changes made:*
• *Typography:* Plus Jakarta Sans via `next/font` for optimal loading
• *Icons:* Replaced emojis with Lucide icons across the app (Sparkles, Wrench, Bot, User, etc.)
• *Shadows & borders:* New `shadow-card`, `shadow-card-hover`, lighter `border-flix-grayscale-20` for cards
• *TopBar:* Backdrop blur, neutral profile button
• *BottomNav:* Simpler layout, clearer active state
• *Section labels:* Uppercase tracking (e.g. “Learn”, “Toolbox”) for hierarchy
• *Cards & buttons:* Softer borders, smaller radius (`rounded-button`, `rounded-pill`), hover states
• *Components updated:* ColleagueSelector, ArchetypeCard, AppreciationTips, PreferenceQuiz

---

## 5. Performance Optimizations

*User feedback:* App was running slower; optimize and clean up the code.

*Changes made:*
• *Firebase/Firestore:* Lazy loaded only when user saves quiz results (not on initial page load)
• *PreferenceQuiz:* Dynamically imported when user starts the quiz (profile page bundle reduced significantly)
• *Framer Motion removed:* Replaced with CSS `animate-fade-in` keyframe and `active:scale` for tap feedback
• *Progress bars:* CSS `transition-[width]` instead of JS-driven animations
• *AppreciationTips:* Fixed `require()` usage; used `useCallback` for `loadGuidance`
• *ColleagueSelector:* `useMemo` for filtered users
• *Package removed:* `framer-motion` removed from dependencies

---

## 6. Quiz Questions – New Element-Based Set

*User feedback:* Replace quiz questions with new element-based set (Wind, Fire, Moon, Lightning, Water).

*Changes made:*
• *Question count:* 12 → 18 questions
• *New questions:* All questions rewritten to align with the element framework:
  - Wind (word-collector): Written, detailed messages; depth and specificity
  - Fire (spotlight-seeker): Public recognition; visibility
  - Moon (quiet-achiever): Private 1:1 appreciation; personal trust
  - Lightning (growth-chaser): Growth opportunities; advancement
  - Water (reward-enthusiast): Tangible rewards; celebrations

*Questions included:*
1. After completing a major project, what follow-up would feel most meaningful?
2. When your manager thanks you, what makes it feel sincere?
3. When reflecting on your best moments at work, what stands out most?
4. If your manager wants to recognise behind-the-scenes effort, what should they do?
5. When thinking about long-term motivation, what sustains you most?
6. If your name appears in company communications, you would prefer:
7. When feedback is delivered, you value most:
8. When someone appreciates your strengths, what resonates most?
9. When mentoring others, what kind of recognition do you naturally give?
10. When you feel undervalued, what is usually missing?
11. Which scenario would energise you most?
12. When thinking about recognition longevity, what matters most?
13. If leadership noticed your work, you would prefer they:
14. If a colleague praises you, what feels most affirming?
15. When imagining ideal recognition over the next year, you picture:
16. The ideal timing for recognition for you is:
17. Who do you most want to hear appreciation from?
18. How often would you like to receive appreciation?

*Archetype mapping unchanged:* Internal IDs (word-collector, spotlight-seeker, etc.) remain; display names (Wind, Fire, Moon, Lightning, Water) are unchanged in `lib/archetypes.ts`.

---

All changes above reflect user feedback collected during product development.