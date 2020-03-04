function ModalTelco() {

    const className = 'ModalTelco';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let telcoId = '';
    let formValidate;

    this.init = function () {
        const vDataMtl = [
            {
                field_id: 'txtMtlCode',
                type: 'text',
                name: 'Kod Telco',
                validator: {
                    notEmpty: true,
                    digit: true,
                    maxLength: 4
                }
            },
            {
                field_id: 'txtMtlOperatorName',
                type: 'text',
                name: 'Nama Operator',
                validator: {
                    maxLength: 20
                }
            },
            {
                field_id: 'chkOperatorNameStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMtl');
        formValidate.registerFields(vDataMtl);

        $('#modal_telco').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMtlSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMtlTelcoStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            code: $('#txtMtlCode').val(),
                            operatorName: $('#txtMtlOperatorName').val(),
                            sahYt: statusVal
                        };

                        if (telcoId === '') {
                            telcoId = mzAjaxRequest('telco.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['telcoId'] = telcoId;
                                classFrom.addTableTelco(data);
                            }
                        } else {
                            mzAjaxRequest('telco.php?telcoId='+telcoId, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTableTelco(data, rowRefresh);
                            }
                        }
                        $('#modal_telco').modal('hide');
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

    };

    this.add = function () {
        telcoId = '';
        rowRefresh = '';

        ShowLoader();
        setTimeout(function () {
            try {
                formValidate.enableField('txtMtlCode');
                mzSetFieldValue('MtlTelcoStatus', 'Y', 'checkSingle', 'Y');
                $('#txtMtlCode').prop('disabled', false);

                $('#modal_telco').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.edit = function (_telcoId, _rowRefresh) {
        telcoId = _telcoId;
        rowRefresh = _rowRefresh;

        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_telcoId, _rowRefresh]);
                formValidate.disableField('txtMtlCode');

                const dataResult = mzAjaxRequest('telco.php?telcoId='+telcoId, 'GET');
                mzSetFieldValue('MtlCode', dataResult['code'], 'text');
                mzSetFieldValue('MtlOperatorName', dataResult['operatorName'], 'text');
                mzSetFieldValue('MtlTelcoStatus', dataResult['sahYt'], 'checkSingle', 'Y');
                $('#txtMtlCode').prop('disabled', true);

                $('#modal_telco').modal({backdrop: 'static', keyboard: false});
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