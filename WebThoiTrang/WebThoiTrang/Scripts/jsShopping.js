$(document).ready(function () {
    ShowCount();
    $('body').on('click', '.btnAddToCart', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        var quatity = 1;
        var tQuantity = $('#quantity_value').val();
        if (tQuantity != '') {
            quatity = parseInt(tQuantity);
        }
        //alert(id + " " + quatity);
        $.ajax({
            url: '/shoppingcart/addtocart',
            type: 'POST',
            data: { id: id, quantity: quatity },
            success: function (rs) {
                if (rs.Success) {
                    //$('#checkout_items').html(rs.Count);
                    //alert(rs.msg);
                    //alert(rs.Count)
                    $('.checkout_items').attr('data-notify', rs.Count);
                    swal("", rs.msg, "success");
                    }
                else  {
                    //swal("", rs.msg, "error");
                    swal("", rs.msg, "error");
                }
                    

            }
        });
    });
    $('body').on('click', '.btnUpdate', function (e) {
        e.preventDefault();
        //alert($('#quantity').val());
        var id = $(this).data("id");
        var quantity = $('#quantity').val();
        var remainingQuantity = $('#remainingQuantity').val();
        if (quantity < 1) {
            e.preventDefault();
            var id = $(this).data('id');
            var conf = confirm('Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?');
            if (conf == true) {
                $.ajax({
                    url: '/shoppingcart/Delete',
                    type: 'POST',
                    data: { id: id },
                    success: function (rs) {
                        if (rs.Success) {
                            //$('#checkout_items').html(rs.Count);
                            $('.checkout_items').attr('data-notify', rs.Count);
                            $('#trow_' + id).remove();
                            LoadCart();
                        }
                    }
                });
            }
        }
        if (quantity > remainingQuantity) {
                    swal("", "Kho không đủ hàng vui lòng giảm số lượng sản phấm ", "error");

        } else {
            Update(id, quantity);
        }
        

    });
    $('body').on('click', '.btnDeleteAll', function (e) {
        e.preventDefault();
        var conf = confirm('Bạn có chắc muốn xóa hết sản phẩm trong giỏ hàng?');
        //debugger;
        if (conf == true) {
            DeleteAll();
            $('.checkout_items').attr('data-notify', rs.Count);
            LoadCart();
        }

    });

    $('body').on('click', '.btnDelete', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        var conf = confirm('Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?');
        if (conf == true) {
            $.ajax({
                url: '/shoppingcart/Delete',
                type: 'POST',
                data: { id: id },
                success: function (rs) {
                    if (rs.Success) {
                        //$('#checkout_items').html(rs.Count);
                        $('.checkout_items').attr('data-notify', rs.Count);
                        $('#trow_' + id).remove();
                        LoadCart();
                    }
                }
            });
        }

    });
});



function ShowCount() {
    $.ajax({
        url: '/shoppingcart/ShowCount',
        type: 'GET',
        success: function (rs) {
            $('.checkout_items').attr('data-notify', rs.Count);
        }
    });
}
function DeleteAll() {
    $.ajax({
        url: '/shoppingcart/DeleteAll',
        type: 'POST',
        success: function (rs) {
            if (rs.Success) {
                LoadCart();
            }
        }
    });
}
function Update(id, quantity) {
    $.ajax({
        url: '/shoppingcart/Update',
        type: 'POST',
        data: { id: id, quantity: quantity },
        success: function (rs) {
            if (rs.Success) {
                LoadCart();
            }
        }
    });
}

function LoadCart() {
    $.ajax({
        url: '/shoppingcart/Partial_Item_Cart',
        type: 'GET',
        success: function (rs) {
            $('#load_data').html(rs);
        }
    });
}

