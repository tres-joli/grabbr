import { defineConfig } from 'oxfmt'

export default defineConfig({
  printWidth: 100,
  singleQuote: true,
  semi: false,
  trailingComma: 'none',
  endOfLine: 'lf',
  ignorePatterns: ['node_modules/**/*', 'out', 'dist', 'bun.lock']
})
