console.log("working fine");

const monthNames = ["Jan","Feb","Mar","April","May","June","July","Aug","Sept","Oct","Nov","Dec"];


$("#commentForm").submit(function(e){
  e.preventDefault();

  let dt = new Date();
  let time = dt.getUTCDate() + " " + monthNames[dt.getUTCMonth()] + ", " + dt.getUTCFullYear();


  $.ajax({
     data: $(this).serialize(),

     method: $(this).attr("method"),

     url: $(this).attr("action"),

     dataType: "json",

     success:function(res){
        console.log("Comment saved to DB");

        if(res.bool == true){
            $("#review-res").html("Review added succesfully.")
            $(".hide-comment-form").hide()
            $(".add-review").hide()

            let _html = '<div class="single-comment justify-content-between d-flex mb-30">'
                _html += '<div class="user justify-content-between d-flex">'
                _html += '<div class="thumb text-center">'
                _html += '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png" alt="" />'
                _html += '<a href="#" class="font-heading text-brand">'+ res.context.user +'</a>'
                _html += '</div>'

                _html += '<div class="desc">'
                _html += '<div class="d-flex justify-content-between mb-10">'
                _html += '<div class="d-flex align-items-center">'
                _html += '<span class="font-xs text-muted">'+ time +'</span>'
                _html += '</div>'
 
                for(let i = 1; i<=res.context.rating; i++ ){
                    _html += '<i class="fas fa-star text-warning"></i>';
                }

               
                _html += '</div>'
                _html += '<p class="mb-10">'+ res.context.review +'</p>'

                _html += '</div>'
                _html += '</div>'
                _html += '</div>'

                $(".comment-list").prepend(_html)
               }

       
    }
    }) 
})



$(document).ready(function (){
    $(".filter-checkbox, #price-filter-btn").on("click", function(){
        console.log("a checkbox has been clicked");

        let filter_object = {}

        let min_price = $("#max_price").attr("min")
        let max_price = $("#max_price").val()

        filter_object.min_price = min_price;
        filter_object.max_price = max_price;


        $(".filter-checkbox").each(function(){
            let filter_value = $(this).val()
            let filter_key = $(this).data("filter")

            // console.log("Filter value is: ", filter_value);
            // console.log("Filter key is: ", filter_key);

            filter_object[filter_key] = Array.from(document.querySelectorAll('input[data-filter = '+ filter_key +']:checked')).map(function(element){
                return element.value
            })
        })
        console.log("filter object is: ", filter_object);
        $.ajax({
            url: '/filter-products',
            data: filter_object,
            dataType: 'json',
            beforeSend: function(){
                console.log("Trying to filter products...");
            },
            success: function(response){
                console.log(response);
                console.log("Data filtered successfully...");
                $("#filtered-product").html(response.data)
            }
        })
    })
    $("#max_price").on("blur", function(){
        let min_price = $(this).attr("min")
        let max_price = $(this).attr("max")
        let current_price = $(this).val()

        // console.log("current price is: ", current_price);
        // console.log("max price is: ", max_price);
        // console.log("min price is: ", min_price);

        if(current_price < parseInt(min_price) || current_price > parseInt(max_price)){ // parseint olunca sadece int kismini aldigi icin tam occurate olmuyor
            // console.log("error!")

            max_price = Math.round(max_price *100) / 100
            min_price = Math.round(min_price *100) / 100

            // console.log("##########################");
            // console.log("max price is: ", max_price);
            // console.log("min price is: ", min_price);

            alert("Price must be between " +min_price + "TL and " +max_price + "TL")
            $(this).val(min_price)
            $('#range').val(min_price)

            $(this).focus()
            return false
        }

    })
})


// Add To Cart
$("#add-to-cart-btn").on("click", function(){
    let quantity = $("#product-quantity").val()
    let product_title = $(".product-title").val()
    let product_id = $(".product-id").val()
    let product_price = $("#current-product-price").text()
    let this_val = $(this)

    console.log("quantıty: ", quantity);
    console.log("title: ", product_title);
    console.log("price: ", product_price);
    console.log("id: ", product_id);
    console.log("current element: ", this_val)

    $.ajax({
        url: '/add-to-cart',
        data: {
            'id': product_id,
            'qty': quantity,
            'title': product_title,
            'price': product_price,
        },
        dataType: 'json',
        beforeSend: function(){
            console.log("Adding product to cart...");
        },
        success: function(response){
            this_val.html("Item added to cart!")
            console.log("Added product to cart!");
            $(".cart-items-count").text(response.totalcartitems)


        }
    })

})

