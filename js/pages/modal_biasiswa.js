function ModalBiasiswa() {

    const className = 'ModalBiasiswa';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let biasiswaId = '';
    let formValidate;

    this.init = function () {
        const vDataMbw = [
            {
                field_id: 'txtMbwKodBiasiswa',
                type: 'text',
                name: 'Kod Biasiswa',
                validator: {
                    notEmpty: true,
                    digit: true,
                    maxLength: 2
                }
            },
            {
                field_id: 'txtMbwBiasiswa',
                type: 'text',
                name: 'Biasiswa',
                validator: {
                    notEmpty: true,
                    maxLength: 100
                }
            },
            {
                field_id: 'chkMbwBiasiswaStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMbw');
        formValidate.registerFields(vDataMbw);

        $('#modal_biasiswa').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMbwSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMbwBiasiswaStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            kodBiasiswa: $('#txtMbwKodBiasiswa').val(),
                            biasiswa: $('#txtMbwBiasiswa').val(),
                            sahYt: statusVal
                        };

                        if (biasiswaId === '') {
                            biasiswaId = mzAjaxRequest('biasiswa.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['biasiswaId'] = biasiswaId;
                                classFrom.addTableBiasiswa(data);
                            }
                        } else {
                            mzAjaxRequest('biasiswa.php?biasiswaId='+biasiswaId, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTableBiasiswa(data, rowRefresh);
                            }
                        }
                        $('#modal_biasiswa').modal('hide');
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

    };

    this.add = function () {
        biasiswaId = '';
        rowRefresh = '';

        ShowLoader();
        setTimeout(function () {
            try {
                formValidate.enableField('txtMbwKodBiasiswa');
                mzSetFieldValue('MbwBiasiswaStatus', 'Y', 'checkSingle', 'Y');
                $('#txtMbwKodBiasiswa').prop('disabled', false);

                $('#modal_biasiswa').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.edit = function (_biasiswaId, _rowRefresh) {
        biasiswaId = _biasiswaId;
        rowRefresh = _rowRefresh;

        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_biasiswaId, _rowRefresh]);
                formValidate.disableField('txtMbwKodBiasiswa');

                const dataResult = mzAjaxRequest('biasiswa.php?biasiswaId='+biasiswaId, 'GET');
                mzSetFieldValue('MbwKodBiasiswa', dataResult['kodBiasiswa'], 'text');
                mzSetFieldValue('MbwBiasiswa', dataResult['biasiswa'], 'text');
                mzSetFieldValue('MbwBiasiswaStatus', dataResult['sahYt'], 'checkSingle', 'Y');
                $('#txtMbwKodBiasiswa').prop('disabled', true);

                $('#modal_biasiswa').modal({backdrop: 'static', keyboard: false});
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