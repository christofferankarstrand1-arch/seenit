/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#009966',
        accent: '#6C63FF',
        ink: '#1a1a1a',
        paper: '#ffffff'
      },
      borderRadius: { xl: '1rem', '2xl': '1.5rem' }
    },
  },
  plugins: [],
}