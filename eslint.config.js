import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import figmaPlugin from '@figma/eslint-plugin-figma-plugins';

const rootDir = dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: rootDir,
      },
    },
    plugins: {
      '@figma/figma-plugins': figmaPlugin,
    },
    rules: {
      ...figmaPlugin.configs.recommended.rules,
      // allow underscore-prefixing of unused variables
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      // The plugin (es2017 target) intentionally uses `any` against the Figma
      // API surface; keep that pragmatic rather than fighting the type system.
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    // Plugin code runs in Figma's older JS engine and uses a var/function
    // style on purpose; don't fight it here.
    files: ['figma-plugin/**/*.ts'],
    rules: {
      'no-var': 'off',
      'prefer-const': 'off',
    },
  },
  {
    ignores: ['dist', 'figma-plugin/code.js', 'eslint.config.js', 'test'],
  },
);
