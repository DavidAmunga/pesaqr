<?php
/**
 * PesaQR Frontend Class
 * 
 * Handles frontend display of M-PESA QR codes on product pages
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

class WC_PesaQR_Frontend {
    
    /**
     * Constructor
     */
    public function __construct() {
        // Enqueue scripts
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        
        // Add module type to script tags
        add_filter('script_loader_tag', array($this, 'add_module_type'), 10, 3);
        
        // Get display locations
        $display_locations = get_option('wcpesaqr_display_location', array('product'));
        
        // Handle both string and array formats
        if (!is_array($display_locations)) {
            if (is_string($display_locations)) {
                $display_locations = array($display_locations);
            } else {
                $display_locations = array('product');
            }
        }
        
        // Display QR code on product page
        if (in_array('product', $display_locations)) {
            add_action('woocommerce_after_add_to_cart_button', array($this, 'display_product_qr_code'));
        }
        
        // Display QR code on checkout page
        if (in_array('checkout', $display_locations)) {
            // Add QR code via WooCommerce hooks based on placement setting
            $this->add_checkout_hooks();
            
            // Add fallback to ensure QR code shows even if hooks don't fire
            add_action('wp_footer', array($this, 'fallback_display_checkout_qr'), 10);
        }
    }
    
    /**
     * Enqueue scripts and styles
     */
    public function enqueue_scripts() {
        // Get display locations
        $display_locations = get_option('wcpesaqr_display_location', array('product'));
        
        // Handle both string and array formats
        if (!is_array($display_locations)) {
            if (is_string($display_locations)) {
                $display_locations = array($display_locations);
            } else {
                $display_locations = array('product');
            }
        }
        
        // Check if we should load on current page
        $should_load = false;
        if (in_array('product', $display_locations) && is_product()) {
            $should_load = true;
        }
        if (in_array('checkout', $display_locations) && is_checkout()) {
            $should_load = true;
        }
        
        if (!$should_load) {
            return;
        }
        
        // Check if PesaQR is enabled
        if (get_option('wcpesaqr_enabled') !== 'yes') {
            return;
        }
        
        // Make sure jQuery is loaded for repositioning script
        wp_enqueue_script('jquery');
        
        // Enqueue PesaQR library as a module
        wp_enqueue_script(
            'pesaqr-lib',
            WCPESAQR_PLUGIN_URL . 'assets/js/pesaqr.js',
            array(),
            WCPESAQR_VERSION,
            true
        );
        
        // Enqueue variable product handler (only on product pages)
        // TODO: Create variation-handler.js for variable products
        if (is_product() && file_exists(WCPESAQR_PLUGIN_DIR . 'assets/js/variation-handler.js')) {
            wp_enqueue_script(
                'pesaqr-variation-handler',
                WCPESAQR_PLUGIN_URL . 'assets/js/variation-handler.js',
                array('jquery'),
                WCPESAQR_VERSION,
                true
            );
        }
        
        // Add custom inline styles
        wp_enqueue_style('pesaqr-inline-styles', false);
        wp_add_inline_style('pesaqr-inline-styles', $this->get_custom_styles());
    }
    
    /**
     * Add type="module" to the PesaQR script tag
     */
    public function add_module_type($tag, $handle, $src) {
        // Add module type only to pesaqr-lib script
        if ('pesaqr-lib' === $handle) {
            $tag = '<script type="module" src="' . esc_url($src) . '" id="' . esc_attr($handle) . '-js"></script>';
        }
        return $tag;
    }
    
    /**
     * Add checkout page hooks - fixed to display after payment methods
     */
    private function add_checkout_hooks() {
        // Fixed placement: After Payment Methods
        add_action('woocommerce_review_order_after_payment', array($this, 'display_checkout_qr_code'), 10);
    }
    
    /**
     * Display QR code on product page
     */
    public function display_product_qr_code() {
        // Check if PesaQR is enabled
        if (get_option('wcpesaqr_enabled') !== 'yes') {
            return;
        }
        
        global $product;
        
        // Get settings
        $payment_type     = get_option('wcpesaqr_payment_type', 'till');
        $till_number      = get_option('wcpesaqr_till_number', '');
        $paybill_number   = get_option('wcpesaqr_paybill_number', '');
        $account_number   = get_option('wcpesaqr_account_number', '');
        $phone_number     = get_option('wcpesaqr_phone_number', '');
        $qr_width         = get_option('wcpesaqr_qr_width', '300');
        
        // Validate required fields based on payment type
        $is_valid = false;
        switch ($payment_type) {
            case 'till':
                $is_valid = !empty($till_number);
                break;
            case 'paybill':
                $is_valid = !empty($paybill_number) && !empty($account_number);
                break;
            case 'phone':
                $is_valid = !empty($phone_number);
                break;
        }
        
        if (!$is_valid) {
            return;
        }
        
        // Get product price
        $price = $product->get_price();
        
        // For variable products, we'll update via JavaScript
        $is_variable = $product->is_type('variable');
        
        // Build attributes array
        $attributes = array(
            'type'   => esc_attr($payment_type),
            'amount' => esc_attr($price),
            'width'  => esc_attr($qr_width),
        );
        
        // Add payment-specific attributes
        switch ($payment_type) {
            case 'till':
                $attributes['tillNumber'] = esc_attr($till_number);
                break;
            case 'paybill':
                $attributes['paybillNumber'] = esc_attr($paybill_number);
                $attributes['accountNumber'] = esc_attr($account_number);
                break;
            case 'phone':
                $attributes['phoneNumber'] = esc_attr($phone_number);
                break;
        }
        
        // Output the QR code component
        ?>
        <div class="wcpesaqr-container" style="margin-top: 20px;background:transparent;display:flex;padding-left:0">
            <pesa-qr 
                id="wcpesaqr-code"
                <?php foreach ($attributes as $key => $value): ?>
                    <?php echo esc_attr($key); ?>="<?php echo esc_attr($value); ?>"
                <?php endforeach; ?>
            ></pesa-qr>
            <?php if ($is_variable): ?>
                <script type="text/javascript">
                    // Store initial price for variable products
                    window.wcPesaQRInitialPrice = '<?php echo esc_js($price); ?>';
                </script>
            <?php endif; ?>
        </div>
        <?php
    }
    
    /**
     * Display QR code on checkout page
     */
    public function display_checkout_qr_code() {
        // Prevent duplicate rendering
        static $already_rendered = false;
        if ($already_rendered) {
            return;
        }
        $already_rendered = true;
        
        // Check if PesaQR is enabled
        if (get_option('wcpesaqr_enabled') !== 'yes') {
            return;
        }
        
        // Get settings
        $payment_type     = get_option('wcpesaqr_payment_type', 'till');
        $till_number      = get_option('wcpesaqr_till_number', '');
        $paybill_number   = get_option('wcpesaqr_paybill_number', '');
        $account_number   = get_option('wcpesaqr_account_number', '');
        $phone_number     = get_option('wcpesaqr_phone_number', '');
        $qr_width         = get_option('wcpesaqr_qr_width', '300');
        
        // Validate required fields based on payment type
        $is_valid = false;
        switch ($payment_type) {
            case 'till':
                $is_valid = !empty($till_number);
                break;
            case 'paybill':
                $is_valid = !empty($paybill_number) && !empty($account_number);
                break;
            case 'phone':
                $is_valid = !empty($phone_number);
                break;
        }
        
        if (!$is_valid) {
            return;
        }
        
        // Get cart total
        $cart_total = WC()->cart->get_total('raw');
        
        // Build attributes array
        $attributes = array(
            'type'   => esc_attr($payment_type),
            'amount' => esc_attr($cart_total),
            'width'  => esc_attr($qr_width),
        );
        
        // Add payment-specific attributes
        switch ($payment_type) {
            case 'till':
                $attributes['tillNumber'] = esc_attr($till_number);
                break;
            case 'paybill':
                $attributes['paybillNumber'] = esc_attr($paybill_number);
                $attributes['accountNumber'] = esc_attr($account_number);
                break;
            case 'phone':
                $attributes['phoneNumber'] = esc_attr($phone_number);
                break;
        }
        
        // Get custom description text
        $description_text = get_option('wcpesaqr_description_text', 'Scan the QR code below with your M-PESA app to complete payment');
        
        // Output the QR code component
        ?>
        <div class="wcpesaqr-checkout-container">
            <h3 class="wcpesaqr-heading"><?php _e('Pay with M-PESA', 'woocommerce-pesaqr'); ?></h3>
            <p class="wcpesaqr-description"><?php echo esc_html($description_text); ?></p>
            <div class="wcpesaqr-qr-wrapper">
                <pesa-qr 
                    id="wcpesaqr-checkout-code"
                    <?php foreach ($attributes as $key => $value): ?>
                        <?php echo esc_attr($key); ?>="<?php echo esc_attr($value); ?>"
                    <?php endforeach; ?>
                ></pesa-qr>
            </div>
            <p class="wcpesaqr-total"><?php printf(__('Total Amount: %s', 'woocommerce-pesaqr'), wc_price($cart_total)); ?></p>
        </div>
        <?php
    }
    
    /**
     * Fallback display of QR code if WooCommerce hooks didn't fire
     * This uses JavaScript to position it correctly
     */
    public function fallback_display_checkout_qr() {
        if (!is_checkout()) {
            return;
        }
        
        $qr_html = $this->get_checkout_qr_html();
        
        if (empty($qr_html)) {
            return;
        }
        
        // Output QR code in footer and use JavaScript to position it AFTER payment methods
        ?>
        <script type="text/javascript">
        jQuery(document).ready(function($) {
            // Check if QR code already exists on page
            if ($('.wcpesaqr-checkout-container').length > 0) {
                return;
            }
            
            
            // Create QR code container
            var qrHtml = <?php echo json_encode($qr_html); ?>;
            var $qrContainer = $(qrHtml);
            
            // Fixed placement: AFTER payment methods
            var $target = null;
            var insertMethod = '';
            
            // Try classic checkout selectors first
            $target = $('#payment, .woocommerce-checkout-payment');
            if ($target.length) {
                $qrContainer.insertAfter($target);
                insertMethod = 'insertAfter payment (classic)';
            } else {
                // Try WooCommerce Blocks payment block
                $target = $('.wp-block-woocommerce-checkout-payment-block');
                if ($target.length) {
                    $qrContainer.insertAfter($target);
                    insertMethod = 'insertAfter payment block';
                } else {
                    // Try after place order button
                    $target = $('.wc-block-components-checkout-place-order-button');
                    if ($target.length) {
                        $qrContainer.insertAfter($target.closest('.wc-block-checkout__actions, .wc-block-components-checkout-step'));
                        insertMethod = 'insertAfter place order button';
                    } else {
                        // Fallback: add to end of form
                        $target = $('form.checkout, form.wc-block-checkout__form');
                        if ($target.length) {
                            $qrContainer.appendTo($target);
                            insertMethod = 'appendTo form (fallback)';
                        } else {
                            // Last resort: add to main content
                            $target = $('main[data-page="checkout"], main, .woocommerce, .entry-content').first();
                            if ($target.length) {
                                $qrContainer.appendTo($target);
                                insertMethod = 'appendTo main content (last resort)';
                            }
                        }
                    }
                }
            }
        });
        </script>
        <?php
    }
    
    /**
     * Get checkout QR HTML as string
     */
    private function get_checkout_qr_html() {
        // Check if PesaQR is enabled
        if (get_option('wcpesaqr_enabled') !== 'yes') {
            return '';
        }
        
        // Get settings
        $payment_type     = get_option('wcpesaqr_payment_type', 'till');
        $till_number      = get_option('wcpesaqr_till_number', '');
        $paybill_number   = get_option('wcpesaqr_paybill_number', '');
        $account_number   = get_option('wcpesaqr_account_number', '');
        $phone_number     = get_option('wcpesaqr_phone_number', '');
        $qr_width         = get_option('wcpesaqr_qr_width', '300');
        
        // Validate required fields based on payment type
        $is_valid = false;
        switch ($payment_type) {
            case 'till':
                $is_valid = !empty($till_number);
                break;
            case 'paybill':
                $is_valid = !empty($paybill_number) && !empty($account_number);
                break;
            case 'phone':
                $is_valid = !empty($phone_number);
                break;
        }
        
        if (!$is_valid) {
            return '';
        }
        
        // Get cart total
        $cart_total = WC()->cart->get_total('raw');
        
        // Build attributes array
        $attributes = array(
            'type'   => esc_attr($payment_type),
            'amount' => esc_attr($cart_total),
            'width'  => esc_attr($qr_width),
        );
        
        // Add payment-specific attributes
        switch ($payment_type) {
            case 'till':
                $attributes['tillNumber'] = esc_attr($till_number);
                break;
            case 'paybill':
                $attributes['paybillNumber'] = esc_attr($paybill_number);
                $attributes['accountNumber'] = esc_attr($account_number);
                break;
            case 'phone':
                $attributes['phoneNumber'] = esc_attr($phone_number);
                break;
        }
        
        // Get custom description text
        $description_text = get_option('wcpesaqr_description_text', 'Scan the QR code below with your M-PESA app to complete payment');
        
        // Build HTML string
        $html = '<div class="wcpesaqr-checkout-container">';
        $html .= '<h3 class="wcpesaqr-heading">' . __('Pay with M-PESA', 'woocommerce-pesaqr') . '</h3>';
        $html .= '<p class="wcpesaqr-description">' . esc_html($description_text) . '</p>';
        $html .= '<div class="wcpesaqr-qr-wrapper">';
        $html .= '<pesa-qr id="wcpesaqr-checkout-code"';
        foreach ($attributes as $key => $value) {
            $html .= ' ' . esc_attr($key) . '="' . esc_attr($value) . '"';
        }
        $html .= '></pesa-qr>';
        $html .= '<br/>';
        $html .= '</div>';
        $html .= '</div>';
        
        return $html;
    }
    
    /**
     * Get custom styles
     */
    private function get_custom_styles() {
        return '
        .wcpesaqr-container {
            margin: 20px 0;
            padding: 20px;
            background: #f9f9f9;
            border-radius: 8px;
            text-align: center;
        }
        
        .wcpesaqr-container pesa-qr {
            display: inline-block;
        }
        .wcpesaqr-checkout-code{
            margin: 10px 0;
        }
        
        .wcpesaqr-checkout-container {
            margin: 25px 10px;
            padding: 20px;
            background: #f9f9f9;
            border-radius: 8px;
            text-align: center;
        }
        
        .wcpesaqr-heading {
            color: #16a34a;
            margin: 0 0 10px 0;
            font-size: 22px;
            font-weight: 600;
        }
        
        .wcpesaqr-description {
            color: #666;
            margin: 0 0 15px 0;
            font-size: 14px;
        }
        
        .wcpesaqr-qr-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 15px 0;
        }
        
        .wcpesaqr-checkout-container pesa-qr {
            display: inline-block;
        }
        
        .wcpesaqr-total {
            font-size: 18px;
            font-weight: bold;
            color: #333;
            margin: 15px 0 0 0;
        }
        
        @media (max-width: 768px) {
            .wcpesaqr-container,
            .wcpesaqr-checkout-container {
                padding: 15px;
            }
            
            .wcpesaqr-heading {
                font-size: 20px;
            }
            
            .wcpesaqr-total {
                font-size: 16px;
            }
        }
        ';
    }
}

