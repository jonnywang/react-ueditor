module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
    },
    extends: ['standard', 'standard-react'],
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
        allowImportExportEverywhere: true,
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: [
        'react',
        'xss',
    ],
    rules: {
        'indent': ['error', 4],
        'quotes': ['error', 'single'],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'linebreak-style': [1, 'unix'],
        'react/display-name': 0,
        'react/prop-types': 0,
        'camelcase': 0,
        'eqeqeq': 0,
        'max-len': ['error', 180],
        'comma-dangle': ['error', 'only-multiline'],
        'space-before-function-paren': ['error', 'never'],
        'no-console': 0,
        'padded-blocks': ['error', {'blocks': 'never', 'classes': 'always'}],
        'spaced-comment': 0,
    },
}
