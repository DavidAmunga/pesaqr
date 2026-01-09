# CI/CD Pipeline Setup Complete! 🎉

Your release pipeline has been successfully configured with changesets, automated version management, and manual release workflows.

## What Was Implemented

### ✅ Changesets Configuration

- Installed `@changesets/cli` package
- Configured for independent versioning (NPM and WordPress can have different versions)
- Both packages generate their own changelogs:
  - `CHANGELOG.md` for NPM package
  - `woocommerce-pesaqr/CHANGELOG.md` for WordPress plugin

### ✅ Package Structure

- Added workspace configuration for WordPress plugin
- Created `woocommerce-pesaqr/package.json` for version tracking
- Added changeset scripts to root `package.json`

### ✅ Version Sync Script

- Created `scripts/update-wp-version.js` to sync WordPress plugin header versions
- Automatically runs when changesets bump versions

### ✅ GitHub Workflows

1. **CI Workflow** (`.github/workflows/ci.yml`)

   - Runs on every PR and push to main
   - Builds both NPM package and WordPress plugin
   - Optional changeset check (comments on PRs without changesets)

2. **Release Workflow** (`.github/workflows/release.yml`)

   - Runs on push to main
   - Automatically creates/updates "Version Packages" PR
   - Bumps versions in both packages when changesets exist

3. **NPM Release Workflow** (`.github/workflows/release-npm.yml`)

   - Manual workflow dispatch only
   - Builds and publishes to NPM
   - Creates git tag (e.g., `pesaqr@1.0.4`)
   - Creates GitHub Release with changelog

4. **WordPress Release Workflow** (`.github/workflows/release-wordpress.yml`)
   - Manual workflow dispatch only
   - Builds WordPress plugin and creates zip
   - Creates git tag (e.g., `wordpress@1.0.1`)
   - Creates GitHub Release with zip file attached

### ✅ Documentation

- Created `CONTRIBUTING.md` with development and changeset guidelines
- Updated `README.md` with release process and WordPress plugin info

### ✅ Environment Configuration

- Created `.env.example` for local development paths
- Updated development scripts to use environment variables
- Added `.env` to `.gitignore` to prevent leaking local paths

## Required Setup Steps

### 1. Configure Local Development Environment (Optional)

If you're developing the WordPress plugin locally, set up your environment:

```bash
# Copy the example file
cp .env.example .env

# Edit with your local WordPress path
nano .env
```

Update the `WP_PLUGINS_DIR` variable with your local WordPress plugins directory path.

### 2. Configure NPM Token (Required for NPM releases)

1. Go to https://www.npmjs.com/settings/YOUR_USERNAME/tokens
2. Create a new **Automation** or **Publish** token
3. Go to your GitHub repository → Settings → Secrets and variables → Actions
4. Click "New repository secret"
5. Name: `NPM_TOKEN`
6. Value: Paste your NPM token
7. Click "Add secret"

### 3. Verify Package.json Settings

Make sure your `package.json` has the correct settings:

```json
{
  "name": "pesaqr",
  "access": "public" // If publishing as public package
}
```

### 4. Test the Pipeline

#### Test CI Workflow

```bash
# Create a test branch
git checkout -b test/ci-pipeline

# Make a small change
echo "# Test" >> test.md

# Create a changeset
pnpm changeset
# Select: patch
# Select packages: pesaqr
# Description: "Test changeset"

# Commit and push
git add .
git commit -m "test: CI pipeline"
git push origin test/ci-pipeline

# Create a PR on GitHub to see CI in action
```

## How to Use the Pipeline

### For Contributors

1. Make code changes
2. (Optional) Add a changeset:
   ```bash
   pnpm changeset
   # Select which package(s) are affected:
   # - pesaqr (NPM package)
   # - woocommerce-pesaqr (WordPress plugin)
   # - both (if changes affect both)
   ```
3. Commit and open a PR
4. CI will validate your build

### For Maintainers - Releasing

#### NPM Package Release

1. Merge PRs with changesets to `main`
2. Wait for "Version Packages" PR to be created automatically
3. Review and merge the "Version Packages" PR
4. Go to **Actions** → **Release NPM Package** → **Run workflow**
5. Package published to NPM + GitHub Release created!

#### WordPress Plugin Release

1. Merge PRs with WordPress changesets to `main`
2. Merge the "Version Packages" PR
3. Go to **Actions** → **Release WordPress Plugin** → **Run workflow**
4. Plugin zip created and attached to GitHub Release!

## Workflow Architecture

```
Pull Request
    ↓
CI Workflow (Build & Test)
    ↓
Merge to main
    ↓
Release Workflow (Create/Update Version PR)
    ↓
Merge Version PR
    ↓
Manual Workflow Dispatch
    ↓
    ├── NPM Release → Publish to NPM + GitHub Release
    └── WordPress Release → Create Zip + GitHub Release
```

## Local Development Scripts

With the `.env` file configured, you can use these commands:

```bash
# Sync WordPress plugin to local WordPress (requires .env)
pnpm sync
# or: ./sync-to-wp.sh

# Watch for changes and auto-sync (requires fswatch)
pnpm watch
# or: ./watch-and-sync.sh

# Full development mode (build + sync + watch)
pnpm dev:wp
# or: ./dev.sh
```

## Troubleshooting

### "Version Packages" PR not created

- Check that changesets exist in `.changeset/` directory
- Ensure GitHub Actions has write permissions (Settings → Actions → General)

### NPM publish fails

- Verify `NPM_TOKEN` secret is set correctly
- Check package name isn't taken on NPM registry
- Ensure version in `package.json` is bumped

### WordPress zip missing files

- Check the `zip` command in `release-wordpress.yml`
- Verify all required files exist in `woocommerce-pesaqr/` directory

### Sync scripts not working

- Ensure `.env` file exists and is configured
- Check that `WP_PLUGINS_DIR` path is correct
- Verify WordPress directory is accessible

## Next Steps

1. Set up `.env` file for local development (optional)
2. Set up `NPM_TOKEN` secret (required for releases)
3. Test the CI workflow with a test PR
4. Create your first changeset
5. Merge a "Version Packages" PR
6. Run your first manual release!

## Support

- See [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines
- See [README.md](../README.md) for usage documentation
- Open an issue if you encounter problems

---

**Happy Shipping ! **
