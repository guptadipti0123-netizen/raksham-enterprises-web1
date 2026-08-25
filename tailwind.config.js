/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FDFBF7',
          100: '#FAF4E8',
          200: '#F3E5C8',
          300: '#EBD4A3',
          400: '#DFC07B',
          500: '#C8A251', // Official Brand Gold
          600: '#B0883E',
          700: '#946E2E',
          800: '#755421',
          900: '#543A14',
          950: '#2A1B07',
        },
        brand: {
          dark: '#0F172A',
          charcoal: '#1E293B',
          muted: '#64748B',
          light: '#F8FAFC',
          warm: '#FAF8F5',
          gold: '#C8A251',
          goldHover: '#B0883E',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.03)',
        'soft-lg': '0 10px 25px -3px rgba(15, 23, 42, 0.08), 0 4px 10px -2px rgba(15, 23, 42, 0.04)',
        'gold-soft': '0 4px 20px -2px rgba(200, 162, 81, 0.25)',
        'gold-hover': '0 8px 30px -4px rgba(200, 162, 81, 0.35)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #DFC07B 0%, #C8A251 50%, #B0883E 100%)',
        'gold-gradient-hover': 'linear-gradient(135deg, #E6CA85 0%, #B0883E 100%)',
        'light-hero': 'radial-gradient(circle at 50% 0%, rgba(200, 162, 81, 0.08) 0%, rgba(248, 250, 252, 1) 70%)',
      }
    },
  },
  plugins: [],
}
