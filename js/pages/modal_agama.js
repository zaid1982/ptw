function ModalAgama() {

    const className = 'ModalAgama';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let kodAgama = '';
    let formValidate;

    this.init = function () {
        const vDataMag = [
            {
                field_id: 'txtMagKodAgama',
                type: 'text',
                name: 'Kod Agama',
                validator: {
                    notEmpty: true,
                    digit: true,
                    maxLength: 2
                }
            },
            {
                field_id: 'txtMagAgama',
                type: 'text',
                name: 'Agama',
                validator: {
                    notEmpty: true,
                    maxLength: 30
                }
            },
            {
                field_id: 'chkMagAgamaStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMag');
        formValidate.registerFields(vDataMag);

        $('#modal_agama').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMagSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMagAgamaStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            kodAgama: $('#txtMagKodAgama').val(),
                            agama: $('#txtMagAgama').val(),
                            sahYt: statusVal
                        };

                        if (kodAgama === '') {
                            kodAgama = mzAjaxRequest('agama.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['kodAgama'] = kodAgama;
                                classFrom.addTableAgama(data);
                            }
                        } else {
                            mzAjaxRequest('agama.php?kodAgama='+kodAgama, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTableAgama(data, rowRefresh);
                            }
                        }
                        $('#modal_agama').modal('hide');
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

    };

    this.add = function () {
        kodAgama = '';
        rowRefresh = '';

        ShowLoader();
        setTimeout(function () {
            try {
                formValidate.enableField('txtMagKodAgama');
                mzSetFieldValue('MagAgamaStatus', 'Y', 'checkSingle', 'Y');
                $('#txtMagKodAgama').prop('disabled', false);

                $('#modal_agama').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.edit = function (_kodAgama, _rowRefresh) {
        kodAgama = _kodAgama;
        rowRefresh = _rowRefresh;

        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_kodAgama, _rowRefresh]);
                formValidate.disableField('txtMagKodAgama');

                const dataResult = mzAjaxRequest('agama.php?kodAgama='+kodAgama, 'GET');
                mzSetFieldValue('MagKodAgama', dataResult['kodAgama'], 'text');
                mzSetFieldValue('MagAgama', dataResult['agama'], 'text');
                mzSetFieldValue('MagAgamaStatus', dataResult['sahYt'], 'checkSingle', 'Y');
                $('#txtMagKodAgama').prop('disabled', true);

                $('#modal_agama').modal({backdrop: 'static', keyboard: false});
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