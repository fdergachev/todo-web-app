/** @type {import('tailwindcss').Config} */
export default {
   content: [
      "./src/**/*.{js,jsx,ts,tsx}",
   ],
   theme: {
      extend: {
         colors: {
            BackgroundLight: '#E8E8E3',
            BackgroundDark: '#080807',
            Text: "#6B645C",
            Accent: "#393632",
            TextLight: "#D1D1C7",
            TextDark: "#7e766c",
            TextGray: "#A29E9A",
            Button: "#8C8C73",
            Noize: "#AEAE9D",
            Separator: "#BFBFB1"
         }
      },
   },
   plugins: [],
}

