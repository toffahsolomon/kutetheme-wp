<?php
/**
 * Kute Theme Customizer functionality
 *
 * @package WordPress
 * @subpackage KuteTheme
 * @since Kute Theme 1.0
 */

/**
 * Add postMessage support for site title and description for the Customizer.
 *
 * @since Kute Theme 1.0
 *
 * @param WP_Customize_Manager $wp_customize Customizer object.
 */
function kt_customize_register( $wp_customize ) {
	$color_scheme = kt_get_color_scheme();

	$wp_customize->get_setting( 'blogname' )->transport        = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport = 'postMessage';

	// Add color scheme setting and control.
	$wp_customize->add_setting( 'color_scheme', array(
		'default'           => 'default',
		'sanitize_callback' => 'kt_sanitize_color_scheme',
		'transport'         => 'postMessage',
	) );

	$wp_customize->add_control( 'color_scheme', array(
		'label'    => __( 'Base Color Scheme', THEME_LANG ),
		'section'  => 'colors',
		'type'     => 'select',
		'choices'  => kt_get_color_scheme_choices(),
		'priority' => 1,
	) );

	// Add custom header and sidebar text color setting and control.
	$wp_customize->add_setting( 'main_color', array(
		'default'           => $color_scheme[1],
		'sanitize_callback' => 'sanitize_hex_color',
		'transport'         => 'postMessage',
	) );

	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'main_color', array(
		'label'       => __( 'Theme Color', THEME_LANG ),
		'description' => __( 'Applied to the header on small screens and the sidebar on wide screens.', THEME_LANG ),
		'section'     => 'colors',
	) ) );

	// Remove the core header textcolor control, as it shares the sidebar text color.
	$wp_customize->remove_control( 'header_textcolor' );

	// Add custom header and sidebar background color setting and control.
	$wp_customize->add_setting( 'box_background_color', array(
		'default'           => $color_scheme[2],
		'sanitize_callback' => 'sanitize_hex_color',
		'transport'         => 'postMessage',
	) );

	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'box_background_color', array(
		'label'       => __( 'Box and Sidebar Background Color', THEME_LANG ),
		'description' => __( 'Applied to the header on small screens and the sidebar on wide screens.', THEME_LANG ),
		'section'     => 'colors',
	) ) );
    
    // Add custom header and sidebar background color setting and control.
	$wp_customize->add_setting( 'textcolor', array(
		'default'           => $color_scheme[3],
		'sanitize_callback' => 'sanitize_hex_color',
		'transport'         => 'postMessage',
	) );

	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'textcolor', array(
		'label'       => __( 'Text Color', THEME_LANG ),
		'description' => __( 'Applied to the header on small screens and the text on wide screens.', THEME_LANG ),
		'section'     => 'colors',
	) ) );

	// Add an additional description to the header image section.
	$wp_customize->get_section( 'header_image' )->description = __( 'Applied to the header on small screens and the sidebar on wide screens.', THEME_LANG );
}
add_action( 'customize_register', 'kt_customize_register', 11 );

/**
 * Register color schemes for Kute Theme.
 *
 * Can be filtered with {@see 'kt_color_schemes'}.
 *
 * The order of colors in a colors array:
 * 0. Background Color.
 * 1. Main Color
 * 2. Sidebar and Box Background Color.
 * 3. Main Text and Link Color.
 * 4. Rate Star color
 * 5. Button Color
 * 6. Link Menu Footer
 *
 * @since Kute Theme 1.0
 *
 * @return array An associative array of color scheme options.
 */
function kt_get_color_schemes() {
	return apply_filters( 'kt_color_schemes', array(
		'default' => array(
			'label'  => __( 'Default', THEME_LANG ),
			'colors' => array(
                '#ffffff',
				'#ff3366',
				'#eaeaea',
				'#66666',
                '#ff9900',
                '#000000',
                '#0066cc'
			),
		),
		'brown'    => array(
			'label'  => __( 'Brown', THEME_LANG ),
			'colors' => array(
                '#ffffff',
				'#958457',
				'#4c311d',
				'#666666',
                '#febf2b',
                '#000000',
                '#0066cc'
			),
		)
	) );
}

