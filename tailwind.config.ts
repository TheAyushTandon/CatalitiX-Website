import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        asimovian: ['var(--font-asimovian)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        background: 'var(--bg-deep)',
        surface: 'var(--bg-surface)',
        accent: {
          pink: 'var(--accent-pink)',
          cyan: 'var(--accent-cyan)',
          purple: 'var(--accent-purple)',
          lime: 'var(--accent-lime)',
          orange: 'var(--accent-orange)',
          yellow: 'var(--accent-yellow)',
        },
      },
    },
  },
  plugins: [],
};

export default config;
