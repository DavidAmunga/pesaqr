<?php
/**
 * Plugin Name: WooCommerce PesaQR
 * Plugin URI: https://github.com/DavidAmunga/pesaqr
 * Description: Display M-PESA Payment QR codes on WooCommerce product pages. Supports Till Numbers, Paybill, and Phone Number payments.
 * Version: 1.0.0
 * Author: David Amunga
 * Author URI: https://davidamunga.com
 * License: MIT
 * Text Domain: woocommerce-pesaqr
 * Domain Path: /languages
 * Requires at least: 5.8
 * Requires PHP: 7.4
 * WC requires at least: 5.0
 * WC tested up to: 8.5
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('WCPESAQR_VERSION', '1.0.0');
define('WCPESAQR_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('WCPESAQR_PLUGIN_URL', plugin_dir_url(__FILE__));
define('WCPESAQR_PLUGIN_BASENAME', plugin_basename(__FILE__));

/**
 * Main WooCommerce PesaQR Class
 */
class WC_PesaQR {
    
    /**
     * Single instance of the class
     */
    private static $instance = null;
    
    /**
     * Get single instance
     */
    public static function get_instance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    /**
     * Constructor
     */
    private function __construct() {
        // Check if WooCommerce is active
        add_action('plugins_loaded', array($this, 'init'));
        
        // Activation/Deactivation hooks
        register_activation_hook(__FILE__, array($this, 'activate'));
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));
    }
    
    /**
     * Initialize the plugin
     */
    public function init() {
        // Check if WooCommerce is active
        if (!$this->is_woocommerce_active()) {
            add_action('admin_notices', array($this, 'woocommerce_missing_notice'));
            return;
        }
        
        // Load plugin files
        $this->load_dependencies();
        
        // Initialize settings
        if (is_admin()) {
            new WC_PesaQR_Settings();
        }
        
        // Initialize frontend
        new WC_PesaQR_Frontend();
        
        // Add settings link on plugin page
        add_filter('plugin_action_links_' . WCPESAQR_PLUGIN_BASENAME, array($this, 'add_settings_link'));
    }
    
    /**
     * Load plugin dependencies
     */
    private function load_dependencies() {
        require_once WCPESAQR_PLUGIN_DIR . 'includes/class-pesaqr-settings.php';
        require_once WCPESAQR_PLUGIN_DIR . 'includes/class-pesaqr-frontend.php';
    }
    
    /**
     * Check if WooCommerce is active
     */
    private function is_woocommerce_active() {
        return class_exists('WooCommerce');
    }
    
    /**
     * WooCommerce missing notice
     */
    public function woocommerce_missing_notice() {
        ?>
        <div class="notice notice-error">
            <p>
                <?php 
                echo wp_kses_post(
                    sprintf(
                        __('<strong>WooCommerce PesaQR</strong> requires WooCommerce to be installed and activated. Please install <a href="%s">WooCommerce</a> first.', 'woocommerce-pesaqr'),
                        admin_url('plugin-install.php?s=woocommerce&tab=search&type=term')
                    )
                );
                ?>
            </p>
        </div>
        <?php
    }
    
    /**
     * Add settings link to plugin page
     */
    public function add_settings_link($links) {
        $settings_link = '<a href="' . admin_url('admin.php?page=wc-settings&tab=pesaqr') . '">' . __('Settings', 'woocommerce-pesaqr') . '</a>';
        array_unshift($links, $settings_link);
        return $links;
    }
    
    /**
     * Plugin activation
     */
    public function activate() {
        // Set default options
        $default_options = array(
            'enabled' => 'yes',
            'display_location' => array('product'),
            'checkout_placement' => 'after_order_review',
            'payment_type' => 'till',
            'till_number' => '',
            'paybill_number' => '',
            'account_number' => '',
            'phone_number' => '',
            'qr_width' => '300',
        );
        
        foreach ($default_options as $key => $value) {
            $option_name = 'wcpesaqr_' . $key;
            if (get_option($option_name) === false) {
                add_option($option_name, $value);
            }
        }
    }
    
    /**
     * Plugin deactivation
     */
    public function deactivate() {
        // Cleanup if needed
    }
}

/**
 * Initialize the plugin
 */
function wc_pesaqr_init() {
    return WC_PesaQR::get_instance();
}

// Start the plugin
wc_pesaqr_init();

