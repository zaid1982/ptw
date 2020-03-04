function ModalTarafJawatan() {

    const className = 'ModalTarafJawatan';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let tarafJawatanId = '';
    let formValidate;

    this.init = function () {
        const vDataMtj = [
            {
                field_id: 'txtMtjKod',
                type: 'text',
                name: 'Kod',
                validator: {
                    notEmpty: true,
                    maxLength: 2
                }
            },
            {
                field_id: 'txtMtjDiskripsi',
                type: 'text',
                name: 'Diskripsi',
                validator: {
                    notEmpty: true,
                    maxLength: 50
                }
            },
            {
                field_id: 'txtMtjKategori',
                type: 'text',
                name: 'Kategori',
                validator: {
                    maxLength: 30
                }
            },
            {
                field_id: 'txtMtjJantina',
                type: 'text',
                name: 'Jantina',
                validator: {
                    maxLength: 20
                }
            },
            {
                field_id: 'txtMtjNilai',
                type: 'text',
                name: 'Nilai',
                validator: {
                    maxLength: 20
                }
            },
            {
                field_id: 'txtMtjNoPemerolehan',
                type: 'text',
                name: 'No Pemerolehan',
                validator: {
                    maxLength: 20
                }
            },
            {
                field_id: 'chkMtjGabYtStatus',
                type: 'checkSingle',
                name: 'Gab',
                validator: {
                }
            },
            {
                field_id: 'chkMtjTarafJawatanStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMtj');
        formValidate.registerFields(vDataMtj);

        $('#modal_taraf_jawatan').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMtjSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMtjTarafJawatanStatus']").is(":checked") ? 'Y' : 'T';
                        const gabVal = $("input[name='chkMtjGabYtStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            kod: $('#txtMtjKod').val(),
                            diskripsi: $('#txtMtjDiskripsi').val(),
                            kategori: $('#txtMtjKategori').val(),
                            jantina: $('#txtMtjJantina').val(),
                            nilai: $('#txtMtjNilai').val(),
                            noPemerolehan: $('#txtMtjNoPemerolehan').val(),
                            gabYt: gabVal,
                            sahYt: statusVal
                        };

                        if (tarafJawatanId === '') {
                            tarafJawatanId = mzAjaxRequest('taraf_jawatan.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['tarafJawatanId'] = tarafJawatanId;
                                classFrom.addTableTarafJawatan(data);
                            }
                        } else {
                            mzAjaxRequest('taraf_jawatan.php?tarafJawatanId='+tarafJawatanId, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTableTarafJawatan(data, rowRefresh);
                            }
                        }
                        $('#modal_taraf_jawatan').modal('hide');
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

    };

    this.add = function () {
        tarafJawatanId = '';
        rowRefresh = '';

        ShowLoader();
        setTimeout(function () {
            try {
                formValidate.enableField('txtMtjKod');
                mzSetFieldValue('MtjTarafJawatanStatus', 'Y', 'checkSingle', 'Y');
                $('#txtMtjKod').prop('disabled', false);

                $('#modal_taraf_jawatan').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.edit = function (_tarafJawatanId, _rowRefresh) {
        tarafJawatanId = _tarafJawatanId;
        rowRefresh = _rowRefresh;

        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_tarafJawatanId, _rowRefresh]);

                const dataResult = mzAjaxRequest('taraf_jawatan.php?tarafJawatanId='+tarafJawatanId, 'GET');
                mzSetFieldValue('MtjKod', dataResult['kod'], 'text');
                mzSetFieldValue('MtjDiskripsi', dataResult['diskripsi'], 'text');
                mzSetFieldValue('MtjKategori', dataResult['kategori'], 'text');
                mzSetFieldValue('MtjJantina', dataResult['jantina'], 'text');
                mzSetFieldValue('MtjNilai', dataResult['nilai'], 'text');
                mzSetFieldValue('MtjNoPemerolehan', dataResult['noPemerolehan'], 'text');
                mzSetFieldValue('MtjGabYtStatus', dataResult['gabYt'], 'checkSingle', 'Y');
                mzSetFieldValue('MtjTarafJawatanStatus', dataResult['sahYt'], 'checkSingle', 'Y');
                $('#txtMtjKod').prop('disabled', true);

                $('#modal_taraf_jawatan').modal({backdrop: 'static', keyboard: false});
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