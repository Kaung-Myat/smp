$(() => {
    events();
})


events = () => {
    //buyer create
    $("#buyerSignupFrm").submit(function (e) {
        e.preventDefault();
        // var data = $("#buyerSignupFrm").serialize();
        var data = new FormData(this);
        REST.post('/api/buyer/create', data, (err, result) => {
            if (err) {
                $.tost({
                    heading: 'Something is wrong!',
                    text: err,
                    icon: 'error',
                    position: 'bottom-right'
                })
            } else {
                window.location.href = '/buyer/profile';
            }
        })
    })
}

//get data for edit profile
$(document).on('click','.btnEditProfile',function(){
    var id = $(".buyerId").val();
    REST.get('/api/buyer/details/'+id,(err,result)=>{
        if(err){
            $.toast({ 
                heading: 'Sorry!',
                text: err,
                icon: 'error',
                position: 'bottom-right'
            });
        }else{
            var data = result.data;
            $(".buyerName").val(data.buyer_name);
            $(".buyerEmail").val(data.buyer_email);
            $(".buyerPhNo").val(data.buyer_phoneNumber);
            $(".buyerAddr").val(data.buyer_address);
            $("#eidtProfile").modal('show');
        }
    })
})

//post data edit
$("#buyerProfileEditFrm").submit(function(e){
    e.preventDefault();
    var id = $(".buyerId").val();
    var data = $("#buyerProfileEditFrm").serialize();
    REST.put("/api/buyer/update/"+id,data,(err,result)=>{
        if (err) {
            $.toast({
                heading: 'Sorry!',
                text: err,
                icon: 'error',
                position: 'bottom-right'
            });
        }else{
            var code = result.code;
            if(code == 200){
                $.toast({
                    heading: 'Success!',
                    text: 'Updated buyer!',
                    icon: 'success',
                    position: 'bottom-right'
                });
                location.reload();
            }else{
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
