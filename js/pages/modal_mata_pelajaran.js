function ModalMataPelajaran() {

    const className = 'ModalMataPelajaran';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let kod = '';
    let formValidate;

    this.init = function () {
        const vDataMmp = [
            {
                field_id: 'txtMmpKod',
                type: 'text',
                name: 'Kod',
                validator: {
                    notEmpty: true,
                    digit: true,
                    eqLength: 3
                }
            },
            {
                field_id: 'txtMmpTkt',
                type: 'text',
                name: 'Tingkatan',
                validator: {
                    notEmpty: true,
                    numeric: true,
                    min: 1,
                    max: 6
                }
            },
            {
                field_id: 'txtMmpDiskripsi',
                type: 'text',
                name: 'Mata Pelajaran',
                validator: {
                    notEmpty: true,
                    maxLength: 50
                }
            },
            {
                field_id: 'txtMmpNoPemerolehan',
                type: 'text',
                name: 'No Pemerolehan',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'chkMmpGabYtStatus',
                type: 'checkSingle',
                name: 'Gab',
                validator: {
                }
            },
            {
                field_id: 'chkMmpMataPelajaranStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMmp');
        formValidate.registerFields(vDataMmp);

        $('#modal_mata_pelajaran').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMmpSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const gabYt = $("input[name='chkMmpGabYtStatus']").is(":checked") ? 'Y' : 'T';
                        const statusVal = $("input[name='chkMmpMataPelajaranStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            kod: $('#txtMmpKod').val(),
                            tkt: $('#txtMmpTkt').val(),
                            diskripsi: $('#txtMmpDiskripsi').val(),
                            noPemerolehan: $('#txtMmpNoPemerolehan').val(),
                            gabYt: gabYt,
                            sahYt: statusVal
                        };

                        if (kod === '') {
                            kod = mzAjaxRequest('mata_pelajaran.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['kod'] = kod;
                                classFrom.addTableMataPelajaran(data);
                            }
                        } else {
                            mzAjaxRequest('mata_pelajaran.php?kod='+kod, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTableMataPelajaran(data, rowRefresh);
                            }
                        }
                        $('#modal_mata_pelajaran').modal('hide');
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

    };

    this.add = function () {
        kod = '';
        rowRefresh = '';

        ShowLoader();
        setTimeout(function () {
            try {
                formValidate.enableField('txtMmpKod');
                mzSetFieldValue('MmpMataPelajaranStatus', 'Y', 'checkSingle', 'Y');
                $('#txtMmpKod').prop('disabled', false);

                $('#modal_mata_pelajaran').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.edit = function (_kod, _rowRefresh) {
        kod = _kod;
        rowRefresh = _rowRefresh;

        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_kod, _rowRefresh]);
                formValidate.disableField('txtMmpKod');

                const dataResult = mzAjaxRequest('mata_pelajaran.php?kod='+kod, 'GET');
                mzSetFieldValue('MmpKod', dataResult['kod'], 'text');
                mzSetFieldValue('MmpTkt', dataResult['tkt'], 'text');
                mzSetFieldValue('MmpDiskripsi', dataResult['diskripsi'], 'text');
                mzSetFieldValue('MmpNoPemerolehan', dataResult['noPemerolehan'], 'text');
                mzSetFieldValue('MmpGabYtStatus', dataResult['gabYt'], 'checkSingle', 'Y');
                mzSetFieldValue('MmpMataPelajaranStatus', dataResult['sahYt'], 'checkSingle', 'Y');
                $('#txtMmpKod').prop('disabled', true);

                $('#modal_mata_pelajaran').modal({backdrop: 'static', keyboard: false});
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