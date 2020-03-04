function ModalKeturunan() {

    const className = 'ModalKeturunan';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let kodKeturunan = '';
    let formValidate;

    this.init = function () {
        const vDataMkr = [
            {
                field_id: 'txtMkrKodKeturunan',
                type: 'text',
                name: 'Kod Keturunan',
                validator: {
                    notEmpty: true,
                    digit: true,
                    maxLength: 2
                }
            },
            {
                field_id: 'txtMkrKeturunan',
                type: 'text',
                name: 'Keturunan',
                validator: {
                    notEmpty: true,
                    maxLength: 30
                }
            },
            {
                field_id: 'chkMkrKeturunanStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMkr');
        formValidate.registerFields(vDataMkr);

        $('#modal_keturunan').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMkrSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMkrKeturunanStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            kodKeturunan: $('#txtMkrKodKeturunan').val(),
                            keturunan: $('#txtMkrKeturunan').val(),
                            sahYt: statusVal
                        };

                        if (kodKeturunan === '') {
                            kodKeturunan = mzAjaxRequest('keturunan.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['kodKeturunan'] = kodKeturunan;
                                classFrom.addTableKeturunan(data);
                            }
                        } else {
                            mzAjaxRequest('keturunan.php?kodKeturunan='+kodKeturunan, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTableKeturunan(data, rowRefresh);
                            }
                        }
                        $('#modal_keturunan').modal('hide');
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

    };

    this.add = function () {
        kodKeturunan = '';
        rowRefresh = '';

        ShowLoader();
        setTimeout(function () {
            try {
                formValidate.enableField('txtMkrKodKeturunan');
                mzSetFieldValue('MkrKeturunanStatus', 'Y', 'checkSingle', 'Y');
                $('#txtMkrKodKeturunan').prop('disabled', false);

                $('#modal_keturunan').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.edit = function (_kodKeturunan, _rowRefresh) {
        kodKeturunan = _kodKeturunan;
        rowRefresh = _rowRefresh;

        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_kodKeturunan, _rowRefresh]);
                formValidate.disableField('txtMkrKodKeturunan');

                const dataResult = mzAjaxRequest('keturunan.php?kodKeturunan='+kodKeturunan, 'GET');
                mzSetFieldValue('MkrKodKeturunan', dataResult['kodKeturunan'], 'text');
                mzSetFieldValue('MkrKeturunan', dataResult['keturunan'], 'text');
                mzSetFieldValue('MkrKeturunanStatus', dataResult['sahYt'], 'checkSingle', 'Y');
                $('#txtMkrKodKeturunan').prop('disabled', true);

                $('#modal_keturunan').modal({backdrop: 'static', keyboard: false});
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