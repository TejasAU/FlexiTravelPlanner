/** @type {import('tailwindcss').Config} */

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}","./node_modules/tw-elements-react/dist/js/**/*.js"],
    theme: {
        extend: {
            spacing: {
                "vh-25": "25vh",
                "vh-50": "50vh",
                "vh-75": "75vh",
                "vh-100": "100vh",
            },
            gridTemplateRows: {
                "times" : 'repeat(48, minmax(3.5rem, 1fr))',
            }
        },
    },
    // eslint-disable-next-line no-undef
    plugins: [
      require("daisyui"),
      require("tw-elements-react/dist/plugin.cjs")
    ],
    daisyui: {
        themes: ["bumblebee"],
    },
};
