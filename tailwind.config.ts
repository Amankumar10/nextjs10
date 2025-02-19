import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
       fontSize: {
        '50px': '50px', // Custom size for font-size
        '32px': '32px',  // Custom font size of 32px
      },
      lineHeight: {
        '68': '68px', // Custom line-height of 68px
        '43': '43px',
      },
      textDecorationSkipInk: {
        'none': 'none',  // Add the text-decoration-skip-ink property
      },
      textUnderlinePosition: {
        'from-font': 'from-font', // Set text-underline-position to 'from-font'
      },
      backgroundImage: {
        'pink-gradient': 'linear-gradient(90deg, #E3DBFF 0%, #DDC9FF 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
