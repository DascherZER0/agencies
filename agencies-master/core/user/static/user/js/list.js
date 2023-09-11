var user = {
    list: function () {
        $('#data').DataTable({
            responsive: true,
            autoWidth: false,
            destroy: true,
            deferRender: true,
            ajax: {
                url: pathname,
                type: 'POST',
                data: {
                    'action': 'search'
                },
                dataSrc: "",
                headers: {
                    'X-CSRFToken': csrftoken
                },
            },
            columns: [
                {"data": "id"},
                {"data": "full_name"},
                {"data": "username"},
                {"data": "date_joined"},
                {"data": "image"},
                {"data": "is_active"},
                {"data": "groups"},
                {"data": "id"},
            ],
            columnDefs: [
                {
                    targets: [0],
                    class: 'text-center',
                    orderable: false,
                    render: function (data, type, row) {
                        if (row.is_staff === true) {
                            return '<span class="badge badge-success badge-pill">' + 'Pre venta' + '</span>';
                        } else{
                            return ' ';
                        }
                    }
                },
                {
                    targets: [4],
                    class: 'text-center',
                    orderable: false,
                    render: function (data, type, row) {
                        return '<img alt="" src="' + row.image + '" class="img-fluid mx-auto d-block" style="width: 20px; height: 20px;">';
                    }
                },
                {
                    targets: [5],
                    class: 'text-center',
                    orderable: false,
                    render: function (data, type, row) {
                        if (data === true) {
                            return '<span class="badge badge-success badge-pill">' + 'Activo' + '</span>';
                        } else {
                            return '<span class="badge badge-danger badge-pill">' + 'Bloqueado' + '</span>';
                        }
                    }
                },
                {
                    targets: [-2],
                    class: 'text-center',
                    orderable: false,
                    render: function (data, type, row) {
                        var html = '';
                        $.each(row.groups, function (key, value) {
                            html += '<span class="badge badge-success">' + value.name + '</span> ';
                        });
                        return html;
                    }
                },
                {
                    targets: [-1],
                    class: 'text-center',
                    orderable: false,
                    render: function (data, type, row) {
                        var buttons = '<a href="' + pathname + 'update/' + row.id + '/" class="btn btn-warning btn-xs btn-flat"><i class="fas fa-edit"></i></a> ';
                        buttons += '<a href="' + pathname + 'delete/' + row.id + '/" type="button" class="btn btn-danger btn-xs btn-flat"><i class="fas fa-trash-alt"></i></a>';
                        return buttons;
                    }
                },
            ],
            initComplete: function (settings, json) {

            }
        });
    }
};

$(function () {
    user.list();
});