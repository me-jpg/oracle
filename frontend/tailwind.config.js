/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cursor-style minimal palette
        'background': '#0a0a0a',
        'surface': '#151515',
        'border': '#2a2a2a',
        'text': {
          primary: '#ffffff',
          secondary: '#8a8a8a',
          tertiary: '#5a5a5a',
        }
      }
    },
  },
  plugins: [],
}
