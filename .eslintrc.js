module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ['plugin:vue/essential', '@vue/prettier'],
	parserOptions: {
		parser: 'babel-eslint',
	},
	rules: {
		// allow async-await
		'generator-star-spacing': 'off',
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-var': "error",
		'indent': [
			'error',
			'tab',
			{ 'SwitchCase': 0 },
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'no-console': [
			process.env.NODE_ENV === 'production' ? 'error' : 'off',
			{ allow: ['warn', 'error', 'info'] }
		],
		'brace-style': [
			'error',
			'1tbs',
			{ 'allowSingleLine': true }
		],
		'no-unused-vars': [
			process.env.NODE_ENV === 'production' ? 'warn' : 'off',
			{
				'vars': 'all',
				'args': 'after-used',
				'ignoreRestSiblings': false
			}
		],
		'no-mixed-spaces-and-tabs': [
			'error',
			'smart-tabs'
		],
		"prettier/prettier": [
			"warn",
			{
				trailingComma: "all",
				semi: true,
				singleQuote: true,
				useTabs: true,
				eslintIntegration: true,
				printWidth: 120,
				bracketSpacing: true,
				htmlWhitespaceSensitivity: "ignore"
			}
		]
	},
	"globals": {
			"API": true,
			"axios": true
	}
}