if ( ! function_exists( 'kt_get_color_scheme' ) ) :
/**
 * Get the current Kute Theme color scheme.
 *
 * @since Kute Theme 1.0
 *
 * @return array An associative array of either the current or default color scheme hex values.
 */
function kt_get_color_scheme() {
	$color_scheme_option = get_theme_mod( 'color_scheme', 'default' );
	$color_schemes       = kt_get_color_schemes();

	if ( array_key_exists( $color_scheme_option, $color_schemes ) ) {
		return $color_schemes[ $color_scheme_option ]['colors'];
	}

	return $color_schemes['default']['colors'];
}
endif; // kt_get_color_scheme

if ( ! function_exists( 'kt_get_color_scheme_choices' ) ) :
/**
 * Returns an array of color scheme choices registered for Kute Theme.
 *
 * @since Kute Theme 1.0
 *
 * @return array Array of color schemes.
 */
function kt_get_color_scheme_choices() {
	$color_schemes                = kt_get_color_schemes();
	$color_scheme_control_options = array();

	foreach ( $color_schemes as $color_scheme => $value ) {
		$color_scheme_control_options[ $color_scheme ] = $value['label'];
	}

	return $color_scheme_control_options;
}
endif; // kt_get_color_scheme_choices

if ( ! function_exists( 'kt_sanitize_color_scheme' ) ) :
/**
 * Sanitization callback for color schemes.
 *
 * @since Kute Theme 1.0
 *
 * @param string $value Color scheme name value.
 * @return string Color scheme name.
 */
function kt_sanitize_color_scheme( $value ) {
	$color_schemes = kt_get_color_scheme_choices();

	if ( ! array_key_exists( $value, $color_schemes ) ) {
		$value = 'default';
	}

	return $value;
}
endif; // kt_sanitize_color_scheme

/**
 * Enqueues front-end CSS for color scheme.
 *
 * @since Kute Theme 1.0
 *
 * @see wp_add_inline_style()
 */
function kt_color_scheme_css() {
	$color_scheme_option = get_theme_mod( 'color_scheme', 'default' );

	// Don't do anything if the default color scheme is selected.
	if ( 'default' === $color_scheme_option ) {
		return;
	}

	$color_scheme = kt_get_color_scheme();

	// Convert main and sidebar text hex color to rgba.
	$color_button_rgb  = kt_hex2rgb( $color_scheme[5] );
    $color_main_rgb    = kt_hex2rgb( $color_scheme[1] );
    
	$colors = array(
		'background_color'     => $color_scheme[0],
        'main_color'           => $color_scheme[1],
		'box_background_color' => $color_scheme[2],
		'textcolor'            => $color_scheme[3],
		'rate_color'           => $color_scheme[4],
		'button_color'         => $color_scheme[5],
        'menu_link_footer'     => $color_scheme[6],
        'button_color_rgb'     => vsprintf( 'rgba( %1$s, %2$s, %3$s, 0.4)', $color_button_rgb ),
        'color_main_rgb'       => vsprintf( 'rgba( %1$s, %2$s, %3$s, 0.5)', $color_main_rgb ),
	);

	$color_scheme_css = kt_get_color_scheme_css( $colors );

	wp_add_inline_style( 'kutetheme-style', $color_scheme_css );
}
add_action( 'wp_enqueue_scripts', 'kt_color_scheme_css' );

/**
 * Binds JS listener to make Customizer color_scheme control.
 *
 * Passes color scheme data as colorScheme global.
 *
 * @since Kute Theme 1.0
 */
function kt_customize_control_js() {
	wp_enqueue_script( 'color-scheme-control', get_template_directory_uri() . '/js/color-scheme-control.js', array( 'customize-controls', 'iris', 'underscore', 'wp-util' ), '20141216', true );
	wp_localize_script( 'color-scheme-control', 'colorScheme', kt_get_color_schemes() );
}
add_action( 'customize_controls_enqueue_scripts', 'kt_customize_control_js' );

/**
 * Binds JS handlers to make the Customizer preview reload changes asynchronously.
 *
 * @since Kute Theme 1.0
 */
