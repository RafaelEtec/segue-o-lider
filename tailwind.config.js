/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: [
        "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            fontFamily: {
                bebas: ["Bebas-Neue", "serif"],
                pthin: ["Poppins-Thin", "sans-serif"],
                pextralight: ["Poppins-ExtraLight", "sans-serif"],
                plight: ["Poppins-Light", "sans-serif"],
                pregular: ["Poppins-Regular", "sans-serif"],
                pmedium: ["Poppins-Medium", "sans-serif"],
                psemibold: ["Poppins-SemiBold", "sans-serif"],
                pbold: ["Poppins-Bold", "sans-serif"],
                pextrabold: ["Poppins-ExtraBold", "sans-serif"],
                pblack: ["Poppins-Black", "sans-serif"],
            }
        },
        colors: {
            primary: {
                100: '#FFBA260A',
                200: '#FFBA261A',
                300: '#FFBA26'
            },
            accent: {
                100: '#FBFBFB',
                200: '#FFFFFF',
            },
            black: {
                DEFAULT: "#000000",
                100: '#8C8E98',
                200: '#666876',
                250: '#2d3149',
                300: '#191D31',
            },
            gray: {
                100: '#CDCDE0',
            },
            danger: '#F75555'
        }
    },
    plugins: [],
}