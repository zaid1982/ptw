function ModalPenguasaanBahasa() {

    const className = 'ModalPenguasaanBahasa';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let penguasaanBahasaId = '';
    let formValidate;

    this.init = function () {
        const vDataMpb = [
            {
                field_id: 'txtMpbKod',
                type: 'text',
                name: 'Kod',
                validator: {
                    notEmpty: true,
                    maxLength: 1
                }
            },
            {
                field_id: 'txtMpbDiskripsi',
                type: 'text',
                name: 'Diskripsi',
                validator: {
                    notEmpty: true,
                    maxLength: 30
                }
            },
            {
                field_id: 'txtMpbKategori',
                type: 'text',
                name: 'Kategori',
                validator: {
                    maxLength: 30
                }
            },
            {
                field_id: 'txtMpbJantina',
                type: 'text',
                name: 'Jantina',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'txtMpbNilai',
                type: 'text',
                name: 'Nilai',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'txtMpbNoPemerolehan',
                type: 'text',
                name: 'No Pemerolehan',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'chkMpbGabYtStatus',
                type: 'checkSingle',
                name: 'Gab',
                validator: {
                }
            },
            {
                field_id: 'chkMpbPenguasaanBahasaStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMpb');
        formValidate.registerFields(vDataMpb);

        $('#modal_penguasaan_bahasa').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMpbSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMpbPenguasaanBahasaStatus']").is(":checked") ? 'Y' : 'T';
                        const gabVal = $("input[name='chkMpbGabYtStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            kod: $('#txtMpbKod').val(),
                            diskripsi: $('#txtMpbDiskripsi').val(),
                            kategori: $('#txtMpbKategori').val(),
                            jantina: $('#txtMpbJantina').val(),
                            nilai: $('#txtMpbNilai').val(),
                            noPemerolehan: $('#txtMpbNoPemerolehan').val(),
                            gabYt: gabVal,
                            sahYt: statusVal
                        };

                        if (penguasaanBahasaId === '') {
                            penguasaanBahasaId = mzAjaxRequest('penguasaan_bahasa.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['penguasaanBahasaId'] = penguasaanBahasaId;
                                classFrom.addTablePenguasaanBahasa(data);
                            }
                        } else {
                            mzAjaxRequest('penguasaan_bahasa.php?penguasaanBahasaId='+penguasaanBahasaId, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTablePenguasaanBahasa(data, rowRefresh);
                            }
                        }
                        $('#modal_penguasaan_bahasa').modal('hide');
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

    };

    this.add = function () {
        penguasaanBahasaId = '';
        rowRefresh = '';

        ShowLoader();
        setTimeout(function () {
            try {
                formValidate.enableField('txtMpbKod');
                mzSetFieldValue('MpbPenguasaanBahasaStatus', 'Y', 'checkSingle', 'Y');
                $('#txtMpbKod').prop('disabled', false);

                $('#modal_penguasaan_bahasa').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.edit = function (_penguasaanBahasaId, _rowRefresh) {
        penguasaanBahasaId = _penguasaanBahasaId;
        rowRefresh = _rowRefresh;

        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_penguasaanBahasaId, _rowRefresh]);

                const dataResult = mzAjaxRequest('penguasaan_bahasa.php?penguasaanBahasaId='+penguasaanBahasaId, 'GET');
                mzSetFieldValue('MpbKod', dataResult['kod'], 'text');
                mzSetFieldValue('MpbDiskripsi', dataResult['diskripsi'], 'text');
                mzSetFieldValue('MpbKategori', dataResult['kategori'], 'text');
                mzSetFieldValue('MpbJantina', dataResult['jantina'], 'text');
                mzSetFieldValue('MpbNilai', dataResult['nilai'], 'text');
                mzSetFieldValue('MpbNoPemerolehan', dataResult['noPemerolehan'], 'text');
                mzSetFieldValue('MpbGabYtStatus', dataResult['gabYt'], 'checkSingle', 'Y');
                mzSetFieldValue('MpbPenguasaanBahasaStatus', dataResult['sahYt'], 'checkSingle', 'Y');
                $('#txtMpbKod').prop('disabled', true);

                $('#modal_penguasaan_bahasa').modal({backdrop: 'static', keyboard: false});
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