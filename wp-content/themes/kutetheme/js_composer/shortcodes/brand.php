<?php
// Exit if accessed directly
if ( !defined('ABSPATH')) exit;

if( class_exists( 'WPBakeryShortCode' ) ){
    // Setting shortcode service
    vc_map( array(
        "name" => __( "Brands", THEME_LANG),
        "base" => "brand",
        "category" => __('Kute Theme', THEME_LANG ),
        "description" => __( "Display brand showcase", THEME_LANG),
        "params" => array(
            array(
                "type" => "textfield",
                "heading" => __( "Title", THEME_LANG ),
                "param_name" => "title",
                "admin_label" => true,
                'description' => __( 'Display title brand showcase', THEME_LANG )
            ),
            array(
                "type" => "dropdown",
            	"heading" => __("Order by", THEME_LANG),
            	"param_name" => "orderby",
            	"value" => array(
            		__('None', THEME_LANG)     => 'none',
                    __('ID', THEME_LANG)       => 'ID',
                    __('Author', THEME_LANG)   => 'author',
                    __('Name', THEME_LANG)     => 'name',
                    __('Date', THEME_LANG)     => 'date',
                    __('Modified', THEME_LANG) => 'modified',
                    __('Rand', THEME_LANG)     => 'rand',
            	),
                'std' => 'date',
            	"description" => __("Select how to sort retrieved posts.",THEME_LANG),
            ),
            array(
                "type" => "dropdown",
            	"heading" => __("Order", THEME_LANG),
            	"param_name" => "order",
            	"value" => array(
                    __('ASC', THEME_LANG)  => 'ASC',
                    __('DESC', THEME_LANG) => 'DESC'
            	),
                'std' => 'DESC',
            	"description" => __("Designates the ascending or descending order.",THEME_LANG)
            ),
            array(
    			'type' => 'css_editor',
    			'heading' => __( 'Css', 'js_composer' ),
    			'param_name' => 'css',
    			// 'description' => __( 'If you wish to style particular content element differently, then use this field to add a class name and then refer to it in your css file.', 'js_composer' ),
    			'group' => __( 'Design options', 'js_composer' )
    		),
            array(
                "type" => "textfield",
                "heading" => __( "Extra class name", THEME_LANG ),
                "param_name" => "el_class",
                "description" => __( "If you wish to style particular content element differently, then use this field to add a class name and then refer to it in your css file.", "js_composer" ),
            )
        )
    ));
}
class WPBakeryShortCode_Brand extends WPBakeryShortCode {
    protected function content($atts, $content = null) {
        $tab = function_exists( 'vc_map_get_attributes' ) ? vc_map_get_attributes( 'brand', $atts ) : $atts;
                        
        $atts = shortcode_atts( array(
            'title'     => '',
            'orderby'   => 'date',
            'order'     => 'desc',
            'css_animation' => '',
            'el_class'  => '',
            'css'       => '',
            
        ), $atts );
        extract($atts);
        
        $elementClass = array(
        	'base' => apply_filters( VC_SHORTCODE_CUSTOM_CSS_FILTER_TAG, 'brand-showcase ', $this->settings['base'], $atts ),
        	'extra' => $this->getExtraClass( $el_class ),
        	'css_animation' => $this->getCSSAnimation( $css_animation ),
            'shortcode_custom' => vc_shortcode_custom_css_class( $css, ' ' )
        );
        
        $elementClass = preg_replace( array( '/\s+/', '/^\s|\s$/' ), array( ' ', '' ), implode( ' ', $elementClass ) );
        ob_start();
        //Set up the taxonomy object and get terms
		$tax   = get_taxonomy('product_brand');
        if( $tax ):
		$terms = get_terms( 'product_brand',array( 'hide_empty' => 0, 'orderby' => $orderby, 'order' => $order ) );
        if( $terms && $title){
            ?>
            <div class="<?php echo $elementClass; ?>">
                <h2 class="brand-showcase-title"><?php echo $title; ?>
                </h2>
                <div class="brand-showcase-box">
                    <ul class="brand-showcase-logo owl-carousel" data-loop="true" data-nav = "true" data-dots="false" data-margin = "1" data-autoplayTimeout="1000" data-autoplayHoverPause = "true" data-responsive='{"0":{"items":2},"600":{"items":5},"1000":{"items":8}}'>
                        <?php $i = 1; ?>
                        <?php foreach($terms as $term): ?>
                        <li data-tab="showcase-<?php echo $term->term_id ?>" class="item<?php echo ( $i ==1 ) ? ' active' : '' ?>">
                            <h3><?php echo $term->name ?></h3>
                        </li>
                        <?php $i ++ ; ?>
                        <?php endforeach; ?>
                    </ul>
                    <div class="brand-showcase-content">
                        <?php $i = 1; ?>
                        <?php add_filter( 'kt_template_loop_product_thumbnail_size', array( $this, 'kt_thumbnail_size' ) ); ?>
                        <?php foreach($terms as $term): ?>
                            <div class="brand-showcase-content-tab<?php echo ( $i ==1 ) ? ' active' : '' ?>" id="showcase-<?php echo $term->term_id ?>">
                                <?php 
                                $term_link = get_term_link( $term );
                                
                                $thumbnail_id = absint( get_woocommerce_term_meta( $term->term_id, 'thumbnail_id', true ) );

                        		if ( $thumbnail_id ) {
                        			$image = wp_get_attachment_image_src( $thumbnail_id, 'full' );
                                    if( is_array($image) && isset($image[0]) && $image[0] ){
                                        $image = $image[0];
                                    }else{
                                        $image = wc_placeholder_img_src();
                                    }
                        		} else {
                        			$image = wc_placeholder_img_src();
                        		}
                                $meta_query = WC()->query->get_meta_query();
                                $args = array(
                        			'post_type'				=> 'product',
                        			'post_status'			=> 'publish',
                        			'ignore_sticky_posts'	=> 1,
                        			'posts_per_page' 		=> 4,
                        			'meta_query' 			=> $meta_query,
                                    'suppress_filter'       => true,
                                    'tax_query'             => array(
                                        array(
                                            'taxonomy' => 'product_brand',
                                            'field'    => 'id',
                                            'terms'    => $term->term_id,
                                            'operator' => 'IN'
                                        ),
                                    )
                        		);
                                $products = new WP_Query( apply_filters( 'woocommerce_shortcode_products_query', $args, $atts ) );
                                if( $products->have_posts() ):
                                ?>
                                <div class="row">
                                    <div class="col-xs-12 col-sm-4 trademark-info">
                                        <div class="trademark-logo">
                                            <a href="<?php echo $term_link; ?>"><img src="<?php echo esc_url( $image ); ?>" alt="<?php echo $term->name ?>" /></a>
                                        </div>
                                        <div class="trademark-desc">
                                            <?php echo $term->description ?>
                                        </div>
                                        <a href="<?php echo $term_link; ?>" class="trademark-link"><?php _e( 'shop this brand', THEME_LANG ) ?></a>
                                    </div>
                                    <div class="col-xs-12 col-sm-8 trademark-product">
                                        <div class="row">
                                            <?php while($products->have_posts()): $products->the_post(); 
                                                $link = get_the_permalink();
                                            ?>
                                            <div class="col-xs-12 col-sm-6 product-item">
                                                <div class="image-product hover-zoom">
                                                    <a href="<?php echo $link ?>">
                                                        <?php
                                                			/**
                                                			 * kt_loop_product_thumbnail hook
                                                			 *
                                                			 * @hooked woocommerce_template_loop_product_thumbnail - 10
                                                			 */
                                                			do_action( 'kt_loop_product_thumbnail' );
                                                		?>
                                                    </a>
                                                </div>
                                                <div class="info-product">
                                                    <a href="<?php echo $link; ?>">
                                                        <h5><?php echo get_the_title() ?></h5>
                                                    </a>
                                                    <div class="content_price">
                                                        <?php
                                                			/**
                                                			 * woocommerce_after_shop_loop_item_title hook
                                                			 * @hooked woocommerce_template_loop_price - 5
                                                			 * @hooked woocommerce_template_loop_rating - 10
                                                			 */
                                                			do_action( 'kt_after_shop_loop_item_title' );
                                                		?>
                                                    </div>
                                                    <a class="btn-view-more" title="<?php _e( 'View More', THEME_LANG ) ?>" href="<?php echo $link; ?>"><?php _e( 'View More', THEME_LANG ) ?></a>
                                                </div>
                                            </div>
                                            <?php endwhile; ?>
                                        </div>
                                    </div>
                                </div>
                                <?php endif; ?>
                                <?php wp_reset_query(); ?>
                                <?php wp_reset_postdata(); ?>
                            </div>
                        <?php $i ++ ; ?>
                        <?php endforeach; ?>
                        <?php remove_filter( 'kt_template_loop_product_thumbnail_size', array( $this, 'kt_thumbnail_size' ) ); ?>
                    </div>
                </div>
            </div>
            <?php
        }
        endif;
        $result = ob_get_contents();
        ob_end_clean();
        return $result;
    }
    public function kt_thumbnail_size(){
        return '142x173';
    }
}