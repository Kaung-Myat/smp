$(document).ready(function(){
    events();
    login = (data) => {
        REST.loginPost('/auth/seller/login', data, (err, result) => {
            if(err){
                console.log(err);
            }else{
                window.location.href = result.url;
            }
        });
    }

    function events(){
        $("#sellerLoginFrm").submit(function (e) { 
            e.preventDefault();
            var data = $("#sellerLoginFrm").serialize();
            login(data);
        });
    }
    
})