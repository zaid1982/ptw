function ModalGredMatapelajaran() {

    const className = 'ModalGredMatapelajaran';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let gredId = '';
    let formValidate;

    this.init = function () {
        const vDataMgm = [
            {
                field_id: 'txtMgmGred',
                type: 'text',
                name: 'Gred',
                validator: {
                    notEmpty: true,
                    maxLength: 15
                }
            },
            {
                field_id: 'txtMgmJenis',
                type: 'text',
                name: 'Jenis',
                validator: {
                    notEmpty: true,
                    maxLength: 1
                }
            },
            {
                field_id: 'txtMgmTkt',
                type: 'text',
                name: 'Tingkatan',
                validator: {
                    notEmpty: true,
                    maxLength: 1
                }
            },
            {
                field_id: 'txtMgmNamaPeperiksaan',
                type: 'text',
                name: 'Nama Peperiksaan',
                validator: {
                    maxLength: 5
                }
            },
            {
                field_id: 'txtMgmSusunan',
                type: 'text',
                name: 'Susunan',
                validator: {
                    maxLength: 2
                }
            },
            {
                field_id: 'chkMgmGredStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMgm');
        formValidate.registerFields(vDataMgm);

        $('#modal_gred_matapelajaran').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMgmSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMgmGredStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            gred: $('#txtMgmGred').val(),
                            jenis: $('#txtMgmJenis').val(),
                            tkt: $('#txtMgmTkt').val(),
                            namaPeperiksaan: $('#txtMgmNamaPeperiksaan').val(),
                            susunan: $('#txtMgmSusunan').val(),
                            sahYt: statusVal
                        };

                        if (gredId === '') {
                            gredId = mzAjaxRequest('gred_matapelajaran.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['gredId'] = gredId;
                                classFrom.addTableGredMatapelajaran(data);
                            }
                        } else {
                            mzAjaxRequest('gred_matapelajaran.php?gredId='+gredId, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTableGredMatapelajaran(data, rowRefresh);
                            }
                        }
                        $('#modal_gred_matapelajaran').modal('hide');
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
                mzSetFieldValue('MgmGredStatus', 'Y', 'checkSingle', 'Y');

                $('#modal_gred_matapelajaran').modal({backdrop: 'static', keyboard: false});
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

                const dataResult = mzAjaxRequest('gred_matapelajaran.php?gredId='+gredId, 'GET');
                mzSetFieldValue('MgmGred', dataResult['gred'], 'text');
                mzSetFieldValue('MgmJenis', dataResult['jenis'], 'text');
                mzSetFieldValue('MgmTkt', dataResult['tkt'], 'text');
                mzSetFieldValue('MgmNamaPeperiksaan', dataResult['namaPeperiksaan'], 'text');
                mzSetFieldValue('MgmSusunan', dataResult['susunan'], 'text');
                mzSetFieldValue('MgmGredStatus', dataResult['sahYt'], 'checkSingle', 'Y');

                $('#modal_gred_matapelajaran').modal({backdrop: 'static', keyboard: false});
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