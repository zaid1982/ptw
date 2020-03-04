function ModalJenisPerkhidmatan() {

    const className = 'ModalJenisPerkhidmatan';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let jenisPerkhidmatanId = '';
    let formValidate;

    this.init = function () {
        const vDataMjk = [
            {
                field_id: 'txtMjkKod',
                type: 'text',
                name: 'Kod',
                validator: {
                    notEmpty: true,
                    maxLength: 1
                }
            },
            {
                field_id: 'txtMjkDiskripsi',
                type: 'text',
                name: 'Diskripsi',
                validator: {
                    notEmpty: true,
                    maxLength: 30
                }
            },
            {
                field_id: 'txtMjkKategori',
                type: 'text',
                name: 'Kategori',
                validator: {
                    maxLength: 30
                }
            },
            {
                field_id: 'txtMjkJantina',
                type: 'text',
                name: 'Jantina',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'txtMjkNilai',
                type: 'text',
                name: 'Nilai',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'txtMjkNoPemerolehan',
                type: 'text',
                name: 'No Pemerolehan',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'chkMjkGabYtStatus',
                type: 'checkSingle',
                name: 'Gab',
                validator: {
                }
            },
            {
                field_id: 'chkMjkJenisPerkhidmatanStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMjk');
        formValidate.registerFields(vDataMjk);

        $('#modal_jenis_perkhidmatan').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMjkSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMjkJenisPerkhidmatanStatus']").is(":checked") ? 'Y' : 'T';
                        const gabVal = $("input[name='chkMjkGabYtStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            kod: $('#txtMjkKod').val(),
                            diskripsi: $('#txtMjkDiskripsi').val(),
                            kategori: $('#txtMjkKategori').val(),
                            jantina: $('#txtMjkJantina').val(),
                            nilai: $('#txtMjkNilai').val(),
                            noPemerolehan: $('#txtMjkNoPemerolehan').val(),
                            gabYt: gabVal,
                            sahYt: statusVal
                        };

                        if (jenisPerkhidmatanId === '') {
                            jenisPerkhidmatanId = mzAjaxRequest('jenis_perkhidmatan.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['jenisPerkhidmatanId'] = jenisPerkhidmatanId;
                                classFrom.addTableJenisPerkhidmatan(data);
                            }
                        } else {
                            mzAjaxRequest('jenis_perkhidmatan.php?jenisPerkhidmatanId='+jenisPerkhidmatanId, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTableJenisPerkhidmatan(data, rowRefresh);
                            }
                        }
                        $('#modal_jenis_perkhidmatan').modal('hide');
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

    };

    this.add = function () {
        jenisPerkhidmatanId = '';
        rowRefresh = '';

        ShowLoader();
        setTimeout(function () {
            try {
                formValidate.enableField('txtMjkKod');
                mzSetFieldValue('MjkJenisPerkhidmatanStatus', 'Y', 'checkSingle', 'Y');
                $('#txtMjkKod').prop('disabled', false);

                $('#modal_jenis_perkhidmatan').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.edit = function (_jenisPerkhidmatanId, _rowRefresh) {
        jenisPerkhidmatanId = _jenisPerkhidmatanId;
        rowRefresh = _rowRefresh;

        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_jenisPerkhidmatanId, _rowRefresh]);

                const dataResult = mzAjaxRequest('jenis_perkhidmatan.php?jenisPerkhidmatanId='+jenisPerkhidmatanId, 'GET');
                mzSetFieldValue('MjkKod', dataResult['kod'], 'text');
                mzSetFieldValue('MjkDiskripsi', dataResult['diskripsi'], 'text');
                mzSetFieldValue('MjkKategori', dataResult['kategori'], 'text');
                mzSetFieldValue('MjkJantina', dataResult['jantina'], 'text');
                mzSetFieldValue('MjkNilai', dataResult['nilai'], 'text');
                mzSetFieldValue('MjkNoPemerolehan', dataResult['noPemerolehan'], 'text');
                mzSetFieldValue('MjkGabYtStatus', dataResult['gabYt'], 'checkSingle', 'Y');
                mzSetFieldValue('MjkJenisPerkhidmatanStatus', dataResult['sahYt'], 'checkSingle', 'Y');
                $('#txtMjkKod').prop('disabled', true);

                $('#modal_jenis_perkhidmatan').modal({backdrop: 'static', keyboard: false});
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