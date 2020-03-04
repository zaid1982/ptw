function ModalSijilPangkat() {

    const className = 'ModalSijilPangkat';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let sijilPangkatId = '';
    let formValidate;

    this.init = function () {
        const vDataMsp = [
            {
                field_id: 'txtMspKod',
                type: 'text',
                name: 'Kod',
                validator: {
                    notEmpty: true,
                    digit: true,
                    maxLength: 2
                }
            },
            {
                field_id: 'txtMspTkt',
                type: 'text',
                name: 'Tingkatan',
                validator: {
                    notEmpty: true,
                    maxLength: 1
                }
            },
            {
                field_id: 'txtMspDiskripsi',
                type: 'text',
                name: 'Diskripsi',
                validator: {
                    notEmpty: true,
                    maxLength: 20
                }
            },
            {
                field_id: 'chkMspSijilPangkatStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMsp');
        formValidate.registerFields(vDataMsp);

        $('#modal_sijil_pangkat').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMspSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMspSijilPangkatStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            kod: $('#txtMspKod').val(),
                            tkt: $('#txtMspTkt').val(),
                            diskripsi: $('#txtMspDiskripsi').val(),
                            sahYt: statusVal
                        };

                        if (sijilPangkatId === '') {
                            sijilPangkatId = mzAjaxRequest('sijil_pangkat.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['sijilPangkatId'] = sijilPangkatId;
                                classFrom.addTableSijilPangkat(data);
                            }
                        } else {
                            mzAjaxRequest('sijil_pangkat.php?sijilPangkatId='+sijilPangkatId, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTableSijilPangkat(data, rowRefresh);
                            }
                        }
                        $('#modal_sijil_pangkat').modal('hide');
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

    };

    this.add = function () {
        sijilPangkatId = '';
        rowRefresh = '';

        ShowLoader();
        setTimeout(function () {
            try {
                mzSetFieldValue('MspSijilPangkatStatus', 'Y', 'checkSingle', 'Y');

                $('#modal_sijil_pangkat').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.edit = function (_sijilPangkatId, _rowRefresh) {
        sijilPangkatId = _sijilPangkatId;
        rowRefresh = _rowRefresh;

        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_sijilPangkatId, _rowRefresh]);

                const dataResult = mzAjaxRequest('sijil_pangkat.php?sijilPangkatId='+sijilPangkatId, 'GET');
                mzSetFieldValue('MspKod', dataResult['kod'], 'text');
                mzSetFieldValue('MspTkt', dataResult['tkt'], 'text');
                mzSetFieldValue('MspDiskripsi', dataResult['diskripsi'], 'text');
                mzSetFieldValue('MspSijilPangkatStatus', dataResult['sahYt'], 'checkSingle', 'Y');

                $('#modal_sijil_pangkat').modal({backdrop: 'static', keyboard: false});
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