from django.urls import path
from core.views import index, product_list_view, category_list_view, category_product_list_view, vendor_detail_view, vendor_list_view, product_detail_view, tag_list, ajax_add_review, search_view, filter_product, add_to_cart, cart_view ,delete_item_from_cart, update_cart, checkout_view, costumer_dashboard, order_detail, make_address_default


app_name ="core"

urlpatterns = [
    # homepage
    path("",index, name="index"),
    path("products/", product_list_view, name="product-list"),
    path("product/<pid>", product_detail_view, name="product-detail"),


    # category
    path("category/", category_list_view, name="category-list"),
    path("category/<cid>/", category_product_list_view, name="category-product-list"),

    # vendor 
    path("vendor/", vendor_list_view, name="vendor-list"),
    path("vendor/<vid>", vendor_detail_view, name="vendor-detail"),

    # Tags
    path("products/tag/<slug:tag_slug>/", tag_list, name="tags"),

    # Add Review

    path("ajax-add-review/<int:pid>/", ajax_add_review, name="ajax-add-review"), 

    # search

    path("search/", search_view, name="search"),

    # filter
    path("filter-products/", filter_product, name="filter-product"),

    # add to cart URL
    path("add-to-cart/", add_to_cart, name="add-to-cart"),

     # Cart Page URL
    path("cart/", cart_view, name="cart"),

    # Delete item from cart 
    path("delete-from-cart/", delete_item_from_cart, name="delete-from-cart"),

    # Update item from cart 
    path("update-cart/", update_cart, name="update-cart"),

    # checkout
    path("checkout/", checkout_view, name="checkout"),

    # dashboard
    path("dashboard/", costumer_dashboard, name="dashboard"),

    # order detail
    path("dashboard/order/<int:id>", order_detail, name="order-detail"),

    # making address default
    path("make-deafult-address/", make_address_default, name="make-deafult-address")
]
