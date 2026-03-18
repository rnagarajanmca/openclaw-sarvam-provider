# Package Manager Support

This package supports multiple package managers for both installation and development.

## Installation

Choose your preferred package manager:

```bash
# npm
npm install -g openclaw-sarvam-provider

# pnpm
pnpm add -g openclaw-sarvam-provider

# bun
bun add -g openclaw-sarvam-provider

# yarn
yarn global add openclaw-sarvam-provider
```

## Development

### Using npm
```bash
npm install
npm run build
npm test
```

### Using pnpm (Recommended for development)
```bash
pnpm install
pnpm build
pnpm test
```

### Using bun
```bash
bun install
bun run build
bun test
```

### Using yarn
```bash
yarn install
yarn build
yarn test
```

## Available Scripts

- `npm run build` - Build the project
- `npm run dev` - Watch mode for development
- `npm test` - Run tests
- `npm run format` - Format code with Prettier
- `npm run lint` - Lint code with ESLint

## Configuration Files

- `.npmrc` - npm configuration
- `.pnpmrc` - pnpm configuration
- `bunfig.toml` - bun configuration
- `.yarnrc.yml` - yarn configuration

## Note

All package managers install the same package functionality. The choice is based on your personal preference and development workflow.
