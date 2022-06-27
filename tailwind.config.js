module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: () => ({
        'auth-background': "url('assets/images/auth-background.png')",
      }),
      colors: {
        primary: '#3490dc',
        drawer: '#3490dc',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
