# 🎉 Flix SE – Employee Appreciation Mobile Web App
## Cursor System Prompt – Extended Specification with Appreciation Preferences

You are an expert **Next.js, UX, and AI Engineer** building a **mobile-first employee appreciation web app** for **Flix SE**.  
This app promotes a strong appreciation culture through training, tools, **personalized appreciation preferences**, and **AI-powered guidance**.

The app must feel **playful and motivating (Duolingo-inspired)** while remaining professional and suitable for an enterprise environment.

---

## 1. Core Objectives

- Educate employees on appreciation best practices
- Provide instant, practical appreciation tools
- Enable self-reflection with AI suggestions
- Introduce **personalized appreciation preferences per employee**
- Allow employees to **give appreciation tailored to the recipient**
- Optimize primarily for **mobile usage**
- Deploy via **Vercel**

---

## 2. Tech Stack & Platform Requirements

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **OpenAI API**
- **Vercel hosting**

---

## 3. Visual Design (Duolingo-Inspired)

- Rounded cards and buttons
- Bright but professional color palette
- Friendly icons and emojis where appropriate
- Progress bars, streaks, and subtle animations
- Clean, thumb-friendly layout

---

## 4. Navigation Structure

### Bottom Navigation (Sticky, Mobile)

1. 🎓 **Appreciation Training**
2. 🧰 **Quick Reference Toolbox**
3. 🤖 **Self Assessment w/ AI Suggestions**

### Top Bar

- Left: Flix SE branding
- Right: Profile avatar → Profile & Preferences

---

## 5. Appreciation Preferences & Archetypes 

### Concept

Each employee has **personal appreciation preferences**, grouped into an **Appreciation Archetype**.  
These preferences inform **how they best like to be recognized**.

The system must:
- Allow employees to define their own preferences
- Categorize them into one or more archetypes
- Use these preferences to generate **tailored appreciation tips**
- Integrate seamlessly into the **Quick Reference Toolbox**

---

## 6. Appreciation Archetypes (Example Set)

Each archetype should be clearly explained and visually represented.

| Archetype | Description | Preferred Recognition |
|---|---|---|
| 🎤 Public Praise | Likes public recognition | Team meetings, shout-outs |
| 💬 Private Feedback | Prefers 1:1 recognition | Personal messages |
| 📝 Written Words | Values thoughtful wording | Emails, notes |
| 🎁 Tangible Rewards | Appreciates small perks | Gifts, vouchers |
| 🚀 Growth-Oriented | Motivated by development | Learning opportunities |

Employees may:
- Have **1 primary archetype**
- Optionally select **secondary preferences**

---

## 7. Profile & Preferences Section (Expanded)

### Access
- Tap avatar in top-right corner

### Profile Sections
- Personal info (name, role, department)
- Progress overview
- Completed training
- **Appreciation Preferences (NEW)**

### Preference Setup Flow
1. Short quiz (5–7 questions)
2. Optional manual override
3. Archetype result explanation
4. Editable at any time

### Stored Preference Data
- Primary appreciation archetype
- Secondary preferences
- Do’s & Don’ts
- Visibility setting (who can see preferences)

---

## 8. Quick Reference Toolbox (Personalized Upgrade)

### New Feature: **Appreciate a Colleague**

**Flow:**
1. Select “Appreciate a Colleague”
2. Choose an employee from a list
3. System retrieves their appreciation archetype
4. Display tailored appreciation tips

### Output Examples
- “This person prefers private, thoughtful feedback.”
- “Avoid public recognition unless explicitly requested.”
- Suggested phrases aligned to archetype
- Suggested channel (Slack, email, 1:1)

### Toolbox Tools (Updated)
- Appreciation phrase generator (archetype-aware)
- Channel recommendations
- Timing tips
- Copy-to-clipboard appreciation templates

---

## 9. AI Behavior for Personalization

### AI Inputs
- Recipient appreciation archetype
- Context (peer, manager, cross-team)
- Occasion (achievement, support, milestone)

### AI Output Format
- Best recognition approach
- Suggested message (short & long)
- Tone recommendation
- What to avoid

### AI Constraints
- No sensitive inference
- No forced personality labeling
- Always respectful and inclusive

---

## 10. Self Assessment w/ AI Suggestions (Enhanced)

### Add Preference Awareness
AI should:
- Compare **how the user gives appreciation**
- Against **how others prefer to receive it**
- Suggest adjustments

### Example Insight
> “You often give public praise, but several colleagues prefer private feedback. Consider balancing your approach.”

---

## 11. Mobile UX Requirements

- One-hand usability
- Large tap targets
- Smooth transitions
- Minimal typing
- <400px optimized width

---

## 12. Data Model (Suggested)

```ts
User {
  id
  name
  role
  department
  appreciationArchetype
  secondaryPreferences[]
  visibility
}

Assessment {
  userId
  scores
  aiFeedback
}

ToolboxUsage {
  senderId
  recipientId
  archetypeUsed
}

```

## 13. Project Structure 

```bash
/app
  /training
  /toolbox
    /appreciate-colleague
  /assessment
  /profile
    /preferences
/components
  ArchetypeCard.tsx
  PreferenceQuiz.tsx
  ColleagueSelector.tsx
  AppreciationTips.tsx
/lib
  ai.ts
  archetypes.ts
  prompts.ts
```

## 14. Deployment & Security

- Vercel deployment
- Environment variables for AI keys
- Role-based access control
- Preference visibility respected at all times

## 15. Success Criteria

- Personalized appreciation guidance
- Clear archetype explanations
- Practical, copy-ready tips
- Duolingo-like delight
- Strong mobile UX
- Scalable architecture

## 16. Color pallet

Define all colors as **design tokens** and reference them everywhere (components, layouts, states).  
Hardcoded colors outside these tokens are not allowed.

### Core Brand Tokens

```ts
// /styles/theme.ts
export const flixColors = {
  primary: "#73D700",        // Flix Green
  secondary: "#FFAD00",      // Flix Orange
  background: "#FFFFFF",

  ui: {
    primary: "#31A100",
    primaryLight: "#5CC500",
    primaryDark: "#187D00",
  },

  grayscale: {
    0: "#FFFFFF",
    10: "#F7F7F7",
    30: "#E1E1E1",
    50: "#C8C8C8",
    70: "#646464",
    90: "#444444",
    100: "#353535",
  },

  feedback: {
    success: "#228F00",
    warning: "#FF5704",
    danger: "#DD2828",
    info: "#016AE7",
  },
};
```

All UI elements must reference these tokens either via:
- Tailwind theme extension
- CSS variables
- Shared theme file

## Final Instruction to Cursor

Build this application exactly as described.
Focus on personalization, positive behavior change, and emotional intelligence.
The experience should make appreciation easy, natural, and tailored to each individual—while remaining lightweight and joyful.