function kt_customize_preview_js() {
	wp_enqueue_script( 'kutetheme-customize-preview', get_template_directory_uri() . '/js/customize-preview.js', array( 'customize-preview' ), '20141216', true );
}
add_action( 'customize_preview_init', 'kt_customize_preview_js' );

/**
 * Returns CSS for the color schemes.
 *
 * @since Kute Theme 1.0
 *
 * @param array $colors Color scheme colors.
 * @return string Color scheme CSS.
 */
function kt_get_color_scheme_css( $colors ) {
	$colors = wp_parse_args( $colors, array(
		'background_color'     => '',
        'main_color'           => '',
		'box_background_color' => '',
		'textcolor'            => '',
		'rate_color'           => '',
		'button_color'         => '',
		'menu_link_footer'     => '',
		'button_color_rgb'     => '',
        'color_main_rgb'       => ''
	) );
	$css = <<<CSS
	/* Color Scheme */

	/* Background Color */
	body {
		background-color: {$colors['background_color']};
	}
    
    /* Box Color */
    .nav-top-menu, .service,
    .top-header{
        background-color: {$colors['box_background_color']};
    }
    
    /* Main Color */
    #main-menu .navbar .navbar-nav>li:hover, 
    #main-menu .navbar .navbar-nav>li.active,
    .main-bg,
    .product-list li .quick-view a:hover,
    .trademark-product .info-product .btn-view-more:hover,
    .cate-box .cate-link:hover,
    .main-header .header-search-box .form-inline .btn-search,
    .main-header .shopping-cart-box a.cart-link:after,
    .cart-block .cart-block-content .cart-buttons a.btn-check-out,
    .owl-controls .owl-prev:hover, .owl-controls .owl-next:hover{
        background-color: {$colors['main_color']};
    }
    .popular-tabs .nav-tab li:hover, 
    .popular-tabs .nav-tab li.active,
    .brand-showcase .brand-showcase-title,
    .group-title span{
        border-bottom-color:{$colors['main_color']};
    }
    .latest-deals .latest-deal-content{
        border-color:{$colors['main_color']};
    }
    .box-vertical-megamenus .vertical-menu-content{
        border-top-color:{$colors['main_color']};
    }
    a:hover,
    .product-list li .content_price ins,
    .product-list li .content_price,
    .cart-block .cart-block-content .product-info .p-right .p-rice{
        color: {$colors['main_color']};
    }
    /* Text Color */
    a,
    .product-list li .content_price del{
        color: {$colors['textcolor']};
    }
    /* Rate Color */
    .product-list li .product-star{
        color: {$colors['rate_color']};
    }
    
    /* Color Main RGB */
    .product-list li .add-to-cart:hover{
        background-color: {$colors['color_main_rgb']}
    }
    
    /* Button Color RGB*/
    .product-list li .add-to-cart{
        background-color: {$colors['button_color_rgb']}
    }
    /* Footer Menu Link*/
    .footer-menu-list li a{
        color:{$colors['menu_link_footer']}
    }
CSS;

	return $css;
}

/**
 * Output an Underscore template for generating CSS for the color scheme.
 *
 * The template generates the css dynamically for instant display in the Customizer
 * preview.
 *
 * @since Kute Theme 1.0
 */
function kt_color_scheme_css_template() {
	$colors = array(
		'background_color'     => '{{ data.background_color }}',
		'main_color'           => '{{ data.main_color }}',
		'box_background_color' => '{{ data.box_background_color }}',
		'textcolor'            => '{{ data.textcolor }}',
		'rate_color'           => '{{ data.rate_color }}',
		'button_color'         => '{{ data.button_color }}',
		'menu_link_footer'     => '{{ data.menu_link_footer }}',
		'button_color_rgb'     => '{{ data.button_color_rgb }}',
	);
	?>
	<script type="text/html" id="tmpl-kutetheme-color-scheme">
		<?php echo kt_get_color_scheme_css( $colors ); ?>
	</script>
	<?php
}
add_action( 'customize_controls_print_footer_scripts', 'kt_color_scheme_css_template' );
