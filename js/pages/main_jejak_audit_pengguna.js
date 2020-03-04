function MainJejakAuditPengguna() {

    const className = 'MainJejakAuditPengguna';
    let self = this;
    let refUser;
    let refAuditModule;
    let refAuditAction;
    let oTableJpg;

    this.init = function () {
        mzDateFromTo('txtJpgDateFrom', 'txtJpgDateTo');
        $('#sectionJpgList').hide();
        mzOption('optJpgAuditModuleId', refAuditModule, 'Semua Modul', 'auditModuleId', 'auditModuleDesc', {}, '', false);
        mzOption('optJpgAuditActionId', refAuditAction, 'Semua Proses Maklumat', 'auditActionId', 'auditActionDesc', {auditModuleId: '0'}, '', true, 'auditActionOrder');

        $('#optJpgAuditModuleId').on('change', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    mzOptionStop('optJpgAuditActionId', refAuditAction, 'Semua Proses Maklumat', 'auditActionId', 'auditActionDesc', {auditModuleId: $('#optJpgAuditModuleId').val()}, '', true, 'auditActionOrder');
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });
        
        const vData = [
            {
                field_id: 'txtJpgDateFrom',
                type: 'text',
                name: 'Tarikh Dari',
                validator: {
                    notEmpty: true
                }
            },
            {
                field_id: 'txtJpgDateTo',
                type: 'text',
                name: 'Tarikh Hingga',
                validator: {
                    notEmpty: true
                }
            }
        ];

        let formValidate = new MzValidate('formJpgSearch');
        formValidate.registerFields(vData);

        $('#btnJpgSearch').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableJpg();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        oTableJpg =  $('#dtJpgList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 100,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableJpg.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'auditActionId', mRender: function (data){
                            return data !== '' ? refAuditAction[data]['auditActionDesc'] : '';
                        }},
                    {mData: null, mRender: function (data, type, row){
                            if (row['auditActionId'] !== '') {
                                const moduleId = refAuditAction[row['auditActionId']]['auditModuleId'];
                                return refAuditModule[moduleId]['auditModuleDesc'];
                            }
                            return '';
                        }},
                    {mData: null, mRender: function (data, type, row){
                            return data !== '' ? refUser[row['userId']]['userNoKp'] : '';
                        }},
                    {mData: null, mRender: function (data, type, row){
                            return data !== '' ? refUser[row['userId']]['userFirstName'] : '';
                        }},
                    {mData: 'auditTimestamp'},
                    {mData: 'auditIp'},
                    {mData: 'auditRemark'}
                ]
        });
        $("#dtJpgList_filter").hide();
        $('#txtJpgListSearch').on('keyup change', function () {
            oTableJpg.search($(this).val()).draw();
        });

        let cntJpg;
        let btnJpgOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3, 4, 5, 6, 7],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntJpg = 1;
                        }
                        return column === 0 ? cntJpg++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableJpg, {
            buttons: [
                $.extend( true, {}, btnJpgOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Jejak Audit Pengguna',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnJpgOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Jejak Audit Pengguna',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnJpgOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Jejak Audit Pengguna',
                    titleAttr: 'Pdf',
                    orientation: 'landscape',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtJpgListExport'));

        $('#btnDtJpgListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableJpg();
                } catch (e) {
                }
                HideLoader();
            }, 200);
        });

        $('#btnJpgSearch').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableJpg();
                } catch (e) {
                }
                HideLoader();
            }, 200);
        });
    };

    this.genTableJpg = function () {
        const dataJpg = mzAjaxRequest('audit.php?moduleId='+$('#optJpgAuditModuleId').val()+'&actionId='+$('#optJpgAuditActionId').val()+'&myKadNo='+$('#txtJpgUserMykadNo').val()+'&fullname='+$('#txtJpgUserFullName').val()+'&from='+mzConvertDate($('#txtJpgDateFrom').val())+'&to='+mzConvertDate($('#txtJpgDateTo').val()), 'GET');
        oTableJpg.clear().rows.add(dataJpg).draw();
        $('#sectionJpgList').show();
    };

    this.getClassName = function () {
        return className;
    };

    this.setRefUser = function (_refUser) {
        refUser = _refUser;
    };

    this.setRefAuditModule = function (_refAuditModule) {
        refAuditModule = _refAuditModule;
    };

    this.setRefAuditAction = function (_refAuditAction) {
        refAuditAction = _refAuditAction;
    };
}