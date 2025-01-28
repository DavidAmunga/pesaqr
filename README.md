<div align="center">
<img src="screenshots/logo.svg" width="200"/>
<h1>PESAQR</h1>
</div>

A lightweight, framework-agnostic library for generating M-PESA Payment QR codes. Built using Web Components, PesaQR works seamlessly with any modern JavaScript framework or vanilla HTML.

## Features

- 🎯 Generate Payment QR codes for Till Numbers
- 💳 Generate Payment QR codes for Paybill Numbers
- 📱 Generate Payment QR codes for Phone Numbers (Send Money)
- 🔌 Framework agnostic - works with React, Vue, Angular, or vanilla JavaScript
- 📱 Mobile-responsive
- 🔒 Offline support

## Installation

```bash
npm install pesaqr
```

## Usage

### Basic HTML

```html
<!-- Import the library -->
<script
  type="module"
  src="node_modules/pesaqr/dist/pesaqr.mjs"
></script>

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
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import 'pesaqr';

@NgModule({
  // ...
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

// component template
<pesa-qr
  type="till"
  tillNumber="123456"
  amount="100"
  [width]="300"
></pesa-qr>
```

## API Reference

### Properties

| Property      | Type    | Description                                 | Required                 |
| ------------- | ------- | ------------------------------------------- | ------------------------ |
| type          | string  | Payment type: "till", "paybill", or "phone" | Yes                      |
| tillNumber    | string  | Till number for till payments               | Yes (for type="till")    |
| paybillNumber | string  | Paybill number for paybill payments         | Yes (for type="paybill") |
| accountNumber | string  | Account number for paybill payments         | Yes (for type="paybill") |
| phoneNumber   | string  | Phone number for send money payments        | Yes (for type="phone")   |
| amount        | string  | Payment amount                              | Yes                      |
| width         | number  | QR code width in pixels                     | No (default: 600)        |



## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Author

David Amunga

[![portfolio](https://img.shields.io/badge/my_personal_website-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://davidamunga.com)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/david-amunga)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/davidamunga_)

## Feedback

If you have any feedback or questions, please reach out to me on [Twitter](https://twitter.com/davidamunga_).
