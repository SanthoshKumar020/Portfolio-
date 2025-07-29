import { theme } from './src/theme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: theme.colors.primary,
        secondary: theme.colors.secondary,
        accent: theme.colors.accent,
        text: theme.colors.text,
        link: theme.colors.link,
      },
      fontFamily: {
        heading: [theme.fonts.heading],
        body: [theme.fonts.body],
      },
    },
  },
  plugins: [],
}
