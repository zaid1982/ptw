function ModalBakatDetail() {

    const className = 'ModalBakatDetail';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let kod = '';
    let formValidate;
    let refBakat;

    this.init = function () {
        mzOption('optMbdKodbakat', refBakat, 'Pilih Bakat *', 'kod', 'diskripsi', {sahYt: 'Y'});

        const vDataMbd = [
            {
                field_id: 'txtMbdKod',
                type: 'text',
                name: 'Kod Bakat Terperinci',
                validator: {
                    notEmpty: true,
                    numeric: true,
                    min: 1,
                    maxLength: 4
                }
            },
            {
                field_id: 'optMbdKodbakat',
                type: 'select',
                name: 'Bakat',
                validator: {
                    notEmpty: true
                }
            },
            {
                field_id: 'txtMbdDiskripsi',
                type: 'text',
                name: 'Diskripsi',
                validator: {
                    notEmpty: true,
                    maxLength: 50
                }
            },
            {
                field_id: 'chkMbdBakatStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMbd');
        formValidate.registerFields(vDataMbd);

        $('#modal_bakat_detail').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMbdSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMbdBakatStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            kod: $('#txtMbdKod').val(),
                            kodbakat: $('#optMbdKodbakat').val(),
                            diskripsi: $('#txtMbdDiskripsi').val(),
                            sahYt: statusVal
                        };

                        if (kod === '') {
                            kod = mzAjaxRequest('bakat_detail.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['kod'] = kod;
                                classFrom.addTableBakatDetail(data);
                            }
                        } else {
                            mzAjaxRequest('bakat_detail.php?kod='+kod, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTableBakatDetail(data, rowRefresh);
                            }
                        }
                        $('#modal_bakat_detail').modal('hide');
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
                mzSetFieldValue('MbdBakatStatus', 'Y', 'checkSingle', 'Y');
                $('#txtMbdKod').prop('disabled', false);

                $('#modal_bakat_detail').modal({backdrop: 'static', keyboard: false});
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

                const dataResult = mzAjaxRequest('bakat_detail.php?kod='+kod, 'GET');
                mzSetFieldValue('MbdKod', dataResult['kod'], 'text');
                mzSetFieldValue('MbdKodbakat', dataResult['kodbakat'], 'select', 'Bakat *');
                mzSetFieldValue('MbdDiskripsi', dataResult['diskripsi'], 'text');
                mzSetFieldValue('MbdBakatStatus', dataResult['sahYt'], 'checkSingle', 'Y');
                $('#txtMbdKod').prop('disabled', true);

                $('#modal_bakat_detail').modal({backdrop: 'static', keyboard: false});
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

    this.setRefBakat = function (_refBakat) {
        refBakat = _refBakat;
    };
}