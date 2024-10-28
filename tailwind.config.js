/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "node_modules/preline/dist/*.js"],
	theme: {
		extend: {
			colors: {
				"primary-color": "#475569",
				"pop-up-colour": "#f8fafc",
			},
		},
	},
	plugins: [require("preline/plugin")],
};
