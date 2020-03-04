function ModalPusatTd() {

    const className = 'ModalPusatTd';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let kod = '';
    let formValidate;
    let refNegeri;

    this.init = function () {
        mzOption('optMptNegKod', refNegeri, 'Pilih Negeri *', 'kodNegeri', 'negeri', {sahYt: 'Y'});

        const vDataMpt = [
            {
                field_id: 'txtMptKod',
                type: 'text',
                name: 'Kod',
                validator: {
                    notEmpty: true,
                    digit: true,
                    eqLength: 2
                }
            },
            {
                field_id: 'txtMptDiskripsi',
                type: 'text',
                name: 'Pusat Temu Duga',
                validator: {
                    notEmpty: true,
                    maxLength: 50
                }
            },
            {
                field_id: 'txtMptKodPendek',
                type: 'text',
                name: 'Kod Pendek',
                validator: {
                    maxLength: 5
                }
            },
            {
                field_id: 'optMptNegKod',
                type: 'select',
                name: 'Negeri',
                validator: {
                    notEmpty: true
                }
            },
            {
                field_id: 'txtMptKodKpt',
                type: 'text',
                name: 'Kod Kpt',
                validator: {
                    maxLength: 5
                }
            },
            {
                field_id: 'txtMptJenisPusat',
                type: 'text',
                name: 'Jenis Pusat',
                validator: {
                    maxLength: 5
                }
            },
            {
                field_id: 'chkMptPusatTdStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMpt');
        formValidate.registerFields(vDataMpt);

        $('#modal_pusat_td').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMptSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMptPusatTdStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            kod: $('#txtMptKod').val(),
                            diskripsi: $('#txtMptDiskripsi').val(),
                            kodPendek: $('#txtMptKodPendek').val(),
                            negKod: $('#optMptNegKod').val(),
                            kptKod: $('#txtMptKodKpt').val(),
                            jenisPusat: $('#txtMptJenisPusat').val(),
                            sahYt: statusVal
                        };

                        if (kod === '') {
                            kod = mzAjaxRequest('pusat_td.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['kod'] = kod;
                                classFrom.addTablePusatTd(data);
                            }
                        } else {
                            mzAjaxRequest('pusat_td.php?kod='+kod, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTablePusatTd(data, rowRefresh);
                            }
                        }
                        $('#modal_pusat_td').modal('hide');
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
                formValidate.enableField('txtMptKod');
                mzSetFieldValue('MptPusatTdStatus', 'Y', 'checkSingle', 'Y');
                $('#txtMptKod').prop('disabled', false);

                $('#modal_pusat_td').modal({backdrop: 'static', keyboard: false});
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
                formValidate.disableField('txtMptKod');

                const dataResult = mzAjaxRequest('pusat_td.php?kod='+kod, 'GET');
                mzSetFieldValue('MptKod', dataResult['kod'], 'text');
                mzSetFieldValue('MptDiskripsi', dataResult['diskripsi'], 'text');
                mzSetFieldValue('MptKodPendek', dataResult['kodPendek'], 'text');
                mzSetFieldValue('MptNegKod', dataResult['negKod'], 'select', 'Negeri *');
                mzSetFieldValue('MptKodKpt', dataResult['kptKod'], 'text');
                mzSetFieldValue('MptJenisPusat', dataResult['jenisPusat'], 'text');
                mzSetFieldValue('MptPusatTdStatus', dataResult['sahYt'], 'checkSingle', 'Y');
                $('#txtMptKod').prop('disabled', true);

                $('#modal_pusat_td').modal({backdrop: 'static', keyboard: false});
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