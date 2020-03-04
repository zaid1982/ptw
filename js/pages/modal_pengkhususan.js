function ModalPengkhususan() {

    const className = 'ModalPengkhususan';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let pengkhususanId = '';
    let formValidate;
    let refJenisPengkhususan;

    this.init = function () {
        mzOption('optMpsJenisPengkhususanId', refJenisPengkhususan, 'Pilih Jenis Pengkhususan *', 'jenisPengkhususanId', 'diskripsi', {sahYt: 'Y'});

        const vDataMps = [
            {
                field_id: 'txtMpsKod',
                type: 'text',
                name: 'Kod',
                validator: {
                    notEmpty: true,
                    maxLength: 3
                }
            },
            {
                field_id: 'txtMpsDiskripsi',
                type: 'text',
                name: 'Diskripsi',
                validator: {
                    notEmpty: true,
                    maxLength: 100
                }
            },
            {
                field_id: 'optMpsJenisPengkhususanId',
                type: 'select',
                name: 'Jenis Pengkhususan',
                validator: {
                }
            },
            {
                field_id: 'txtMpsBidang',
                type: 'text',
                name: 'Bidang',
                validator: {
                    maxLength: 1
                }
            },
            {
                field_id: 'txtMpsNoPemerolehan',
                type: 'text',
                name: 'No Pemerolehan',
                validator: {
                    maxLength: 20
                }
            },
            {
                field_id: 'chkMpsGabYtStatus',
                type: 'checkSingle',
                name: 'Gab',
                validator: {
                }
            },
            {
                field_id: 'chkMpsPengkhususanStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMps');
        formValidate.registerFields(vDataMps);

        $('#modal_pengkhususan').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMpsSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMpsPengkhususanStatus']").is(":checked") ? 'Y' : 'T';
                        const gabVal = $("input[name='chkMpsGabYtStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            kod: $('#txtMpsKod').val(),
                            diskripsi: $('#txtMpsDiskripsi').val(),
                            jenisPengkhususanId: $('#optMpsJenisPengkhususanId').val(),
                            bidang: $('#txtMpsBidang').val(),
                            noPemerolehan: $('#txtMpsNoPemerolehan').val(),
                            gabYt: gabVal,
                            sahYt: statusVal
                        };

                        if (pengkhususanId === '') {
                            pengkhususanId = mzAjaxRequest('pengkhususan.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['pengkhususanId'] = pengkhususanId;
                                classFrom.addTablePengkhususan(data);
                            }
                        } else {
                            mzAjaxRequest('pengkhususan.php?pengkhususanId='+pengkhususanId, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTablePengkhususan(data, rowRefresh);
                            }
                        }
                        $('#modal_pengkhususan').modal('hide');
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

    };

    this.add = function () {
        pengkhususanId = '';
        rowRefresh = '';

        ShowLoader();
        setTimeout(function () {
            try {
                mzSetFieldValue('MpsGabYtStatus', 'T', 'checkSingle', 'Y');
                mzSetFieldValue('MpsPengkhususanStatus', 'Y', 'checkSingle', 'Y');

                $('#modal_pengkhususan').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.edit = function (_pengkhususanId, _rowRefresh) {
        pengkhususanId = _pengkhususanId;
        rowRefresh = _rowRefresh;

        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_pengkhususanId, _rowRefresh]);

                const dataResult = mzAjaxRequest('pengkhususan.php?pengkhususanId='+pengkhususanId, 'GET');
                mzSetFieldValue('MpsKod', dataResult['kod'], 'text');
                mzSetFieldValue('MpsDiskripsi', dataResult['diskripsi'], 'text');
                mzSetFieldValue('MpsJenisPengkhususanId', dataResult['jenisPengkhususanId'], 'select', 'Jenis');
                mzSetFieldValue('MpsBidang', dataResult['bidang'], 'text');
                mzSetFieldValue('MpsNoPemerolehan', dataResult['noPemerolehan'], 'text');
                mzSetFieldValue('MpsGabYtStatus', dataResult['gabYt'], 'checkSingle', 'Y');
                mzSetFieldValue('MpsPengkhususanStatus', dataResult['sahYt'], 'checkSingle', 'Y');

                $('#modal_pengkhususan').modal({backdrop: 'static', keyboard: false});
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

    this.setRefJenisPengkhususan = function (_refJenisPengkhususan) {
        refJenisPengkhususan = _refJenisPengkhususan;
    };
}