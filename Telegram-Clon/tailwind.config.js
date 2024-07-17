/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      "mobile":"400px"
    },
    colors:{
      "gray-33":"#212121",
      "white":"#FFFFFF",
      "black":"#000000",
      'purple-main':"#766AC8",
      'green-main':'#EEFFDE'
    },
    extend: {},
  },
  plugins: [],
}