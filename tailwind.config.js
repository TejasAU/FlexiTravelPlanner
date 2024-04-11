/** @type {import('tailwindcss').Config} */

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            spacing: {
                "vh-25": "25vh",
                "vh-50": "50vh",
                "vh-75": "75vh",
                "vh-100": "100vh",
            },
        },
    },
    // eslint-disable-next-line no-undef
    plugins: [
      require("daisyui"),
    ],
    daisyui: {
        themes: ["bumblebee"],
    },
};
