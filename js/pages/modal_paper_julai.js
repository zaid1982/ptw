function ModalPaperJulai() {

    const className = 'ModalPaperJulai';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let mpelKod = '';
    let formValidate;

    this.init = function () {
        const vDataMpj = [
            {
                field_id: 'txtMpjMpelKod',
                type: 'text',
                name: 'Kod Paper Julai',
                validator: {
                    notEmpty: true,
                    numeric: true,
                    min: 1,
                    maxLength: 3
                }
            },
            {
                field_id: 'txtMpjDiskripsi',
                type: 'text',
                name: 'Diskripsi',
                validator: {
                    notEmpty: true,
                    maxLength: 20
                }
            },
            {
                field_id: 'chkMpjPaperJulaiStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMpj');
        formValidate.registerFields(vDataMpj);

        $('#modal_paper_julai').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMpjSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMpjPaperJulaiStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            mpelKod: $('#txtMpjMpelKod').val(),
                            diskripsi: $('#txtMpjDiskripsi').val(),
                            sahYt: statusVal
                        };

                        if (mpelKod === '') {
                            mpelKod = mzAjaxRequest('paper_julai.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['mpelKod'] = mpelKod;
                                classFrom.addTablePaperJulai(data);
                            }
                        } else {
                            mzAjaxRequest('paper_julai.php?mpelKod='+mpelKod, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTablePaperJulai(data, rowRefresh);
                            }
                        }
                        $('#modal_paper_julai').modal('hide');
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
                mzSetFieldValue('MpjPaperJulaiStatus', 'Y', 'checkSingle', 'Y');
                $('#txtMpjMpelKod').prop('disabled', false);

                $('#modal_paper_julai').modal({backdrop: 'static', keyboard: false});
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

                const dataResult = mzAjaxRequest('paper_julai.php?mpelKod='+mpelKod, 'GET');
                mzSetFieldValue('MpjMpelKod', dataResult['mpelKod'], 'text');
                mzSetFieldValue('MpjDiskripsi', dataResult['diskripsi'], 'text');
                mzSetFieldValue('MpjPaperJulaiStatus', dataResult['sahYt'], 'checkSingle', 'Y');
                $('#txtMpjMpelKod').prop('disabled', true);

                $('#modal_paper_julai').modal({backdrop: 'static', keyboard: false});
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