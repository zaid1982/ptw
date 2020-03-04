function ModalPeringkat() {

    const className = 'ModalPeringkat';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let peringkatId = '';
    let formValidate;

    this.init = function () {
        const vDataMpr = [
            {
                field_id: 'txtMprKod',
                type: 'text',
                name: 'Kod',
                validator: {
                    notEmpty: true,
                    maxLength: 2
                }
            },
            {
                field_id: 'txtMprDiskripsi',
                type: 'text',
                name: 'Diskripsi',
                validator: {
                    notEmpty: true,
                    maxLength: 20
                }
            },
            {
                field_id: 'txtMprKategori',
                type: 'text',
                name: 'Kategori',
                validator: {
                    maxLength: 20
                }
            },
            {
                field_id: 'txtMprJantina',
                type: 'text',
                name: 'Jantina',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'txtMprNilai',
                type: 'text',
                name: 'Nilai',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'txtMprNoPemerolehan',
                type: 'text',
                name: 'No Pemerolehan',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'chkMprGabYtStatus',
                type: 'checkSingle',
                name: 'Gab',
                validator: {
                }
            },
            {
                field_id: 'chkMprPeringkatStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMpr');
        formValidate.registerFields(vDataMpr);

        $('#modal_peringkat').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMprSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMprPeringkatStatus']").is(":checked") ? 'Y' : 'T';
                        const gabVal = $("input[name='chkMprGabYtStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            kod: $('#txtMprKod').val(),
                            diskripsi: $('#txtMprDiskripsi').val(),
                            kategori: $('#txtMprKategori').val(),
                            jantina: $('#txtMprJantina').val(),
                            nilai: $('#txtMprNilai').val(),
                            noPemerolehan: $('#txtMprNoPemerolehan').val(),
                            gabYt: gabVal,
                            sahYt: statusVal
                        };

                        if (peringkatId === '') {
                            peringkatId = mzAjaxRequest('peringkat.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['peringkatId'] = peringkatId;
                                classFrom.addTablePeringkat(data);
                            }
                        } else {
                            mzAjaxRequest('peringkat.php?peringkatId='+peringkatId, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTablePeringkat(data, rowRefresh);
                            }
                        }
                        $('#modal_peringkat').modal('hide');
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

    };

    this.add = function () {
        peringkatId = '';
        rowRefresh = '';

        ShowLoader();
        setTimeout(function () {
            try {
                formValidate.enableField('txtMprKod');
                mzSetFieldValue('MprPeringkatStatus', 'Y', 'checkSingle', 'Y');
                $('#txtMprKod').prop('disabled', false);

                $('#modal_peringkat').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.edit = function (_peringkatId, _rowRefresh) {
        peringkatId = _peringkatId;
        rowRefresh = _rowRefresh;

        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_peringkatId, _rowRefresh]);

                const dataResult = mzAjaxRequest('peringkat.php?peringkatId='+peringkatId, 'GET');
                mzSetFieldValue('MprKod', dataResult['kod'], 'text');
                mzSetFieldValue('MprDiskripsi', dataResult['diskripsi'], 'text');
                mzSetFieldValue('MprKategori', dataResult['kategori'], 'text');
                mzSetFieldValue('MprJantina', dataResult['jantina'], 'text');
                mzSetFieldValue('MprNilai', dataResult['nilai'], 'text');
                mzSetFieldValue('MprNoPemerolehan', dataResult['noPemerolehan'], 'text');
                mzSetFieldValue('MprGabYtStatus', dataResult['gabYt'], 'checkSingle', 'Y');
                mzSetFieldValue('MprPeringkatStatus', dataResult['sahYt'], 'checkSingle', 'Y');
                $('#txtMprKod').prop('disabled', true);

                $('#modal_peringkat').modal({backdrop: 'static', keyboard: false});
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