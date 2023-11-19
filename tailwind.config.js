const config = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#f4aa3a",
          secondary: "#f4f4a1",
          accent: "#cfcaca",
          neutral: "#ffffff",
          "base-100": "#ffffff",
          info: "#778ad4",
          success: "#23b893",
          warning: "#f79926",
          error: "#ea535a",
          body: {
            "background-color": "#e3e6e6",
          },
        },

        dark: {
          primary: "#f4aa3a",
          secondary: "#f4f4a1",
          accent: "#424242",
          neutral: "#212225",
          "base-100": "#212225", // Set your dark background color here
          info: "#778ad4",
          success: "#23b893",
          warning: "#f79926",
          error: "#ea535a",
          body: {
            "background-color": "#131416", // Set your dark body background color here
          },
        },
        
      },
    ],
  },
}
export default config
