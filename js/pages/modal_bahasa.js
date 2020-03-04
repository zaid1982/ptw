function ModalBahasa() {

    const className = 'ModalBahasa';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let bahasaId = '';
    let formValidate;

    this.init = function () {
        const vDataMbh = [
            {
                field_id: 'txtMbhKod',
                type: 'text',
                name: 'Kod',
                validator: {
                    notEmpty: true,
                    maxLength: 4
                }
            },
            {
                field_id: 'txtMbhDiskripsi',
                type: 'text',
                name: 'Diskripsi',
                validator: {
                    notEmpty: true,
                    maxLength: 100
                }
            },
            {
                field_id: 'txtMbhNoPemerolehan',
                type: 'text',
                name: 'No Pemerolehan',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'chkMbhGabYtStatus',
                type: 'checkSingle',
                name: 'Gab',
                validator: {
                }
            },
            {
                field_id: 'chkMbhBahasaStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMbh');
        formValidate.registerFields(vDataMbh);

        $('#modal_bahasa').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMbhSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMbhBahasaStatus']").is(":checked") ? 'Y' : 'T';
                        const gabVal = $("input[name='chkMbhGabYtStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            kod: $('#txtMbhKod').val(),
                            diskripsi: $('#txtMbhDiskripsi').val(),
                            noPemerolehan: $('#txtMbhNoPemerolehan').val(),
                            gabYt: gabVal,
                            sahYt: statusVal
                        };

                        if (bahasaId === '') {
                            bahasaId = mzAjaxRequest('bahasa.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['bahasaId'] = bahasaId;
                                classFrom.addTableBahasa(data);
                            }
                        } else {
                            mzAjaxRequest('bahasa.php?bahasaId='+bahasaId, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTableBahasa(data, rowRefresh);
                            }
                        }
                        $('#modal_bahasa').modal('hide');
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

    };

    this.add = function () {
        bahasaId = '';
        rowRefresh = '';

        ShowLoader();
        setTimeout(function () {
            try {
                mzSetFieldValue('MbhGabYtStatus', 'T', 'checkSingle', 'Y');
                mzSetFieldValue('MbhBahasaStatus', 'Y', 'checkSingle', 'Y');

                $('#modal_bahasa').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.edit = function (_bahasaId, _rowRefresh) {
        bahasaId = _bahasaId;
        rowRefresh = _rowRefresh;

        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_bahasaId, _rowRefresh]);

                const dataResult = mzAjaxRequest('bahasa.php?bahasaId='+bahasaId, 'GET');
                mzSetFieldValue('MbhKod', dataResult['kod'], 'text');
                mzSetFieldValue('MbhDiskripsi', dataResult['diskripsi'], 'text');
                mzSetFieldValue('MbhNoPemerolehan', dataResult['noPemerolehan'], 'text');
                mzSetFieldValue('MbhGabYtStatus', dataResult['gabYt'], 'checkSingle', 'Y');
                mzSetFieldValue('MbhBahasaStatus', dataResult['sahYt'], 'checkSingle', 'Y');

                $('#modal_bahasa').modal({backdrop: 'static', keyboard: false});
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