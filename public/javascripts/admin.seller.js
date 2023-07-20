$(() => {
    getAdminName();

    initSeller();
    fetchDataSeller();
    eventsSeller();

})

getAdminName = () => {
    var adminName = sessionStorage.getItem("admin name");
    $("#adminName").text(adminName);
}

initSeller = () => {
    var columns = [
        { "data": "id" },
        { "data": "seller_name" },
        { "data": "seller_email" },
        { "data": "seller_password" },
        { "data": "seller_phoneNumber" },
        { "data": "seller_address" },
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
                    <button type="button" class="btn btn-danger btn-icon btn-sm m-1  btnDelete" data-id="${data}" data-value="${row.seller_name}"><i class="fa-solid fa-ban"></i> ban</button>
                    <button type="button" class="btn btn-danger btn-icon btn-sm m-1  btnUnBan" data-id="${data}" data-value="${row.seller_name}"><i class="fa-regular fa-circle-check"></i> allow</button>
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
            "targets": 6,
            "data": "buyer_imgPath",
            "render": function (data, type, row, meta) {
                var col = `
                <ul class="nav flex-column">
                <li class="nav-item">
                    <span>${row.status}</span>
                </li>
              </ul>
            `;
                return col;
            }
        },
    ];
    Ray.initDataTable('.tbl_seller', true, columns, columnsDef);
}

fetchDataSeller = () => {
    REST.get('/api/seller/list', (err, results) => {
        if (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err,
            });
        } else {
            if (results.data.length > 0) {
                Ray.renderData('.tbl_seller', results.data);
            }
        }
    });
}

eventsSeller = () => {

    // seller ban
    $(document).on('click', '.btnDelete', function () {
        let id = $(this).data('id');
        var value = $(this).data('value');
        REST.ban('/api/seller/delete/', id, value, (err, result) => {
            if (err) {
                $.toast({
                    heading: 'Sorry!',
                    text: err,
                    icon: 'error',
                    position: 'bottom-right'
                });
            } else {
                location.reload(); 
                fetchDataSeller();
            }
        });
    });

    //seller allow
    $(document).on('click', '.btnUnBan', function () {
        let id = $(this).data('id');
        var value = $(this).data('value');
        REST.put('/api/seller/admin/allow/' + id, value, (err, result) => {
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