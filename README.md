# 🎉 Flix SE – Employee Appreciation Mobile Web App

A mobile-first employee appreciation web app that promotes a strong appreciation culture through training, tools, personalized appreciation preferences, and AI-powered guidance.

## Features

- 🎓 **Appreciation Training** - Interactive lessons on appreciation best practices
- 🧰 **Quick Reference Toolbox** - Instant tools for showing appreciation
  - Appreciate a Colleague (personalized tips based on recipient preferences)
  - Phrase Generator
  - Channel Guide
  - Timing Tips
- 🤖 **Self Assessment** - AI-powered assessment of your appreciation style
- 👤 **Profile & Preferences** - Set your appreciation preferences and archetype

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (with custom Flix color tokens)
- **Framer Motion** (animations)
- **OpenAI API** (AI-powered guidance)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Add your OpenAI API key to `.env`:
```
OPENAI_API_KEY=your_openai_api_key_here
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/app
  /training          - Training modules page
  /toolbox           - Quick reference tools
    /appreciate-colleague - Personalized appreciation tips
  /assessment        - Self assessment with AI
  /profile           - Profile and preferences
/components          - Reusable components
/lib                 - Utilities and business logic
  archetypes.ts      - Appreciation archetype definitions
  ai.ts              - OpenAI integration
  prompts.ts         - AI prompt templates
/styles              - Theme and design tokens
```

## Appreciation Archetypes

The app uses 5 appreciation archetypes:
- 🎤 **Public Praise** - Likes public recognition
- 💬 **Private Feedback** - Prefers 1:1 recognition
- 📝 **Written Words** - Values thoughtful wording
- 🎁 **Tangible Rewards** - Appreciates small perks
- 🚀 **Growth-Oriented** - Motivated by development

## Deployment

This app is optimized for Vercel deployment:

1. Push your code to GitHub
2. Import the project in Vercel
3. Add your `OPENAI_API_KEY` environment variable
4. Deploy!

## Design System

All colors use the Flix design tokens defined in `styles/theme.ts` and integrated with Tailwind CSS. The app follows a Duolingo-inspired design with:
- Rounded cards and buttons
- Bright but professional colors
- Friendly icons and emojis
- Progress bars and animations
- Mobile-first, thumb-friendly layout

## License

Private - Flix SE Internal Use

