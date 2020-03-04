function ModalSubjekMatrikulasi() {

    const className = 'ModalSubjekMatrikulasi';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let subjId = '';
    let formValidate;

    this.init = function () {
        const vDataMsm = [
            {
                field_id: 'txtMsmSubjCode',
                type: 'text',
                name: 'Kod Subjek',
                validator: {
                    notEmpty: true,
                    maxLength: 8
                }
            },
            {
                field_id: 'txtMsmSubjName',
                type: 'text',
                name: 'Nama Subjek',
                validator: {
                    notEmpty: true,
                    maxLength: 100
                }
            },
            {
                field_id: 'txtMsmSubjCredit',
                type: 'text',
                name: 'Kredit Subjek',
                validator: {
                    maxLength: 5
                }
            },
            {
                field_id: 'txtMsmSubjSemester',
                type: 'text',
                name: 'Semester',
                validator: {
                    notEmpty: true,
                    maxLength: 5
                }
            },
            {
                field_id: 'txtMsmSubjKira',
                type: 'text',
                name: 'Kategori',
                validator: {
                    maxLength: 20
                }
            },
            {
                field_id: 'txtMsmSubjSesi',
                type: 'text',
                name: 'Sesi',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'chkMsmSubjekMatrikulasiStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMsm');
        formValidate.registerFields(vDataMsm);

        $('#modal_subjek_matrikulasi').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMsmSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMsmSubjekMatrikulasiStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            subjCode: $('#txtMsmSubjCode').val(),
                            subjName: $('#txtMsmSubjName').val(),
                            subjCredit: $('#txtMsmSubjCredit').val(),
                            subjSemester: $('#txtMsmSubjSemester').val(),
                            subjKira: $('#txtMsmSubjKira').val(),
                            subjSesi: $('#txtMsmSubjSesi').val(),
                            sahYt: statusVal
                        };

                        if (subjId === '') {
                            subjId = mzAjaxRequest('subjek_matrikulasi.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['subjId'] = subjId;
                                classFrom.addTableSubjekMatrikulasi(data);
                            }
                        } else {
                            mzAjaxRequest('subjek_matrikulasi.php?subjId='+subjId, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTableSubjekMatrikulasi(data, rowRefresh);
                            }
                        }
                        $('#modal_subjek_matrikulasi').modal('hide');
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

    };

    this.add = function () {
        subjId = '';
        rowRefresh = '';

        ShowLoader();
        setTimeout(function () {
            try {
                mzSetFieldValue('MsmSubjekMatrikulasiStatus', 'Y', 'checkSingle', 'Y');

                $('#modal_subjek_matrikulasi').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.edit = function (_subjId, _rowRefresh) {
        subjId = _subjId;
        rowRefresh = _rowRefresh;

        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_subjId, _rowRefresh]);
                formValidate.disableField('txtMsmKodkolej');

                const dataResult = mzAjaxRequest('subjek_matrikulasi.php?subjId='+subjId, 'GET');
                mzSetFieldValue('MsmSubjCode', dataResult['subjCode'], 'text');
                mzSetFieldValue('MsmSubjName', dataResult['subjName'], 'text');
                mzSetFieldValue('MsmSubjCredit', dataResult['subjCredit'], 'text');
                mzSetFieldValue('MsmSubjSemester', dataResult['subjSemester'], 'text');
                mzSetFieldValue('MsmSubjKira', dataResult['subjKira'], 'text');
                mzSetFieldValue('MsmSubjSesi', dataResult['subjSesi'], 'text');
                mzSetFieldValue('MsmSubjekMatrikulasiStatus', dataResult['sahYt'], 'checkSingle', 'Y');

                $('#modal_subjek_matrikulasi').modal({backdrop: 'static', keyboard: false});
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