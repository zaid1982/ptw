function ModalJenisPengkhususan() {

    const className = 'ModalJenisPengkhususan';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let jenisPengkhususanId = '';
    let formValidate;

    this.init = function () {
        const vDataMjs = [
            {
                field_id: 'txtMjsKod',
                type: 'text',
                name: 'Kod',
                validator: {
                    notEmpty: true,
                    maxLength: 1
                }
            },
            {
                field_id: 'txtMjsDiskripsi',
                type: 'text',
                name: 'Diskripsi',
                validator: {
                    notEmpty: true,
                    maxLength: 30
                }
            },
            {
                field_id: 'txtMjsKategori',
                type: 'text',
                name: 'Kategori',
                validator: {
                    maxLength: 30
                }
            },
            {
                field_id: 'txtMjsJantina',
                type: 'text',
                name: 'Jantina',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'txtMjsNilai',
                type: 'text',
                name: 'Nilai',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'txtMjsNoPemerolehan',
                type: 'text',
                name: 'No Pemerolehan',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'chkMjsGabYtStatus',
                type: 'checkSingle',
                name: 'Gab',
                validator: {
                }
            },
            {
                field_id: 'chkMjsJenisPengkhususanStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMjs');
        formValidate.registerFields(vDataMjs);

        $('#modal_jenis_pengkhususan').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMjsSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMjsJenisPengkhususanStatus']").is(":checked") ? 'Y' : 'T';
                        const gabVal = $("input[name='chkMjsGabYtStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            kod: $('#txtMjsKod').val(),
                            diskripsi: $('#txtMjsDiskripsi').val(),
                            kategori: $('#txtMjsKategori').val(),
                            jantina: $('#txtMjsJantina').val(),
                            nilai: $('#txtMjsNilai').val(),
                            noPemerolehan: $('#txtMjsNoPemerolehan').val(),
                            gabYt: gabVal,
                            sahYt: statusVal
                        };

                        if (jenisPengkhususanId === '') {
                            jenisPengkhususanId = mzAjaxRequest('jenis_pengkhususan.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['jenisPengkhususanId'] = jenisPengkhususanId;
                                classFrom.addTableJenisPengkhususan(data);
                            }
                        } else {
                            mzAjaxRequest('jenis_pengkhususan.php?jenisPengkhususanId='+jenisPengkhususanId, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTableJenisPengkhususan(data, rowRefresh);
                            }
                        }
                        $('#modal_jenis_pengkhususan').modal('hide');
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

    };

    this.add = function () {
        jenisPengkhususanId = '';
        rowRefresh = '';

        ShowLoader();
        setTimeout(function () {
            try {
                formValidate.enableField('txtMjsKod');
                mzSetFieldValue('MjsJenisPengkhususanStatus', 'Y', 'checkSingle', 'Y');
                $('#txtMjsKod').prop('disabled', false);

                $('#modal_jenis_pengkhususan').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.edit = function (_jenisPengkhususanId, _rowRefresh) {
        jenisPengkhususanId = _jenisPengkhususanId;
        rowRefresh = _rowRefresh;

        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_jenisPengkhususanId, _rowRefresh]);

                const dataResult = mzAjaxRequest('jenis_pengkhususan.php?jenisPengkhususanId='+jenisPengkhususanId, 'GET');
                mzSetFieldValue('MjsKod', dataResult['kod'], 'text');
                mzSetFieldValue('MjsDiskripsi', dataResult['diskripsi'], 'text');
                mzSetFieldValue('MjsKategori', dataResult['kategori'], 'text');
                mzSetFieldValue('MjsJantina', dataResult['jantina'], 'text');
                mzSetFieldValue('MjsNilai', dataResult['nilai'], 'text');
                mzSetFieldValue('MjsNoPemerolehan', dataResult['noPemerolehan'], 'text');
                mzSetFieldValue('MjsGabYtStatus', dataResult['gabYt'], 'checkSingle', 'Y');
                mzSetFieldValue('MjsJenisPengkhususanStatus', dataResult['sahYt'], 'checkSingle', 'Y');
                $('#txtMjsKod').prop('disabled', true);

                $('#modal_jenis_pengkhususan').modal({backdrop: 'static', keyboard: false});
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