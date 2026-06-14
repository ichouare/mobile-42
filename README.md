
# Mobile Picine

A collection of small React Native / Expo exercises and sample apps organized by day and exercise. This repository is intended as a learning workspace for building mobile UIs and small apps with Expo, TypeScript, and related tooling.

## Repository Structure

- `day00/`, `day01/`, `day02/`, `day03/` — Exercises grouped by day. Each exercise contains a self-contained Expo project (e.g. `ex00`, `ex01`, `medium_weather_app`).
- Common layout inside an exercise:
	- `app/` — Expo/Next-style app entrypoints and screens
	- `assets/` — Images and static assets
	- `component/` — Reusable UI components
	- `constants/` or `constant/` — Color palettes and shared constants
	- `helpers/`, `Hooks/`, `store/` — Utilities and state management for larger exercises

## Prerequisites

- Node.js (LTS recommended)
- Yarn or npm
- Expo CLI (for running the Expo projects):

```bash
npx expo-cli --version
# or install globally
npm install -g expo-cli
```

## Quick Start (per exercise)

1. Open the exercise folder you want to run, for example `day02/medium_weather_app`.
2. Install dependencies:

```bash
cd day02/medium_weather_app
npm install
# or
yarn install
```

3. Start the Expo development server:

```bash
npm start
# or
yarn start
```

4. Open on your device or simulator using the Expo Go app or an iOS/Android simulator.

## Available Scripts

Each exercise contains its own `package.json`. Common scripts include:

- `start` — Start the Expo dev server
- `android` — Open Android emulator
- `ios` — Open iOS simulator (macOS only)
- `web` — Run web version (when configured)

Run scripts from the exercise folder, for example:

```bash
cd day00/ex01
npm run start
```

## Contributing

- Add or improve exercises in the appropriate `dayXX/` folder.
- Keep each exercise self-contained with its own `package.json` and `tsconfig.json`.
- Open issues or pull requests with clear descriptions and reproduction steps.

## Notes

- Some exercises target specific learning goals (layout, hooks, API integration). Check the `README.md` inside each exercise for more details.
- ESLint and TypeScript configs are included in exercises that need stricter checks.

## License

This repository is provided for learning purposes. Check individual exercise folders for license notes if included.

---

If you'd like a shorter or a more detailed README (badges, CI, screenshots), tell me which style you prefer and I will update it.
