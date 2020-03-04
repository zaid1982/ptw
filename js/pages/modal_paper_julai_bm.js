function ModalPaperJulaiBm() {

    const className = 'ModalPaperJulaiBm';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let mpelKod = '';
    let formValidate;

    this.init = function () {
        const vDataMpm = [
            {
                field_id: 'txtMpmMpelKod',
                type: 'text',
                name: 'Kod Paper Julai BM',
                validator: {
                    notEmpty: true,
                    numeric: true,
                    min: 1,
                    maxLength: 3
                }
            },
            {
                field_id: 'txtMpmDiskripsi',
                type: 'text',
                name: 'Diskripsi',
                validator: {
                    notEmpty: true,
                    maxLength: 100
                }
            },
            {
                field_id: 'chkMpmPaperJulaiBmStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMpm');
        formValidate.registerFields(vDataMpm);

        $('#modal_paper_julai_bm').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMpmSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMpmPaperJulaiBmStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            mpelKod: $('#txtMpmMpelKod').val(),
                            diskripsi: $('#txtMpmDiskripsi').val(),
                            sahYt: statusVal
                        };

                        if (mpelKod === '') {
                            mpelKod = mzAjaxRequest('paper_julai_bm.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['mpelKod'] = mpelKod;
                                classFrom.addTablePaperJulaiBm(data);
                            }
                        } else {
                            mzAjaxRequest('paper_julai_bm.php?mpelKod='+mpelKod, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTablePaperJulaiBm(data, rowRefresh);
                            }
                        }
                        $('#modal_paper_julai_bm').modal('hide');
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

    };

    this.add = function () {
        mpelKod = '';
        rowRefresh = '';

        ShowLoader();
        setTimeout(function () {
            try {
                mzSetFieldValue('MpmPaperJulaiBmStatus', 'Y', 'checkSingle', 'Y');
                $('#txtMpmMpelKod').prop('disabled', false);

                $('#modal_paper_julai_bm').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.edit = function (_mpelKod, _rowRefresh) {
        mpelKod = _mpelKod;
        rowRefresh = _rowRefresh;

        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_mpelKod, _rowRefresh]);

                const dataResult = mzAjaxRequest('paper_julai_bm.php?mpelKod='+mpelKod, 'GET');
                mzSetFieldValue('MpmMpelKod', dataResult['mpelKod'], 'text');
                mzSetFieldValue('MpmDiskripsi', dataResult['diskripsi'], 'text');
                mzSetFieldValue('MpmPaperJulaiBmStatus', dataResult['sahYt'], 'checkSingle', 'Y');
                $('#txtMpmMpelKod').prop('disabled', true);

                $('#modal_paper_julai_bm').modal({backdrop: 'static', keyboard: false});
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