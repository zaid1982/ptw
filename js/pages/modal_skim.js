function ModalSkim() {

    const className = 'ModalSkim';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let skimId = '';
    let formValidate;

    this.init = function () {
        const vDataMsk = [
            {
                field_id: 'txtMskKod',
                type: 'text',
                name: 'Kod',
                validator: {
                    notEmpty: true,
                    maxLength: 4
                }
            },
            {
                field_id: 'txtMskDiskripsi',
                type: 'text',
                name: 'Diskripsi',
                validator: {
                    notEmpty: true,
                    maxLength: 50
                }
            },
            {
                field_id: 'txtMskGghKod',
                type: 'text',
                name: 'Kod GGH',
                validator: {
                    maxLength: 5
                }
            },
            {
                field_id: 'txtMskGghSsm',
                type: 'text',
                name: 'GGH SSM',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'txtMskSkimPkhidmat',
                type: 'text',
                name: 'Skim Perkhidmatan',
                validator: {
                    maxLength: 4
                }
            },
            {
                field_id: 'txtMskGunasama',
                type: 'text',
                name: 'Gunasama',
                validator: {
                    maxLength: 1
                }
            },
            {
                field_id: 'txtMskKumpPkhidmatJkk',
                type: 'text',
                name: 'Kumpulan Perkhidmatan JKK',
                validator: {
                    maxLength: 1
                }
            },
            {
                field_id: 'txtMskKumpPkhidmatSbpa',
                type: 'text',
                name: 'Kumpulan Perkhidmatan SBPA',
                validator: {
                    maxLength: 4
                }
            },
            {
                field_id: 'txtMskKumpPkhidmatSsb',
                type: 'text',
                name: 'Kumpulan Perkhidmatan SSB',
                validator: {
                    maxLength: 1
                }
            },
            {
                field_id: 'txtMskOldKod',
                type: 'text',
                name: 'Kod Lama',
                validator: {
                    maxLength: 4
                }
            },
            {
                field_id: 'txtMskOldName',
                type: 'text',
                name: 'Nama Lama',
                validator: {
                    maxLength: 50
                }
            },
            {
                field_id: 'txtMskOldGred',
                type: 'text',
                name: 'Gred Lama',
                validator: {
                    maxLength: 4
                }
            },
            {
                field_id: 'txtMskKpKod',
                type: 'text',
                name: 'Kod KP',
                validator: {
                    maxLength: 4
                }
            },
            {
                field_id: 'txtMskNoPemerolehan',
                type: 'text',
                name: 'No Pemerolehan',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'txtMskUjianWajib1',
                type: 'text',
                name: 'Ujian Wajib 1',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'txtMskUjianWajib2',
                type: 'text',
                name: 'Ujian Wajib 2',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'txtMskUjianWajib3',
                type: 'text',
                name: 'Ujian Wajib 3',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'txtMskUjianWajib4',
                type: 'text',
                name: 'Ujian Wajib 4',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'txtMskUjianWajib5',
                type: 'text',
                name: 'Ujian Wajib 5',
                validator: {
                    maxLength: 10
                }
            },
            {
                field_id: 'chkMskUjianYtStatus',
                type: 'checkSingle',
                name: 'Ujian YT',
                validator: {
                }
            },
            {
                field_id: 'chkMskGabYtStatus',
                type: 'checkSingle',
                name: 'Bakat YT',
                validator: {
                }
            },
            {
                field_id: 'chkMskSkimStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMsk');
        formValidate.registerFields(vDataMsk);

        $('#modal_skim').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMskSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMskSkimStatus']").is(":checked") ? 'Y' : 'T';
                        const gabVal = $("input[name='chkMskGabYtStatus']").is(":checked") ? 'Y' : 'T';
                        const ujianVal = $("input[name='chkMskUjianYtStatus']").is(":checked") ? 'Y' : 'T';
                        const data = {
                            kod: $('#txtMskKod').val(),
                            diskripsi: $('#txtMskDiskripsi').val(),
                            gghKod: $('#txtMskGghKod').val(),
                            gunasama: $('#txtMskGunasama').val(),
                            jenisSkim: $('#txtMskJenisSkim').val(),
                            kumpPkhidmatJkk: $('#txtMskKumpPkhidmatJkk').val(),
                            skimPkhidmat: $('#txtMskSkimPkhidmat').val(),
                            gghSsm: $('#txtMskGghSsm').val(),
                            kumpPkhidmatSbpa: $('#txtMskKumpPkhidmatSbpa').val(),
                            oldKod: $('#txtMskOldKod').val(),
                            oldName: $('#txtMskOldName').val(),
                            oldGred: $('#txtMskOldGred').val(),
                            kumpPkhidmatSsb: $('#txtMskKumpPkhidmatSsb').val(),
                            ujianWajib1: $('#txtMskUjianWajib1').val(),
                            ujianWajib2: $('#txtMskUjianWajib2').val(),
                            ujianWajib3: $('#txtMskUjianWajib3').val(),
                            ujianWajib4: $('#txtMskUjianWajib4').val(),
                            ujianWajib5: $('#txtMskUjianWajib5').val(),
                            kpKod: $('#txtMskKpKod').val(),
                            noPemerolehan: $('#txtMskNoPemerolehan').val(),
                            ujianYt: ujianVal,
                            gabYt: gabVal,
                            sahYt: statusVal
                        };

                        if (skimId === '') {
                            skimId = mzAjaxRequest('skim.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                data['skimId'] = skimId;
                                classFrom.addTableSkim(data);
                            }
                        } else {
                            mzAjaxRequest('skim.php?skimId='+skimId, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanData') {
                                classFrom.updateTableSkim(data, rowRefresh);
                            }
                        }
                        $('#modal_skim').modal('hide');
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

    };

    this.add = function () {
        skimId = '';
        rowRefresh = '';

        ShowLoader();
        setTimeout(function () {
            try {
                formValidate.enableField('txtMskKod');
                mzSetFieldValue('MskSkimStatus', 'Y', 'checkSingle', 'Y');
                $('#txtMskKod').prop('disabled', false);

                $('#modal_skim').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.edit = function (_skimId, _rowRefresh) {
        skimId = _skimId;
        rowRefresh = _rowRefresh;

        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_skimId, _rowRefresh]);

                const dataResult = mzAjaxRequest('skim.php?skimId='+skimId, 'GET');
                mzSetFieldValue('MskKod', dataResult['kod'], 'text');
                mzSetFieldValue('MskDiskripsi', dataResult['diskripsi'], 'text');
                mzSetFieldValue('MskGghKod', dataResult['gghKod'], 'text');
                mzSetFieldValue('MskGunasama', dataResult['gunasama'], 'text');
                mzSetFieldValue('MskJenisSkim', dataResult['jenisSkim'], 'text');
                mzSetFieldValue('MskKumpPkhidmatJkk', dataResult['kumpPkhidmatJkk'], 'text');
                mzSetFieldValue('MskSkimPkhidmat', dataResult['skimPkhidmat'], 'text');
                mzSetFieldValue('MskGghSsm', dataResult['gghSsm'], 'text');
                mzSetFieldValue('MskKumpPkhidmatSbpa', dataResult['kumpPkhidmatSbpa'], 'text');
                mzSetFieldValue('MskOldKod', dataResult['oldKod'], 'text');
                mzSetFieldValue('MskOldName', dataResult['oldName'], 'text');
                mzSetFieldValue('MskOldGred', dataResult['oldGred'], 'text');
                mzSetFieldValue('MskKumpPkhidmatSsb', dataResult['kumpPkhidmatSsb'], 'text');
                mzSetFieldValue('MskUjianWajib1', dataResult['ujianWajib1'], 'text');
                mzSetFieldValue('MskUjianWajib2', dataResult['ujianWajib2'], 'text');
                mzSetFieldValue('MskUjianWajib3', dataResult['ujianWajib3'], 'text');
                mzSetFieldValue('MskUjianWajib4', dataResult['ujianWajib4'], 'text');
                mzSetFieldValue('MskUjianWajib5', dataResult['ujianWajib5'], 'text');
                mzSetFieldValue('MskKpKod', dataResult['kpKod'], 'text');
                mzSetFieldValue('MskNoPemerolehan', dataResult['noPemerolehan'], 'text');
                mzSetFieldValue('MskUjianYtStatus', dataResult['ujianYt'], 'checkSingle', 'Y');
                mzSetFieldValue('MskGabYtStatus', dataResult['gabYt'], 'checkSingle', 'Y');
                mzSetFieldValue('MskSkimStatus', dataResult['sahYt'], 'checkSingle', 'Y');
                $('#txtMskKod').prop('disabled', true);

                $('#modal_skim').modal({backdrop: 'static', keyboard: false});
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