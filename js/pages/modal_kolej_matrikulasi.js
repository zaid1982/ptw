function ModalKolejMatrikulasi() {

    const className = 'ModalKolejMatrikulasi';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let kolejId = '';
    let formValidate;

    this.init = function () {
        const vDataMkm = [
            {
                field_id: 'txtMkmKodkolej',
                type: 'text',
                name: 'Kod Kolej',
                validator: {
                    notEmpty: true,
                    digit: true,
                    maxLength: 6
                }
            },
            {
                field_id: 'txtMkmNamakolej',
                type: 'text',
                name: 'Nama Kolej',
                validator: {
                    notEmpty: true,
                    maxLength: 100
                }
            },
            {
                field_id: 'chkMkmKolejStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMkm');
        formValidate.registerFields(vDataMkm);

        $('#modal_kolej_matrikulasi').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMkmSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMkmKolejStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            kodkolej: $('#txtMkmKodkolej').val(),
                            namakolej: $('#txtMkmNamakolej').val(),
                            sahYt: statusVal
                        };

                        if (kolejId === '') {
                            kolejId = mzAjaxRequest('kolej_matrikulasi.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['kolejId'] = kolejId;
                                classFrom.addTableKolejMatrikulasi(data);
                            }
                        } else {
                            mzAjaxRequest('kolej_matrikulasi.php?kolejId='+kolejId, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTableKolejMatrikulasi(data, rowRefresh);
                            }
                        }
                        $('#modal_kolej_matrikulasi').modal('hide');
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

    };

    this.add = function () {
        kolejId = '';
        rowRefresh = '';

        ShowLoader();
        setTimeout(function () {
            try {
                formValidate.enableField('txtMkmKodkolej');
                mzSetFieldValue('MkmKolejStatus', 'Y', 'checkSingle', 'Y');
                $('#txtMkmKodkolej').prop('disabled', false);

                $('#modal_kolej_matrikulasi').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.edit = function (_kolejId, _rowRefresh) {
        kolejId = _kolejId;
        rowRefresh = _rowRefresh;

        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_kolejId, _rowRefresh]);
                formValidate.disableField('txtMkmKodkolej');

                const dataResult = mzAjaxRequest('kolej_matrikulasi.php?kolejId='+kolejId, 'GET');
                mzSetFieldValue('MkmKodkolej', dataResult['kodkolej'], 'text');
                mzSetFieldValue('MkmNamakolej', dataResult['namakolej'], 'text');
                mzSetFieldValue('MkmKolejStatus', dataResult['sahYt'], 'checkSingle', 'Y');
                $('#txtMkmKodkolej').prop('disabled', true);

                $('#modal_kolej_matrikulasi').modal({backdrop: 'static', keyboard: false});
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