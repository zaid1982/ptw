function MainMaklumatPemohon() {

    const className = 'MainMaklumatPemohon';
    let self = this;
    let sectionId;
    let refAgama;
    let refNegeri;
    let refMataPelajaran;
    let oTablePnkPmr;
    let oTablePnkPmr1;
    let oTablePnkSpm;
    let oTablePnkSpm1;
    let oTablePnkStpm;
    let oTablePnkStpm1;
    let oTablePnkStpm2;
    let oTablePnkMatrikulasi;
    let sesiMatrikulasi;

    this.init = function () {
        sectionId = 1;
        $('#sectionPnkResult').hide();

        $('.nav-link').on('click', function () {
            const linkId = $(this).attr('id');
            ShowLoader();
            setTimeout(function () {
                try {
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const linkNo = linkId.substr(linkIndex + 1);
                        sectionId = parseInt(linkNo);
                        if (formPnkSearchValidate.validateForm()) {
                            self.getData();
                        }
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        const vDataPnkSearch = [
            {
                field_id: 'txtPnkMyid',
                type: 'text',
                name: 'MyID',
                validator: {
                    notEmpty: true,
                    digit: true,
                    eqLength: 12
                }
            }
        ];

        let formPnkSearchValidate = new MzValidate('formPnkSearch');
        formPnkSearchValidate.registerFields(vDataPnkSearch);

        $('#btnPnkSearch').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formPnkSearchValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALID_MYID, _ALERT_TITLE_ERROR);
                    }
                    else {
                        self.getData();
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        oTablePnkPmr =  $('#dtPnkPmr').DataTable({
            bLengthChange: false,
            bFilter: true,
            bInfo: false,
            ordering: false,
            bPaginate: false,
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, sClass: 'text-center', mRender: function (data, type, row){
                            return row['mataPelajaran'] !== '' ? refMataPelajaran[parseInt(row['mataPelajaran'])]['kod'] : '';
                        }},
                    {mData: null, mRender: function (data, type, row){
                            return row['mataPelajaran'] !== '' ? refMataPelajaran[parseInt(row['mataPelajaran'])]['diskripsi'] : '';
                        }},
                    {mData: 'tahun', sClass: 'text-center'},
                    {mData: 'gred', sClass: 'text-center'}
                ]
        });
        $("#dtPnkPmr_filter").hide();

        oTablePnkPmr1 =  $('#dtPnkPmr1').DataTable({
            bLengthChange: false,
            bFilter: true,
            bInfo: false,
            ordering: false,
            bPaginate: false,
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, sClass: 'text-center', mRender: function (data, type, row){
                            return row['mataPelajaran'] !== '' ? refMataPelajaran[parseInt(row['mataPelajaran'])]['kod'] : '';
                        }},
                    {mData: null, mRender: function (data, type, row){
                            return row['mataPelajaran'] !== '' ? refMataPelajaran[parseInt(row['mataPelajaran'])]['diskripsi'] : '';
                        }},
                    {mData: 'tahun', sClass: 'text-center'},
                    {mData: 'gred', sClass: 'text-center'}
                ]
        });
        $("#dtPnkPmr1_filter").hide();

        oTablePnkSpm =  $('#dtPnkSpm').DataTable({
            bLengthChange: false,
            bFilter: true,
            bInfo: false,
            ordering: false,
            bPaginate: false,
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, sClass: 'text-center', mRender: function (data, type, row){
                            return row['matapelajaran'] !== '' ? refMataPelajaran[parseInt(row['matapelajaran'])]['kod'] : '';
                        }},
                    {mData: null, mRender: function (data, type, row){
                            return row['matapelajaran'] !== '' ? refMataPelajaran[parseInt(row['matapelajaran'])]['diskripsi'] : '';
                        }},
                    {mData: 'tahun', sClass: 'text-center'},
                    {mData: 'gred', sClass: 'text-center'}
                ]
        });
        $("#dtPnkSpm_filter").hide();

        oTablePnkSpm1 =  $('#dtPnkSpm1').DataTable({
            bLengthChange: false,
            bFilter: true,
            bInfo: false,
            ordering: false,
            bPaginate: false,
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, sClass: 'text-center', mRender: function (data, type, row){
                            return row['matapelajaran'] !== '' ? refMataPelajaran[parseInt(row['matapelajaran'])]['kod'] : '';
                        }},
                    {mData: null, mRender: function (data, type, row){
                            return row['matapelajaran'] !== '' ? refMataPelajaran[parseInt(row['matapelajaran'])]['diskripsi'] : '';
                        }},
                    {mData: 'tahun', sClass: 'text-center'},
                    {mData: 'gred', sClass: 'text-center'}
                ]
        });
        $("#dtPnkSpm1_filter").hide();

        oTablePnkStpm =  $('#dtPnkStpm').DataTable({
            bLengthChange: false,
            bFilter: true,
            bInfo: false,
            ordering: false,
            bPaginate: false,
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, sClass: 'text-center', mRender: function (data, type, row){
                            return row['matapelajaran'] !== '' ? refMataPelajaran[parseInt(row['matapelajaran'])]['kod'] : '';
                        }},
                    {mData: null, mRender: function (data, type, row){
                            return row['matapelajaran'] !== '' ? refMataPelajaran[parseInt(row['matapelajaran'])]['diskripsi'] : '';
                        }},
                    {mData: 'tahun', sClass: 'text-center'},
                    {mData: 'gred', sClass: 'text-center'}
                ]
        });
        $("#dtPnkStpm_filter").hide();

        oTablePnkStpm1 =  $('#dtPnkStpm1').DataTable({
            bLengthChange: false,
            bFilter: true,
            bInfo: false,
            ordering: false,
            bPaginate: false,
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, sClass: 'text-center', mRender: function (data, type, row){
                            return row['matapelajaran'] !== '' ? refMataPelajaran[parseInt(row['matapelajaran'])]['kod'] : '';
                        }},
                    {mData: null, mRender: function (data, type, row){
                            return row['matapelajaran'] !== '' ? refMataPelajaran[parseInt(row['matapelajaran'])]['diskripsi'] : '';
                        }},
                    {mData: 'tahun', sClass: 'text-center'},
                    {mData: 'gred', sClass: 'text-center'}
                ]
        });
        $("#dtPnkStpm1_filter").hide();

        oTablePnkStpm2 =  $('#dtPnkStpm2').DataTable({
            bLengthChange: false,
            bFilter: true,
            bInfo: false,
            ordering: false,
            bPaginate: false,
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, sClass: 'text-center', mRender: function (data, type, row){
                            return row['matapelajaran'] !== '' ? refMataPelajaran[parseInt(row['matapelajaran'])]['kod'] : '';
                        }},
                    {mData: null, mRender: function (data, type, row){
                            return row['matapelajaran'] !== '' ? refMataPelajaran[parseInt(row['matapelajaran'])]['diskripsi'] : '';
                        }},
                    {mData: 'tahun', sClass: 'text-center'},
                    {mData: 'gred', sClass: 'text-center'}
                ]
        });
        $("#dtPnkStpm2_filter").hide();

        oTablePnkMatrikulasi =  $('#dtPnkMatrikulasi').DataTable({
            bLengthChange: false,
            bFilter: true,
            bInfo: false,
            ordering: false,
            bPaginate: false,
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                $('td', nRow).eq(0).html(iDisplayIndex+1);
            },
            language: _DATATABLE_LANGUAGE,
            aaSorting: [[1, 'asc'],[2, 'asc']],
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'semester', sClass: 'text-center', mRender: function (data){
                            return sesiMatrikulasi+' - '+data;
                        }},
                    {mData: 'kodSubjek', sClass: 'text-center'},
                    {mData: 'namaSubjek', sClass: 'text-center'},
                    {mData: 'keputusan', sClass: 'text-center'}
                ]
        });
        $("#dtPnkMatrikulasi_filter").hide();
    };

    this.getData = function () {
        $('#sectionPnkResult').show();
        if (sectionId === 1) {
            const dataResult = mzAjaxRequest('maklumat_pemohon.php?t=get_maklumat_peribadi&icNo=' + $('#txtPnkMyid').val(), 'GET');
            $('#lblPnk1MyIdICNumber').html(dataResult['asmCitizendata']['myIdICNumber']);
            $('#lblPnk1MyIdName').html(dataResult['asmCitizendata']['myIdName']);
            $('#lblPnk1DateOfBirth').html(mzConvertDateDisplay(dataResult['asmCitizendata']['dateOfBirth']));
            $('#lblPnk1Age').html(dataResult['asmCitizendata']['age']);
            let gender = dataResult['asmCitizendata']['gender'];
            if (gender === 'L') {
                gender = 'Lelaki';
            } else if (gender === 'P') {
                gender = 'Perempuan';
            }
            $('#lblPnk1Gender').html(gender);
            let religion = dataResult['asmCitizendata']['religion'];
            $('#lblPnk1Religion').html(religion == '' ? '' : refAgama[parseInt(religion)]['agama']);
            $('#lblPnk1Race').html(dataResult['asmCitizendata']['race']);
            $('#lblPnk1CitizenshipStatus').html(dataResult['asmCitizendata']['citizenshipStatus']);
            $('#lblPnk1NoTel').html(dataResult['calon']['noTel']);
            $('#lblPnk1Emel').html(dataResult['calon']['emel']);
            let tempatlahirPemohon = dataResult['calon']['tempatlahirPemohon'];
            let tempatlahirIbu = dataResult['calon']['tempatlahirIbu'];
            let tempatlahirBapa = dataResult['calon']['tempatlahirBapa'];
            $('#lblPnk1TempatlahirPemohon').html(tempatlahirPemohon == '' ? '' : refNegeri[parseInt(tempatlahirPemohon)]['negeri']);
            $('#lblPnk1TempatlahirIbu').html(tempatlahirIbu == '' ? '' : refNegeri[parseInt(tempatlahirIbu)]['negeri']);
            $('#lblPnk1TempatlahirBapa').html(tempatlahirBapa == '' ? '' : refNegeri[parseInt(tempatlahirBapa)]['negeri']);
            $('#lblPnk1Tinggi').html(dataResult['calon']['tinggi']);
            $('#lblPnk1Berat').html(dataResult['calon']['berat']);
        } else if (sectionId === 2) {
            const dataResult = mzAjaxRequest('maklumat_pemohon.php?t=get_maklumat_alamat&icNo=' + $('#txtPnkMyid').val(), 'GET');
            $('#lblPnk2PermanentAddress1').html(dataResult['asmCitizendata']['permanentAddress1']);
            $('#lblPnk2PermanentAddress2').html(dataResult['asmCitizendata']['permanentAddress2']);
            $('#lblPnk2PermanentAddress3').html(dataResult['asmCitizendata']['permanentAddress3']);
            $('#lblPnk2PermanentAddressPostcode').html(dataResult['asmCitizendata']['permanentAddressPostcode']);
            $('#lblPnk2PermanentAddressCityDesc').html(dataResult['asmCitizendata']['permanentAddressCityDesc']);
            let permanentAddressStateCode = dataResult['asmCitizendata']['permanentAddressStateCode'];
            $('#lblPnk2PermanentAddressStateCode').html(permanentAddressStateCode == '' ? '' : refNegeri[parseInt(permanentAddressStateCode)]['negeri']);
            $('#lblPnk2Alamat1').html(dataResult['alamat']['alamat1']);
            $('#lblPnk2Alamat2').html(dataResult['alamat']['alamat2']);
            $('#lblPnk2Alamat3').html(dataResult['alamat']['alamat3']);
            $('#lblPnk2Poskod').html(dataResult['alamat']['poskod']);
            $('#lblPnk2Bandar').html(dataResult['alamat']['bandar']);
            let negeri = dataResult['alamat']['negeri'];
            $('#lblPnk2Negeri').html(negeri == '' ? '' : refNegeri[parseInt(negeri)]['negeri']);
        } else if (sectionId === 3) {
            const dataResult = mzAjaxRequest('maklumat_pemohon.php?t=get_keputusan_persekolahan&icNo=' + $('#txtPnkMyid').val(), 'GET');
            oTablePnkPmr.clear().rows.add(dataResult['pmr']).draw();
            oTablePnkPmr1.clear().rows.add(dataResult['pmr']).draw();
            oTablePnkSpm.clear().rows.add(dataResult['spm']).draw();
            oTablePnkSpm1.clear().rows.add(dataResult['spm']).draw();
        } else if (sectionId === 5) {
            const dataResult = mzAjaxRequest('maklumat_pemohon.php?t=get_stpm_stam_matrikulasi&icNo=' + $('#txtPnkMyid').val(), 'GET');
            let theBest = '';
            oTablePnkStpm1.clear().rows.add(dataResult['stpm1']).draw();
            $('#lblPnk5Stpm1Pngk').html('');
            const stpm1Pngk = dataResult['stpm1Pngk'];
            if (stpm1Pngk !== '') {
                theBest = '1';
                $('#lblPnk5Stpm1Pngk').html(stpm1Pngk['pngk']);
            }
            oTablePnkStpm2.clear().rows.add(dataResult['stpm2']).draw();
            $('#lblPnk5Stpm2Pngk').html('');
            const stpm2Pngk = dataResult['stpm2Pngk'];
            if (stpm2Pngk !== '') {
                $('#lblPnk5Stpm2Pngk').html(stpm2Pngk['pngk']);
                if (stpm2Pngk > stpm1Pngk) {
                    theBest = '2';
                }
            }
            oTablePnkStpm.clear().draw();
            $('#lblPnk5StpmPngk').html('');
            if (theBest !== '') {
                oTablePnkStpm.rows.add(dataResult['stpm'+theBest]).draw();
                $('#lblPnk5StpmPngk').html(dataResult['stpm'+theBest+'Pngk']['pngk']);
            }
            $('#lblPnk5MatrikulasiPngk').html('');
            sesiMatrikulasi = '';
            const matrikulasiPngk = dataResult['matrikulasi'];
            if (matrikulasiPngk !== '') {
                $('#lblPnk5MatrikulasiPngk').html(matrikulasiPngk['pngk']);
                sesiMatrikulasi = matrikulasiPngk['sesi'];
                oTablePnkMatrikulasi.clear().rows.add(dataResult['matrikulasiMatapelajaran']).draw();
            }
        }
    };

    this.setRefAgama = function (_refAgama) {
        refAgama = _refAgama;
    };

    this.setRefNegeri = function (_refNegeri) {
        refNegeri = _refNegeri;
    };

    this.setRefMataPelajaran = function (_refMataPelajaran) {
        refMataPelajaran = _refMataPelajaran;
    };

}