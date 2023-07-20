$(document).ready(function(){
    events();
    login = (data) => {
        REST.loginPost('/auth/admin/login', data, (err, result) => {
            if(err){
                console.log(err);
            }else{
                window.location.href = result.url;
            }
        });
    }

    function events(){
        $("#loginForm").submit(function (e) { 
            e.preventDefault();
            var data = $("#loginForm").serialize();
            login(data);
        });
    }
    
})