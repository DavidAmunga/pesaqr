# Independent Changelog Guide

## Overview

Both packages now have **independent versioning** with **separate changelogs**:

```
pesaqr-lib/
├── CHANGELOG.md                           # NPM package changelog
└── woocommerce-pesaqr/
    └── CHANGELOG.md                       # WordPress plugin changelog
```

## How It Works

### Creating Changesets

When you run `pnpm changeset`, you'll be asked which packages your change affects:

```bash
$ pnpm changeset

🦋  Which packages would you like to include?
◯ pesaqr                    # NPM package
◯ woocommerce-pesaqr        # WordPress plugin
```

**Select one or both** depending on what your changes affect:

| Your Change            | Select                    | Example                                     |
| ---------------------- | ------------------------- | ------------------------------------------- |
| TypeScript core logic  | `pesaqr` only             | Fixed QR code generation bug                |
| WordPress plugin PHP   | `woocommerce-pesaqr` only | Added WooCommerce settings page             |
| Both affect each other | Both packages             | Updated API that affects plugin integration |

### Example Scenarios

#### Scenario 1: NPM Package Bug Fix

You fixed a bug in the QR code generation logic:

```bash
pnpm changeset
# Select: pesaqr
# Type: patch
# Description: "Fix QR code rendering on Safari"
```

**Result after merge:**

- `CHANGELOG.md` updated with fix
- NPM version bumped (e.g., 1.0.3 → 1.0.4)
- WordPress version unchanged

#### Scenario 2: WordPress Plugin Feature

You added a new settings page in the WordPress plugin:

```bash
pnpm changeset
# Select: woocommerce-pesaqr
# Type: minor
# Description: "Add customizable QR code colors in settings"
```

**Result after merge:**

- `woocommerce-pesaqr/CHANGELOG.md` updated
- WordPress version bumped (e.g., 1.0.0 → 1.1.0)
- NPM version unchanged

#### Scenario 3: Changes Affect Both

You updated the web component API that requires WordPress plugin changes:

```bash
pnpm changeset
# Select: BOTH pesaqr AND woocommerce-pesaqr
# Type: minor
# Description: "Add support for custom QR code styling"
```

**Result after merge:**

- Both `CHANGELOG.md` files updated
- Both versions bumped independently
- Can release both together or separately

## Version Packages PR

After merging PRs with changesets, the automated "Version Packages" PR will update:

1. **NPM Package**

   - `package.json` version
   - `CHANGELOG.md` with new entry

2. **WordPress Plugin**
   - `woocommerce-pesaqr/package.json` version
   - `woocommerce-pesaqr/woocommerce-pesaqr.php` header version
   - `woocommerce-pesaqr/CHANGELOG.md` with new entry

## Releasing

### Release NPM Package

```bash
# After merging "Version Packages" PR
# Go to: Actions → Release NPM Package → Run workflow
```

The workflow will:

1. Read version from `package.json`
2. Publish to NPM
3. Extract changelog from `CHANGELOG.md`
4. Create GitHub Release with tag `pesaqr@x.y.z`

### Release WordPress Plugin

```bash
# After merging "Version Packages" PR
# Go to: Actions → Release WordPress Plugin → Run workflow
```

The workflow will:

1. Read version from `woocommerce-pesaqr/package.json`
2. Build plugin and create zip
3. Extract changelog from `woocommerce-pesaqr/CHANGELOG.md`
4. Create GitHub Release with tag `wordpress@x.y.z` and zip attachment

## Benefits

**Independent Versions**: WordPress can be v2.0.0 while NPM is v1.5.3

**Separate Changelogs**: Users see only relevant changes for their platform

**Flexible Releases**: Release one without releasing the other

**Clear History**: Each package has its own version history

## Example Timeline

```
Day 1: Fix NPM bug
  → changeset: pesaqr (patch)
  → Version PR: pesaqr 1.0.3 → 1.0.4
  → Release: npm package v1.0.4

Day 3: Add WordPress feature
  → changeset: woocommerce-pesaqr (minor)
  → Version PR: WordPress 1.0.0 → 1.1.0
  → Release: WordPress plugin v1.1.0

Day 5: Breaking change to both
  → changeset: both (major)
  → Version PR:
      pesaqr 1.0.4 → 2.0.0
      WordPress 1.1.0 → 2.0.0
  → Release: Both v2.0.0
```

## Tips

1. **Be specific in changeset descriptions** - they appear in changelogs
2. **Use semantic versioning** correctly:
   - patch: bug fixes (1.0.0 → 1.0.1)
   - minor: new features (1.0.0 → 1.1.0)
   - major: breaking changes (1.0.0 → 2.0.0)
3. **Review Version PRs** carefully - check both changelogs
4. **Release independently** when possible to give users flexibility

---

For more details, see [CONTRIBUTING.md](../CONTRIBUTING.md)
