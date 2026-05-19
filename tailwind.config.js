/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#6C63FF",
                glass: "rgba(255,255,255,0.1)",
            },
            backdropBlur: {
                xs: "2px",
            },
        },
    },
    plugins: [],
}