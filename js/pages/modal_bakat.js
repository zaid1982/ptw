function ModalBakat() {

    const className = 'ModalBakat';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let kod = '';
    let formValidate;

    this.init = function () {
        const vDataMbk = [
            {
                field_id: 'txtMbkKod',
                type: 'text',
                name: 'Kod Bakat',
                validator: {
                    notEmpty: true,
                    numeric: true,
                    min: 1,
                    maxLength: 3
                }
            },
            {
                field_id: 'txtMbkDiskripsi',
                type: 'text',
                name: 'Diskripsi',
                validator: {
                    notEmpty: true,
                    maxLength: 30
                }
            },
            {
                field_id: 'chkMbkBakatStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMbk');
        formValidate.registerFields(vDataMbk);

        $('#modal_bakat').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMbkSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMbkBakatStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            kod: $('#txtMbkKod').val(),
                            diskripsi: $('#txtMbkDiskripsi').val(),
                            sahYt: statusVal
                        };

                        if (kod === '') {
                            kod = mzAjaxRequest('bakat.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['kod'] = kod;
                                classFrom.addTableBakat(data);
                            }
                        } else {
                            mzAjaxRequest('bakat.php?kod='+kod, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTableBakat(data, rowRefresh);
                            }
                        }
                        $('#modal_bakat').modal('hide');
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

    };

    this.add = function () {
        kod = '';
        rowRefresh = '';

        ShowLoader();
        setTimeout(function () {
            try {
                mzSetFieldValue('MbkBakatStatus', 'Y', 'checkSingle', 'Y');
                $('#txtMbkKod').prop('disabled', false);

                $('#modal_bakat').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.edit = function (_kod, _rowRefresh) {
        kod = _kod;
        rowRefresh = _rowRefresh;

        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_kod, _rowRefresh]);

                const dataResult = mzAjaxRequest('bakat.php?kod='+kod, 'GET');
                mzSetFieldValue('MbkKod', dataResult['kod'], 'text');
                mzSetFieldValue('MbkDiskripsi', dataResult['diskripsi'], 'text');
                mzSetFieldValue('MbkBakatStatus', dataResult['sahYt'], 'checkSingle', 'Y');
                $('#txtMbkKod').prop('disabled', true);

                $('#modal_bakat').modal({backdrop: 'static', keyboard: false});
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