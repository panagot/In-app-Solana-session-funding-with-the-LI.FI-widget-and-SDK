/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#f8fafc',
          raised: '#ffffff',
          panel: '#ffffff',
          inset: '#f1f5f9',
          border: 'rgba(15, 23, 42, 0.06)',
        },
        ink: {
          DEFAULT: '#0f172a',
          soft: '#1e293b',
          muted: '#475569',
          subtle: '#64748b',
          faint: '#94a3b8',
        },
        brand: {
          DEFAULT: '#0ea5e9',
          deep: '#0284c7',
          light: '#7dd3fc',
          glow: '#22d3ee',
          ink: '#0c4a6e',
        },
        accent: {
          DEFAULT: '#0071e3',
          dim: '#0058b0',
          muted: '#5a9fe8',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Text',
          'IBM Plex Sans',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        display: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'system-ui',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'ui-monospace', 'SF Mono', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 28px rgba(14, 165, 233, 0.18)',
        card: '0 1px 2px rgba(15, 23, 42, 0.04), 0 12px 32px rgba(15, 23, 42, 0.05)',
        cardHover: '0 2px 4px rgba(15, 23, 42, 0.05), 0 16px 40px rgba(15, 23, 42, 0.08)',
        nav: '0 4px 24px rgba(15, 23, 42, 0.06)',
        elevated: '0 24px 60px -16px rgba(15, 23, 42, 0.18)',
        brand: '0 8px 24px rgba(14, 165, 233, 0.28)',
        brandHover: '0 10px 28px rgba(14, 165, 233, 0.35)',
      },
      backgroundImage: {
        'radial-fade':
          'radial-gradient(ellipse 95% 72% at 50% -18%, rgba(14, 165, 233, 0.08), transparent 60%)',
        'mesh-light':
          'linear-gradient(180deg, #ffffff 0%, #fafafa 40%, #f5f5f7 100%)',
        'brand-gradient': 'linear-gradient(135deg, #0ea5e9 0%, #22d3ee 100%)',
        'brand-gradient-vertical': 'linear-gradient(180deg, #0ea5e9 0%, #0284c7 100%)',
        'ink-gradient': 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
        'ink-gradient-soft': 'linear-gradient(180deg, #1e293b 0%, #334155 100%)',
        'shine': 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'gate-unlock': {
          '0%': { opacity: '0.88', transform: 'scale(0.96)' },
          '55%': { opacity: '1', transform: 'scale(1.03)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(14, 165, 233, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(14, 165, 233, 0)' },
        },
        'flow': {
          '0%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '-30' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.45s ease-out both',
        'fade-in': 'fade-in 0.4s ease-out both',
        'gate-unlock': 'gate-unlock 0.58s cubic-bezier(0.34, 1.45, 0.64, 1) both',
        'shimmer': 'shimmer 2.5s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'flow': 'flow 1.5s linear infinite',
      },
    },
  },
  plugins: [],
}
