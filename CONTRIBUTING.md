# Contributing to PesaQR

Thank you for your interest in contributing to PesaQR! We welcome contributions from the community.

## Development Setup

1. Fork and clone the repository

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Configure WordPress development environment (optional, for WordPress plugin development):

   ```bash
   cp .env.example .env
   # Edit .env with your local WordPress path
   nano .env
   ```

4. Run the development server:
   ```bash
   pnpm dev
   ```

## Making Changes

### For NPM Package Changes

1. Make your changes to the TypeScript source files in `src/`
2. Test your changes locally:
   ```bash
   pnpm build
   ```
3. Check the examples in `examples/` to ensure compatibility

### For WordPress Plugin Changes

1. Make your changes to the plugin files in `woocommerce-pesaqr/`
2. Build and test the plugin:
   ```bash
   pnpm build:wordpress-plugin
   ```

## Creating a Changeset

We use [changesets](https://github.com/changesets/changesets) to manage versions and changelogs. When you make changes that should be released, you need to create a changeset:

1. Run the changeset command:

   ```bash
   pnpm changeset
   ```

2. Select the package(s) your changes affect:

   - `pesaqr` - for NPM package changes (published to npm)
   - `woocommerce-pesaqr` - for WordPress plugin changes (released as zip)
   - You can select both if your changes affect both packages

3. Select the version bump type:

   - **patch** - Bug fixes, minor improvements (1.0.0 → 1.0.1)
   - **minor** - New features, non-breaking changes (1.0.0 → 1.1.0)
   - **major** - Breaking changes (1.0.0 → 2.0.0)

4. Write a clear description of your changes (this will appear in the changelog)

5. Commit the generated changeset file with your PR:
   ```bash
   git add .changeset/*.md
   git commit -m "Add changeset for feature X"
   ```

### When to Add a Changeset

**Add a changeset for:**

- New features
- Bug fixes
- API changes
- Performance improvements
- Dependency updates that affect functionality

**Skip changesets for:**

- Documentation updates
- Internal refactoring with no external impact
- Development tooling changes
- Test updates

> **Note:** Adding a changeset is optional but recommended. Our CI will comment on PRs without changesets as a reminder, but it won't block your contribution.

## Pull Request Process

1. Create a new branch from `main`:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them with clear commit messages

3. Add a changeset if your changes should be released (see above)

4. Push your branch and open a Pull Request

5. The CI will automatically:

   - Build both NPM and WordPress packages
   - Check if a changeset is present (reminder only, not required)
   - Run any tests

6. Wait for review from maintainers

## Code Style

- Use TypeScript for NPM package code
- Follow existing code formatting conventions
- Keep functions small and focused
- Add comments for complex logic
- Ensure compatibility with React, Vue, Angular, and vanilla JS

## Testing

Before submitting your PR:

1. Build both packages successfully:

   ```bash
   pnpm build
   pnpm build:wordpress
   ```

2. Test with at least one of the examples:

   ```bash
   cd examples/react
   npm install
   npm run dev
   ```

3. Ensure no TypeScript errors:
   ```bash
   pnpm build
   ```

## Release Process (Maintainers Only)

This section is for maintainers who publish releases.

### Releasing Packages

Both packages have independent versioning and changelogs:

- `CHANGELOG.md` - NPM package changelog
- `woocommerce-pesaqr/CHANGELOG.md` - WordPress plugin changelog

#### NPM Package Release

1. Merge PRs with `pesaqr` changesets to `main`
2. The "Version Packages" PR will be automatically created/updated
3. Review the `CHANGELOG.md` changes in the Version Packages PR
4. Merge the "Version Packages" PR
5. Go to Actions → "Release NPM Package" → Run workflow
6. Package will be published to NPM with a GitHub Release

#### WordPress Plugin Release

1. Merge PRs with `woocommerce-pesaqr` changesets to `main`
2. The "Version Packages" PR will update WordPress plugin version
3. Review the `woocommerce-pesaqr/CHANGELOG.md` changes
4. Merge the "Version Packages" PR
5. Go to Actions → "Release WordPress Plugin" → Run workflow
6. Plugin zip will be created and attached to GitHub Release

**Note:** You can release them independently or together. If a change affects both, select both packages in your changeset and release both after merging the Version Packages PR.

## Questions?

Feel free to open an issue for any questions or concerns. We're here to help!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
