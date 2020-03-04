function ModalKemJabatan() {

    const className = 'ModalKemJabatan';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let kemJabatanId = '';
    let formValidate;

    this.init = function () {
        const vDataMkj = [
            {
                field_id: 'txtMkjKod',
                type: 'text',
                name: 'Kod',
                validator: {
                    notEmpty: true,
                    maxLength: 4
                }
            },
            {
                field_id: 'txtMkjDiskripsi',
                type: 'text',
                name: 'Diskripsi',
                validator: {
                    notEmpty: true,
                    maxLength: 100
                }
            },
            {
                field_id: 'txtMkjAlamat1',
                type: 'text',
                name: 'Alamat 1',
                validator: {
                    maxLength: 100
                }
            },
            {
                field_id: 'txtMkjAlamat2',
                type: 'text',
                name: 'Alamat 2',
                validator: {
                    maxLength: 50
                }
            },
            {
                field_id: 'txtMkjAlamat3',
                type: 'text',
                name: 'Alamat 3',
                validator: {
                    maxLength: 50
                }
            },
            {
                field_id: 'txtMkjGelaranKetua',
                type: 'text',
                name: 'Gelaran Ketua',
                validator: {
                    maxLength: 50
                }
            },
            {
                field_id: 'txtMkjPoskod',
                type: 'text',
                name: 'Poskod',
                validator: {
                    maxLength: 5
                }
            },
            {
                field_id: 'txtMkjBandar',
                type: 'text',
                name: 'Bandar',
                validator: {
                    maxLength: 50
                }
            },
            {
                field_id: 'txtMkjKemKod',
                type: 'text',
                name: 'Kod Kementerian',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'txtMkjDiskripsi2',
                type: 'text',
                name: 'Diskripsi 2',
                validator: {
                    maxLength: 50
                }
            },
            {
                field_id: 'txtMkjDiskripsi3',
                type: 'text',
                name: 'Diskripsi 3',
                validator: {
                    maxLength: 50
                }
            },
            {
                field_id: 'txtMkjEmel',
                type: 'text',
                name: 'Emel',
                validator: {
                    maxLength: 50,
                    email: true
                }
            },
            {
                field_id: 'txtMkjNoTel',
                type: 'text',
                name: 'No Telefon',
                validator: {
                    maxLength: 10,
                    digit: true
                }
            },
            {
                field_id: 'txtMkjUnitUrusan',
                type: 'text',
                name: 'Unit Urusan',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'txtMkjNoPemerolehan',
                type: 'text',
                name: 'No Pemerolehan',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'chkMkjGabYtStatus',
                type: 'checkSingle',
                name: 'Gab',
                validator: {
                }
            },
            {
                field_id: 'chkMkjKemJabatanStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMkj');
        formValidate.registerFields(vDataMkj);

        $('#modal_kem_jabatan').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMkjSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMkjKemJabatanStatus']").is(":checked") ? 'Y' : 'T';
                        const gabVal = $("input[name='chkMkjGabYtStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            kod: $('#txtMkjKod').val(),
                            diskripsi: $('#txtMkjDiskripsi').val(),
                            alamat1: $('#txtMkjAlamat1').val(),
                            alamat2: $('#txtMkjAlamat2').val(),
                            alamat3: $('#txtMkjAlamat3').val(),
                            gelaranKetua: $('#txtMkjGelaranKetua').val(),
                            poskod: $('#txtMkjPoskod').val(),
                            bandar: $('#txtMkjBandar').val(),
                            kemKod: $('#txtMkjKemKod').val(),
                            diskripsi2: $('#txtMkjDiskripsi2').val(),
                            diskripsi3: $('#txtMkjDiskripsi3').val(),
                            emel: $('#txtMkjEmel').val(),
                            noTel: $('#txtMkjNoTel').val(),
                            unitUrusan: $('#txtMkjUnitUrusan').val(),
                            noPemerolehan: $('#txtMkjNoPemerolehan').val(),
                            gabYt: gabVal,
                            sahYt: statusVal
                        };

                        if (kemJabatanId === '') {
                            kemJabatanId = mzAjaxRequest('kem_jabatan.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['kemJabatanId'] = kemJabatanId;
                                classFrom.addTableKemJabatan(data);
                            }
                        } else {
                            mzAjaxRequest('kem_jabatan.php?kemJabatanId='+kemJabatanId, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTableKemJabatan(data, rowRefresh);
                            }
                        }
                        $('#modal_kem_jabatan').modal('hide');
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

    };

    this.add = function () {
        kemJabatanId = '';
        rowRefresh = '';

        ShowLoader();
        setTimeout(function () {
            try {
                formValidate.enableField('txtMkjKod');
                mzSetFieldValue('MkjKemJabatanStatus', 'Y', 'checkSingle', 'Y');
                $('#txtMkjKod').prop('disabled', false);

                $('#modal_kem_jabatan').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.edit = function (_kemJabatanId, _rowRefresh) {
        kemJabatanId = _kemJabatanId;
        rowRefresh = _rowRefresh;

        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_kemJabatanId, _rowRefresh]);

                const dataResult = mzAjaxRequest('kem_jabatan.php?kemJabatanId='+kemJabatanId, 'GET');
                mzSetFieldValue('MkjKod', dataResult['kod'], 'text');
                mzSetFieldValue('MkjDiskripsi', dataResult['diskripsi'], 'text');
                mzSetFieldValue('MkjAlamat1', dataResult['alamat1'], 'text');
                mzSetFieldValue('MkjAlamat2', dataResult['alamat2'], 'text');
                mzSetFieldValue('MkjAlamat3', dataResult['alamat3'], 'text');
                mzSetFieldValue('MkjGelaranKetua', dataResult['gelaranKetua'], 'text');
                mzSetFieldValue('MkjPoskod', dataResult['poskod'], 'text');
                mzSetFieldValue('MkjBandar', dataResult['bandar'], 'text');
                mzSetFieldValue('MkjKemKod', dataResult['kemKod'], 'text');
                mzSetFieldValue('MkjDiskripsi2', dataResult['diskripsi2'], 'text');
                mzSetFieldValue('MkjDiskripsi3', dataResult['diskripsi3'], 'text');
                mzSetFieldValue('MkjEmel', dataResult['emel'], 'text');
                mzSetFieldValue('MkjNoTel', dataResult['noTel'], 'text');
                mzSetFieldValue('MkjUnitUrusan', dataResult['unitUrusan'], 'text');
                mzSetFieldValue('MkjNoPemerolehan', dataResult['noPemerolehan'], 'text');
                mzSetFieldValue('MkjGabYtStatus', dataResult['gabYt'], 'checkSingle', 'Y');
                mzSetFieldValue('MkjKemJabatanStatus', dataResult['sahYt'], 'checkSingle', 'Y');
                $('#txtMkjKod').prop('disabled', true);

                $('#modal_kem_jabatan').modal({backdrop: 'static', keyboard: false});
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