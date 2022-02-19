module.exports = {
  purge: [
    './src/**/*.tsx',
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: {
          normal: '#e85b81',
          hover: '#c12f5d',
          disabled: '#e85b81aa',
        },
        secondary: {
          normal: '#5e48e8',
          hover: '#5028c6',
          disabled: '#7048e8aa'
        },
        error: '#f03d3e',
        success: '#007b40',
        notification: '#d84910',
      },
    },
  },
  variants: {},
  plugins: [],
}
