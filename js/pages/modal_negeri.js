function ModalNegeri() {

    const className = 'ModalNegeri';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let kodNegeri = '';
    let formValidate;

    this.init = function () {
        const vDataMng = [
            {
                field_id: 'txtMngKodNegeri',
                type: 'text',
                name: 'Kod Negeri',
                validator: {
                    notEmpty: true,
                    digit: true,
                    maxLength: 2
                }
            },
            {
                field_id: 'txtMngNegeri',
                type: 'text',
                name: 'Negeri',
                validator: {
                    notEmpty: true,
                    maxLength: 40
                }
            },
            {
                field_id: 'chkMngNegeriStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMng');
        formValidate.registerFields(vDataMng);

        $('#modal_negeri').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMngSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMngNegeriStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            kodNegeri: $('#txtMngKodNegeri').val(),
                            negeri: $('#txtMngNegeri').val(),
                            sahYt: statusVal
                        };

                        if (kodNegeri === '') {
                            kodNegeri = mzAjaxRequest('negeri.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['kodNegeri'] = kodNegeri;
                                classFrom.addTableNegeri(data);
                            }
                        } else {
                            mzAjaxRequest('negeri.php?kodNegeri='+kodNegeri, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTableNegeri(data, rowRefresh);
                            }
                        }
                        $('#modal_negeri').modal('hide');
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

    };

    this.add = function () {
        kodNegeri = '';
        rowRefresh = '';

        ShowLoader();
        setTimeout(function () {
            try {
                formValidate.enableField('txtMngKodNegeri');
                mzSetFieldValue('MngNegeriStatus', 'Y', 'checkSingle', 'Y');
                $('#txtMngKodNegeri').prop('disabled', false);

                $('#modal_negeri').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.edit = function (_kodNegeri, _rowRefresh) {
        kodNegeri = _kodNegeri;
        rowRefresh = _rowRefresh;

        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_kodNegeri, _rowRefresh]);
                formValidate.disableField('txtMngKodNegeri');

                const dataResult = mzAjaxRequest('negeri.php?kodNegeri='+kodNegeri, 'GET');
                mzSetFieldValue('MngKodNegeri', dataResult['kodNegeri'], 'text');
                mzSetFieldValue('MngNegeri', dataResult['negeri'], 'text');
                mzSetFieldValue('MngNegeriStatus', dataResult['sahYt'], 'checkSingle', 'Y');
                $('#txtMngKodNegeri').prop('disabled', true);

                $('#modal_negeri').modal({backdrop: 'static', keyboard: false});
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