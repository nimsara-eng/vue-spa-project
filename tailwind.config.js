
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        luxury:{
          black: '#0F0F0F',
          surface: '#1A1A1A',
          gold: '#C9A84C',
          text: '#F5F5F5',
          muted: '#9A9A9A',
        }
      }
    },
  },
  plugins: [],
}

