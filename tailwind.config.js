/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'matte-black': '#0D0D0D',
        'deep-charcoal': '#161616',
        'luxury-gold': '#D4AF37',
        'cream-highlight': '#F5E6C8',
        'antique-gold': '#8B6F47',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        cinematic: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
