export default {
    content: [
        "./src/**/*.{html,js,svelte,ts}",
        "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
    ],

    theme: {
        extend: {
            colors: {
                primarybg: ' #faebd7',
                primary: {"50":"#fdf4ff","100":"#fae8ff","200":"#f5d0fe","300":"#f0abfc","400":"#e879f9","500":"#d946ef","600":"#c026d3","700":"#a21caf","800":"#86198f","900":"#701a75"}
            },
            fontFamily: {
                logo: 'Somatic-Rounded'
            }
        },
    },

    plugins: [
        require('flowbite/plugin')
    ],

    darkMode: 'class',
};