module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      backgroundImage: () => ({
        'auth-background': "url('assets/images/auth-background.png')",
      }),
      minHeight: (theme) => ({
        ...theme('spacing'),
      }),
      colors: {
        primary: '#3490dc',
        drawer: '#3490dc',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
