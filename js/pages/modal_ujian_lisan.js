function ModalUjianLisan() {

    const className = 'ModalUjianLisan';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let ujianLisanId = '';
    let formValidate;

    this.init = function () {
        const vDataMul = [
            {
                field_id: 'txtMulKod',
                type: 'text',
                name: 'Kod',
                validator: {
                    notEmpty: true,
                    maxLength: 2
                }
            },
            {
                field_id: 'txtMulTkt',
                type: 'text',
                name: 'Tingkatan',
                validator: {
                    notEmpty: true,
                    maxLength: 1
                }
            },
            {
                field_id: 'txtMulDiskripsi',
                type: 'text',
                name: 'Diskripsi',
                validator: {
                    notEmpty: true,
                    maxLength: 20
                }
            },
            {
                field_id: 'txtMulSusunan',
                type: 'text',
                name: 'Susunan',
                validator: {
                    notEmpty: true,
                    maxLength: 3,
                    numeric: true
                }
            },
            {
                field_id: 'chkMulUjianLisanStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMul');
        formValidate.registerFields(vDataMul);

        $('#modal_ujian_lisan').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMulSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMulUjianLisanStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            kod: $('#txtMulKod').val(),
                            tkt: $('#txtMulTkt').val(),
                            diskripsi: $('#txtMulDiskripsi').val(),
                            susunan: $('#txtMulSusunan').val(),
                            sahYt: statusVal
                        };

                        if (ujianLisanId === '') {
                            ujianLisanId = mzAjaxRequest('ujian_lisan.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['ujianLisanId'] = ujianLisanId;
                                classFrom.addTableUjianLisan(data);
                            }
                        } else {
                            mzAjaxRequest('ujian_lisan.php?ujianLisanId='+ujianLisanId, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTableUjianLisan(data, rowRefresh);
                            }
                        }
                        $('#modal_ujian_lisan').modal('hide');
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

    };

    this.add = function () {
        ujianLisanId = '';
        rowRefresh = '';

        ShowLoader();
        setTimeout(function () {
            try {
                mzSetFieldValue('MulUjianLisanStatus', 'Y', 'checkSingle', 'Y');

                $('#modal_ujian_lisan').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.edit = function (_ujianLisanId, _rowRefresh) {
        ujianLisanId = _ujianLisanId;
        rowRefresh = _rowRefresh;

        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_ujianLisanId, _rowRefresh]);

                const dataResult = mzAjaxRequest('ujian_lisan.php?ujianLisanId='+ujianLisanId, 'GET');
                mzSetFieldValue('MulKod', dataResult['kod'], 'text');
                mzSetFieldValue('MulTkt', dataResult['tkt'], 'text');
                mzSetFieldValue('MulDiskripsi', dataResult['diskripsi'], 'text');
                mzSetFieldValue('MulSusunan', dataResult['susunan'], 'text');
                mzSetFieldValue('MulUjianLisanStatus', dataResult['sahYt'], 'checkSingle', 'Y');

                $('#modal_ujian_lisan').modal({backdrop: 'static', keyboard: false});
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