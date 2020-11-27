module.exports = {
  // important: true,
  prefix: '--',
  separator: ':',
  purge: {
    // mode: 'all',
    content: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx'],
  },
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',

        black: '#000',
        white: '#fff',

        'brand-primary': 'var(--brand-primary-color)',
        'brand-secondary': 'var(--brand-secondary-color)',
        'brand-tertiary': 'var(--brand-tertiary-color)',

        background: {
          primary: 'var(--bg-background-primary-color)',
          secondary: 'var(--brand-secondary-color)',
          tertiary: 'var(--brand-tertiary-color)',
        },

        'light-gray': {
          100: '#fafafa',
        },

        'cool-gray': {
          100: '#F7FAFC',
          200: '#EDF2F7',
          300: '#E2E8F0',
          400: '#CBD5E0',
          500: '#A0AEC0',
          600: '#718096',
          700: '#4A5568',
          800: '#2D3748',
          900: '#1A202C',
        },
        blue: {
          100: '#E6EFFF',
          200: '#C0D8FF',
          300: '#99C0FF',
          400: '#4D91FF',
          500: '#0162FF',
          600: '#0158E6',
          700: '#013B99',
          800: '#002C73',
          900: '#001D4D',
        },
      },

      borderRadius: {
        xl: '0.8rem',
      },
    },
  },
};
