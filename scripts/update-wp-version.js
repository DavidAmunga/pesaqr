#!/usr/bin/env node

/**
 * Script to sync WordPress plugin version from package.json
 * Updates both the plugin header and the constant in the main PHP file
 */

const fs = require("fs");
const path = require("path");

const wpPackageJsonPath = path.join(
  __dirname,
  "../woocommerce-pesaqr/package.json"
);
const wpPluginPath = path.join(
  __dirname,
  "../woocommerce-pesaqr/woocommerce-pesaqr.php"
);

try {
  const packageJson = JSON.parse(fs.readFileSync(wpPackageJsonPath, "utf8"));
  const version = packageJson.version;

  if (!version) {
    console.error("No version found in woocommerce-pesaqr/package.json");
    process.exit(1);
  }

  console.log(`Updating WordPress plugin to version ${version}`);

  // Read the plugin file
  let pluginContent = fs.readFileSync(wpPluginPath, "utf8");

  pluginContent = pluginContent.replace(
    /(\* Version:\s+)[\d.]+/,
    `$1${version}`
  );

  pluginContent = pluginContent.replace(
    /(define\('WCPESAQR_VERSION',\s+')[\d.]+('\);)/,
    `$1${version}$2`
  );

  fs.writeFileSync(wpPluginPath, pluginContent, "utf8");

  console.log("WordPress plugin version updated successfully");
} catch (error) {
  console.error("Error updating WordPress plugin version:", error.message);
  process.exit(1);
}
