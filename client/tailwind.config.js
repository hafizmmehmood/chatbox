module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)'
      },
      backgroundColor: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)'
      }
    }
  },
  plugins: []
};
