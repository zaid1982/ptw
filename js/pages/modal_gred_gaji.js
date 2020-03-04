function ModalGredGaji() {

    const className = 'ModalGredGaji';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let gredId = '';
    let formValidate;

    this.init = function () {
        const vDataMgg = [
            {
                field_id: 'txtMggKod',
                type: 'text',
                name: 'Kod',
                validator: {
                    notEmpty: true,
                    maxLength: 5
                }
            },
            {
                field_id: 'txtMggDiskripsi',
                type: 'text',
                name: 'Diskripsi',
                validator: {
                    notEmpty: true,
                    maxLength: 100
                }
            },
            {
                field_id: 'txtMggNoPemerolehan',
                type: 'text',
                name: 'No Pemerolehan',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'chkMggGabYtStatus',
                type: 'checkSingle',
                name: 'Gab',
                validator: {
                }
            },
            {
                field_id: 'chkMggGredStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMgg');
        formValidate.registerFields(vDataMgg);

        $('#modal_gred_gaji').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMggSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMggGredStatus']").is(":checked") ? 'Y' : 'T';
                        const gabVal = $("input[name='chkMggGabYtStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            kod: $('#txtMggKod').val(),
                            diskripsi: $('#txtMggDiskripsi').val(),
                            noPemerolehan: $('#txtMggNoPemerolehan').val(),
                            gabYt: gabVal,
                            sahYt: statusVal
                        };

                        if (gredId === '') {
                            gredId = mzAjaxRequest('gred_gaji.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['gredId'] = gredId;
                                classFrom.addTableGredGaji(data);
                            }
                        } else {
                            mzAjaxRequest('gred_gaji.php?gredId='+gredId, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTableGredGaji(data, rowRefresh);
                            }
                        }
                        $('#modal_gred_gaji').modal('hide');
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

    };

    this.add = function () {
        gredId = '';
        rowRefresh = '';

        ShowLoader();
        setTimeout(function () {
            try {
                formValidate.enableField('txtMggKod');
                mzSetFieldValue('MggGredStatus', 'Y', 'checkSingle', 'Y');
                $('#txtMggKod').prop('disabled', false);

                $('#modal_gred_gaji').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.edit = function (_gredId, _rowRefresh) {
        gredId = _gredId;
        rowRefresh = _rowRefresh;

        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_gredId, _rowRefresh]);

                const dataResult = mzAjaxRequest('gred_gaji.php?gredId='+gredId, 'GET');
                mzSetFieldValue('MggKod', dataResult['kod'], 'text');
                mzSetFieldValue('MggDiskripsi', dataResult['diskripsi'], 'text');
                mzSetFieldValue('MggNoPemerolehan', dataResult['noPemerolehan'], 'text');
                mzSetFieldValue('MggGabYtStatus', dataResult['gabYt'], 'checkSingle', 'Y');
                mzSetFieldValue('MggGredStatus', dataResult['sahYt'], 'checkSingle', 'Y');
                $('#txtMggKod').prop('disabled', true);

                $('#modal_gred_gaji').modal({backdrop: 'static', keyboard: false});
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