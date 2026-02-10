/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        luxury: {
          dark: '#0a0a0a',
          neutral: '#1a1a1a',
          accent: '#d4af37',
          text: '#f5f5f5',
          muted: '#a0a0a0',
        },
      },
    },
  },
  plugins: [],
}
