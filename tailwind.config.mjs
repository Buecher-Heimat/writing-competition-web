const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		screens: {
			'2xl': { 'max': '1535px' },
			// => @media (max-width: 1535px) { ... }

			'xl': { 'max': '1279px' },
			// => @media (max-width: 1279px) { ... }

			'lg': { 'max': '1023px' },
			// => @media (max-width: 1023px) { ... }

			'md': { 'max': '767px' },
			// => @media (max-width: 767px) { ... }

			'sm': { 'max': '639px' },
			// => @media (max-width: 639px) { ... }
		},
		extend: {
			colors: {
				'pearl-bush': {
					'50': '#faf5f2',
					'100': '#eddfd2', // default
					'200': '#e6d2c2',
					'300': '#d6b49b',
					'400': '#c49073',
					'500': '#b87657',
					'600': '#ab634b',
					'700': '#8e5040',
					'800': '#734239',
					'900': '#5e3830',
					'950': '#321c18',
				},
				'bandicoot': {
					'50': '#f4f5f4',
					'100': '#e7e7e4',
					'200': '#d0d0ca',
					'300': '#aeb0a5',
					'400': '#7f8274',// default
					'500': '#686c5d',
					'600': '#505447',
					'700': '#404339',
					'800': '#34362f',
					'900': '#2b2d27',
					'950': '#181915',
				},
				'twine': {
					'50': '#f8f5ee',
					'100': '#ede5d4',
					'200': '#ddcbab',
					'300': '#caa97a',
					'400': '#bf9663', //default
					'500': '#aa7a48',
					'600': '#92613c',
					'700': '#764932',
					'800': '#633f30',
					'900': '#56362d',
					'950': '#311c17',
				}
			},
			fontFamily: {
				sans: ['Noto Sans', ...defaultTheme.fontFamily.sans],
				serif: ['Noto Serif', ...defaultTheme.fontFamily.serif]
			},
			backgroundImage: {
				'schreib-pattern': "url('/images/schreib-pattern.png')",
			}
		},
	},
	plugins: [
		require('@tailwindcss/container-queries')
	],
}
