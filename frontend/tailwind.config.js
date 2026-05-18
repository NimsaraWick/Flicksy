/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        mirage: {
          obsidian: '#050505',
          charcoal: '#121212',
          gold: '#D4AF37',
          silver: '#E5E7EB',
          crimson: '#8B0000',
        }
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
        goldPulse: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(212, 175, 55, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.6)' },
        }
      },
      animation: {
        shimmer: 'shimmer 3s infinite linear',
        fadeInUp: 'fadeInUp 0.8s ease-out forwards',
        slowZoom: 'slowZoom 20s linear infinite alternate',
        goldPulse: 'goldPulse 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}; 
 