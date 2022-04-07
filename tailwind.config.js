module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: "200px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    fontFamily: {
      display: [
        "Rale way",
      ],
      body: [
        "Rale way",
      ],
    },
    minWidth: {
      0: "0",
      "1/5": "20%",
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
      full: "100%",
    },
    minHeight: {
      "100px": "6.25rem",
      "200px": "12.5rem",
      "300px": "18.75rem",
    },
    extend: {},
  },
  variants: {
    scrollbar: ['rounded'],
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
