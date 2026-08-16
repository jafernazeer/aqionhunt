/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-color)',
        "background-secondary": 'var(--bg-secondary)',
        "text-primary": 'var(--text-primary)',
        "text-secondary": 'var(--text-secondary)',
        "accent-primary": 'var(--accent-primary)',
        "accent-secondary": 'var(--accent-secondary)',
        "glass-bg": 'var(--glass-bg)',
        "glass-border": 'var(--glass-border)'
      }
    }
  },
  plugins: []
};
