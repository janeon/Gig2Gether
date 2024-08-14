import flowbitePlugin from 'flowbite/plugin'
import { fontFamily } from "tailwindcss/defaultTheme";
import fa from 'tailwind-fontawesome'


const config = {
	darkMode: ["class"],
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
	safelist: ["dark"],
	plugins: [flowbitePlugin, fa],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
		},
		extend: {
			colors: {
				customBeige: {
					100: 'rgb(240, 221, 210)',  // Lightest shade
					200: 'rgb(233, 209, 192)',  // Lighter shade
					300: 'rgb(226, 197, 174)',  // Light shade
					400: 'rgb(217, 172, 147)',  // Base color
					500: 'rgb(196, 155, 133)',  // Darker shade
					600: 'rgb(176, 138, 120)',  // Even darker shade
					700: 'rgb(156, 122, 107)',  // Darkest shade
				},
				border: "hsl(var(--border) / <alpha-value>)",
				input: "hsl(var(--input) / <alpha-value>)",
				ring: "hsl(var(--ring) / <alpha-value>)",
				background: "hsl(var(--background) / <alpha-value>)",
				foreground: "hsl(var(--foreground) / <alpha-value>)",
				primary: {
					DEFAULT: "hsl(var(--primary) / <alpha-value>)",
					foreground: "hsl(var(--primary-foreground) / <alpha-value>)"
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
					foreground: "hsl(var(--secondary-foreground) / <alpha-value>)"
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
					foreground: "hsl(var(--destructive-foreground) / <alpha-value>)"
				},
				muted: {
					DEFAULT: "hsl(var(--muted) / <alpha-value>)",
					foreground: "hsl(var(--muted-foreground) / <alpha-value>)"
				},
				accent: {
					DEFAULT: "hsl(var(--accent) / <alpha-value>)",
					foreground: "hsl(var(--accent-foreground) / <alpha-value>)"
				},
				popover: {
					DEFAULT: "hsl(var(--popover) / <alpha-value>)",
					foreground: "hsl(var(--popover-foreground) / <alpha-value>)"
				},
				card: {
					DEFAULT: "hsl(var(--card) / <alpha-value>)",
					foreground: "hsl(var(--card-foreground) / <alpha-value>)"
				}
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			fontFamily: {
				sans: [...fontFamily.sans]
			},
			screens: {
				'xs': '250px',  // Custom breakpoint for 350px
				'sm': '300px',  // Custom breakpoint for slightly larger width
			},
		}
	},
};

export default config;
