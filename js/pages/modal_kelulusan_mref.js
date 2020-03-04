function ModalKelulusanMref() {

    const className = 'ModalKelulusanMref';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let kelulusanId = '';
    let formValidate;

    this.init = function () {
        const vDataMkx = [
            {
                field_id: 'txtMkxKod',
                type: 'text',
                name: 'Kod',
                validator: {
                    notEmpty: true,
                    maxLength: 4
                }
            },
            {
                field_id: 'txtMkxDiskripsi',
                type: 'text',
                name: 'Diskripsi',
                validator: {
                    notEmpty: true,
                    maxLength: 100
                }
            },
            {
                field_id: 'optMkxJenis',
                type: 'select',
                name: 'Jenis',
                validator: {
                }
            },
            {
                field_id: 'optMkxKategori',
                type: 'select',
                name: 'Kategori',
                validator: {
                }
            },
            {
                field_id: 'txtMkxNoPemerolehan',
                type: 'text',
                name: 'No Pemerolehan',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'chkMkxGabYtStatus',
                type: 'checkSingle',
                name: 'Gab',
                validator: {
                }
            },
            {
                field_id: 'chkMkxKelulusanStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMkx');
        formValidate.registerFields(vDataMkx);

        $('#modal_kelulusan_mref').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMkxSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMkxKelulusanStatus']").is(":checked") ? 'Y' : 'T';
                        const gabVal = $("input[name='chkMkxGabYtStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            kod: $('#txtMkxKod').val(),
                            diskripsi: $('#txtMkxDiskripsi').val(),
                            jenis: $('#optMkxJenis').val(),
                            kategori: $('#optMkxKategori').val(),
                            noPemerolehan: $('#txtMkxNoPemerolehan').val(),
                            gabYt: gabVal,
                            sahYt: statusVal
                        };

                        if (kelulusanId === '') {
                            kelulusanId = mzAjaxRequest('kelulusan_mref.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['kelulusanId'] = kelulusanId;
                                classFrom.addTableKelulusanMref(data);
                            }
                        } else {
                            mzAjaxRequest('kelulusan_mref.php?kelulusanId='+kelulusanId, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTableKelulusanMref(data, rowRefresh);
                            }
                        }
                        $('#modal_kelulusan_mref').modal('hide');
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
                mzSetFieldValue('MkxGabYtStatus', 'T', 'checkSingle', 'Y');
                mzSetFieldValue('MkxKelulusanStatus', 'Y', 'checkSingle', 'Y');

                $('#modal_kelulusan_mref').modal({backdrop: 'static', keyboard: false});
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

                const dataResult = mzAjaxRequest('kelulusan_mref.php?kelulusanId='+kelulusanId, 'GET');
                mzSetFieldValue('MkxKod', dataResult['kod'], 'text');
                mzSetFieldValue('MkxDiskripsi', dataResult['diskripsi'], 'text');
                mzSetFieldValue('MkxJenis', dataResult['jenis'], 'select', 'Jenis');
                mzSetFieldValue('MkxKategori', dataResult['kategori'], 'select', 'Kategori');
                mzSetFieldValue('MkxNoPemerolehan', dataResult['noPemerolehan'], 'text');
                mzSetFieldValue('MkxGabYtStatus', dataResult['gabYt'], 'checkSingle', 'Y');
                mzSetFieldValue('MkxKelulusanStatus', dataResult['sahYt'], 'checkSingle', 'Y');

                $('#modal_kelulusan_mref').modal({backdrop: 'static', keyboard: false});
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