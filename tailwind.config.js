/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-6deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        rotation: {
          '0%': { transform: 'rotate(0deg) scale(10)' },
          '100%': { transform: 'rotate(-360deg) scale(10)'},
        },
        slides1: {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '2%, 98%': { transform: 'translateX(20px)' },
        },
        slides2: {
          '0%, 100%': { transform: 'translateX(100%)' },
          '2%, 98%': { transform: 'translateX(-100%)' },
        },
        slides3: {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        rotation: 'rotation 10s linear infinite',
        toast1: 'slides1 var(--animation-duration) linear',
        toast2: 'slides2 var(--animation-duration) linear',
        removes: 'slides3 var(--animation-duration) linear', // Fixed typo here, changed `slides3` to `removes`
      },
    },
  },
  plugins: [],
}
