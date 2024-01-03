const StyleDictionary = require('style-dictionary');

StyleDictionary.registerTransform({
	type: 'value',
	transitive: true,
	name: 'next/font-variable',
	matcher: ({ type, variable }) => type === 'fontFamilies' && !!variable,
	transformer: ({ variable }) => `var(${variable})`,
});

const dropShadowToString = ({ x, y, blur, spread, color }) => {
	return `${x}px ${y}px ${blur}px ${spread}px ${color}`;
};

StyleDictionary.registerTransform({
	type: 'value',
	transitive: true,
	name: 'stylesheet/box-shadow',
	matcher: ({ value, type }) => {
		if (value && type === 'boxShadow') return true;
		return false;
	},
	transformer: ({ value }) => {
		if (Array.isArray(value)) {
			return value.map(dropShadowToString).join(', ');
		}

		return dropShadowToString(value);
	},
});

module.exports = {
	groups: {
		// Can add more groups here
		'stylesheet': [
			'stylesheet/box-shadow'
		]
	},
};
