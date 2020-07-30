module.exports = {
	purge: [],
	theme: {
		fontFamily: {
			display: ['Karrik-Regular', 'sans-serif'],
			body: ['Karrik-Regular', 'sans-serif'],
		},
		colors: {
			orange: '#E85A0B',
			white: '#FFFFFF',
		},
		extend: {
			opacity: {
				'60': '0.60',
			},

			fontWeight: {
				extra: 550,
			},
			animation: {
				'spin-slow': 'spin 12s linear infinite',
			},
		},
	},
	variants: {},
	plugins: [],
};
