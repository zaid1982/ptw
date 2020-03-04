function ModalSkimSah() {

    const className = 'ModalSkimSah';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let skimSahId = '';
    let formValidate;

    this.init = function () {
        const vDataMss = [
            {
                field_id: 'txtMssKod',
                type: 'text',
                name: 'Kod',
                validator: {
                    notEmpty: true,
                    maxLength: 5
                }
            },
            {
                field_id: 'txtMssDiskripsi',
                type: 'text',
                name: 'Diskripsi',
                validator: {
                    notEmpty: true,
                    maxLength: 50
                }
            },
            {
                field_id: 'txtMssKumpPkhidmatJkk',
                type: 'text',
                name: 'Kumpulan Perkhidmatan JKK',
                validator: {
                    maxLength: 1
                }
            },
            {
                field_id: 'txtMssAgensi',
                type: 'text',
                name: 'Agensi',
                validator: {
                    maxLength: 5
                }
            },
            {
                field_id: 'chkMssBakatYtStatus',
                type: 'checkSingle',
                name: 'Bakat YT',
                validator: {
                }
            },
            {
                field_id: 'chkMssSkimSahStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMss');
        formValidate.registerFields(vDataMss);

        $('#modal_skim_sah').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMssSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMssSkimSahStatus']").is(":checked") ? 'Y' : 'T';
                        const bakatVal = $("input[name='chkMssBakatYtStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            kod: $('#txtMssKod').val(),
                            diskripsi: $('#txtMssDiskripsi').val(),
                            kumpPkhidmatJkk : $('#txtMssKumpPkhidmatJkk').val(),
                            agensi: $('#txtMssAgensi').val(),
                            bakatYt: bakatVal,
                            sahYt: statusVal
                        };

                        if (skimSahId === '') {
                            skimSahId = mzAjaxRequest('skim_sah.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['skimSahId'] = skimSahId;
                                classFrom.addTableSkimSah(data);
                            }
                        } else {
                            mzAjaxRequest('skim_sah.php?skimSahId='+skimSahId, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTableSkimSah(data, rowRefresh);
                            }
                        }
                        $('#modal_skim_sah').modal('hide');
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

    };

    this.add = function () {
        skimSahId = '';
        rowRefresh = '';

        ShowLoader();
        setTimeout(function () {
            try {
                formValidate.enableField('txtMssKod');
                mzSetFieldValue('MssSkimSahStatus', 'Y', 'checkSingle', 'Y');
                $('#txtMssKod').prop('disabled', false);

                $('#modal_skim_sah').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.edit = function (_skimSahId, _rowRefresh) {
        skimSahId = _skimSahId;
        rowRefresh = _rowRefresh;

        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_skimSahId, _rowRefresh]);

                const dataResult = mzAjaxRequest('skim_sah.php?skimSahId='+skimSahId, 'GET');
                mzSetFieldValue('MssKod', dataResult['kod'], 'text');
                mzSetFieldValue('MssDiskripsi', dataResult['diskripsi'], 'text');
                mzSetFieldValue('MssKumpPkhidmatJkk', dataResult['kumpPkhidmatJkk'], 'text');
                mzSetFieldValue('MssAgensi', dataResult['agensi'], 'text');
                mzSetFieldValue('MssBakatYtStatus', dataResult['bakatYt'], 'checkSingle', 'Y');
                mzSetFieldValue('MssSkimSahStatus', dataResult['sahYt'], 'checkSingle', 'Y');
                $('#txtMssKod').prop('disabled', true);

                $('#modal_skim_sah').modal({backdrop: 'static', keyboard: false});
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