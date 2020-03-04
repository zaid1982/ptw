function ModalPoskod() {

    const className = 'ModalPoskod';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let poskodId = '';
    let formValidate;
    let refNegeri;

    this.init = function () {
        mzOption('optMpkKodNegeri', refNegeri, 'Pilih Negeri *', 'kodNegeri', 'negeri', {sahYt: 'Y'});

        const vDataMpk = [
            {
                field_id: 'txtMpkPoskod',
                type: 'text',
                name: 'Poskod',
                validator: {
                    notEmpty: true,
                    digit: true,
                    eqLength: 5
                }
            },
            {
                field_id: 'optMpkKodNegeri',
                type: 'select',
                name: 'Negeri',
                validator: {
                    notEmpty: true
                }
            },
            {
                field_id: 'txtMpkLokasi',
                type: 'text',
                name: 'Lokasi',
                validator: {
                    notEmpty: true,
                    maxLength: 70
                }
            },
            {
                field_id: 'txtMpkBandar',
                type: 'text',
                name: 'Bandar',
                validator: {
                    notEmpty: true,
                    maxLength: 30
                }
            },
            {
                field_id: 'chkMpkPoskodStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMpk');
        formValidate.registerFields(vDataMpk);

        $('#modal_poskod').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMpkSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMpkPoskodStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            poskod: $('#txtMpkPoskod').val(),
                            kodNegeri: $('#optMpkKodNegeri').val(),
                            lokasi: $('#txtMpkLokasi').val(),
                            bandar: $('#txtMpkBandar').val(),
                            sahYt: statusVal
                        };

                        if (poskodId === '') {
                            poskodId = mzAjaxRequest('poskod.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['poskodId'] = poskodId;
                                classFrom.addTablePoskod(data);
                            }
                        } else {
                            mzAjaxRequest('poskod.php?poskodId='+poskodId, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTablePoskod(data, rowRefresh);
                            }
                        }
                        $('#modal_poskod').modal('hide');
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

    };

    this.add = function () {
        poskodId = '';
        rowRefresh = '';

        ShowLoader();
        setTimeout(function () {
            try {
                mzSetFieldValue('MpkPoskodStatus', 'Y', 'checkSingle', 'Y');

                $('#modal_poskod').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.edit = function (_poskodId, _rowRefresh) {
        poskodId = _poskodId;
        rowRefresh = _rowRefresh;

        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_poskodId, _rowRefresh]);

                const dataResult = mzAjaxRequest('poskod.php?poskodId='+poskodId, 'GET');
                mzSetFieldValue('MpkPoskod', dataResult['poskod'], 'text');
                mzSetFieldValue('MpkKodNegeri', dataResult['kodNegeri'], 'select', 'Negeri *');
                mzSetFieldValue('MpkLokasi', dataResult['lokasi'], 'text');
                mzSetFieldValue('MpkBandar', dataResult['bandar'], 'text');
                mzSetFieldValue('MpkPoskodStatus', dataResult['sahYt'], 'checkSingle', 'Y');

                $('#modal_poskod').modal({backdrop: 'static', keyboard: false});
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

    this.setRefNegeri = function (_refNegeri) {
        refNegeri = _refNegeri;
    };
}