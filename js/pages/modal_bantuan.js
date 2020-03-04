function ModalBantuan() {

    const className = 'ModalBantuan';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let bantuanId = '';
    let formValidate;

    this.init = function () {
        const vDataMbt = [
            {
                field_id: 'txtMbtKodBantuan',
                type: 'text',
                name: 'Kod Bantuan',
                validator: {
                    notEmpty: true,
                    digit: true,
                    maxLength: 2
                }
            },
            {
                field_id: 'txtMbtBantuan',
                type: 'text',
                name: 'Bantuan',
                validator: {
                    notEmpty: true,
                    maxLength: 100
                }
            },
            {
                field_id: 'chkMbtBantuanStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMbt');
        formValidate.registerFields(vDataMbt);

        $('#modal_bantuan').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMbtSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMbtBantuanStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            kodBantuan: $('#txtMbtKodBantuan').val(),
                            bantuan: $('#txtMbtBantuan').val(),
                            sahYt: statusVal
                        };

                        if (bantuanId === '') {
                            bantuanId = mzAjaxRequest('bantuan.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['bantuanId'] = bantuanId;
                                classFrom.addTableBantuan(data);
                            }
                        } else {
                            mzAjaxRequest('bantuan.php?bantuanId='+bantuanId, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTableBantuan(data, rowRefresh);
                            }
                        }
                        $('#modal_bantuan').modal('hide');
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

    };

    this.add = function () {
        bantuanId = '';
        rowRefresh = '';

        ShowLoader();
        setTimeout(function () {
            try {
                formValidate.enableField('txtMbtKodBantuan');
                mzSetFieldValue('MbtBantuanStatus', 'Y', 'checkSingle', 'Y');
                $('#txtMbtKodBantuan').prop('disabled', false);

                $('#modal_bantuan').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.edit = function (_bantuanId, _rowRefresh) {
        bantuanId = _bantuanId;
        rowRefresh = _rowRefresh;

        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_bantuanId, _rowRefresh]);
                formValidate.disableField('txtMbtKodBantuan');

                const dataResult = mzAjaxRequest('bantuan.php?bantuanId='+bantuanId, 'GET');
                mzSetFieldValue('MbtKodBantuan', dataResult['kodBantuan'], 'text');
                mzSetFieldValue('MbtBantuan', dataResult['bantuan'], 'text');
                mzSetFieldValue('MbtBantuanStatus', dataResult['sahYt'], 'checkSingle', 'Y');
                $('#txtMbtKodBantuan').prop('disabled', true);

                $('#modal_bantuan').modal({backdrop: 'static', keyboard: false});
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