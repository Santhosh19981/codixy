/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#030712',
        'bg-secondary': '#0a0f1e',
        'bg-card': '#0d1424',
        'accent-cyan': '#06b6d4',
        'accent-purple': '#7c3aed',
        'accent-blue': '#2563eb',
        'accent-pink': '#ec4899',
        'glow-cyan': 'rgba(6,182,212,0.3)',
        'glow-purple': 'rgba(124,58,237,0.3)',
        'glass': 'rgba(255,255,255,0.05)',
        'glass-border': 'rgba(255,255,255,0.1)',
      },
      fontFamily: {
        'grotesk': ['Space Grotesk', 'sans-serif'],
        'outfit': ['Outfit', 'sans-serif'],
        'clash': ['Clash Display', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #030712 0%, #0a0f1e 50%, #0d1424 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(6,182,212,0.1) 0%, rgba(124,58,237,0.1) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'cursor-blink': 'cursor-blink 1s step-end infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(6,182,212,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(6,182,212,0.6), 0 0 80px rgba(6,182,212,0.2)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 30px rgba(6,182,212,0.4), 0 0 60px rgba(6,182,212,0.2)',
        'glow-purple': '0 0 30px rgba(124,58,237,0.4), 0 0 60px rgba(124,58,237,0.2)',
        'glow-blue': '0 0 30px rgba(37,99,235,0.4), 0 0 60px rgba(37,99,235,0.2)',
        'glass': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
        'card': '0 20px 60px rgba(0,0,0,0.6)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
