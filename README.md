<div align="center">
<img src="screenshots/logo.svg" width="200"/>
<h1>PESAQR</h1>
</div>

A lightweight, framework-agnostic library for generating M-PESA Payment QR codes. Built using Web Components, PesaQR works seamlessly with any modern JavaScript framework or vanilla HTML.

## Features

- Generate Payment QR codes for Till Numbers
- Generate Payment QR codes for Paybill Numbers
- Generate Payment QR codes for Phone Numbers (Send Money)
- Framework agnostic - works with React, Vue, Angular, or vanilla JavaScript
- Mobile-responsive
- Offline support

## Installation

```bash
npm install pesaqr
```

## Examples

Check out our example implementations:

- [Angular Example](examples/angular)
- [React Example](examples/react)
- [Vue Example](examples/vue)

## Usage

### Basic HTML

```html
<!-- Import the library -->
<script type="module" src="node_modules/pesaqr/dist/pesaqr.mjs"></script>

<!-- Till Number Payment -->
<pesa-qr type="till" tillNumber="123456" amount="100" width="300"></pesa-qr>

<!-- Paybill Payment -->
<pesa-qr
  type="paybill"
  paybillNumber="888880"
  accountNumber="ACC123"
  amount="100"
  width="300"
></pesa-qr>

<!-- Phone Payment (Send Money) -->
<pesa-qr
  type="phone"
  phoneNumber="0712345678"
  amount="100"
  width="300"
></pesa-qr>
```

### React

```jsx
import "pesaqr";

function App() {
  return <pesa-qr type="till" tillNumber="123456" amount="100" width={300} />;
}
```

### Vue

```html
<template>
  <pesa-qr type="till" :tillNumber="'123456'" :amount="'100'" :width="300" />
</template>

<script>
  import "pesaqr";

  export default {
    name: "App",
  };
</script>
```

### Angular

```typescript
// app.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "pesaqr";

@NgModule({
  // ...
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

// app.component.ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <pesa-qr
      type="till"
      tillNumber="123456"
      amount="100"
      [width]="300"
    ></pesa-qr>
  `,
})
export class AppComponent {}
```

## API Reference

### Properties

| Property      | Type   | Description                                 | Required                 |
| ------------- | ------ | ------------------------------------------- | ------------------------ |
| type          | string | Payment type: "till", "paybill", or "phone" | Yes                      |
| tillNumber    | string | Till number for till payments               | Yes (for type="till")    |
| paybillNumber | string | Paybill number for paybill payments         | Yes (for type="paybill") |
| accountNumber | string | Account number for paybill payments         | Yes (for type="paybill") |
| phoneNumber   | string | Phone number for send money payments        | Yes (for type="phone")   |
| amount        | string | Payment amount                              | Yes                      |
| width         | number | QR code width in pixels                     | No (default: 600)        |

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## WordPress Plugin

PesaQR is also available as a WooCommerce plugin! The WordPress plugin displays M-PESA Payment QR codes on WooCommerce product pages and checkout.

### Installation

1. Download the latest release from [GitHub Releases](https://github.com/DavidAmunga/pesaqr/releases)
2. Go to WordPress Admin → Plugins → Add New → Upload Plugin
3. Upload the `woocommerce-pesaqr-x.x.x.zip` file
4. Activate the plugin
5. Configure your M-PESA details in WooCommerce → Settings → PesaQR

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/DavidAmunga/pesaqr.git
cd pesaqr

# Install dependencies
pnpm install

# Configure WordPress development (optional, for plugin development)
cp .env.example .env
# Edit .env with your local WordPress plugins directory path

# Run development server
pnpm dev
```

### Building

```bash
# Build NPM package
pnpm build

# Build WordPress plugin
pnpm build:wordpress-plugin

# Sync WordPress plugin to local WordPress installation (requires .env setup)
pnpm sync
```

### Release Process

This project uses [changesets](https://github.com/changesets/changesets) for version management with independent versioning:

- **NPM package** (`pesaqr`) - Has its own version and `CHANGELOG.md`
- **WordPress plugin** (`woocommerce-pesaqr`) - Independent version and `woocommerce-pesaqr/CHANGELOG.md`

#### Creating a Release

1. Make your changes and create a changeset:

   ```bash
   pnpm changeset
   # Select which package(s) your changes affect:
   # - pesaqr (NPM package)
   # - woocommerce-pesaqr (WordPress plugin)
   # - or both if the change affects both
   ```

2. Commit and open a Pull Request

3. Once merged, a "Version Packages" PR will be automatically created with updated changelogs

4. Merge the "Version Packages" PR to bump versions

5. Publish releases via manual GitHub Actions workflows:
   - **NPM Release**: Actions → Release NPM Package → Run workflow
   - **WordPress Release**: Actions → Release WordPress Plugin → Run workflow

Each package can be released independently based on its own changelog and version.

For detailed contribution guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our development process and how to submit pull requests.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Author

David Amunga

[![portfolio](https://img.shields.io/badge/my_personal_website-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://davidamunga.com)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/david-amunga)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/davidamunga_)

## Feedback

If you have any feedback or questions, please reach out to me on [Twitter](https://twitter.com/davidamunga_).
