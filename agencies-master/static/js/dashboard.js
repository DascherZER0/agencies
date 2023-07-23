var info = {
    callInfo: function () {
        $.ajax({
            url: window.location.pathname,
            type: 'POST',
            data: {'action': 'search_cards_data'},
            dataType: 'json',
            headers: {
                'X-CSRFToken': csrftoken
            },
        }).done(function (data) {
            $.each(data, v => {
                $(`#${v}`).text(data[v])
            });
        })
    }
};

$(function () {
    info.callInfo()
    setInterval(function () {
        info.callInfo()
    }, 15000)


    $('#lower').on('click', function () {

        let config = [
            {
                targets: [3],
                class: 'text-center',
                render: function (data, type, row) {
                    if (row.stock > 6) {
                        return '<span class="badge badge-success">' + data + '</span>';
                    } else if (row.stock === 0) {
                        return '<span class="badge badge-secondary">Sin stock</span>';
                    } else {
                        return '<span class="badge badge-danger">' + data + '</span>';
                    }
                }
            },
            {
                targets: [4],
                class: 'text-center',
                render: function (data, type, row) {
                    return '$' + parseFloat(data).toFixed(2);
                }
            },
        ]
        let data = {
            'action': 'search_lower_inventory',
            'inserInto': 'rowModal',
            'th': ['id', 'Nombre', 'Categoria', 'Stock', 'Costo'],
            'table': 'tableModal',
            'config': config,
            'modal': true,
        }
        drawTables(data);
    })

    $('#btn-sale-products').on('click', function () {
        $('#myModalLowerInvetory').modal('hide');

    })

    // Funcion para poder ver los costos y ganancias del inventario
    $('#pro').on('click', function () {

        let config = [
            {
                targets: [1, 2],
                class: 'text-center',
                render: function (data, type, row) {
                    return 'C$ ' + parseFloat(data).toFixed(2);
                }
            },
        ]
        let data = {
            'action': 'search_investment',
            'inserInto': 'rowModal',
            'th': ['Nro', 'Inversión', 'Ganancia'],
            'table': 'tableModal',
            'config': config,
            'modal': true,
        }
        drawTables(data);
    })


})