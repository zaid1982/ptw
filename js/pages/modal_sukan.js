function ModalSukan() {

    const className = 'ModalSukan';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let sukanId = '';
    let formValidate;

    this.init = function () {
        const vDataMsu = [
            {
                field_id: 'txtMsuKod',
                type: 'text',
                name: 'Kod',
                validator: {
                    notEmpty: true,
                    maxLength: 2
                }
            },
            {
                field_id: 'txtMsuDiskripsi',
                type: 'text',
                name: 'Diskripsi',
                validator: {
                    notEmpty: true,
                    maxLength: 20
                }
            },
            {
                field_id: 'txtMsuKategori',
                type: 'text',
                name: 'Kategori',
                validator: {
                    maxLength: 20
                }
            },
            {
                field_id: 'txtMsuJantina',
                type: 'text',
                name: 'Jantina',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'txtMsuNilai',
                type: 'text',
                name: 'Nilai',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'txtMsuNoPemerolehan',
                type: 'text',
                name: 'No Pemerolehan',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'chkMsuGabYtStatus',
                type: 'checkSingle',
                name: 'Gab',
                validator: {
                }
            },
            {
                field_id: 'chkMsuSukanStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMsu');
        formValidate.registerFields(vDataMsu);

        $('#modal_sukan').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMsuSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMsuSukanStatus']").is(":checked") ? 'Y' : 'T';
                        const gabVal = $("input[name='chkMsuGabYtStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            kod: $('#txtMsuKod').val(),
                            diskripsi: $('#txtMsuDiskripsi').val(),
                            kategori: $('#txtMsuKategori').val(),
                            jantina: $('#txtMsuJantina').val(),
                            nilai: $('#txtMsuNilai').val(),
                            noPemerolehan: $('#txtMsuNoPemerolehan').val(),
                            gabYt: gabVal,
                            sahYt: statusVal
                        };

                        if (sukanId === '') {
                            sukanId = mzAjaxRequest('sukan.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['sukanId'] = sukanId;
                                classFrom.addTableSukan(data);
                            }
                        } else {
                            mzAjaxRequest('sukan.php?sukanId='+sukanId, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTableSukan(data, rowRefresh);
                            }
                        }
                        $('#modal_sukan').modal('hide');
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

    };

    this.add = function () {
        sukanId = '';
        rowRefresh = '';

        ShowLoader();
        setTimeout(function () {
            try {
                formValidate.enableField('txtMsuKod');
                mzSetFieldValue('MsuSukanStatus', 'Y', 'checkSingle', 'Y');
                $('#txtMsuKod').prop('disabled', false);

                $('#modal_sukan').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.edit = function (_sukanId, _rowRefresh) {
        sukanId = _sukanId;
        rowRefresh = _rowRefresh;

        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_sukanId, _rowRefresh]);

                const dataResult = mzAjaxRequest('sukan.php?sukanId='+sukanId, 'GET');
                mzSetFieldValue('MsuKod', dataResult['kod'], 'text');
                mzSetFieldValue('MsuDiskripsi', dataResult['diskripsi'], 'text');
                mzSetFieldValue('MsuKategori', dataResult['kategori'], 'text');
                mzSetFieldValue('MsuJantina', dataResult['jantina'], 'text');
                mzSetFieldValue('MsuNilai', dataResult['nilai'], 'text');
                mzSetFieldValue('MsuNoPemerolehan', dataResult['noPemerolehan'], 'text');
                mzSetFieldValue('MsuGabYtStatus', dataResult['gabYt'], 'checkSingle', 'Y');
                mzSetFieldValue('MsuSukanStatus', dataResult['sahYt'], 'checkSingle', 'Y');
                $('#txtMsuKod').prop('disabled', true);

                $('#modal_sukan').modal({backdrop: 'static', keyboard: false});
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