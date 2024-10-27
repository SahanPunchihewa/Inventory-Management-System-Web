/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "node_modules/preline/dist/*.js"],
	theme: {
		extend: {
			colors: {
				"primary-sky-blue": "#374151",
				"secondary-sky-blue": "#06b6d4",
				"pop-up-colour": "#f8fafc",
			},
		},
	},
	plugins: [require("preline/plugin")],
};
