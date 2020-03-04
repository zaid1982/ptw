function ModalInstitusi() {

    const className = 'ModalInstitusi';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let institusiId = '';
    let formValidate;
    let refKategoriInstitusi;

    this.init = function () {
        mzOption('optMisKategoriInstitusiId', refKategoriInstitusi, 'Pilih Jenis Institusi *', 'kategoriInstitusiId', 'diskripsi', {sahYt: 'Y'});

        const vDataMis = [
            {
                field_id: 'txtMisKod',
                type: 'text',
                name: 'Kod',
                validator: {
                    notEmpty: true,
                    maxLength: 4
                }
            },
            {
                field_id: 'txtMisDiskripsi',
                type: 'text',
                name: 'Diskripsi',
                validator: {
                    notEmpty: true,
                    maxLength: 100
                }
            },
            {
                field_id: 'optMisKategoriInstitusiId',
                type: 'select',
                name: 'Jenis Institusi',
                validator: {
                }
            },
            {
                field_id: 'txtMisNegara',
                type: 'text',
                name: 'Negara',
                validator: {
                    maxLength: 5
                }
            },
            {
                field_id: 'txtMisKategori',
                type: 'text',
                name: 'Kategori',
                validator: {
                    maxLength: 255
                }
            },
            {
                field_id: 'txtMisNoPemerolehan',
                type: 'text',
                name: 'No Pemerolehan',
                validator: {
                    maxLength: 20
                }
            },
            {
                field_id: 'chkMisGabYtStatus',
                type: 'checkSingle',
                name: 'Gab',
                validator: {
                }
            },
            {
                field_id: 'chkMisInstitusiStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMis');
        formValidate.registerFields(vDataMis);

        $('#modal_institusi').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMisSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMisInstitusiStatus']").is(":checked") ? 'Y' : 'T';
                        const gabVal = $("input[name='chkMisGabYtStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            kod: $('#txtMisKod').val(),
                            diskripsi: $('#txtMisDiskripsi').val(),
                            kategoriInstitusiId: $('#optMisKategoriInstitusiId').val(),
                            negara: $('#txtMisNegara').val(),
                            kategori: $('#txtMisKategori').val(),
                            noPemerolehan: $('#txtMisNoPemerolehan').val(),
                            gabYt: gabVal,
                            sahYt: statusVal
                        };

                        if (institusiId === '') {
                            institusiId = mzAjaxRequest('institusi.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['institusiId'] = institusiId;
                                classFrom.addTableInstitusi(data);
                            }
                        } else {
                            mzAjaxRequest('institusi.php?institusiId='+institusiId, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTableInstitusi(data, rowRefresh);
                            }
                        }
                        $('#modal_institusi').modal('hide');
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

    };

    this.add = function () {
        institusiId = '';
        rowRefresh = '';

        ShowLoader();
        setTimeout(function () {
            try {
                mzSetFieldValue('MisGabYtStatus', 'T', 'checkSingle', 'Y');
                mzSetFieldValue('MisInstitusiStatus', 'Y', 'checkSingle', 'Y');

                $('#modal_institusi').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.edit = function (_institusiId, _rowRefresh) {
        institusiId = _institusiId;
        rowRefresh = _rowRefresh;

        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_institusiId, _rowRefresh]);

                const dataResult = mzAjaxRequest('institusi.php?institusiId='+institusiId, 'GET');
                mzSetFieldValue('MisKod', dataResult['kod'], 'text');
                mzSetFieldValue('MisDiskripsi', dataResult['diskripsi'], 'text');
                mzSetFieldValue('MisKategoriInstitusiId', dataResult['kategoriInstitusiId'], 'select', 'Jenis');
                mzSetFieldValue('MisNegara', dataResult['negara'], 'text');
                mzSetFieldValue('MisKategori', dataResult['kategori'], 'text');
                mzSetFieldValue('MisNoPemerolehan', dataResult['noPemerolehan'], 'text');
                mzSetFieldValue('MisGabYtStatus', dataResult['gabYt'], 'checkSingle', 'Y');
                mzSetFieldValue('MisInstitusiStatus', dataResult['sahYt'], 'checkSingle', 'Y');

                $('#modal_institusi').modal({backdrop: 'static', keyboard: false});
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

    this.setRefKategoriInstitusi = function (_refKategoriInstitusi) {
        refKategoriInstitusi = _refKategoriInstitusi;
    };
}