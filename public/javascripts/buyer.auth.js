$(document).ready(function(){
    events();
    login = (data) => {
        REST.loginPost('/auth/buyer/login', data, (err, result) => {
            if(err){
                console.log(err);
            }else{
                window.location.href = result.url;
            }
        });
    }

    function events(){
        $("#buyerLoginFrm").submit(function (e) { 
            e.preventDefault();
            var data = $("#buyerLoginFrm").serialize();
            login(data);
        });
    }
    
})