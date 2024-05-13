/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "app/**/*.tsx"
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['winter']
  },
  plugins: [
    require("daisyui")
  ],
}

