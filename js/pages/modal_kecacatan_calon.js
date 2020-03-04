function ModalKecacatanCalon() {

    const className = 'ModalKecacatanCalon';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let kecacatanCalonId = '';
    let formValidate;

    this.init = function () {
        const vDataMkc = [
            {
                field_id: 'txtMkcKod',
                type: 'text',
                name: 'Kod',
                validator: {
                    notEmpty: true,
                    maxLength: 1
                }
            },
            {
                field_id: 'txtMkcDiskripsi',
                type: 'text',
                name: 'Diskripsi',
                validator: {
                    notEmpty: true,
                    maxLength: 30
                }
            },
            {
                field_id: 'txtMkcKategori',
                type: 'text',
                name: 'Kategori',
                validator: {
                    maxLength: 30
                }
            },
            {
                field_id: 'txtMkcJantina',
                type: 'text',
                name: 'Jantina',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'txtMkcNilai',
                type: 'text',
                name: 'Nilai',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'txtMkcNoPemerolehan',
                type: 'text',
                name: 'No Pemerolehan',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'chkMkcGabYtStatus',
                type: 'checkSingle',
                name: 'Gab',
                validator: {
                }
            },
            {
                field_id: 'chkMkcKecacatanCalonStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMkc');
        formValidate.registerFields(vDataMkc);

        $('#modal_kecacatan_calon').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMkcSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMkcKecacatanCalonStatus']").is(":checked") ? 'Y' : 'T';
                        const gabVal = $("input[name='chkMkcGabYtStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            kod: $('#txtMkcKod').val(),
                            diskripsi: $('#txtMkcDiskripsi').val(),
                            kategori: $('#txtMkcKategori').val(),
                            jantina: $('#txtMkcJantina').val(),
                            nilai: $('#txtMkcNilai').val(),
                            noPemerolehan: $('#txtMkcNoPemerolehan').val(),
                            gabYt: gabVal,
                            sahYt: statusVal
                        };

                        if (kecacatanCalonId === '') {
                            kecacatanCalonId = mzAjaxRequest('kecacatan_calon.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['kecacatanCalonId'] = kecacatanCalonId;
                                classFrom.addTableKecacatanCalon(data);
                            }
                        } else {
                            mzAjaxRequest('kecacatan_calon.php?kecacatanCalonId='+kecacatanCalonId, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTableKecacatanCalon(data, rowRefresh);
                            }
                        }
                        $('#modal_kecacatan_calon').modal('hide');
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

    };

    this.add = function () {
        kecacatanCalonId = '';
        rowRefresh = '';

        ShowLoader();
        setTimeout(function () {
            try {
                formValidate.enableField('txtMkcKod');
                mzSetFieldValue('MkcKecacatanCalonStatus', 'Y', 'checkSingle', 'Y');
                $('#txtMkcKod').prop('disabled', false);

                $('#modal_kecacatan_calon').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.edit = function (_kecacatanCalonId, _rowRefresh) {
        kecacatanCalonId = _kecacatanCalonId;
        rowRefresh = _rowRefresh;

        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_kecacatanCalonId, _rowRefresh]);

                const dataResult = mzAjaxRequest('kecacatan_calon.php?kecacatanCalonId='+kecacatanCalonId, 'GET');
                mzSetFieldValue('MkcKod', dataResult['kod'], 'text');
                mzSetFieldValue('MkcDiskripsi', dataResult['diskripsi'], 'text');
                mzSetFieldValue('MkcKategori', dataResult['kategori'], 'text');
                mzSetFieldValue('MkcJantina', dataResult['jantina'], 'text');
                mzSetFieldValue('MkcNilai', dataResult['nilai'], 'text');
                mzSetFieldValue('MkcNoPemerolehan', dataResult['noPemerolehan'], 'text');
                mzSetFieldValue('MkcGabYtStatus', dataResult['gabYt'], 'checkSingle', 'Y');
                mzSetFieldValue('MkcKecacatanCalonStatus', dataResult['sahYt'], 'checkSingle', 'Y');
                $('#txtMkcKod').prop('disabled', true);

                $('#modal_kecacatan_calon').modal({backdrop: 'static', keyboard: false});
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