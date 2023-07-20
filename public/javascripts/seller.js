$(() => {
    events();
    // getSellerName();
})

events = () => {
    //seller account create
    $("#sellerSignupFrm").submit(function (e) {
        e.preventDefault();
        var data = new FormData(this);
        REST.post('/api/seller/create', data, (err, result) => {
            if (err) {
                $.tost({
                    heading: 'Something is wrong!',
                    text: err,
                    icon: 'error',
                    position: 'bottom-right'
                })
            } else {

                window.location.href = '/seller/profile';
            }
        })
    })

    //seller post create
    $("#sellerPostFrm").submit(function (e) {
        e.preventDefault();
        // var data = $("#sellerPostFrm").serialize();
        var data = new FormData(this);
        REST.post("/api/seller/post/create", data, (err, result) => {
            if (err) {
                $.toast({
                    heading: 'Sorry!',
                    text: err,
                    icon: 'error',
                    position: 'bottom-right'
                });
            } else {

                $.toast({
                    heading: 'Success!',
                    text: 'A post is added!',
                    icon: 'success',
                    position: 'bottom-right'
                });

            }
        })
    })
}

//get data for edit profile
$(document).on('click', '.btnEditProfile', function () {
    var id = $(".sellerId").val();
    REST.get('/api/seller/details/' + id, (err, result) => {
        if (err) {
            $.toast({
                heading: 'Sorry!',
                text: err,
                icon: 'error',
                position: 'bottom-right'
            });
        } else {
            var data = result.data;
            $(".sellerName").val(data.seller_name);
            $(".sellerEmail").val(data.seller_email);
            $(".sellerPhNo").val(data.seller_phoneNumber);
            $(".sellerAddr").val(data.seller_address);
            $("#eidtProfile").modal('show');
        }
    })
})

//seller profile data edit
$("#sellerProfileEditFrm").submit(function (e) {
    e.preventDefault();
    var id = $(".sellerId").val();
    var data = $("#sellerProfileEditFrm").serialize();
    REST.put("/api/seller/update/" + id, data, (err, result) => {
        if (err) {
            $.toast({
                heading: 'Sorry!',
                text: err,
                icon: 'error',
                position: 'bottom-right'
            });
        } else {
            var code = result.code;
            if (code == 200) {
                $.toast({
                    heading: 'Success!',
                    text: 'Updated user!',
                    icon: 'success',
                    position: 'bottom-right'
                });
                window.location.reload();
            } else {
                $.toast({
                    heading: 'Oops!..',
                    text: err,
                    icon: 'warning',
                    position: 'bottom-right'
                });
            }
        }
    })
})


//get data for edit post
$(document).on('click', '.btnEditPost', function () {
    var id = $(this).data("id");
    REST.get('/api/seller/post/details/'+id,(err,result)=>{
        if(err){
            $.toast({ 
                heading: 'Sorry!',
                text: err,
                icon: 'error',
                position: 'bottom-right'
            });
        }else{
            $("#editPostForm").trigger("reset");
            var data = result.data;
            $("#postD").val(id);
            $(".postDescription").val(data.description);
            $(".postQuantity").val(data.qty);
            $(".postUnitPrice").val(data.unit_price);
            $(".modalEdit").modal("show");
        }
    })
})

//seller post data edit
$(document).on("submit", "#editPostForm", function(e){
    e.preventDefault();
    var id = $("#postD").val();
    console.log(id);
    var data = $("#editPostForm").serialize();
    REST.put("/api/seller/post/update/"+id, data, (err, result) => {
        if (err) {
            $.toast({
                heading: 'Sorry!',
                text: err,
                icon: 'error',
                position: 'bottom-right'
            });
        } else {
            var code = result.code;
            if (code == 200) {
                $(".modalEdit").modal("hide");
                window.location.reload();
                $.toast({
                    heading: 'Success!',
                    text: 'Updated Seller!',
                    icon: 'success',
                    position: 'bottom-right'
                });
            } else {
                $.toast({
                    heading: 'Oops!..',
                    text: err,
                    icon: 'warning',
                    position: 'bottom-right'
                });
            }
        }
    })
});
$(document).on('click','.btnDeletePost',function(){
    var id = $(this).data("id");
    REST.delete('/api/seller/post/delete/',id,(err,result)=>{
        if(err){
            $.toast({
                heading: 'Sorry!',
                text: err,
                icon: 'error',
                position: 'bottom-right'
            });
        }else{
        }
    })
})
