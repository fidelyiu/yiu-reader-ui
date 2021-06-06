module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        'plugin:vue/vue3-recommended',
        'plugin:vue/vue3-strongly-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 12,
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },
    plugins: [
        'vue',
        '@typescript-eslint',
    ],
    rules: {
        // 属性可换行，或不换行
        'vue/max-attributes-per-line': [
            2,
            {
                'singleline': 5,
                'multiline': {
                    'max': 1,
                    'allowFirstLine': true,
                },
            },
        ],
        // 结尾>不需要换行，0个换行
        'vue/html-closing-bracket-newline': 0,
        // 结尾/>不需要空格
        'vue/html-closing-bracket-spacing': 0,
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
    },
}
