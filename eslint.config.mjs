import globals from 'globals'
import pluginJs from '@eslint/js'
import prettier from 'eslint-plugin-prettier' // Import du plugin Prettier
import prettierConfig from 'eslint-config-prettier' // Import du config Prettier

export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended, // Configuration ESLint de base
  prettierConfig, // Désactive les règles conflictuelles ESLint avec Prettier
  {
    plugins: { prettier }, // Ajout du plugin Prettier
    rules: {
      'prettier/prettier': 'error', // Exécuter Prettier comme règle ESLint
    },
  },
]
