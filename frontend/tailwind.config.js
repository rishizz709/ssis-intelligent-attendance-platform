/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aditya: {
          dark: '#0B192C',
          navy: '#0F2A4A',
          blue: '#1E3A8A',
          primary: '#1E40AF',
          accent: '#F97316',
          'accent-hover': '#EA580C',
          light: '#F8FAFC',
          card: '#FFFFFF',
          sky: '#0284C7',
          'sky-light': '#F0F9FF',
          border: '#E2E8F0',
          muted: '#64748B'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(15, 42, 74, 0.06), 0 2px 6px -1px rgba(15, 42, 74, 0.04)',
        'card-hover': '0 10px 25px -3px rgba(15, 42, 74, 0.1), 0 4px 10px -2px rgba(15, 42, 74, 0.05)',
        'premium': '0 20px 30px -10px rgba(30, 58, 138, 0.15)',
        'glow-accent': '0 0 25px rgba(249, 115, 22, 0.25)',
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
      }
    },
  },
  plugins: [],
}
