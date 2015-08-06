<li>
    <div class="left-block">
        <a href="<?php the_permalink(); ?>">
            <?php
    			/**
    			 * kt_loop_product_thumbnail hook
    			 *
    			 * @hooked woocommerce_template_loop_product_thumbnail - 10
    			 */
    			do_action( 'kt_loop_product_thumbnail' );
    		?>
        </a>
        <div class="quick-view">
            <?php
    			/**
    			 * kt_loop_product_function hook
    			 *
    			 * @hooked kt_get_tool_wishlish - 1
                 * @hooked kt_get_tool_compare - 5
                 * @hooked kt_get_tool_quickview - 10
    			 */
    			do_action( 'kt_loop_product_function' );
    		?>
        </div>
        <?php
    		/**
    		 * woocommerce_after_shop_loop_item hook
    		 *
    		 * @hooked woocommerce_template_loop_add_to_cart - 10
    		 */
    		do_action( 'woocommerce_after_shop_loop_item' );
    
    	?>
        
    </div>
    <div class="right-block">
        <h5 class="product-name"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h5>
        <?php
			/**
			 * woocommerce_after_shop_loop_item_title hook
			 * @hooked woocommerce_template_loop_price - 5
			 * @hooked woocommerce_template_loop_rating - 10
			 */
			do_action( 'kt_after_shop_loop_item_title' );
		?>
    </div>
</li>