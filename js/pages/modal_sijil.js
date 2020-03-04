function ModalSijil() {

    const className = 'ModalSijil';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let sijilId = '';
    let formValidate;

    this.init = function () {
        const vDataMsj = [
            {
                field_id: 'txtMsjKod',
                type: 'text',
                name: 'Kod',
                validator: {
                    notEmpty: true,
                    digit: true,
                    maxLength: 2
                }
            },
            {
                field_id: 'txtMsjTkt',
                type: 'text',
                name: 'Tingkatan',
                validator: {
                    notEmpty: true,
                    maxLength: 1
                }
            },
            {
                field_id: 'txtMsjDiskripsi',
                type: 'text',
                name: 'Diskripsi',
                validator: {
                    notEmpty: true,
                    maxLength: 20
                }
            },
            {
                field_id: 'chkMsjSijilStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMsj');
        formValidate.registerFields(vDataMsj);

        $('#modal_sijil').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMsjSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMsjSijilStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            kod: $('#txtMsjKod').val(),
                            tkt: $('#txtMsjTkt').val(),
                            diskripsi: $('#txtMsjDiskripsi').val(),
                            sahYt: statusVal
                        };

                        if (sijilId === '') {
                            sijilId = mzAjaxRequest('sijil.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['sijilId'] = sijilId;
                                classFrom.addTableSijil(data);
                            }
                        } else {
                            mzAjaxRequest('sijil.php?sijilId='+sijilId, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTableSijil(data, rowRefresh);
                            }
                        }
                        $('#modal_sijil').modal('hide');
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

    };

    this.add = function () {
        sijilId = '';
        rowRefresh = '';

        ShowLoader();
        setTimeout(function () {
            try {
                mzSetFieldValue('MsjSijilStatus', 'Y', 'checkSingle', 'Y');

                $('#modal_sijil').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.edit = function (_sijilId, _rowRefresh) {
        sijilId = _sijilId;
        rowRefresh = _rowRefresh;

        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_sijilId, _rowRefresh]);

                const dataResult = mzAjaxRequest('sijil.php?sijilId='+sijilId, 'GET');
                mzSetFieldValue('MsjKod', dataResult['kod'], 'text');
                mzSetFieldValue('MsjTkt', dataResult['tkt'], 'text');
                mzSetFieldValue('MsjDiskripsi', dataResult['diskripsi'], 'text');
                mzSetFieldValue('MsjSijilStatus', dataResult['sahYt'], 'checkSingle', 'Y');

                $('#modal_sijil').modal({backdrop: 'static', keyboard: false});
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