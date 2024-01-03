const { fileHeader } = require('style-dictionary/lib/common/formatHelpers');
const StyleDictionary = require('style-dictionary');

function jsonFlat({ dictionary, prefix }) {
	return `{\n${dictionary.allTokens
		.map((token) => {
			return `  "${prefix || ''}${token.name}": ${JSON.stringify(token.value)}`;
		})
		.join(',\n')}\n}`;
}

StyleDictionary.registerFormat({
	name: 'custom/typescript',
	formatter({ dictionary, options, file }) {
		const variableName = options?.variableName || 'variables';

		return `${fileHeader({ file })}export const ${variableName} = ${jsonFlat({
			dictionary,
			prefix: '--',
		})} as const;`;
	},
});
