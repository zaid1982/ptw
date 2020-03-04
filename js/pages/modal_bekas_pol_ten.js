function ModalBekasPolTen() {

    const className = 'ModalBekasPolTen';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let bekasPolTenId = '';
    let formValidate;

    this.init = function () {
        const vDataMbp = [
            {
                field_id: 'txtMbpKodBekasPolisTentera',
                type: 'text',
                name: 'Kod Bekas Polis Tentera',
                validator: {
                    notEmpty: true,
                    maxLength: 2
                }
            },
            {
                field_id: 'txtMbpKodPangkat',
                type: 'text',
                name: 'Kod Pangkat',
                validator: {
                    notEmpty: true,
                    maxLength: 2
                }
            },
            {
                field_id: 'txtMbpDiskripsi',
                type: 'text',
                name: 'Diskripsi',
                validator: {
                    maxLength: 50
                }
            },
            {
                field_id: 'txtMbpKodLain',
                type: 'text',
                name: 'Kod Lain',
                validator: {
                    maxLength: 2
                }
            },
            {
                field_id: 'txtMbpMainInd',
                type: 'text',
                name: 'Main Ind',
                validator: {
                    maxLength: 1
                }
            },
            {
                field_id: 'txtMbpSusunanKanan',
                type: 'text',
                name: 'Susunan Kanan',
                validator: {
                    maxLength: 2,
                    numeric: true
                }
            },
            {
                field_id: 'chkMbpBekasPolTenStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMbp');
        formValidate.registerFields(vDataMbp);

        $('#modal_bekas_pol_ten').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMbpSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMbpBekasPolTenStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            kodBekasPolisTentera: $('#txtMbpKodBekasPolisTentera').val(),
                            kodPangkat: $('#txtMbpKodPangkat').val(),
                            diskripsi: $('#txtMbpDiskripsi').val(),
                            kodLain: $('#txtMbpKodLain').val(),
                            mainInd: $('#txtMbpMainInd').val(),
                            susunanKanan: $('#txtMbpSusunanKanan').val(),
                            sahYt: statusVal
                        };

                        if (bekasPolTenId === '') {
                            bekasPolTenId = mzAjaxRequest('bekas_pol_ten.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['bekasPolTenId'] = bekasPolTenId;
                                classFrom.addTableBekasPolTen(data);
                            }
                        } else {
                            mzAjaxRequest('bekas_pol_ten.php?bekasPolTenId='+bekasPolTenId, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTableBekasPolTen(data, rowRefresh);
                            }
                        }
                        $('#modal_bekas_pol_ten').modal('hide');
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

    };

    this.add = function () {
        bekasPolTenId = '';
        rowRefresh = '';

        ShowLoader();
        setTimeout(function () {
            try {
                mzSetFieldValue('MbpBekasPolTenStatus', 'Y', 'checkSingle', 'Y');

                $('#modal_bekas_pol_ten').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.edit = function (_bekasPolTenId, _rowRefresh) {
        bekasPolTenId = _bekasPolTenId;
        rowRefresh = _rowRefresh;

        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_bekasPolTenId, _rowRefresh]);
                formValidate.disableField('txtMbpKodkolej');

                const dataResult = mzAjaxRequest('bekas_pol_ten.php?bekasPolTenId='+bekasPolTenId, 'GET');
                mzSetFieldValue('MbpKodBekasPolisTentera', dataResult['kodBekasPolisTentera'], 'text');
                mzSetFieldValue('MbpKodPangkat', dataResult['kodPangkat'], 'text');
                mzSetFieldValue('MbpDiskripsi', dataResult['diskripsi'], 'text');
                mzSetFieldValue('MbpKodLain', dataResult['kodLain'], 'text');
                mzSetFieldValue('MbpMainInd', dataResult['mainInd'], 'text');
                mzSetFieldValue('MbpSusunanKanan', dataResult['susunanKanan'], 'text');
                mzSetFieldValue('MbpBekasPolTenStatus', dataResult['sahYt'], 'checkSingle', 'Y');

                $('#modal_bekas_pol_ten').modal({backdrop: 'static', keyboard: false});
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