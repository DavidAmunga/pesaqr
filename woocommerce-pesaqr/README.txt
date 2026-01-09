=== WooCommerce PesaQR ===
Contributors: davidamunga
Tags: woocommerce, mpesa, payment, qr-code, kenya, till, paybill
Requires at least: 5.8
Tested up to: 6.4
Requires PHP: 7.4
Stable tag: 1.0.0
License: MIT
License URI: https://opensource.org/licenses/MIT

Display M-PESA Payment QR codes on WooCommerce product pages. Supports Till Numbers, Paybill, and Phone Number payments.

== Description ==

WooCommerce PesaQR is a powerful plugin that integrates M-PESA payment QR codes directly into your WooCommerce product pages. This plugin makes it easy for your customers to pay for products by simply scanning a QR code with their M-PESA app.

= Features =

* **Till Number Payments** - Generate QR codes for M-PESA Till Numbers
* **Paybill Payments** - Generate QR codes for M-PESA Paybill with account numbers
* **Phone Number Payments** - Generate QR codes for Send Money transactions
* **Variable Product Support** - Automatically updates QR code when customers select product variations
* **Responsive Design** - QR codes look great on all devices
* **Easy Configuration** - Simple settings page integrated into WooCommerce
* **Framework Agnostic** - Built with Web Components for maximum compatibility
* **No External Dependencies** - All QR code generation happens client-side

= How It Works =

1. Install and activate the plugin
2. Go to WooCommerce > Settings > PesaQR
3. Select your payment type (Till, Paybill, or Phone)
4. Enter your M-PESA payment details
5. QR codes automatically appear on all product pages

The QR code amount is automatically set to the product price and updates dynamically for variable products when customers select different variations.

= Use Cases =

* **E-commerce stores** accepting M-PESA payments
* **Digital product sellers** in Kenya
* **Service providers** wanting quick payment options
* **Retail businesses** with online presence

= Support =

For support, feature requests, or bug reports, please visit [GitHub Repository](https://github.com/DavidAmunga/pesaqr)

== Installation ==

= Automatic Installation =

1. Log in to your WordPress admin panel
2. Navigate to Plugins > Add New
3. Search for "WooCommerce PesaQR"
4. Click "Install Now" and then "Activate"

= Manual Installation =

1. Download the plugin ZIP file
2. Log in to your WordPress admin panel
3. Navigate to Plugins > Add New > Upload Plugin
4. Choose the ZIP file and click "Install Now"
5. Activate the plugin

= Configuration =

1. Navigate to WooCommerce > Settings > PesaQR
2. Enable the plugin by checking "Enable M-PESA QR codes on product pages"
3. Select your payment type:
   - **Till Number**: Enter your M-PESA Till Number
   - **Paybill**: Enter your Paybill Number and Account Number
   - **Phone Number**: Enter the phone number for Send Money payments
4. Optionally adjust the QR code width (default: 300px)
5. Click "Save changes"

== Frequently Asked Questions ==

= Does this plugin process payments? =

No, this plugin only displays QR codes for M-PESA payments. Customers scan the code with their M-PESA app to complete the payment. You'll still need to verify payments manually or use a payment gateway plugin for automatic verification.

= Which payment types are supported? =

The plugin supports:
- Till Numbers
- Paybill with Account Numbers
- Phone Numbers (Send Money)

= Will the QR code update for variable products? =

Yes! When customers select a product variation, the QR code automatically updates to reflect the new price.

= Can I use different payment details for different products? =

Currently, the plugin uses global payment settings for all products. If you need per-product settings, please contact us for a custom solution.

= Does this work with any WordPress theme? =

Yes, the plugin is built with Web Components and works with any WordPress theme that supports WooCommerce.

= What happens if WooCommerce is not installed? =

The plugin will display an admin notice asking you to install and activate WooCommerce first. The plugin requires WooCommerce to function.

= Can I customize the QR code appearance? =

The QR code has a default green M-PESA theme. Advanced customization can be done through CSS. The QR code container has the class `wcpesaqr-container`.

= Is the plugin compatible with caching plugins? =

Yes, the plugin works with caching plugins since the QR code generation happens client-side in the browser.

== Screenshots ==

1. PesaQR settings page in WooCommerce
2. QR code displayed on product page
3. QR code with Till Number payment
4. QR code with Paybill payment
5. Variable product with dynamic QR code updates

== Changelog ==

= 1.0.0 =
* Initial release
* Support for Till Number payments
* Support for Paybill payments
* Support for Phone Number payments
* Variable product support
* Responsive design
* WooCommerce settings integration

== Upgrade Notice ==

= 1.0.0 =
Initial release of WooCommerce PesaQR plugin.

== Additional Info ==

= Credits =

Built by [David Amunga](https://davidamunga.com)

Based on the [PesaQR library](https://github.com/DavidAmunga/pesaqr)

= Privacy =

This plugin does not collect or store any user data. All QR code generation happens client-side in the browser.

= Requirements =

* WordPress 5.8 or higher
* WooCommerce 5.0 or higher
* PHP 7.4 or higher
* Modern browser with Web Components support

= Browser Support =

* Chrome/Edge (latest)
* Firefox (latest)
* Safari (latest)
* Opera (latest)

