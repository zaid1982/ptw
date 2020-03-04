function MainPengurusanPengguna() {

    const className = 'MainPengurusanPengguna';
    let self = this;
    let refStatus;
    let refDesignation;
    let refDepartment;
    let refRole;
    let oTablePps;
    let modalPenggunaClass;
    let modalConfirmDeleteClass;
    
    this.init = function () {
        mzOption('optPpsDesignationId', refDesignation, 'Semua Jawatan / Gred', 'designationId', 'designationDesc', {designationStatus: '1'}, '', false);
        mzOption('optPpsDepartmentId', refDepartment, 'Semua Bahagian', 'departmentId', 'departmentDesc', {departmentStatus: '1'}, '', false);
        mzOption('optPpsRoleId', refRole, 'Semua Peranan', 'roleId', 'roleDesc', {roleStatus: '1'}, '', false);

        oTablePps =  $('#dtPpsList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [2, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTablePps.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkPpsEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTablePps.row(parseInt(rowId)).data();
                        modalPenggunaClass.edit(currentRow['userId'], rowId);
                    }
                });
                $('.lnkPpsDelete').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTablePps.row(parseInt(rowId)).data();
                        modalConfirmDeleteClass.delete(currentRow['userId'], modalPenggunaClass);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'userNoKp'},
                    {mData: 'userFirstName'},
                    {mData: null, mRender: function (data, type, row){
                            return row['designationId'] !== '' ? refDesignation[row['designationId']]['designationDesc'] : '';
                        }},
                    {mData: null, mRender: function (data, type, row){
                            return row['departmentId'] !== '' ? refDepartment[row['departmentId']]['departmentDesc'] : '';
                        }},
                    {mData: null, mRender: function (data, type, row){
                            return row['roleId'] !== '' ? refRole[row['roleId']]['roleDesc'] : '';
                        }},
                    {mData: null, bSortable: false,
                        mRender: function (data, type, row) {
                            return '<h6><span class="badge badge-pill '+refStatus[row['userStatus']]['statusColor']+' z-depth-2">'+refStatus[row['userStatus']]['statusDesc']+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            let label = '<a><i class="fas fa-edit lnkPpsEdit" id="lnkPpsEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>&nbsp;&nbsp;';
                            label += '<a><i class="fas fa-trash-alt lnkPpsDelete" id="lnkPpsDelete_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Hapus"></i></a>';
                            return label;
                        }
                    },
                    {mData: 'userId', visible: false},
                    {mData: 'departmentId', visible: false},
                    {mData: 'designationId', visible: false},
                    {mData: 'roleId', visible: false}
                ]
        });
        $("#dtPpsList_filter").hide();
        $('#txtPpsListSearch').on('keyup change', function () {
            oTablePps.search($(this).val()).draw();
        });

        let cntPps;
        let btnPpsOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3, 4, 5, 6],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntPps = 1;
                        }
                        if (column === 6) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntPps++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTablePps, {
            buttons: [
                $.extend( true, {}, btnPpsOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Pengguna Sistem',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnPpsOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Pengguna Sistem',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnPpsOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Pengguna Sistem',
                    titleAttr: 'Pdf',
                    orientation: 'landscape',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtPpsListExport'));

        $('#btnDtPpsListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableUser();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnPpsAdd').on('click', function () {
            modalPenggunaClass.add();
        });

        $('#btnPpsSearch').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableUser($('#optPpsDesignationId').val(), $('#optPpsDepartmentId').val(), $('#optPpsRoleId').val());
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        this.genTableUser();
    };

    this.genTableUser = function (_designationId, _departmentId, _roleId) {
        const designationId = typeof _designationId === 'undefined' ? '' : _designationId;
        const departmentId = typeof _departmentId === 'undefined' ? '' : _departmentId;
        const roleId = typeof _roleId === 'undefined' ? '' : _roleId;
        const dataUser = mzAjaxRequest('user.php?designationId='+designationId+'&departmentId='+departmentId+'&roleId='+roleId, 'GET');
        oTablePps.clear().rows.add(dataUser).draw();
    };

    this.addTableUser = function (_dataAdd) {
        oTablePps.row.add(_dataAdd).draw();
    };

    this.updateTableUser = function (_dataEdit, _rowEdit) {
        const currentRow = oTablePps.row(_rowEdit).data();
        if (typeof _dataEdit['userNoKp'] !== 'undefined') {
            currentRow['userNoKp'] = _dataEdit['userNoKp'];
        }
        if (typeof _dataEdit['userFirstName'] !== 'undefined') {
            currentRow['userFirstName'] = _dataEdit['userFirstName'];
        }
        if (typeof _dataEdit['designationId'] !== 'undefined') {
            currentRow['designationId'] = _dataEdit['designationId'];
        }
        if (typeof _dataEdit['departmentId'] !== 'undefined') {
            currentRow['departmentId'] = _dataEdit['departmentId'];
        }
        if (typeof _dataEdit['userContactNo'] !== 'undefined') {
            currentRow['userContactNo'] = _dataEdit['userContactNo'];
        }
        if (typeof _dataEdit['userEmail'] !== 'undefined') {
            currentRow['userEmail'] = _dataEdit['userEmail'];
        }
        if (typeof _dataEdit['roleId'] !== 'undefined') {
            currentRow['roleId'] = _dataEdit['roleId'];
        }
        if (typeof _dataEdit['userStatus'] !== 'undefined') {
            currentRow['userStatus'] = _dataEdit['userStatus'];
        }
        oTablePps.row(_rowEdit).data(currentRow).draw();
    };

    this.getClassName = function () {
        return className;
    };

    this.setRefStatus = function (_refStatus) {
        refStatus = _refStatus;
    };

    this.setRefDesignation = function (_refDesignation) {
        refDesignation = _refDesignation;
    };

    this.setRefDepartment = function (_refDepartment) {
        refDepartment = _refDepartment;
    };

    this.setModalPenggunaClass = function (_modalPenggunaClass) {
        modalPenggunaClass = _modalPenggunaClass;
    };

    this.setRefRole = function (_refRole) {
        refRole = _refRole;
    };

    this.setModalConfirmDeleteClass = function (_modalConfirmDeleteClass) {
        modalConfirmDeleteClass = _modalConfirmDeleteClass;
    };
}