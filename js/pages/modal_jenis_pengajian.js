function ModalJenisPengajian() {

    const className = 'ModalJenisPengajian';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let jenisPengajianId = '';
    let formValidate;

    this.init = function () {
        const vDataMjp = [
            {
                field_id: 'txtMjpKod',
                type: 'text',
                name: 'Kod',
                validator: {
                    notEmpty: true,
                    maxLength: 1
                }
            },
            {
                field_id: 'txtMjpDiskripsi',
                type: 'text',
                name: 'Diskripsi',
                validator: {
                    notEmpty: true,
                    maxLength: 30
                }
            },
            {
                field_id: 'chkMjpJenisPengajianStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMjp');
        formValidate.registerFields(vDataMjp);

        $('#modal_jenis_pengajian').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMjpSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMjpJenisPengajianStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            kod: $('#txtMjpKod').val(),
                            diskripsi: $('#txtMjpDiskripsi').val(),
                            sahYt: statusVal
                        };

                        if (jenisPengajianId === '') {
                            jenisPengajianId = mzAjaxRequest('jenis_pengajian.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['jenisPengajianId'] = jenisPengajianId;
                                classFrom.addTableJenisPengajian(data);
                            }
                        } else {
                            mzAjaxRequest('jenis_pengajian.php?jenisPengajianId='+jenisPengajianId, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTableJenisPengajian(data, rowRefresh);
                            }
                        }
                        $('#modal_jenis_pengajian').modal('hide');
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

    };

    this.add = function () {
        jenisPengajianId = '';
        rowRefresh = '';

        ShowLoader();
        setTimeout(function () {
            try {
                formValidate.enableField('txtMjpKod');
                mzSetFieldValue('MjpJenisPengajianStatus', 'Y', 'checkSingle', 'Y');
                $('#txtMjpKod').prop('disabled', false);

                $('#modal_jenis_pengajian').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.edit = function (_jenisPengajianId, _rowRefresh) {
        jenisPengajianId = _jenisPengajianId;
        rowRefresh = _rowRefresh;

        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_jenisPengajianId, _rowRefresh]);

                const dataResult = mzAjaxRequest('jenis_pengajian.php?jenisPengajianId='+jenisPengajianId, 'GET');
                mzSetFieldValue('MjpKod', dataResult['kod'], 'text');
                mzSetFieldValue('MjpDiskripsi', dataResult['diskripsi'], 'text');
                mzSetFieldValue('MjpJenisPengajianStatus', dataResult['sahYt'], 'checkSingle', 'Y');
                $('#txtMjpKod').prop('disabled', true);

                $('#modal_jenis_pengajian').modal({backdrop: 'static', keyboard: false});
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