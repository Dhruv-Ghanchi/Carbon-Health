/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        carbon: {
          50: '#f2fbf5',
          100: '#e1f6e8',
          200: '#c3ecd4',
          300: '#95dbb7',
          400: '#60c292',
          500: '#3aa773',
          600: '#2a8559',
          700: '#236a49',
          800: '#1f543c',
          900: '#1a4532',
          950: '#0e261d',
        },
        surface: {
          light: '#ffffff',
          dark: '#0f172a',
          muted: '#f8fafc',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
