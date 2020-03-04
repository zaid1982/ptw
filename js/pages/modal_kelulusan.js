function ModalKelulusan() {

    const className = 'ModalKelulusan';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let kelulusanId = '';
    let formValidate;

    this.init = function () {
        const vDataMkl = [
            {
                field_id: 'txtMklKod',
                type: 'text',
                name: 'Kod',
                validator: {
                    notEmpty: true,
                    maxLength: 4
                }
            },
            {
                field_id: 'txtMklDiskripsi',
                type: 'text',
                name: 'Diskripsi',
                validator: {
                    notEmpty: true,
                    maxLength: 100
                }
            },
            {
                field_id: 'optMklJenis',
                type: 'select',
                name: 'Jenis',
                validator: {
                }
            },
            {
                field_id: 'optMklKategori',
                type: 'select',
                name: 'Kategori',
                validator: {
                }
            },
            {
                field_id: 'txtMklNoPemerolehan',
                type: 'text',
                name: 'No Pemerolehan',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'chkMklGabYtStatus',
                type: 'checkSingle',
                name: 'Gab',
                validator: {
                }
            },
            {
                field_id: 'chkMklKelulusanStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMkl');
        formValidate.registerFields(vDataMkl);

        $('#modal_kelulusan').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMklSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMklKelulusanStatus']").is(":checked") ? 'Y' : 'T';
                        const gabVal = $("input[name='chkMklGabYtStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            kod: $('#txtMklKod').val(),
                            diskripsi: $('#txtMklDiskripsi').val(),
                            jenis: $('#optMklJenis').val(),
                            kategori: $('#optMklKategori').val(),
                            noPemerolehan: $('#txtMklNoPemerolehan').val(),
                            gabYt: gabVal,
                            sahYt: statusVal
                        };

                        if (kelulusanId === '') {
                            kelulusanId = mzAjaxRequest('kelulusan.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['kelulusanId'] = kelulusanId;
                                classFrom.addTableKelulusan(data);
                            }
                        } else {
                            mzAjaxRequest('kelulusan.php?kelulusanId='+kelulusanId, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTableKelulusan(data, rowRefresh);
                            }
                        }
                        $('#modal_kelulusan').modal('hide');
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

    };

    this.add = function () {
        kelulusanId = '';
        rowRefresh = '';

        ShowLoader();
        setTimeout(function () {
            try {
                mzSetFieldValue('MklGabYtStatus', 'T', 'checkSingle', 'Y');
                mzSetFieldValue('MklKelulusanStatus', 'Y', 'checkSingle', 'Y');

                $('#modal_kelulusan').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.edit = function (_kelulusanId, _rowRefresh) {
        kelulusanId = _kelulusanId;
        rowRefresh = _rowRefresh;

        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_kelulusanId, _rowRefresh]);

                const dataResult = mzAjaxRequest('kelulusan.php?kelulusanId='+kelulusanId, 'GET');
                mzSetFieldValue('MklKod', dataResult['kod'], 'text');
                mzSetFieldValue('MklDiskripsi', dataResult['diskripsi'], 'text');
                mzSetFieldValue('MklJenis', dataResult['jenis'], 'select', 'Jenis');
                mzSetFieldValue('MklKategori', dataResult['kategori'], 'select', 'Kategori');
                mzSetFieldValue('MklNoPemerolehan', dataResult['noPemerolehan'], 'text');
                mzSetFieldValue('MklGabYtStatus', dataResult['gabYt'], 'checkSingle', 'Y');
                mzSetFieldValue('MklKelulusanStatus', dataResult['sahYt'], 'checkSingle', 'Y');

                $('#modal_kelulusan').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.getClassName = function () {
        return className;
    };

    this.setClassFrom = function (_classFrom) {
        classFrom = _classFrom;
    };
}