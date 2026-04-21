/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#f5f5f7',
          raised: '#ffffff',
          panel: '#ffffff',
          inset: '#f5f5f7',
          border: 'rgba(0, 0, 0, 0.06)',
        },
        /** Reserved for primary CTAs + LI.FI widget alignment — avoid large tinted surfaces */
        accent: {
          DEFAULT: '#0071e3',
          dim: '#0058b0',
          muted: '#5a9fe8',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Text',
          'IBM Plex Sans',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: ['IBM Plex Mono', 'ui-monospace', 'SF Mono', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 24px rgba(15, 23, 42, 0.06)',
        card: '0 2px 12px rgba(0, 0, 0, 0.04), 0 8px 32px rgba(0, 0, 0, 0.06)',
        nav: '0 4px 24px rgba(0, 0, 0, 0.06)',
      },
      backgroundImage: {
        /** Neutral lift at top — no blue wash on white */
        'radial-fade':
          'radial-gradient(ellipse 95% 72% at 50% -18%, rgba(15, 23, 42, 0.04), transparent 58%)',
        'mesh-dark':
          'linear-gradient(180deg, #ffffff 0%, #fbfbfd 40%, #f5f5f7 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        /** Primary CTA when session gate unlocks (Fund session demo) */
        'gate-unlock': {
          '0%': { opacity: '0.88', transform: 'scale(0.96)' },
          '55%': { opacity: '1', transform: 'scale(1.03)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.45s ease-out both',
        'gate-unlock': 'gate-unlock 0.58s cubic-bezier(0.34, 1.45, 0.64, 1) both',
      },
    },
  },
  plugins: [],
}
