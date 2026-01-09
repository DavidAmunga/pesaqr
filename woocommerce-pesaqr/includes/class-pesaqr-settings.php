<?php
/**
 * PesaQR Settings Class
 * 
 * Handles admin settings page for configuring M-PESA payment details
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

class WC_PesaQR_Settings {
    
    /**
     * Constructor
     */
    public function __construct() {
        // Add settings tab to WooCommerce
        add_filter('woocommerce_settings_tabs_array', array($this, 'add_settings_tab'), 50);
        
        // Add settings fields
        add_action('woocommerce_settings_tabs_pesaqr', array($this, 'settings_tab_content'));
        
        // Save settings
        add_action('woocommerce_update_options_pesaqr', array($this, 'update_settings'));
        
        // Add admin scripts for conditional field display
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));
    }
    
    /**
     * Add PesaQR tab to WooCommerce settings
     */
    public function add_settings_tab($settings_tabs) {
        $settings_tabs['pesaqr'] = __('PesaQR', 'woocommerce-pesaqr');
        return $settings_tabs;
    }
    
    /**
     * Output settings tab content
     */
    public function settings_tab_content() {
        woocommerce_admin_fields($this->get_settings());
    }
    
    /**
     * Save settings
     */
    public function update_settings() {
        woocommerce_update_options($this->get_settings());
    }
    
    /**
     * Get settings array
     */
    public function get_settings() {
        $settings = array(
            // Section title
            array(
                'name' => __('PesaQR Settings', 'woocommerce-pesaqr'),
                'type' => 'title',
                'desc' => __('Configure M-PESA payment QR code settings. Display QR codes on product pages and/or checkout page.', 'woocommerce-pesaqr'),
                'id'   => 'wcpesaqr_section_title'
            ),
            
            // Enable/Disable
            array(
                'name'    => __('Enable/Disable', 'woocommerce-pesaqr'),
                'type'    => 'checkbox',
                'desc'    => __('Enable M-PESA QR codes', 'woocommerce-pesaqr'),
                'id'      => 'wcpesaqr_enabled',
                'default' => 'yes',
            ),
            
            // Display Location
            array(
                'name'    => __('Display Location', 'woocommerce-pesaqr'),
                'type'    => 'multiselect',
                'desc'    => __('Select where to display the QR code', 'woocommerce-pesaqr'),
                'id'      => 'wcpesaqr_display_location',
                'default' => array('product'),
                'options' => array(
                    'product'  => __('Product Pages', 'woocommerce-pesaqr'),
                    'checkout' => __('Checkout Page', 'woocommerce-pesaqr'),
                ),
                'class'   => 'wc-enhanced-select',
            ),
            
            // QR Code Description Text
            array(
                'name'    => __('QR Code Description', 'woocommerce-pesaqr'),
                'type'    => 'textarea',
                'desc'    => __('Customize the description text shown below the "Pay with M-PESA" heading on checkout', 'woocommerce-pesaqr'),
                'id'      => 'wcpesaqr_description_text',
                'default' => 'Scan the QR code below with your M-PESA app to complete payment',
                'css'     => 'width: 100%; min-height: 60px;',
            ),
            
            // Payment Type
            array(
                'name'    => __('Payment Type', 'woocommerce-pesaqr'),
                'type'    => 'select',
                'desc'    => __('Select the type of M-PESA payment', 'woocommerce-pesaqr'),
                'id'      => 'wcpesaqr_payment_type',
                'default' => 'till',
                'options' => array(
                    'till'    => __('Till Number', 'woocommerce-pesaqr'),
                    'paybill' => __('Paybill', 'woocommerce-pesaqr'),
                    'phone'   => __('Phone Number (Send Money)', 'woocommerce-pesaqr'),
                ),
                'class'   => 'wc-enhanced-select',
            ),
            
            // Till Number
            array(
                'name'              => __('Till Number', 'woocommerce-pesaqr'),
                'type'              => 'text',
                'desc'              => __('Enter your M-PESA Till Number', 'woocommerce-pesaqr'),
                'id'                => 'wcpesaqr_till_number',
                'default'           => '',
                'custom_attributes' => array(
                    'data-payment-type' => 'till',
                ),
                'class'             => 'wcpesaqr-conditional-field',
            ),
            
            // Paybill Number
            array(
                'name'              => __('Paybill Number', 'woocommerce-pesaqr'),
                'type'              => 'text',
                'desc'              => __('Enter your M-PESA Paybill Number', 'woocommerce-pesaqr'),
                'id'                => 'wcpesaqr_paybill_number',
                'default'           => '',
                'custom_attributes' => array(
                    'data-payment-type' => 'paybill',
                ),
                'class'             => 'wcpesaqr-conditional-field',
            ),
            
            // Account Number
            array(
                'name'              => __('Account Number', 'woocommerce-pesaqr'),
                'type'              => 'text',
                'desc'              => __('Enter your M-PESA Paybill Account Number', 'woocommerce-pesaqr'),
                'id'                => 'wcpesaqr_account_number',
                'default'           => '',
                'custom_attributes' => array(
                    'data-payment-type' => 'paybill',
                ),
                'class'             => 'wcpesaqr-conditional-field',
            ),
            
            // Phone Number
            array(
                'name'              => __('Phone Number', 'woocommerce-pesaqr'),
                'type'              => 'text',
                'desc'              => __('Enter the phone number for Send Money payments (e.g., 0712345678)', 'woocommerce-pesaqr'),
                'id'                => 'wcpesaqr_phone_number',
                'default'           => '',
                'custom_attributes' => array(
                    'data-payment-type' => 'phone',
                ),
                'class'             => 'wcpesaqr-conditional-field',
            ),
            
            // QR Code Width
            array(
                'name'    => __('QR Code Width', 'woocommerce-pesaqr'),
                'type'    => 'number',
                'desc'    => __('Width of the QR code in pixels', 'woocommerce-pesaqr'),
                'id'      => 'wcpesaqr_qr_width',
                'default' => '300',
                'custom_attributes' => array(
                    'min'  => '200',
                    'max'  => '600',
                    'step' => '10',
                ),
            ),
            
            // Section end
            array(
                'type' => 'sectionend',
                'id'   => 'wcpesaqr_section_end'
            ),
        );
        
        return apply_filters('wcpesaqr_settings', $settings);
    }
    
    /**
     * Enqueue admin scripts
     */
    public function enqueue_admin_scripts($hook) {
        // Only load on WooCommerce settings page
        if ($hook !== 'woocommerce_page_wc-settings') {
            return;
        }
        
        // Check if we're on the PesaQR tab
        if (!isset($_GET['tab']) || $_GET['tab'] !== 'pesaqr') {
            return;
        }
        
        // Inline script for conditional field display
        ?>
        <script type="text/javascript">
        jQuery(document).ready(function($) {
            // Function to show/hide fields based on payment type
            function togglePaymentFields() {
                var paymentType = $('#wcpesaqr_payment_type').val();
                
                // Hide all conditional fields
                $('.wcpesaqr-conditional-field').closest('tr').hide();
                
                // Show relevant fields
                $('[data-payment-type="' + paymentType + '"]').closest('tr').show();
            }
            
            // Run on page load
            togglePaymentFields();
            
            // Run when payment type changes
            $('#wcpesaqr_payment_type').on('change', function() {
                togglePaymentFields();
            });
        });
        </script>
        <style type="text/css">
        .wcpesaqr-conditional-field {
            transition: opacity 0.3s ease;
        }
        </style>
        <?php
    }
}

