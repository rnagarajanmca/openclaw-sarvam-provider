# Publishing Guide for OpenClaw Sarvam Provider

## Preparation Steps

### 1. Prerequisites

Make sure you have:
- Node.js ≥22.16.0 installed
- npm account ([sign up here](https://www.npmjs.com/signup))
- Git repository initialized

### 2. Initialize Git Repository

```bash
cd openclaw-sarvam-provider
git init
git add .
git commit -m "Initial commit: Sarvam provider for OpenClaw"
```

### 3. Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `openclaw-sarvam-provider`
3. Follow the instructions to push your local repository

```bash
git remote add origin https://github.com/your-username/openclaw-sarvam-provider.git
git branch -M main
git push -u origin main
```

### 4. Update Package Information

Edit `package.json` to replace placeholder values:

```json
{
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/your-username/openclaw-sarvam-provider.git"
  }
}
```

Update the repository URLs in `README.md` and other files accordingly.

## Building the Package

### Install Dependencies

```bash
npm install
```

### Build the Project

```bash
npm run build
```

This will compile TypeScript files and output them to the `dist/` directory.

### Verify Build

Check that the `dist/` directory contains the compiled files:

```bash
ls -la dist/
```

You should see:
- `index.js`
- `index.d.ts`
- `sarvam-provider.js`
- `sarvam-provider.d.ts`

## Testing

### Run Unit Tests

```bash
npm test
```

### Run Integration Tests (Requires API Key)

```bash
export SARVAM_API_KEY="your-actual-api-key"
npm test
```

### Check Code Quality

```bash
# Format code
npm run format

# Check linting (if ESLint is configured)
npm run lint
```

## Publishing to npm

### 1. Login to npm

```bash
npm login
```

Enter your npm credentials when prompted.

### 2. Check Package Name Availability

```bash
npm view openclaw-sarvam-provider
```

If you get a 404 error, the name is available. If it exists, you need to choose a different name.

### 3. Create .npmignore (Optional)

Create a `.npmignore` file to exclude unnecessary files from the package:

```
# Test files
test/
*.test.ts
*.spec.ts

# Documentation (optional - you may want to include these)
EXAMPLES.md
INSTALL.md
PUBLISH.md

# Development files
.git/
.github/
.gitignore
.prettierrc
vitest.config.ts

# Build artifacts
*.tsbuildinfo
coverage/

# IDE files
.vscode/
.idea/
```

### 4. Dry Run (Recommended)

Test the packaging without actually publishing:

```bash
npm pack --dry-run
```

This will show you what files will be included in the package.

### 5. Create Package Tarball (Optional)

Create a tarball to test locally:

```bash
npm pack
```

This creates a `.tgz` file that you can test with:

```bash
npm install -g ./openclaw-sarvam-provider-1.0.0.tgz
```

### 6. Publish to npm

#### First Publication

```bash
npm publish
```

#### Publication with Public Access

If you want to make the package publicly accessible:

```bash
npm publish --access public
```

#### Tagged Release

For beta or other tagged releases:

```bash
npm publish --tag beta
```

### 7. Verify Publication

After publishing, verify it's available:

```bash
npm view openclaw-sarvam-provider
```

Or check on [npmjs.com](https://www.npmjs.com/package/openclaw-sarvam-provider).

## Version Management

### Semantic Versioning

Follow semantic versioning (semver):

- **Major version** (X.0.0): Breaking changes
- **Minor version** (0.X.0): New features, backward compatible
- **Patch version** (0.0.X): Bug fixes, backward compatible

### Update Version

```bash
# Patch version
npm version patch

# Minor version
npm version minor

# Major version
npm version major
```

### Publish New Version

After updating the version:

```bash
npm run build
npm publish
git tag -a v1.0.1 -m "Version 1.0.1"
git push origin main --tags
```

## GitHub Integration

### Create Release on GitHub

1. Go to your GitHub repository
2. Click "Releases" → "Create a new release"
3. Tag version: `v1.0.0`
4. Release title: "Version 1.0.0"
5. Description: Add release notes
6. Publish release

### Add GitHub Actions (Optional)

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 22
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Add `NPM_TOKEN` as a secret in your GitHub repository settings.

## Post-Publishing Tasks

### 1. Update Documentation

- Update README with installation instructions
- Add examples in EXAMPLES.md
- Update CHANGELOG if you have one

### 2. Announce Release

- Create GitHub release notes
- Share on relevant communities:
  - OpenClaw Discord
  - Sarvam community
  - Your social media
  - Developer forums

### 3. Monitor Issues

- Set up GitHub issues
- Respond to user questions
- Track bug reports and feature requests

## Troubleshooting

### Publishing Errors

**Error: "You must provide an email address"**
```bash
npm config set init.author.email "your.email@example.com"
npm config set init.author.name "Your Name"
```

**Error: "404 Not Found"**
Check package name availability and spelling.

**Error: "403 Forbidden"**
- Check your npm authentication
- Verify you have publish permissions
- Check if package name is already taken

### Build Errors

**TypeScript errors:**
```bash
# Clean build artifacts
rm -rf dist/

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

**Dependency issues:**
```bash
npm audit fix
npm update
```

## Best Practices

### Before Publishing

1. **Test thoroughly**
   - Run all tests
   - Test with real OpenClaw installation
   - Verify all features work

2. **Review documentation**
   - Check README accuracy
   - Verify examples work
   - Ensure installation instructions are clear

3. **Check license compliance**
   - Verify license file is present
   - Check third-party licenses

4. **Security scan**
   ```bash
   npm audit
   ```

### After Publishing

1. **Monitor usage**
   - Check npm download stats
   - Track GitHub stars
   - Monitor issues

2. **Maintain compatibility**
   - Test with new OpenClaw versions
   - Keep dependencies updated
   - Follow semver for breaking changes

3. **Community engagement**
   - Respond to issues promptly
   - Accept contributions
   - Keep documentation updated

## Next Steps

After successfully publishing:

1. Share your package with the OpenClaw community
2. Encourage users to provide feedback
3. Iterate based on user feedback
4. Consider adding more features
5. Write blog posts or tutorials

---

**Congratulations on publishing your OpenClaw Sarvam Provider!** 🎉

For questions or issues, please refer to the main [README.md](README.md) or open an issue on GitHub.