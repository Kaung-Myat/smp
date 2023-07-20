$(() => {
    getAdminName();

    initBuyer();
    fetchDataBuyer();
    eventsBuyer();

})

getAdminName = () => {
    var adminName = sessionStorage.getItem("admin name");
    $("#adminName").text(adminName);
}

//buyer
initBuyer = () => {
    var columns = [
        { "data": "id" },
        { "data": "buyer_name" },
        { "data": "buyer_email" },
        { "data": "buyer_password" },
        { "data": "buyer_phoneNumber" },
        { "data": "buyer_address" },
        { "data": "status" },
    ];

    var columnsDef = [
        {
            "targets": 7,
            "data": "id",
            "render": function (data, type, row, meta) {
                var dom = ``;
                dom = `
                <div class="text-center d-flex">
                    <button type="button" class="btn btn-danger btn-icon btn-sm m-1 btnDelete" data-id="${data}" data-value="${row.buyer_name}"><i class="fa-solid fa-ban"></i> ban</button>
                    <button type="button" class="btn btn-danger btn-icon btn-sm m-1 btnUnBan" data-id="${data}" data-value="${row.buyer_name}"><i class="fa-regular fa-circle-check"></i> allow</button>
                </div>
                `;
                return dom;
            }
        },
        {
            "targets": 0,
            "data": "id",
            "render": function (data, type, row, meta) {
                var col = `
                <ul class="nav flex-column">
                <li class="nav-item">
                   <span>${++meta.row}</span>
                </li>
              </ul>
            `;
                return col;
            }
        },
        {
            // "targets": 6,
            // "data": "buyer_imgPath",
            // "render": function (data, type, row, meta) {
            //     console.log("Row data", row);
            //     var col = `
            //     <ul class="nav flex-column">
            //     <li class="nav-item">
            //         <img src="${row.seller_profile}" alt="photo" width="100px" height="50px">
            //     </li>
            //   </ul>
            // `;
            //     return col;
            // }
        },
    ];
    Ray.initDataTable('.tbl_buyer', true, columns, columnsDef);
}

fetchDataBuyer = () => {
    REST.get('/api/buyer/list', (err, results) => {
        if (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err,
            });
        } else {
            if (results.data.length > 0) {
                Ray.renderData('.tbl_buyer', results.data);
            }
            sessionStorage.setItem("buyer count", results.data.length)
        }
    });
}

eventsBuyer = () => {

    // buyer ban
    $(document).on('click', '.btnDelete', function () {
        var id = $(this).data('id');
        var value = $(this).data('value');
        REST.ban('/api/buyer/delete/', id, value, (err, result) => {
            if (err) {
                $.toast({
                    heading: 'Sorry!',
                    text: err,
                    icon: 'error',
                    position: 'bottom-right'
                });
            } else {
                location.reload();
                fetchDataBuyer();
            }
        });
    });

    //buyer allow
    $(document).on('click', '.btnUnBan', function () {
        let id = $(this).data('id');
        var value = $(this).data('value');
        REST.put('/api/buyer/admin/allow/' + id, value, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                $.alert({
                    title: 'Alert!',
                    content: 'Allow this user to use!',
                    buttons: {
                        ok:function(){
                            window.location.reload();
                        }
                    }
                });

            }
        })
    })

}