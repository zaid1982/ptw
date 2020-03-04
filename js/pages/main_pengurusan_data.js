function MainPengurusanData() {

    const className = 'MainPengurusanData';
    let self = this;
    let oTableDagAgama;
    let oTableDkrKeturunan;
    let oTableDngNegeri;
    let oTableDpkPoskod;
    let oTableDptPusatTd;
    let oTableDmpMataPelajaran;
    let oTableDgmGredMatapelajaran;
    let oTableDsjSijil;
    let oTableDspSijilPangkat;
    let oTableDulUjianLisan;
    let oTableDklKelulusan;
    let oTableDpjPaperJulai;
    let oTableDpmPaperJulaiBm;
    let oTableDkxKelulusanMref;
    let oTableDbhBahasa;
    let oTableDbkBakat;
    let oTableDbdBakatDetail;
    let oTableDbtBantuan;
    let oTableDbwBiasiswa;
    let oTableDkmKolejMatrikulasi;
    let oTableDggGredGaji;
    let oTableDisInstitusi;
    let oTableDjpJenisPengajian;
    let oTableDjsJenisPengkhususan;
    let oTableDjkJenisPerkhidmatan;
    let oTableDprPeringkat;
    let oTableDtlTelco;
    let oTableDkcKecacatanCalon;
    let oTableDpbPenguasaanBahasa;
    let oTableDtjTarafJawatan;
    let oTableDpsPengkhususan;
    let oTableDsuSukan;
    let oTableDssSkimSah;
    let oTableDskSkim;
    let oTableDbpBekasPolTen;
    let oTableDsmSubjekMatrikulasi;
    let oTableDkjKemJabatan;
    
    let modalAgamaClass;
    let modalKeturunanClass;
    let modalNegeriClass;
    let modalPoskodClass;
    let modalPusatTdClass;
    let modalMataPelajaranClass;
    let modalGredMatapelajaranClass;
    let modalSijilClass;
    let modalSijilPangkatClass;
    let modalUjianLisanClass;
    let modalKelulusanClass;
    let modalPaperJulaiClass;
    let modalPaperJulaiBmClass;
    let modalKelulusanMrefClass;
    let modalBahasaClass;
    let modalBakatClass;
    let modalBakatDetailClass;
    let modalBantuanClass;
    let modalBiasiswaClass;
    let modalKolejMatrikulasiClass;
    let modalGredGajiClass;
    let modalInstitusiClass;
    let modalJenisPengajianClass;
    let modalJenisPengkhususanClass;
    let modalJenisPerkhidmatanClass;
    let modalPeringkatClass;
    let modalTelcoClass;
    let modalKecacatanCalonClass;
    let modalPenguasaanBahasaClass;
    let modalTarafJawatanClass;
    let modalPengkhususanClass;
    let modalSukanClass;
    let modalSkimSahClass;
    let modalSkimClass;
    let modalBekasPolTenClass;
    let modalSubjekMatrikulasiClass;
    let modalKemJabatanClass;
    
    let refNegeri;
    let refBakat;
    let refKategoriInstitusi;
    let refJenisPengkhususan;

    this.init = function () {
        $('.sectDmnResult').hide();

        oTableDagAgama =  $('#dtDagAgamaList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDagAgama.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDagAgamaEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDagAgama.row(parseInt(rowId)).data();
                        modalAgamaClass.edit(currentRow['kodAgama'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'kodAgama'},
                    {mData: 'agama'},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDagAgamaEdit" id="lnkDagAgamaEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    }
                ]
        });
        $("#dtDagAgamaList_filter").hide();
        $('#txtDagAgamaListSearch').on('keyup change', function () {
            oTableDagAgama.search($(this).val()).draw();
        });

        let cntDagAgama;
        let btnDagAgamaOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDagAgama = 1;
                        }
                        if (column === 3) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDagAgama++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDagAgama, {
            buttons: [
                $.extend( true, {}, btnDagAgamaOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Agama',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDagAgamaOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Agama',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDagAgamaOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Agama',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDagAgamaListExport'));

        $('#btnDtDagAgamaListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableAgama();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDagAgamaAdd').on('click', function () {
            modalAgamaClass.add();
        });

        // ----- \\

        oTableDkrKeturunan =  $('#dtDkrKeturunanList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDkrKeturunan.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDkrKeturunanEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDkrKeturunan.row(parseInt(rowId)).data();
                        modalKeturunanClass.edit(currentRow['kodKeturunan'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'kodKeturunan'},
                    {mData: 'keturunan'},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDkrKeturunanEdit" id="lnkDkrKeturunanEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    }
                ]
        });
        $("#dtDkrKeturunanList_filter").hide();
        $('#txtDkrKeturunanListSearch').on('keyup change', function () {
            oTableDkrKeturunan.search($(this).val()).draw();
        });

        let cntDkrKeturunan;
        let btnDkrKeturunanOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDkrKeturunan = 1;
                        }
                        if (column === 3) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDkrKeturunan++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDkrKeturunan, {
            buttons: [
                $.extend( true, {}, btnDkrKeturunanOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Keturunan',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDkrKeturunanOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Keturunan',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDkrKeturunanOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Keturunan',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDkrKeturunanListExport'));

        $('#btnDtDkrKeturunanListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableKeturunan();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDkrKeturunanAdd').on('click', function () {
            modalKeturunanClass.add();
        });

        // ----- \\

        oTableDngNegeri =  $('#dtDngNegeriList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDngNegeri.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDngNegeriEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDngNegeri.row(parseInt(rowId)).data();
                        modalNegeriClass.edit(currentRow['kodNegeri'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'kodNegeri'},
                    {mData: 'negeri'},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDngNegeriEdit" id="lnkDngNegeriEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    }
                ]
        });
        $("#dtDngNegeriList_filter").hide();
        $('#txtDngNegeriListSearch').on('keyup change', function () {
            oTableDngNegeri.search($(this).val()).draw();
        });

        let cntDngNegeri;
        let btnDngNegeriOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDngNegeri = 1;
                        }
                        if (column === 3) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDngNegeri++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDngNegeri, {
            buttons: [
                $.extend( true, {}, btnDngNegeriOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Negeri',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDngNegeriOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Negeri',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDngNegeriOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Negeri',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDngNegeriListExport'));

        $('#btnDtDngNegeriListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableNegeri();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDngNegeriAdd').on('click', function () {
            modalNegeriClass.add();
        });

        // ----- \\

        oTableDpkPoskod =  $('#dtDpkPoskodList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDpkPoskod.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDpkPoskodEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDpkPoskod.row(parseInt(rowId)).data();
                        modalPoskodClass.edit(currentRow['poskodId'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'poskod', sClass: 'text-center'},
                    {mData: null, mRender: function (data, type, row){
                            return row['kodNegeri'] !== '' ? refNegeri[parseInt(row['kodNegeri'])]['negeri'] : '';
                        }},
                    {mData: 'lokasi'},
                    {mData: 'bandar'},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDpkPoskodEdit" id="lnkDpkPoskodEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    },
                    {mData: 'poskodId', visible: false},
                    {mData: 'kodNegeri', visible: false}
                ]
        });
        $("#dtDpkPoskodList_filter").hide();
        $('#txtDpkPoskodListSearch').on('keyup change', function () {
            oTableDpkPoskod.search($(this).val()).draw();
        });

        let cntDpkPoskod;
        let btnDpkPoskodOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3, 4, 5],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDpkPoskod = 1;
                        }
                        if (column === 5) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDpkPoskod++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDpkPoskod, {
            buttons: [
                $.extend( true, {}, btnDpkPoskodOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Poskod',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDpkPoskodOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Poskod',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDpkPoskodOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Poskod',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDpkPoskodListExport'));

        $('#btnDtDpkPoskodListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTablePoskod();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDpkPoskodAdd').on('click', function () {
            modalPoskodClass.add();
        });

        // ----- \\

        oTableDptPusatTd =  $('#dtDptPusatTdList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDptPusatTd.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDptPusatTdEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDptPusatTd.row(parseInt(rowId)).data();
                        modalPusatTdClass.edit(currentRow['kod'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'kod', sClass: 'text-center'},
                    {mData: 'diskripsi'},
                    {mData: 'kodPendek', sClass: 'text-center'},
                    {mData: null, mRender: function (data, type, row){
                            return row['negKod'] !== '' ? refNegeri[parseInt(row['negKod'])]['negeri'] : '';
                        }},
                    {mData: 'kptKod', sClass: 'text-center'},
                    {mData: 'jenisPusat', sClass: 'text-center'},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDptPusatTdEdit" id="lnkDptPusatTdEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    },
                    {mData: 'negKod', visible: false}
                ]
        });
        $("#dtDptPusatTdList_filter").hide();
        $('#txtDptPusatTdListSearch').on('keyup change', function () {
            oTableDptPusatTd.search($(this).val()).draw();
        });

        let cntDptPusatTd;
        let btnDptPusatTdOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3, 4, 5, 6, 7],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDptPusatTd = 1;
                        }
                        if (column === 7) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDptPusatTd++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDptPusatTd, {
            buttons: [
                $.extend( true, {}, btnDptPusatTdOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Pusat Temu Duga',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDptPusatTdOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Pusat Temu Duga',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDptPusatTdOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Pusat Temu Duga',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDptPusatTdListExport'));

        $('#btnDtDptPusatTdListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTablePusatTd();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDptPusatTdAdd').on('click', function () {
            modalPusatTdClass.add();
        });

        // ----- \\

        oTableDmpMataPelajaran =  $('#dtDmpMataPelajaranList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDmpMataPelajaran.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDmpMataPelajaranEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDmpMataPelajaran.row(parseInt(rowId)).data();
                        modalMataPelajaranClass.edit(currentRow['kod'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'kod', sClass: 'text-center'},
                    {mData: 'tkt', sClass: 'text-center'},
                    {mData: 'diskripsi'},
                    {mData: 'gabYt', mRender: function (data){
                            return data === 'Y' ? 'Ya' : 'Tidak';
                        }},
                    {mData: 'noPemerolehan', sClass: 'text-center'},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDmpMataPelajaranEdit" id="lnkDmpMataPelajaranEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    }
                ]
        });
        $("#dtDmpMataPelajaranList_filter").hide();
        $('#txtDmpMataPelajaranListSearch').on('keyup change', function () {
            oTableDmpMataPelajaran.search($(this).val()).draw();
        });

        let cntDmpMataPelajaran;
        let btnDmpMataPelajaranOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3, 4, 5, 6],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDmpMataPelajaran = 1;
                        }
                        if (column === 6) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDmpMataPelajaran++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDmpMataPelajaran, {
            buttons: [
                $.extend( true, {}, btnDmpMataPelajaranOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Mata Pelajaran',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDmpMataPelajaranOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Mata Pelajaran',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDmpMataPelajaranOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Mata Pelajaran',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDmpMataPelajaranListExport'));

        $('#btnDtDmpMataPelajaranListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableMataPelajaran();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDmpMataPelajaranAdd').on('click', function () {
            modalMataPelajaranClass.add();
        });

        // ----- \\

        oTableDgmGredMatapelajaran =  $('#dtDgmGredMatapelajaranList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDgmGredMatapelajaran.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDgmGredMatapelajaranEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDgmGredMatapelajaran.row(parseInt(rowId)).data();
                        modalGredMatapelajaranClass.edit(currentRow['gredId'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'gred', sClass: 'text-center'},
                    {mData: 'jenis', sClass: 'text-center'},
                    {mData: 'tkt', sClass: 'text-center'},
                    {mData: 'namaPeperiksaan'},
                    {mData: 'susunan', sClass: 'text-center'},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDgmGredMatapelajaranEdit" id="lnkDgmGredMatapelajaranEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    },
                    {mData: 'gredId', visible: false}
                ]
        });
        $("#dtDgmGredMatapelajaranList_filter").hide();
        $('#txtDgmGredMatapelajaranListSearch').on('keyup change', function () {
            oTableDgmGredMatapelajaran.search($(this).val()).draw();
        });

        let cntDgmGredMatapelajaran;
        let btnDgmGredMatapelajaranOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3, 4, 5, 6],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDgmGredMatapelajaran = 1;
                        }
                        if (column === 6) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDgmGredMatapelajaran++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDgmGredMatapelajaran, {
            buttons: [
                $.extend( true, {}, btnDgmGredMatapelajaranOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Gred Mata Pelajaran',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDgmGredMatapelajaranOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Gred Mata Pelajaran',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDgmGredMatapelajaranOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Gred Mata Pelajaran',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDgmGredMatapelajaranListExport'));

        $('#btnDtDgmGredMatapelajaranListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableGredMatapelajaran();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDgmGredMatapelajaranAdd').on('click', function () {
            modalGredMatapelajaranClass.add();
        });

        // ----- \\

        oTableDsjSijil =  $('#dtDsjSijilList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDsjSijil.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDsjSijilEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDsjSijil.row(parseInt(rowId)).data();
                        modalSijilClass.edit(currentRow['sijilId'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'kod', sClass: 'text-center'},
                    {mData: 'tkt', sClass: 'text-center'},
                    {mData: 'diskripsi'},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDsjSijilEdit" id="lnkDsjSijilEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    },
                    {mData: 'sijilId', visible: false}
                ]
        });
        $("#dtDsjSijilList_filter").hide();
        $('#txtDsjSijilListSearch').on('keyup change', function () {
            oTableDsjSijil.search($(this).val()).draw();
        });

        let cntDsjSijil;
        let btnDsjSijilOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3, 4],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDsjSijil = 1;
                        }
                        if (column === 4) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDsjSijil++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDsjSijil, {
            buttons: [
                $.extend( true, {}, btnDsjSijilOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Sijil',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDsjSijilOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Sijil',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDsjSijilOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Sijil',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDsjSijilListExport'));

        $('#btnDtDsjSijilListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableSijil();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDsjSijilAdd').on('click', function () {
            modalSijilClass.add();
        });

        // ----- \\

        oTableDspSijilPangkat =  $('#dtDspSijilPangkatList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDspSijilPangkat.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDspSijilPangkatEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDspSijilPangkat.row(parseInt(rowId)).data();
                        modalSijilPangkatClass.edit(currentRow['sijilPangkatId'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'kod', sClass: 'text-center'},
                    {mData: 'tkt', sClass: 'text-center'},
                    {mData: 'diskripsi'},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDspSijilPangkatEdit" id="lnkDspSijilPangkatEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    },
                    {mData: 'sijilPangkatId', visible: false}
                ]
        });
        $("#dtDspSijilPangkatList_filter").hide();
        $('#txtDspSijilPangkatListSearch').on('keyup change', function () {
            oTableDspSijilPangkat.search($(this).val()).draw();
        });

        let cntDspSijilPangkat;
        let btnDspSijilPangkatOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3, 4],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDspSijilPangkat = 1;
                        }
                        if (column === 4) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDspSijilPangkat++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDspSijilPangkat, {
            buttons: [
                $.extend( true, {}, btnDspSijilPangkatOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Sijil Pangkat',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDspSijilPangkatOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Sijil Pangkat',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDspSijilPangkatOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Sijil Pangkat',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDspSijilPangkatListExport'));

        $('#btnDtDspSijilPangkatListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableSijilPangkat();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDspSijilPangkatAdd').on('click', function () {
            modalSijilPangkatClass.add();
        });

        // ----- \\

        oTableDulUjianLisan =  $('#dtDulUjianLisanList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDulUjianLisan.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDulUjianLisanEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDulUjianLisan.row(parseInt(rowId)).data();
                        modalUjianLisanClass.edit(currentRow['ujianLisanId'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'kod', sClass: 'text-center'},
                    {mData: 'tkt', sClass: 'text-center'},
                    {mData: 'diskripsi'},
                    {mData: 'susunan', sClass: 'text-center'},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDulUjianLisanEdit" id="lnkDulUjianLisanEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    },
                    {mData: 'ujianLisanId', visible: false}
                ]
        });
        $("#dtDulUjianLisanList_filter").hide();
        $('#txtDulUjianLisanListSearch').on('keyup change', function () {
            oTableDulUjianLisan.search($(this).val()).draw();
        });

        let cntDulUjianLisan;
        let btnDulUjianLisanOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3, 4, 5],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDulUjianLisan = 1;
                        }
                        if (column === 5) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDulUjianLisan++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDulUjianLisan, {
            buttons: [
                $.extend( true, {}, btnDulUjianLisanOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Ujian Lisan',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDulUjianLisanOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Ujian Lisan',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDulUjianLisanOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Ujian Lisan',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDulUjianLisanListExport'));

        $('#btnDtDulUjianLisanListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableUjianLisan();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDulUjianLisanAdd').on('click', function () {
            modalUjianLisanClass.add();
        });

        // ----- \\

        oTableDklKelulusan =  $('#dtDklKelulusanList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDklKelulusan.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDklKelulusanEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDklKelulusan.row(parseInt(rowId)).data();
                        modalKelulusanClass.edit(currentRow['kelulusanId'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'kod', sClass: 'text-center'},
                    {mData: 'diskripsi'},
                    {mData: 'jenis'},
                    {mData: 'kategori'},
                    {mData: 'noPemerolehan'},
                    {mData: 'gabYt', sClass: 'text-center', mRender: function (data){
                            return data === 'Y' ? 'Ya' : 'Tidak';
                        }},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDklKelulusanEdit" id="lnkDklKelulusanEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    },
                    {mData: 'kelulusanId', visible: false}
                ]
        });
        $("#dtDklKelulusanList_filter").hide();
        $('#txtDklKelulusanListSearch').on('keyup change', function () {
            oTableDklKelulusan.search($(this).val()).draw();
        });

        let cntDklKelulusan;
        let btnDklKelulusanOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3, 4, 5, 6],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDklKelulusan = 1;
                        }
                        if (column === 6) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDklKelulusan++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDklKelulusan, {
            buttons: [
                $.extend( true, {}, btnDklKelulusanOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Kelulusan',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDklKelulusanOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Kelulusan',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDklKelulusanOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Kelulusan',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDklKelulusanListExport'));

        $('#btnDtDklKelulusanListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableKelulusan();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDklKelulusanAdd').on('click', function () {
            modalKelulusanClass.add();
        });

        // ----- \\

        oTableDpjPaperJulai =  $('#dtDpjPaperJulaiList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDpjPaperJulai.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDpjPaperJulaiEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDpjPaperJulai.row(parseInt(rowId)).data();
                        modalPaperJulaiClass.edit(currentRow['mpelKod'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'mpelKod', sClass: 'text-center'},
                    {mData: 'diskripsi'},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDpjPaperJulaiEdit" id="lnkDpjPaperJulaiEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    }
                ]
        });
        $("#dtDpjPaperJulaiList_filter").hide();
        $('#txtDpjPaperJulaiListSearch').on('keyup change', function () {
            oTableDpjPaperJulai.search($(this).val()).draw();
        });

        let cntDpjPaperJulai;
        let btnDpjPaperJulaiOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDpjPaperJulai = 1;
                        }
                        if (column === 3) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDpjPaperJulai++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDpjPaperJulai, {
            buttons: [
                $.extend( true, {}, btnDpjPaperJulaiOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Paper Julai',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDpjPaperJulaiOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Paper Julai',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDpjPaperJulaiOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Paper Julai',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDpjPaperJulaiListExport'));

        $('#btnDtDpjPaperJulaiListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTablePaperJulai();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDpjPaperJulaiAdd').on('click', function () {
            modalPaperJulaiClass.add();
        });

        // ----- \\

        oTableDpmPaperJulaiBm =  $('#dtDpmPaperJulaiBmList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDpmPaperJulaiBm.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDpmPaperJulaiBmEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDpmPaperJulaiBm.row(parseInt(rowId)).data();
                        modalPaperJulaiBmClass.edit(currentRow['mpelKod'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'mpelKod', sClass: 'text-center'},
                    {mData: 'diskripsi'},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDpmPaperJulaiBmEdit" id="lnkDpmPaperJulaiBmEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    }
                ]
        });
        $("#dtDpmPaperJulaiBmList_filter").hide();
        $('#txtDpmPaperJulaiBmListSearch').on('keyup change', function () {
            oTableDpmPaperJulaiBm.search($(this).val()).draw();
        });

        let cntDpmPaperJulaiBm;
        let btnDpmPaperJulaiBmOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDpmPaperJulaiBm = 1;
                        }
                        if (column === 3) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDpmPaperJulaiBm++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDpmPaperJulaiBm, {
            buttons: [
                $.extend( true, {}, btnDpmPaperJulaiBmOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Paper Julai BM',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDpmPaperJulaiBmOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Paper Julai BM',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDpmPaperJulaiBmOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Paper Julai BM',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDpmPaperJulaiBmListExport'));

        $('#btnDtDpmPaperJulaiBmListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTablePaperJulaiBm();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDpmPaperJulaiBmAdd').on('click', function () {
            modalPaperJulaiBmClass.add();
        });

        // ----- \\

        oTableDkxKelulusanMref =  $('#dtDkxKelulusanMrefList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDkxKelulusanMref.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDkxKelulusanMrefEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDkxKelulusanMref.row(parseInt(rowId)).data();
                        modalKelulusanMrefClass.edit(currentRow['kelulusanId'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'kod', sClass: 'text-center'},
                    {mData: 'diskripsi'},
                    {mData: 'jenis'},
                    {mData: 'kategori'},
                    {mData: 'noPemerolehan'},
                    {mData: 'gabYt', sClass: 'text-center', mRender: function (data){
                            return data === 'Y' ? 'Ya' : 'Tidak';
                        }},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDkxKelulusanMrefEdit" id="lnkDkxKelulusanMrefEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    },
                    {mData: 'kelulusanId', visible: false}
                ]
        });
        $("#dtDkxKelulusanMrefList_filter").hide();
        $('#txtDkxKelulusanMrefListSearch').on('keyup change', function () {
            oTableDkxKelulusanMref.search($(this).val()).draw();
        });

        let cntDkxKelulusanMref;
        let btnDkxKelulusanMrefOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3, 4, 5, 6],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDkxKelulusanMref = 1;
                        }
                        if (column === 6) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDkxKelulusanMref++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDkxKelulusanMref, {
            buttons: [
                $.extend( true, {}, btnDkxKelulusanMrefOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Kelulusan Mref',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDkxKelulusanMrefOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Kelulusan Mref',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDkxKelulusanMrefOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Kelulusan Mref',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDkxKelulusanMrefListExport'));

        $('#btnDtDkxKelulusanMrefListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableKelulusanMref();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDkxKelulusanMrefAdd').on('click', function () {
            modalKelulusanMrefClass.add();
        });

        // ----- \\

        oTableDbhBahasa =  $('#dtDbhBahasaList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDbhBahasa.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDbhBahasaEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDbhBahasa.row(parseInt(rowId)).data();
                        modalBahasaClass.edit(currentRow['bahasaId'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'kod', sClass: 'text-center'},
                    {mData: 'diskripsi'},
                    {mData: 'noPemerolehan'},
                    {mData: 'gabYt', sClass: 'text-center', mRender: function (data){
                            return data === 'Y' ? 'Ya' : 'Tidak';
                        }},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDbhBahasaEdit" id="lnkDbhBahasaEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    },
                    {mData: 'bahasaId', visible: false}
                ]
        });
        $("#dtDbhBahasaList_filter").hide();
        $('#txtDbhBahasaListSearch').on('keyup change', function () {
            oTableDbhBahasa.search($(this).val()).draw();
        });

        let cntDbhBahasa;
        let btnDbhBahasaOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3, 4],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDbhBahasa = 1;
                        }
                        if (column === 4) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDbhBahasa++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDbhBahasa, {
            buttons: [
                $.extend( true, {}, btnDbhBahasaOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Bahasa',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDbhBahasaOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Bahasa',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDbhBahasaOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Bahasa',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDbhBahasaListExport'));

        $('#btnDtDbhBahasaListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableBahasa();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDbhBahasaAdd').on('click', function () {
            modalBahasaClass.add();
        });

        // ----- \\

        oTableDbkBakat =  $('#dtDbkBakatList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDbkBakat.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDbkBakatEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDbkBakat.row(parseInt(rowId)).data();
                        modalBakatClass.edit(currentRow['kod'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'kod', sClass: 'text-center'},
                    {mData: 'diskripsi'},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDbkBakatEdit" id="lnkDbkBakatEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    }
                ]
        });
        $("#dtDbkBakatList_filter").hide();
        $('#txtDbkBakatListSearch').on('keyup change', function () {
            oTableDbkBakat.search($(this).val()).draw();
        });

        let cntDbkBakat;
        let btnDbkBakatOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDbkBakat = 1;
                        }
                        if (column === 3) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDbkBakat++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDbkBakat, {
            buttons: [
                $.extend( true, {}, btnDbkBakatOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Bakat',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDbkBakatOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Bakat',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDbkBakatOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Bakat',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDbkBakatListExport'));

        $('#btnDtDbkBakatListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableBakat();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDbkBakatAdd').on('click', function () {
            modalBakatClass.add();
        });

        // ----- \\

        oTableDbdBakatDetail =  $('#dtDbdBakatDetailList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDbdBakatDetail.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDbdBakatDetailEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDbdBakatDetail.row(parseInt(rowId)).data();
                        modalBakatDetailClass.edit(currentRow['kod'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'kod', sClass: 'text-center'},
                    {mData: 'diskripsi'},
                    {mData: null, mRender: function (data, type, row){
                            return row['kodbakat'] !== '' ? refBakat[parseInt(row['kodbakat'])]['diskripsi'] : '';
                        }},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDbdBakatDetailEdit" id="lnkDbdBakatDetailEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    }
                ]
        });
        $("#dtDbdBakatDetailList_filter").hide();
        $('#txtDbdBakatDetailListSearch').on('keyup change', function () {
            oTableDbdBakatDetail.search($(this).val()).draw();
        });

        let cntDbdBakatDetail;
        let btnDbdBakatDetailOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3, 4],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDbdBakatDetail = 1;
                        }
                        if (column === 4) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDbdBakatDetail++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDbdBakatDetail, {
            buttons: [
                $.extend( true, {}, btnDbdBakatDetailOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Bakat Detail',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDbdBakatDetailOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Bakat Detail',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDbdBakatDetailOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Bakat Detail',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDbdBakatDetailListExport'));

        $('#btnDtDbdBakatDetailListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableBakatDetail();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDbdBakatDetailAdd').on('click', function () {
            modalBakatDetailClass.add();
        });

        // ----- \\

        oTableDbtBantuan =  $('#dtDbtBantuanList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDbtBantuan.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDbtBantuanEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDbtBantuan.row(parseInt(rowId)).data();
                        modalBantuanClass.edit(currentRow['bantuanId'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'kodBantuan'},
                    {mData: 'bantuan'},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDbtBantuanEdit" id="lnkDbtBantuanEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    },
                    {mData: 'bantuanId', visible: false}
                ]
        });
        $("#dtDbtBantuanList_filter").hide();
        $('#txtDbtBantuanListSearch').on('keyup change', function () {
            oTableDbtBantuan.search($(this).val()).draw();
        });

        let cntDbtBantuan;
        let btnDbtBantuanOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDbtBantuan = 1;
                        }
                        if (column === 3) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDbtBantuan++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDbtBantuan, {
            buttons: [
                $.extend( true, {}, btnDbtBantuanOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Bantuan',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDbtBantuanOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Bantuan',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDbtBantuanOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Bantuan',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDbtBantuanListExport'));

        $('#btnDtDbtBantuanListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableBantuan();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDbtBantuanAdd').on('click', function () {
            modalBantuanClass.add();
        });

        // ----- \\

        oTableDbwBiasiswa =  $('#dtDbwBiasiswaList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDbwBiasiswa.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDbwBiasiswaEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDbwBiasiswa.row(parseInt(rowId)).data();
                        modalBiasiswaClass.edit(currentRow['biasiswaId'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'kodBiasiswa'},
                    {mData: 'biasiswa'},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDbwBiasiswaEdit" id="lnkDbwBiasiswaEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    },
                    {mData: 'biasiswaId', visible: false}
                ]
        });
        $("#dtDbwBiasiswaList_filter").hide();
        $('#txtDbwBiasiswaListSearch').on('keyup change', function () {
            oTableDbwBiasiswa.search($(this).val()).draw();
        });

        let cntDbwBiasiswa;
        let btnDbwBiasiswaOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDbwBiasiswa = 1;
                        }
                        if (column === 3) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDbwBiasiswa++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDbwBiasiswa, {
            buttons: [
                $.extend( true, {}, btnDbwBiasiswaOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Biasiswa',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDbwBiasiswaOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Biasiswa',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDbwBiasiswaOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Biasiswa',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDbwBiasiswaListExport'));

        $('#btnDtDbwBiasiswaListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableBiasiswa();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDbwBiasiswaAdd').on('click', function () {
            modalBiasiswaClass.add();
        });

        // ----- \\

        oTableDkmKolejMatrikulasi =  $('#dtDkmKolejMatrikulasiList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDkmKolejMatrikulasi.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDkmKolejMatrikulasiEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDkmKolejMatrikulasi.row(parseInt(rowId)).data();
                        modalKolejMatrikulasiClass.edit(currentRow['kolejId'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'kodkolej'},
                    {mData: 'namakolej'},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDkmKolejMatrikulasiEdit" id="lnkDkmKolejMatrikulasiEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    },
                    {mData: 'kolejId', visible: false}
                ]
        });
        $("#dtDkmKolejMatrikulasiList_filter").hide();
        $('#txtDkmKolejMatrikulasiListSearch').on('keyup change', function () {
            oTableDkmKolejMatrikulasi.search($(this).val()).draw();
        });

        let cntDkmKolejMatrikulasi;
        let btnDkmKolejMatrikulasiOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDkmKolejMatrikulasi = 1;
                        }
                        if (column === 3) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDkmKolejMatrikulasi++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDkmKolejMatrikulasi, {
            buttons: [
                $.extend( true, {}, btnDkmKolejMatrikulasiOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Kolej Matrikulasi',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDkmKolejMatrikulasiOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Kolej Matrikulasi',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDkmKolejMatrikulasiOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Kolej Matrikulasi',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDkmKolejMatrikulasiListExport'));

        $('#btnDtDkmKolejMatrikulasiListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableKolejMatrikulasi();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDkmKolejMatrikulasiAdd').on('click', function () {
            modalKolejMatrikulasiClass.add();
        });

        // ----- \\

        oTableDggGredGaji =  $('#dtDggGredGajiList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDggGredGaji.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDggGredGajiEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDggGredGaji.row(parseInt(rowId)).data();
                        modalGredGajiClass.edit(currentRow['gredId'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'kod', sClass: 'text-center'},
                    {mData: 'diskripsi'},
                    {mData: 'noPemerolehan'},
                    {mData: 'gabYt', sClass: 'text-center', mRender: function (data){
                            return data === 'Y' ? 'Ya' : 'Tidak';
                        }},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDggGredGajiEdit" id="lnkDggGredGajiEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    },
                    {mData: 'gredId', visible: false}
                ]
        });
        $("#dtDggGredGajiList_filter").hide();
        $('#txtDggGredGajiListSearch').on('keyup change', function () {
            oTableDggGredGaji.search($(this).val()).draw();
        });

        let cntDggGredGaji;
        let btnDggGredGajiOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3, 4, 5],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDggGredGaji = 1;
                        }
                        if (column === 5) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDggGredGaji++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDggGredGaji, {
            buttons: [
                $.extend( true, {}, btnDggGredGajiOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Gred Gaji',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDggGredGajiOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Gred Gaji',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDggGredGajiOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Gred Gaji',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDggGredGajiListExport'));

        $('#btnDtDggGredGajiListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableGredGaji();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDggGredGajiAdd').on('click', function () {
            modalGredGajiClass.add();
        });

        // ----- \\

        oTableDisInstitusi =  $('#dtDisInstitusiList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDisInstitusi.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDisInstitusiEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDisInstitusi.row(parseInt(rowId)).data();
                        modalInstitusiClass.edit(currentRow['institusiId'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'kod', sClass: 'text-center'},
                    {mData: 'diskripsi'},
                    {mData: null, mRender: function (data, type, row){
                            return row['kategoriInstitusiId'] !== '' ? refKategoriInstitusi[parseInt(row['kategoriInstitusiId'])]['diskripsi'] : '';
                        }},
                    {mData: 'negara'},
                    {mData: 'kategori'},
                    {mData: 'noPemerolehan'},
                    {mData: 'gabYt', sClass: 'text-center', mRender: function (data){
                            return data === 'Y' ? 'Ya' : 'Tidak';
                        }},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDisInstitusiEdit" id="lnkDisInstitusiEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    },
                    {mData: 'institusiId', visible: false}
                ]
        });
        $("#dtDisInstitusiList_filter").hide();
        $('#txtDisInstitusiListSearch').on('keyup change', function () {
            oTableDisInstitusi.search($(this).val()).draw();
        });

        let cntDisInstitusi;
        let btnDisInstitusiOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3, 4, 5, 6, 7],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDisInstitusi = 1;
                        }
                        if (column === 7) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDisInstitusi++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDisInstitusi, {
            buttons: [
                $.extend( true, {}, btnDisInstitusiOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Institusi',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDisInstitusiOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Institusi',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDisInstitusiOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Institusi',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDisInstitusiListExport'));

        $('#btnDtDisInstitusiListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableInstitusi();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDisInstitusiAdd').on('click', function () {
            modalInstitusiClass.add();
        });

        // ----- \\

        oTableDjpJenisPengajian =  $('#dtDjpJenisPengajianList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDjpJenisPengajian.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDjpJenisPengajianEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDjpJenisPengajian.row(parseInt(rowId)).data();
                        modalJenisPengajianClass.edit(currentRow['jenisPengajianId'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'kod', sClass: 'text-center'},
                    {mData: 'diskripsi'},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDjpJenisPengajianEdit" id="lnkDjpJenisPengajianEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    },
                    {mData: 'jenisPengajianId', visible: false}
                ]
        });
        $("#dtDjpJenisPengajianList_filter").hide();
        $('#txtDjpJenisPengajianListSearch').on('keyup change', function () {
            oTableDjpJenisPengajian.search($(this).val()).draw();
        });

        let cntDjpJenisPengajian;
        let btnDjpJenisPengajianOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDjpJenisPengajian = 1;
                        }
                        if (column === 3) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDjpJenisPengajian++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDjpJenisPengajian, {
            buttons: [
                $.extend( true, {}, btnDjpJenisPengajianOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Jenis Pengajian',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDjpJenisPengajianOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Jenis Pengajian',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDjpJenisPengajianOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Jenis Pengajian',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDjpJenisPengajianListExport'));

        $('#btnDtDjpJenisPengajianListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableJenisPengajian();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDjpJenisPengajianAdd').on('click', function () {
            modalJenisPengajianClass.add();
        });

        // ----- \\

        oTableDjsJenisPengkhususan =  $('#dtDjsJenisPengkhususanList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDjsJenisPengkhususan.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDjsJenisPengkhususanEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDjsJenisPengkhususan.row(parseInt(rowId)).data();
                        modalJenisPengkhususanClass.edit(currentRow['jenisPengkhususanId'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'kod', sClass: 'text-center'},
                    {mData: 'diskripsi'},
                    {mData: 'kategori'},
                    {mData: 'jantina'},
                    {mData: 'nilai'},
                    {mData: 'noPemerolehan'},
                    {mData: 'gabYt', sClass: 'text-center', mRender: function (data){
                            return data === 'Y' ? 'Ya' : 'Tidak';
                        }},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDjsJenisPengkhususanEdit" id="lnkDjsJenisPengkhususanEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    },
                    {mData: 'jenisPengkhususanId', visible: false}
                ]
        });
        $("#dtDjsJenisPengkhususanList_filter").hide();
        $('#txtDjsJenisPengkhususanListSearch').on('keyup change', function () {
            oTableDjsJenisPengkhususan.search($(this).val()).draw();
        });

        let cntDjsJenisPengkhususan;
        let btnDjsJenisPengkhususanOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3, 4, 5, 6],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDjsJenisPengkhususan = 1;
                        }
                        if (column === 6) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDjsJenisPengkhususan++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDjsJenisPengkhususan, {
            buttons: [
                $.extend( true, {}, btnDjsJenisPengkhususanOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Jenis Pengkhususan',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDjsJenisPengkhususanOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Jenis Pengkhususan',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDjsJenisPengkhususanOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Jenis Pengkhususan',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDjsJenisPengkhususanListExport'));

        $('#btnDtDjsJenisPengkhususanListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableJenisPengkhususan();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDjsJenisPengkhususanAdd').on('click', function () {
            modalJenisPengkhususanClass.add();
        });

        // ----- \\

        oTableDjkJenisPerkhidmatan =  $('#dtDjkJenisPerkhidmatanList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDjkJenisPerkhidmatan.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDjkJenisPerkhidmatanEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDjkJenisPerkhidmatan.row(parseInt(rowId)).data();
                        modalJenisPerkhidmatanClass.edit(currentRow['jenisPerkhidmatanId'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'kod', sClass: 'text-center'},
                    {mData: 'diskripsi'},
                    {mData: 'kategori'},
                    {mData: 'jantina'},
                    {mData: 'nilai'},
                    {mData: 'noPemerolehan'},
                    {mData: 'gabYt', sClass: 'text-center', mRender: function (data){
                            return data === 'Y' ? 'Ya' : 'Tidak';
                        }},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDjkJenisPerkhidmatanEdit" id="lnkDjkJenisPerkhidmatanEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    },
                    {mData: 'jenisPerkhidmatanId', visible: false}
                ]
        });
        $("#dtDjkJenisPerkhidmatanList_filter").hide();
        $('#txtDjkJenisPerkhidmatanListSearch').on('keyup change', function () {
            oTableDjkJenisPerkhidmatan.search($(this).val()).draw();
        });

        let cntDjkJenisPerkhidmatan;
        let btnDjkJenisPerkhidmatanOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3, 4, 5, 6],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDjkJenisPerkhidmatan = 1;
                        }
                        if (column === 6) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDjkJenisPerkhidmatan++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDjkJenisPerkhidmatan, {
            buttons: [
                $.extend( true, {}, btnDjkJenisPerkhidmatanOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Jenis Perkhidmatan',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDjkJenisPerkhidmatanOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Jenis Perkhidmatan',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDjkJenisPerkhidmatanOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Jenis Perkhidmatan',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDjkJenisPerkhidmatanListExport'));

        $('#btnDtDjkJenisPerkhidmatanListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableJenisPerkhidmatan();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDjkJenisPerkhidmatanAdd').on('click', function () {
            modalJenisPerkhidmatanClass.add();
        });

        // ----- \\

        oTableDprPeringkat =  $('#dtDprPeringkatList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDprPeringkat.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDprPeringkatEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDprPeringkat.row(parseInt(rowId)).data();
                        modalPeringkatClass.edit(currentRow['peringkatId'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'kod', sClass: 'text-center'},
                    {mData: 'diskripsi'},
                    {mData: 'kategori'},
                    {mData: 'jantina'},
                    {mData: 'nilai'},
                    {mData: 'noPemerolehan'},
                    {mData: 'gabYt', sClass: 'text-center', mRender: function (data){
                            return data === 'Y' ? 'Ya' : 'Tidak';
                        }},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDprPeringkatEdit" id="lnkDprPeringkatEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    },
                    {mData: 'peringkatId', visible: false}
                ]
        });
        $("#dtDprPeringkatList_filter").hide();
        $('#txtDprPeringkatListSearch').on('keyup change', function () {
            oTableDprPeringkat.search($(this).val()).draw();
        });

        let cntDprPeringkat;
        let btnDprPeringkatOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3, 4, 5, 6],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDprPeringkat = 1;
                        }
                        if (column === 6) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDprPeringkat++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDprPeringkat, {
            buttons: [
                $.extend( true, {}, btnDprPeringkatOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Peringkat',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDprPeringkatOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Peringkat',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDprPeringkatOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Peringkat',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDprPeringkatListExport'));

        $('#btnDtDprPeringkatListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTablePeringkat();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDprPeringkatAdd').on('click', function () {
            modalPeringkatClass.add();
        });

        // ----- \\

        oTableDtlTelco =  $('#dtDtlTelcoList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDtlTelco.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDtlTelcoEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDtlTelco.row(parseInt(rowId)).data();
                        modalTelcoClass.edit(currentRow['telcoId'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'code'},
                    {mData: 'operatorName'},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDtlTelcoEdit" id="lnkDtlTelcoEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    },
                    {mData: 'telcoId', visible: false}
                ]
        });
        $("#dtDtlTelcoList_filter").hide();
        $('#txtDtlTelcoListSearch').on('keyup change', function () {
            oTableDtlTelco.search($(this).val()).draw();
        });

        let cntDtlTelco;
        let btnDtlTelcoOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDtlTelco = 1;
                        }
                        if (column === 3) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDtlTelco++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDtlTelco, {
            buttons: [
                $.extend( true, {}, btnDtlTelcoOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Telco',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDtlTelcoOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Telco',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDtlTelcoOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Telco',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDtlTelcoListExport'));

        $('#btnDtDtlTelcoListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableTelco();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDtlTelcoAdd').on('click', function () {
            modalTelcoClass.add();
        });

        // ----- \\

        oTableDkcKecacatanCalon =  $('#dtDkcKecacatanCalonList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDkcKecacatanCalon.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDkcKecacatanCalonEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDkcKecacatanCalon.row(parseInt(rowId)).data();
                        modalKecacatanCalonClass.edit(currentRow['kecacatanCalonId'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'kod', sClass: 'text-center'},
                    {mData: 'diskripsi'},
                    {mData: 'kategori'},
                    {mData: 'jantina'},
                    {mData: 'nilai'},
                    {mData: 'noPemerolehan'},
                    {mData: 'gabYt', sClass: 'text-center', mRender: function (data){
                            return data === 'Y' ? 'Ya' : 'Tidak';
                        }},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDkcKecacatanCalonEdit" id="lnkDkcKecacatanCalonEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    },
                    {mData: 'kecacatanCalonId', visible: false}
                ]
        });
        $("#dtDkcKecacatanCalonList_filter").hide();
        $('#txtDkcKecacatanCalonListSearch').on('keyup change', function () {
            oTableDkcKecacatanCalon.search($(this).val()).draw();
        });

        let cntDkcKecacatanCalon;
        let btnDkcKecacatanCalonOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3, 4, 5, 6],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDkcKecacatanCalon = 1;
                        }
                        if (column === 6) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDkcKecacatanCalon++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDkcKecacatanCalon, {
            buttons: [
                $.extend( true, {}, btnDkcKecacatanCalonOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Kecacatan Calon',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDkcKecacatanCalonOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Kecacatan Calon',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDkcKecacatanCalonOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Kecacatan Calon',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDkcKecacatanCalonListExport'));

        $('#btnDtDkcKecacatanCalonListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableKecacatanCalon();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDkcKecacatanCalonAdd').on('click', function () {
            modalKecacatanCalonClass.add();
        });

        // ----- \\

        oTableDpbPenguasaanBahasa =  $('#dtDpbPenguasaanBahasaList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDpbPenguasaanBahasa.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDpbPenguasaanBahasaEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDpbPenguasaanBahasa.row(parseInt(rowId)).data();
                        modalPenguasaanBahasaClass.edit(currentRow['penguasaanBahasaId'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'kod', sClass: 'text-center'},
                    {mData: 'diskripsi'},
                    {mData: 'kategori'},
                    {mData: 'jantina'},
                    {mData: 'nilai'},
                    {mData: 'noPemerolehan'},
                    {mData: 'gabYt', sClass: 'text-center', mRender: function (data){
                            return data === 'Y' ? 'Ya' : 'Tidak';
                        }},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDpbPenguasaanBahasaEdit" id="lnkDpbPenguasaanBahasaEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    },
                    {mData: 'penguasaanBahasaId', visible: false}
                ]
        });
        $("#dtDpbPenguasaanBahasaList_filter").hide();
        $('#txtDpbPenguasaanBahasaListSearch').on('keyup change', function () {
            oTableDpbPenguasaanBahasa.search($(this).val()).draw();
        });

        let cntDpbPenguasaanBahasa;
        let btnDpbPenguasaanBahasaOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3, 4, 5, 6],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDpbPenguasaanBahasa = 1;
                        }
                        if (column === 6) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDpbPenguasaanBahasa++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDpbPenguasaanBahasa, {
            buttons: [
                $.extend( true, {}, btnDpbPenguasaanBahasaOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Penguasaan Bahasa',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDpbPenguasaanBahasaOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Penguasaan Bahasa',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDpbPenguasaanBahasaOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Penguasaan Bahasa',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDpbPenguasaanBahasaListExport'));

        $('#btnDtDpbPenguasaanBahasaListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTablePenguasaanBahasa();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDpbPenguasaanBahasaAdd').on('click', function () {
            modalPenguasaanBahasaClass.add();
        });

        // ----- \\

        oTableDtjTarafJawatan =  $('#dtDtjTarafJawatanList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDtjTarafJawatan.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDtjTarafJawatanEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDtjTarafJawatan.row(parseInt(rowId)).data();
                        modalTarafJawatanClass.edit(currentRow['tarafJawatanId'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'kod', sClass: 'text-center'},
                    {mData: 'diskripsi'},
                    {mData: 'kategori'},
                    {mData: 'jantina'},
                    {mData: 'nilai'},
                    {mData: 'noPemerolehan'},
                    {mData: 'gabYt', sClass: 'text-center', mRender: function (data){
                            return data === 'Y' ? 'Ya' : 'Tidak';
                        }},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDtjTarafJawatanEdit" id="lnkDtjTarafJawatanEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    },
                    {mData: 'tarafJawatanId', visible: false}
                ]
        });
        $("#dtDtjTarafJawatanList_filter").hide();
        $('#txtDtjTarafJawatanListSearch').on('keyup change', function () {
            oTableDtjTarafJawatan.search($(this).val()).draw();
        });

        let cntDtjTarafJawatan;
        let btnDtjTarafJawatanOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3, 4, 5, 6],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDtjTarafJawatan = 1;
                        }
                        if (column === 6) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDtjTarafJawatan++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDtjTarafJawatan, {
            buttons: [
                $.extend( true, {}, btnDtjTarafJawatanOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Taraf Jawatan',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDtjTarafJawatanOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Taraf Jawatan',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDtjTarafJawatanOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Taraf Jawatan',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDtjTarafJawatanListExport'));

        $('#btnDtDtjTarafJawatanListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableTarafJawatan();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDtjTarafJawatanAdd').on('click', function () {
            modalTarafJawatanClass.add();
        });

        // ----- \\

        oTableDpsPengkhususan =  $('#dtDpsPengkhususanList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDpsPengkhususan.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDpsPengkhususanEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDpsPengkhususan.row(parseInt(rowId)).data();
                        modalPengkhususanClass.edit(currentRow['pengkhususanId'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'kod', sClass: 'text-center'},
                    {mData: 'diskripsi'},
                    {mData: null, mRender: function (data, type, row){
                            return row['jenisPengkhususanId'] !== '' ? refJenisPengkhususan[parseInt(row['jenisPengkhususanId'])]['diskripsi'] : '';
                        }},
                    {mData: 'bidang'},
                    {mData: 'noPemerolehan'},
                    {mData: 'gabYt', sClass: 'text-center', mRender: function (data){
                            return data === 'Y' ? 'Ya' : 'Tidak';
                        }},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDpsPengkhususanEdit" id="lnkDpsPengkhususanEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    },
                    {mData: 'pengkhususanId', visible: false}
                ]
        });
        $("#dtDpsPengkhususanList_filter").hide();
        $('#txtDpsPengkhususanListSearch').on('keyup change', function () {
            oTableDpsPengkhususan.search($(this).val()).draw();
        });

        let cntDpsPengkhususan;
        let btnDpsPengkhususanOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3, 4, 5, 6],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDpsPengkhususan = 1;
                        }
                        if (column === 6) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDpsPengkhususan++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDpsPengkhususan, {
            buttons: [
                $.extend( true, {}, btnDpsPengkhususanOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Pengkhususan',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDpsPengkhususanOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Pengkhususan',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDpsPengkhususanOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Pengkhususan',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDpsPengkhususanListExport'));

        $('#btnDtDpsPengkhususanListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTablePengkhususan();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDpsPengkhususanAdd').on('click', function () {
            modalPengkhususanClass.add();
        });

        // ----- \\

        oTableDsuSukan =  $('#dtDsuSukanList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDsuSukan.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDsuSukanEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDsuSukan.row(parseInt(rowId)).data();
                        modalSukanClass.edit(currentRow['sukanId'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'kod', sClass: 'text-center'},
                    {mData: 'diskripsi'},
                    {mData: 'kategori'},
                    {mData: 'jantina'},
                    {mData: 'nilai'},
                    {mData: 'noPemerolehan'},
                    {mData: 'gabYt', sClass: 'text-center', mRender: function (data){
                            return data === 'Y' ? 'Ya' : 'Tidak';
                        }},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDsuSukanEdit" id="lnkDsuSukanEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    },
                    {mData: 'sukanId', visible: false}
                ]
        });
        $("#dtDsuSukanList_filter").hide();
        $('#txtDsuSukanListSearch').on('keyup change', function () {
            oTableDsuSukan.search($(this).val()).draw();
        });

        let cntDsuSukan;
        let btnDsuSukanOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3, 4, 5, 6, 7, 8],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDsuSukan = 1;
                        }
                        if (column === 8) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDsuSukan++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDsuSukan, {
            buttons: [
                $.extend( true, {}, btnDsuSukanOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Sukan',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDsuSukanOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Sukan',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDsuSukanOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Sukan',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDsuSukanListExport'));

        $('#btnDtDsuSukanListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableSukan();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDsuSukanAdd').on('click', function () {
            modalSukanClass.add();
        });

        // ----- \\

        oTableDssSkimSah =  $('#dtDssSkimSahList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDssSkimSah.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDssSkimSahEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDssSkimSah.row(parseInt(rowId)).data();
                        modalSkimSahClass.edit(currentRow['skimSahId'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'kod', sClass: 'text-center'},
                    {mData: 'diskripsi'},
                    {mData: 'kumpPkhidmatJkk', sClass: 'text-center'},
                    {mData: 'agensi'},
                    {mData: 'bakatYt', sClass: 'text-center', mRender: function (data){
                            return data === 'Y' ? 'Ya' : 'Tidak';
                        }},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDssSkimSahEdit" id="lnkDssSkimSahEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    },
                    {mData: 'skimSahId', visible: false}
                ]
        });
        $("#dtDssSkimSahList_filter").hide();
        $('#txtDssSkimSahListSearch').on('keyup change', function () {
            oTableDssSkimSah.search($(this).val()).draw();
        });

        let cntDssSkimSah;
        let btnDssSkimSahOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3, 4, 5, 6],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDssSkimSah = 1;
                        }
                        if (column === 6) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDssSkimSah++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDssSkimSah, {
            buttons: [
                $.extend( true, {}, btnDssSkimSahOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Skim Sah',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDssSkimSahOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Skim Sah',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDssSkimSahOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Skim Sah',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDssSkimSahListExport'));

        $('#btnDtDssSkimSahListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableSkimSah();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDssSkimSahAdd').on('click', function () {
            modalSkimSahClass.add();
        });
        
        // ----- \\

        oTableDskSkim =  $('#dtDskSkimList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDskSkim.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDskSkimEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDskSkim.row(parseInt(rowId)).data();
                        modalSkimClass.edit(currentRow['skimId'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'kod', sClass: 'text-center'},
                    {mData: 'diskripsi'},
                    {mData: 'jenisSkim', sClass: 'text-center'},
                    {mData: 'gghKod', sClass: 'text-center'},
                    {mData: 'gghSsm', sClass: 'text-center'},
                    {mData: 'kumpPkhidmatJkk', sClass: 'text-center'},
                    {mData: 'kumpPkhidmatSbpa', sClass: 'text-center'},
                    {mData: 'kumpPkhidmatSsb', sClass: 'text-center'},
                    {mData: 'kpKod', sClass: 'text-center'},
                    {mData: 'ujianYt', sClass: 'text-center', mRender: function (data){
                            return data === 'Y' ? 'Ya' : 'Tidak';
                        }},
                    {mData: 'gabYt', sClass: 'text-center', mRender: function (data){
                            return data === 'Y' ? 'Ya' : 'Tidak';
                        }},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDskSkimEdit" id="lnkDskSkimEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    },
                    {mData: 'skimId', visible: false},
                    {mData: 'gunasama', visible: false},
                    {mData: 'oldKod', visible: false},
                    {mData: 'oldName', visible: false},
                    {mData: 'oldGred', visible: false},
                    {mData: 'skimPkhidmat', visible: false},
                    {mData: 'ujianWajib1', visible: false},
                    {mData: 'ujianWajib2', visible: false},
                    {mData: 'ujianWajib3', visible: false},
                    {mData: 'ujianWajib4', visible: false},
                    {mData: 'ujianWajib5', visible: false}
                ]
        });
        $("#dtDskSkimList_filter").hide();
        $('#txtDskSkimListSearch').on('keyup change', function () {
            oTableDskSkim.search($(this).val()).draw();
        });

        let cntDskSkim;
        let btnDskSkimOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDskSkim = 1;
                        }
                        if (column === 12) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDskSkim++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDskSkim, {
            buttons: [
                $.extend( true, {}, btnDskSkimOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Skim Sah',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDskSkimOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Skim Sah',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDskSkimOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Skim Sah',
                    titleAttr: 'Pdf',
                    orientation: 'landscape',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDskSkimListExport'));

        $('#btnDtDskSkimListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableSkim();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDskSkimAdd').on('click', function () {
            modalSkimClass.add();
        });

        // ----- \\

        oTableDbpBekasPolTen =  $('#dtDbpBekasPolTenList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDbpBekasPolTen.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDbpBekasPolTenEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDbpBekasPolTen.row(parseInt(rowId)).data();
                        modalBekasPolTenClass.edit(currentRow['bekasPolTenId'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'kodBekasPolisTentera', sClass: 'text-center'},
                    {mData: 'kodPangkat', sClass: 'text-center'},
                    {mData: 'diskripsi'},
                    {mData: 'kodLain', sClass: 'text-center'},
                    {mData: 'mainInd', sClass: 'text-center'},
                    {mData: 'susunanKanan', sClass: 'text-center'},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDbpBekasPolTenEdit" id="lnkDbpBekasPolTenEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    },
                    {mData: 'bekasPolTenId', visible: false}
                ]
        });
        $("#dtDbpBekasPolTenList_filter").hide();
        $('#txtDbpBekasPolTenListSearch').on('keyup change', function () {
            oTableDbpBekasPolTen.search($(this).val()).draw();
        });

        let cntDbpBekasPolTen;
        let btnDbpBekasPolTenOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3, 4, 5, 6, 7],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDbpBekasPolTen = 1;
                        }
                        if (column === 7) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDbpBekasPolTen++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDbpBekasPolTen, {
            buttons: [
                $.extend( true, {}, btnDbpBekasPolTenOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Bekas Pol Ten',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDbpBekasPolTenOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Bekas Pol Ten',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDbpBekasPolTenOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Bekas Pol Ten',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDbpBekasPolTenListExport'));

        $('#btnDtDbpBekasPolTenListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableBekasPolTen();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDbpBekasPolTenAdd').on('click', function () {
            modalBekasPolTenClass.add();
        });

        // ----- \\

        oTableDsmSubjekMatrikulasi =  $('#dtDsmSubjekMatrikulasiList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDsmSubjekMatrikulasi.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDsmSubjekMatrikulasiEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDsmSubjekMatrikulasi.row(parseInt(rowId)).data();
                        modalSubjekMatrikulasiClass.edit(currentRow['subjId'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'subjCode', sClass: 'text-center'},
                    {mData: 'subjName'},
                    {mData: 'subjCredit', sClass: 'text-center'},
                    {mData: 'subjSemester', sClass: 'text-center'},
                    {mData: 'subjKira'},
                    {mData: 'subjSesi', sClass: 'text-center'},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDsmSubjekMatrikulasiEdit" id="lnkDsmSubjekMatrikulasiEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    },
                    {mData: 'subjId', visible: false}
                ]
        });
        $("#dtDsmSubjekMatrikulasiList_filter").hide();
        $('#txtDsmSubjekMatrikulasiListSearch').on('keyup change', function () {
            oTableDsmSubjekMatrikulasi.search($(this).val()).draw();
        });

        let cntDsmSubjekMatrikulasi;
        let btnDsmSubjekMatrikulasiOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3, 4, 5, 6],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDsmSubjekMatrikulasi = 1;
                        }
                        if (column === 6) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDsmSubjekMatrikulasi++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDsmSubjekMatrikulasi, {
            buttons: [
                $.extend( true, {}, btnDsmSubjekMatrikulasiOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Subjek Matrikulasi',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDsmSubjekMatrikulasiOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Subjek Matrikulasi',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDsmSubjekMatrikulasiOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Subjek Matrikulasi',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDsmSubjekMatrikulasiListExport'));

        $('#btnDtDsmSubjekMatrikulasiListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableSubjekMatrikulasi();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDsmSubjekMatrikulasiAdd').on('click', function () {
            modalSubjekMatrikulasiClass.add();
        });

        // ----- \\

        oTableDkjKemJabatan =  $('#dtDkjKemJabatanList').DataTable({
            bLengthChange: false,
            bFilter: true,
            pageLength: 10,
            "aaSorting": [1, 'asc'],
            fnRowCallback : function(nRow, aData, iDisplayIndex){
                const info = oTableDkjKemJabatan.page.info();
                $('td', nRow).eq(0).html(info.page * info.length + (iDisplayIndex + 1));
            },
            drawCallback: function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('.lnkDkjKemJabatanEdit').off('click').on('click', function () {
                    const linkId = $(this).attr('id');
                    const linkIndex = linkId.indexOf('_');
                    if (linkIndex > 0) {
                        const rowId = linkId.substr(linkIndex+1);
                        const currentRow = oTableDkjKemJabatan.row(parseInt(rowId)).data();
                        modalKemJabatanClass.edit(currentRow['kemJabatanId'], rowId);
                    }
                });
            },
            language: _DATATABLE_LANGUAGE,
            aoColumns:
                [
                    {mData: null, bSortable: false},
                    {mData: 'kod', sClass: 'text-center'},
                    {mData: 'diskripsi'},
                    {mData: 'alamat1'},
                    {mData: 'alamat2'},
                    {mData: 'alamat3'},
                    {mData: 'gelaranKetua'},
                    {mData: 'poskod', sClass: 'text-center'},
                    {mData: 'bandar'},
                    {mData: 'kemKod', sClass: 'text-center'},
                    {mData: 'diskripsi2'},
                    {mData: 'diskripsi3'},
                    {mData: 'emel'},
                    {mData: 'noTel'},
                    {mData: 'unitUrusan'},
                    {mData: 'noPemerolehan'},
                    {mData: 'gabYt', sClass: 'text-center', mRender: function (data){
                            return data === 'Y' ? 'Ya' : 'Tidak';
                        }},
                    {mData: 'sahYt', sClass: 'text-center',
                        mRender: function (data) {
                            const badgeColor = data === 'Y' ? 'green' : 'grey';
                            const badgeDesc = data === 'Y' ? 'Aktif' : 'Tidak Aktif';
                            return '<h6><span class="badge badge-pill '+badgeColor+' z-depth-2">'+badgeDesc+'</span></h6>';
                        }
                    },
                    {mData: null, bSortable: false, sClass: 'text-center',
                        mRender: function (data, type, row, meta) {
                            return '<a><i class="fas fa-edit lnkDkjKemJabatanEdit" id="lnkDkjKemJabatanEdit_' + meta.row + '" data-toggle="tooltip" data-placement="top" title="Kemaskini"></i></a>';
                        }
                    },
                    {mData: 'kemJabatanId', visible: false}
                ]
        });
        $("#dtDkjKemJabatanList_filter").hide();
        $('#txtDkjKemJabatanListSearch').on('keyup change', function () {
            oTableDkjKemJabatan.search($(this).val()).draw();
        });

        let cntDkjKemJabatan;
        let btnDkjKemJabatanOpt = {
            exportOptions: {
                columns: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
                format: {
                    body: function ( data, row, column ) {
                        if (row === 0 && column === 0) {
                            cntDkjKemJabatan = 1;
                        }
                        if (column === 17) {
                            const n = data.search('">');
                            const k = data.substr(n+2);
                            return k.replace('</span></h6>','');
                        }
                        return column === 0 ? cntDkjKemJabatan++ : data;
                    }
                }
            }
        };

        new $.fn.dataTable.Buttons(oTableDkjKemJabatan, {
            buttons: [
                $.extend( true, {}, btnDkjKemJabatanOpt, {
                    extend:    'print',
                    text:      '<i class="fas fa-print"></i>',
                    title:     'SPA9 - Senarai Kementerian Jabatan',
                    titleAttr: 'Print',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDkjKemJabatanOpt, {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    title:     'SPA9 - Senarai Kementerian Jabatan',
                    titleAttr: 'Excel',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                }),
                $.extend( true, {}, btnDkjKemJabatanOpt, {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    title:     'SPA9 - Senarai Kementerian Jabatan',
                    titleAttr: 'Pdf',
                    className: 'btn btn-outline-white btn-rounded btn-sm px-2'
                })
            ]
        }).container().appendTo($('#btnDtDkjKemJabatanListExport'));

        $('#btnDtDkjKemJabatanListRefresh').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    self.genTableKemJabatan();
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

        $('#btnDkjKemJabatanAdd').on('click', function () {
            modalKemJabatanClass.add();
        });

        // ----- \\

        $('#btnDmnSearch').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    $('.sectDmnResult').hide();
                    const dataType = $('#optDmnType').val();
                    if (dataType === null) {
                        toastr['warning'](_ALERT_MSG_WARNING_NODATA, _ALERT_TITLE_WARNING);
                    } else if (dataType === '1') {
                        self.genTableAgama();
                    } else if (dataType === '2') {
                        self.genTableKeturunan();
                    } else if (dataType === '3') {
                        self.genTableNegeri();
                    } else if (dataType === '4') {
                        self.genTablePoskod();
                    } else if (dataType === '5') {
                        self.genTablePusatTd();
                    } else if (dataType === '6') {
                        self.genTableMataPelajaran();
                    } else if (dataType === '7') {
                        self.genTableGredMatapelajaran();
                    } else if (dataType === '8') {
                        self.genTableSijil();
                    } else if (dataType === '9') {
                        self.genTableSijilPangkat();
                    } else if (dataType === '10') {
                        self.genTableUjianLisan();
                    } else if (dataType === '11') {
                        self.genTableKelulusan();
                    } else if (dataType === '12') {
                        self.genTablePaperJulai();
                    } else if (dataType === '13') {
                        self.genTablePaperJulaiBm();
                    } else if (dataType === '14') {
                        self.genTableKelulusanMref();
                    } else if (dataType === '15') {
                        self.genTableBahasa();
                    } else if (dataType === '16') {
                        self.genTableBakat();
                    } else if (dataType === '17') {
                        self.genTableBakatDetail();
                    } else if (dataType === '18') {
                        self.genTableBantuan();
                    } else if (dataType === '19') {
                        self.genTableBiasiswa();
                    } else if (dataType === '20') {
                        self.genTableKolejMatrikulasi();
                    } else if (dataType === '21') {
                        self.genTableGredGaji();
                    } else if (dataType === '22') {
                        self.genTableInstitusi();
                    } else if (dataType === '23') {
                        self.genTableJenisPengajian();
                    } else if (dataType === '24') {
                        self.genTableJenisPengkhususan();
                    } else if (dataType === '25') {
                        self.genTableJenisPerkhidmatan();
                    } else if (dataType === '26') {
                        self.genTablePeringkat();
                    } else if (dataType === '27') {
                        self.genTableTelco();
                    } else if (dataType === '28') {
                        self.genTableKecacatanCalon();
                    } else if (dataType === '29') {
                        self.genTablePenguasaanBahasa();
                    } else if (dataType === '30') {
                        self.genTablePenguasaanBahasa();
                    } else if (dataType === '31') {
                        self.genTablePengkhususan();
                    } else if (dataType === '32') {
                        self.genTableSukan();
                    } else if (dataType === '33') {
                        self.genTableSkimSah();
                    } else if (dataType === '34') {
                        self.genTableSkim();
                    } else if (dataType === '35') {
                        self.genTableBekasPolTen();
                    } else if (dataType === '36') {
                        self.genTableSubjekMatrikulasi();
                    } else if (dataType === '37') {
                        self.genTableKemJabatan();
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });
    };

    this.genTableAgama = function () {
        $('#sectDmnResult1').show();
        const dataResult = mzAjaxRequest('agama.php', 'GET');
        oTableDagAgama.clear().rows.add(dataResult).draw();
    };

    this.addTableAgama = function (_dataAdd) {
        oTableDagAgama.row.add(_dataAdd).draw();
    };

    this.updateTableAgama = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDagAgama.row(_rowEdit).data();
        if (typeof _dataEdit['kodAgama'] !== 'undefined') {
            currentRow['kodAgama'] = _dataEdit['kodAgama'];
        }
        if (typeof _dataEdit['agama'] !== 'undefined') {
            currentRow['agama'] = _dataEdit['agama'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDagAgama.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\
    
    this.genTableKeturunan = function () {
        $('#sectDmnResult2').show();
        const dataResult = mzAjaxRequest('keturunan.php', 'GET');
        oTableDkrKeturunan.clear().rows.add(dataResult).draw();
    };

    this.addTableKeturunan = function (_dataAdd) {
        oTableDkrKeturunan.row.add(_dataAdd).draw();
    };

    this.updateTableKeturunan = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDkrKeturunan.row(_rowEdit).data();
        if (typeof _dataEdit['keturunan'] !== 'undefined') {
            currentRow['keturunan'] = _dataEdit['keturunan'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDkrKeturunan.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTableNegeri = function () {
        $('#sectDmnResult3').show();
        const dataResult = mzAjaxRequest('negeri.php', 'GET');
        oTableDngNegeri.clear().rows.add(dataResult).draw();
    };

    this.addTableNegeri = function (_dataAdd) {
        oTableDngNegeri.row.add(_dataAdd).draw();
    };

    this.updateTableNegeri = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDngNegeri.row(_rowEdit).data();
        if (typeof _dataEdit['negeri'] !== 'undefined') {
            currentRow['negeri'] = _dataEdit['negeri'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDngNegeri.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTablePoskod = function () {
        $('#sectDmnResult4').show();
        const dataResult = mzAjaxRequest('poskod.php', 'GET');
        oTableDpkPoskod.clear().rows.add(dataResult).draw();
    };

    this.addTablePoskod = function (_dataAdd) {
        oTableDpkPoskod.row.add(_dataAdd).draw();
    };

    this.updateTablePoskod = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDpkPoskod.row(_rowEdit).data();
        if (typeof _dataEdit['poskodId'] !== 'undefined') {
            currentRow['poskodId'] = _dataEdit['poskodId'];
        }
        if (typeof _dataEdit['poskod'] !== 'undefined') {
            currentRow['poskod'] = _dataEdit['poskod'];
        }
        if (typeof _dataEdit['kodNegeri'] !== 'undefined') {
            currentRow['kodNegeri'] = _dataEdit['kodNegeri'];
        }
        if (typeof _dataEdit['lokasi'] !== 'undefined') {
            currentRow['lokasi'] = _dataEdit['lokasi'];
        }
        if (typeof _dataEdit['bandar'] !== 'undefined') {
            currentRow['bandar'] = _dataEdit['bandar'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDpkPoskod.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTablePusatTd = function () {
        $('#sectDmnResult5').show();
        const dataResult = mzAjaxRequest('pusat_td.php', 'GET');
        oTableDptPusatTd.clear().rows.add(dataResult).draw();
    };

    this.addTablePusatTd = function (_dataAdd) {
        oTableDptPusatTd.row.add(_dataAdd).draw();
    };

    this.updateTablePusatTd = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDptPusatTd.row(_rowEdit).data();
        if (typeof _dataEdit['kod'] !== 'undefined') {
            currentRow['kod'] = _dataEdit['kod'];
        }
        if (typeof _dataEdit['diskripsi'] !== 'undefined') {
            currentRow['diskripsi'] = _dataEdit['diskripsi'];
        }
        if (typeof _dataEdit['kodPendek'] !== 'undefined') {
            currentRow['kodPendek'] = _dataEdit['kodPendek'];
        }
        if (typeof _dataEdit['negKod'] !== 'undefined') {
            currentRow['negKod'] = _dataEdit['negKod'];
        }
        if (typeof _dataEdit['kptKod'] !== 'undefined') {
            currentRow['kptKod'] = _dataEdit['kptKod'];
        }
        if (typeof _dataEdit['jenisPusat'] !== 'undefined') {
            currentRow['jenisPusat'] = _dataEdit['jenisPusat'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDptPusatTd.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTableMataPelajaran = function () {
        $('#sectDmnResult6').show();
        const dataResult = mzAjaxRequest('mata_pelajaran.php', 'GET');
        oTableDmpMataPelajaran.clear().rows.add(dataResult).draw();
    };

    this.addTableMataPelajaran = function (_dataAdd) {
        oTableDmpMataPelajaran.row.add(_dataAdd).draw();
    };

    this.updateTableMataPelajaran = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDmpMataPelajaran.row(_rowEdit).data();
        if (typeof _dataEdit['kod'] !== 'undefined') {
            currentRow['kod'] = _dataEdit['kod'];
        }
        if (typeof _dataEdit['tkt'] !== 'undefined') {
            currentRow['tkt'] = _dataEdit['tkt'];
        }
        if (typeof _dataEdit['diskripsi'] !== 'undefined') {
            currentRow['diskripsi'] = _dataEdit['diskripsi'];
        }
        if (typeof _dataEdit['gabYt'] !== 'undefined') {
            currentRow['gabYt'] = _dataEdit['gabYt'];
        }
        if (typeof _dataEdit['noPemerolehan'] !== 'undefined') {
            currentRow['noPemerolehan'] = _dataEdit['noPemerolehan'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDmpMataPelajaran.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTableGredMatapelajaran = function () {
        $('#sectDmnResult7').show();
        const dataResult = mzAjaxRequest('gred_matapelajaran.php', 'GET');
        oTableDgmGredMatapelajaran.clear().rows.add(dataResult).draw();
    };

    this.addTableGredMatapelajaran = function (_dataAdd) {
        oTableDgmGredMatapelajaran.row.add(_dataAdd).draw();
    };

    this.updateTableGredMatapelajaran = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDgmGredMatapelajaran.row(_rowEdit).data();
        if (typeof _dataEdit['gredId'] !== 'undefined') {
            currentRow['gredId'] = _dataEdit['gredId'];
        }
        if (typeof _dataEdit['gred'] !== 'undefined') {
            currentRow['gred'] = _dataEdit['gred'];
        }
        if (typeof _dataEdit['jenis'] !== 'undefined') {
            currentRow['jenis'] = _dataEdit['jenis'];
        }
        if (typeof _dataEdit['tkt'] !== 'undefined') {
            currentRow['tkt'] = _dataEdit['tkt'];
        }
        if (typeof _dataEdit['namaPeperiksaan'] !== 'undefined') {
            currentRow['namaPeperiksaan'] = _dataEdit['namaPeperiksaan'];
        }
        if (typeof _dataEdit['susunan'] !== 'undefined') {
            currentRow['susunan'] = _dataEdit['susunan'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDgmGredMatapelajaran.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTableSijil = function () {
        $('#sectDmnResult8').show();
        const dataResult = mzAjaxRequest('sijil.php', 'GET');
        oTableDsjSijil.clear().rows.add(dataResult).draw();
    };

    this.addTableSijil = function (_dataAdd) {
        oTableDsjSijil.row.add(_dataAdd).draw();
    };

    this.updateTableSijil = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDsjSijil.row(_rowEdit).data();
        if (typeof _dataEdit['sijilId'] !== 'undefined') {
            currentRow['sijilId'] = _dataEdit['sijilId'];
        }
        if (typeof _dataEdit['kod'] !== 'undefined') {
            currentRow['kod'] = _dataEdit['kod'];
        }
        if (typeof _dataEdit['tkt'] !== 'undefined') {
            currentRow['tkt'] = _dataEdit['tkt'];
        }
        if (typeof _dataEdit['diskripsi'] !== 'undefined') {
            currentRow['diskripsi'] = _dataEdit['diskripsi'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDsjSijil.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTableSijilPangkat = function () {
        $('#sectDmnResult9').show();
        const dataResult = mzAjaxRequest('sijil_pangkat.php', 'GET');
        oTableDspSijilPangkat.clear().rows.add(dataResult).draw();
    };

    this.addTableSijilPangkat = function (_dataAdd) {
        oTableDspSijilPangkat.row.add(_dataAdd).draw();
    };

    this.updateTableSijilPangkat = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDspSijilPangkat.row(_rowEdit).data();
        if (typeof _dataEdit['sijilPangkatId'] !== 'undefined') {
            currentRow['sijilPangkatId'] = _dataEdit['sijilPangkatId'];
        }
        if (typeof _dataEdit['kod'] !== 'undefined') {
            currentRow['kod'] = _dataEdit['kod'];
        }
        if (typeof _dataEdit['tkt'] !== 'undefined') {
            currentRow['tkt'] = _dataEdit['tkt'];
        }
        if (typeof _dataEdit['diskripsi'] !== 'undefined') {
            currentRow['diskripsi'] = _dataEdit['diskripsi'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDspSijilPangkat.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTableUjianLisan = function () {
        $('#sectDmnResult10').show();
        const dataResult = mzAjaxRequest('ujian_lisan.php', 'GET');
        oTableDulUjianLisan.clear().rows.add(dataResult).draw();
    };

    this.addTableUjianLisan = function (_dataAdd) {
        oTableDulUjianLisan.row.add(_dataAdd).draw();
    };

    this.updateTableUjianLisan = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDulUjianLisan.row(_rowEdit).data();
        if (typeof _dataEdit['ujianLisanId'] !== 'undefined') {
            currentRow['ujianLisanId'] = _dataEdit['ujianLisanId'];
        }
        if (typeof _dataEdit['kod'] !== 'undefined') {
            currentRow['kod'] = _dataEdit['kod'];
        }
        if (typeof _dataEdit['tkt'] !== 'undefined') {
            currentRow['tkt'] = _dataEdit['tkt'];
        }
        if (typeof _dataEdit['diskripsi'] !== 'undefined') {
            currentRow['diskripsi'] = _dataEdit['diskripsi'];
        }
        if (typeof _dataEdit['susunan'] !== 'undefined') {
            currentRow['susunan'] = _dataEdit['susunan'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDulUjianLisan.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTableKelulusan = function () {
        $('#sectDmnResult11').show();
        const dataResult = mzAjaxRequest('kelulusan.php', 'GET');
        oTableDklKelulusan.clear().rows.add(dataResult).draw();
    };

    this.addTableKelulusan = function (_dataAdd) {
        oTableDklKelulusan.row.add(_dataAdd).draw();
    };

    this.updateTableKelulusan = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDklKelulusan.row(_rowEdit).data();
        if (typeof _dataEdit['kelulusanId'] !== 'undefined') {
            currentRow['kelulusanId'] = _dataEdit['kelulusanId'];
        }
        if (typeof _dataEdit['kod'] !== 'undefined') {
            currentRow['kod'] = _dataEdit['kod'];
        }
        if (typeof _dataEdit['diskripsi'] !== 'undefined') {
            currentRow['diskripsi'] = _dataEdit['diskripsi'];
        }
        if (typeof _dataEdit['jenis'] !== 'undefined') {
            currentRow['jenis'] = '';
            if (_dataEdit['jenis'] === '1') {
                currentRow['jenis'] = 'PROFESIONAL DAN IKHTISAS';
            } else if  (_dataEdit['jenis'] === '2') {
                currentRow['jenis'] = 'SEDANG BERKHIDMAT';
            } else if  (_dataEdit['jenis'] === '3') {
                currentRow['jenis'] = 'PERUBATAN';
            }
        }
        if (typeof _dataEdit['kategori'] !== 'undefined') {
            currentRow['kategori'] = '';
            if (_dataEdit['kategori'] === 'U') {
                currentRow['kategori'] = 'PERUBATAN';
            } else if  (_dataEdit['kategori'] === 'V') {
                currentRow['kategori'] = 'SVM';
            } else if  (_dataEdit['kategori'] === 'K') {
                currentRow['kategori'] = 'SKM';
            } else if  (_dataEdit['kategori'] === 'B') {
                currentRow['kategori'] = 'SEDANG BERKHIDMAT';
            } else if  (_dataEdit['kategori'] === 'P') {
                currentRow['kategori'] = 'PROFESIONAL';
            } else if  (_dataEdit['kategori'] === 'I') {
                currentRow['kategori'] = 'IKHTISAS (GURU)';
            }
        }
        if (typeof _dataEdit['noPemerolehan'] !== 'undefined') {
            currentRow['noPemerolehan'] = _dataEdit['noPemerolehan'];
        }
        if (typeof _dataEdit['gabYt'] !== 'undefined') {
            currentRow['gabYt'] = _dataEdit['gabYt'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDklKelulusan.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTablePaperJulai = function () {
        $('#sectDmnResult12').show();
        const dataResult = mzAjaxRequest('paper_julai.php', 'GET');
        oTableDpjPaperJulai.clear().rows.add(dataResult).draw();
    };

    this.addTablePaperJulai = function (_dataAdd) {
        oTableDpjPaperJulai.row.add(_dataAdd).draw();
    };

    this.updateTablePaperJulai = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDpjPaperJulai.row(_rowEdit).data();
        if (typeof _dataEdit['mpelKod'] !== 'undefined') {
            currentRow['mpelKod'] = _dataEdit['mpelKod'];
        }
        if (typeof _dataEdit['diskripsi'] !== 'undefined') {
            currentRow['diskripsi'] = _dataEdit['diskripsi'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDpjPaperJulai.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTablePaperJulaiBm = function () {
        $('#sectDmnResult13').show();
        const dataResult = mzAjaxRequest('paper_julai_bm.php', 'GET');
        oTableDpmPaperJulaiBm.clear().rows.add(dataResult).draw();
    };

    this.addTablePaperJulaiBm = function (_dataAdd) {
        oTableDpmPaperJulaiBm.row.add(_dataAdd).draw();
    };

    this.updateTablePaperJulaiBm = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDpmPaperJulaiBm.row(_rowEdit).data();
        if (typeof _dataEdit['mpelKod'] !== 'undefined') {
            currentRow['mpelKod'] = _dataEdit['mpelKod'];
        }
        if (typeof _dataEdit['diskripsi'] !== 'undefined') {
            currentRow['diskripsi'] = _dataEdit['diskripsi'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDpmPaperJulaiBm.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTableKelulusanMref = function () {
        $('#sectDmnResult14').show();
        const dataResult = mzAjaxRequest('kelulusan_mref.php', 'GET');
        oTableDkxKelulusanMref.clear().rows.add(dataResult).draw();
    };

    this.addTableKelulusanMref = function (_dataAdd) {
        oTableDkxKelulusanMref.row.add(_dataAdd).draw();
    };

    this.updateTableKelulusanMref = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDkxKelulusanMref.row(_rowEdit).data();
        if (typeof _dataEdit['kelulusanId'] !== 'undefined') {
            currentRow['kelulusanId'] = _dataEdit['kelulusanId'];
        }
        if (typeof _dataEdit['kod'] !== 'undefined') {
            currentRow['kod'] = _dataEdit['kod'];
        }
        if (typeof _dataEdit['diskripsi'] !== 'undefined') {
            currentRow['diskripsi'] = _dataEdit['diskripsi'];
        }
        if (typeof _dataEdit['jenis'] !== 'undefined') {
            currentRow['jenis'] = '';
            if (_dataEdit['jenis'] === '1') {
                currentRow['jenis'] = 'PROFESIONAL DAN IKHTISAS';
            } else if  (_dataEdit['jenis'] === '2') {
                currentRow['jenis'] = 'SEDANG BERKHIDMAT';
            } else if  (_dataEdit['jenis'] === '3') {
                currentRow['jenis'] = 'PERUBATAN';
            }
        }
        if (typeof _dataEdit['kategori'] !== 'undefined') {
            currentRow['kategori'] = '';
            if (_dataEdit['kategori'] === 'U') {
                currentRow['kategori'] = 'PERUBATAN';
            } else if  (_dataEdit['kategori'] === 'V') {
                currentRow['kategori'] = 'SVM';
            } else if  (_dataEdit['kategori'] === 'K') {
                currentRow['kategori'] = 'SKM';
            } else if  (_dataEdit['kategori'] === 'B') {
                currentRow['kategori'] = 'SEDANG BERKHIDMAT';
            } else if  (_dataEdit['kategori'] === 'P') {
                currentRow['kategori'] = 'PROFESIONAL';
            } else if  (_dataEdit['kategori'] === 'I') {
                currentRow['kategori'] = 'IKHTISAS (GURU)';
            }
        }
        if (typeof _dataEdit['noPemerolehan'] !== 'undefined') {
            currentRow['noPemerolehan'] = _dataEdit['noPemerolehan'];
        }
        if (typeof _dataEdit['gabYt'] !== 'undefined') {
            currentRow['gabYt'] = _dataEdit['gabYt'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDkxKelulusanMref.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTableBahasa = function () {
        $('#sectDmnResult15').show();
        const dataResult = mzAjaxRequest('bahasa.php', 'GET');
        oTableDbhBahasa.clear().rows.add(dataResult).draw();
    };

    this.addTableBahasa = function (_dataAdd) {
        oTableDbhBahasa.row.add(_dataAdd).draw();
    };

    this.updateTableBahasa = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDbhBahasa.row(_rowEdit).data();
        if (typeof _dataEdit['bahasaId'] !== 'undefined') {
            currentRow['bahasaId'] = _dataEdit['bahasaId'];
        }
        if (typeof _dataEdit['kod'] !== 'undefined') {
            currentRow['kod'] = _dataEdit['kod'];
        }
        if (typeof _dataEdit['diskripsi'] !== 'undefined') {
            currentRow['diskripsi'] = _dataEdit['diskripsi'];
        }
        if (typeof _dataEdit['noPemerolehan'] !== 'undefined') {
            currentRow['noPemerolehan'] = _dataEdit['noPemerolehan'];
        }
        if (typeof _dataEdit['gabYt'] !== 'undefined') {
            currentRow['gabYt'] = _dataEdit['gabYt'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDbhBahasa.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTableBakat = function () {
        $('#sectDmnResult16').show();
        const dataResult = mzAjaxRequest('bakat.php', 'GET');
        oTableDbkBakat.clear().rows.add(dataResult).draw();
    };

    this.addTableBakat = function (_dataAdd) {
        oTableDbkBakat.row.add(_dataAdd).draw();
    };

    this.updateTableBakat = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDbkBakat.row(_rowEdit).data();
        if (typeof _dataEdit['kod'] !== 'undefined') {
            currentRow['kod'] = _dataEdit['kod'];
        }
        if (typeof _dataEdit['diskripsi'] !== 'undefined') {
            currentRow['diskripsi'] = _dataEdit['diskripsi'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDbkBakat.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTableBakatDetail = function () {
        $('#sectDmnResult17').show();
        const dataResult = mzAjaxRequest('bakat_detail.php', 'GET');
        oTableDbdBakatDetail.clear().rows.add(dataResult).draw();
    };

    this.addTableBakatDetail = function (_dataAdd) {
        oTableDbdBakatDetail.row.add(_dataAdd).draw();
    };

    this.updateTableBakatDetail = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDbdBakatDetail.row(_rowEdit).data();
        if (typeof _dataEdit['kod'] !== 'undefined') {
            currentRow['kod'] = _dataEdit['kod'];
        }
        if (typeof _dataEdit['kodbakat'] !== 'undefined') {
            currentRow['kodbakat'] = _dataEdit['kodbakat'];
        }
        if (typeof _dataEdit['diskripsi'] !== 'undefined') {
            currentRow['diskripsi'] = _dataEdit['diskripsi'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDbdBakatDetail.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTableBantuan = function () {
        $('#sectDmnResult18').show();
        const dataResult = mzAjaxRequest('bantuan.php', 'GET');
        oTableDbtBantuan.clear().rows.add(dataResult).draw();
    };

    this.addTableBantuan = function (_dataAdd) {
        oTableDbtBantuan.row.add(_dataAdd).draw();
    };

    this.updateTableBantuan = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDbtBantuan.row(_rowEdit).data();
        if (typeof _dataEdit['bantuanId'] !== 'undefined') {
            currentRow['bantuanId'] = _dataEdit['bantuanId'];
        }
        if (typeof _dataEdit['kodBantuan'] !== 'undefined') {
            currentRow['kodBantuan'] = _dataEdit['kodBantuan'];
        }
        if (typeof _dataEdit['bantuan'] !== 'undefined') {
            currentRow['bantuan'] = _dataEdit['bantuan'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDbtBantuan.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTableBiasiswa = function () {
        $('#sectDmnResult19').show();
        const dataResult = mzAjaxRequest('biasiswa.php', 'GET');
        oTableDbwBiasiswa.clear().rows.add(dataResult).draw();
    };

    this.addTableBiasiswa = function (_dataAdd) {
        oTableDbwBiasiswa.row.add(_dataAdd).draw();
    };

    this.updateTableBiasiswa = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDbwBiasiswa.row(_rowEdit).data();
        if (typeof _dataEdit['bantuanId'] !== 'undefined') {
            currentRow['bantuanId'] = _dataEdit['bantuanId'];
        }
        if (typeof _dataEdit['kodBiasiswa'] !== 'undefined') {
            currentRow['kodBiasiswa'] = _dataEdit['kodBiasiswa'];
        }
        if (typeof _dataEdit['bantuan'] !== 'undefined') {
            currentRow['bantuan'] = _dataEdit['bantuan'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDbwBiasiswa.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTableKolejMatrikulasi = function () {
        $('#sectDmnResult20').show();
        const dataResult = mzAjaxRequest('kolej_matrikulasi.php', 'GET');
        oTableDkmKolejMatrikulasi.clear().rows.add(dataResult).draw();
    };

    this.addTableKolejMatrikulasi = function (_dataAdd) {
        oTableDkmKolejMatrikulasi.row.add(_dataAdd).draw();
    };

    this.updateTableKolejMatrikulasi = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDkmKolejMatrikulasi.row(_rowEdit).data();
        if (typeof _dataEdit['kolejId'] !== 'undefined') {
            currentRow['kolejId'] = _dataEdit['kolejId'];
        }
        if (typeof _dataEdit['kodkolej'] !== 'undefined') {
            currentRow['kodkolej'] = _dataEdit['kodkolej'];
        }
        if (typeof _dataEdit['namakolej'] !== 'undefined') {
            currentRow['namakolej'] = _dataEdit['namakolej'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDkmKolejMatrikulasi.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTableGredGaji = function () {
        $('#sectDmnResult21').show();
        const dataResult = mzAjaxRequest('gred_gaji.php', 'GET');
        oTableDggGredGaji.clear().rows.add(dataResult).draw();
    };

    this.addTableGredGaji = function (_dataAdd) {
        oTableDggGredGaji.row.add(_dataAdd).draw();
    };

    this.updateTableGredGaji = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDggGredGaji.row(_rowEdit).data();
        if (typeof _dataEdit['gredId'] !== 'undefined') {
            currentRow['gredId'] = _dataEdit['gredId'];
        }
        if (typeof _dataEdit['kod'] !== 'undefined') {
            currentRow['kod'] = _dataEdit['kod'];
        }
        if (typeof _dataEdit['diskripsi'] !== 'undefined') {
            currentRow['diskripsi'] = _dataEdit['diskripsi'];
        }
        if (typeof _dataEdit['noPemerolehan'] !== 'undefined') {
            currentRow['noPemerolehan'] = _dataEdit['noPemerolehan'];
        }
        if (typeof _dataEdit['gabYt'] !== 'undefined') {
            currentRow['gabYt'] = _dataEdit['gabYt'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDggGredGaji.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTableInstitusi = function () {
        $('#sectDmnResult22').show();
        const dataResult = mzAjaxRequest('institusi.php', 'GET');
        oTableDisInstitusi.clear().rows.add(dataResult).draw();
    };

    this.addTableInstitusi = function (_dataAdd) {
        oTableDisInstitusi.row.add(_dataAdd).draw();
    };

    this.updateTableInstitusi = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDisInstitusi.row(_rowEdit).data();
        if (typeof _dataEdit['institusiId'] !== 'undefined') {
            currentRow['institusiId'] = _dataEdit['institusiId'];
        }
        if (typeof _dataEdit['kod'] !== 'undefined') {
            currentRow['kod'] = _dataEdit['kod'];
        }
        if (typeof _dataEdit['diskripsi'] !== 'undefined') {
            currentRow['diskripsi'] = _dataEdit['diskripsi'];
        }
        if (typeof _dataEdit['kategoriInstitusiId'] !== 'undefined') {
            currentRow['kategoriInstitusiId'] = _dataEdit['kategoriInstitusiId'];
        }
        if (typeof _dataEdit['negara'] !== 'undefined') {
            currentRow['negara'] = _dataEdit['negara'];
        }
        if (typeof _dataEdit['kategori'] !== 'undefined') {
            currentRow['kategori'] = _dataEdit['kategori'];
        }
        if (typeof _dataEdit['noPemerolehan'] !== 'undefined') {
            currentRow['noPemerolehan'] = _dataEdit['noPemerolehan'];
        }
        if (typeof _dataEdit['gabYt'] !== 'undefined') {
            currentRow['gabYt'] = _dataEdit['gabYt'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDisInstitusi.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTableJenisPengajian = function () {
        $('#sectDmnResult23').show();
        const dataResult = mzAjaxRequest('jenis_pengajian.php', 'GET');
        oTableDjpJenisPengajian.clear().rows.add(dataResult).draw();
    };

    this.addTableJenisPengajian = function (_dataAdd) {
        oTableDjpJenisPengajian.row.add(_dataAdd).draw();
    };

    this.updateTableJenisPengajian = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDjpJenisPengajian.row(_rowEdit).data();
        if (typeof _dataEdit['jenisPengajianId'] !== 'undefined') {
            currentRow['jenisPengajianId'] = _dataEdit['jenisPengajianId'];
        }
        if (typeof _dataEdit['kod'] !== 'undefined') {
            currentRow['kod'] = _dataEdit['kod'];
        }
        if (typeof _dataEdit['diskripsi'] !== 'undefined') {
            currentRow['diskripsi'] = _dataEdit['diskripsi'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDjpJenisPengajian.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTableJenisPengkhususan = function () {
        $('#sectDmnResult24').show();
        const dataResult = mzAjaxRequest('jenis_pengkhususan.php', 'GET');
        oTableDjsJenisPengkhususan.clear().rows.add(dataResult).draw();
    };

    this.addTableJenisPengkhususan = function (_dataAdd) {
        oTableDjsJenisPengkhususan.row.add(_dataAdd).draw();
    };

    this.updateTableJenisPengkhususan = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDjsJenisPengkhususan.row(_rowEdit).data();
        if (typeof _dataEdit['jenisPengkhususanId'] !== 'undefined') {
            currentRow['jenisPengkhususanId'] = _dataEdit['jenisPengkhususanId'];
        }
        if (typeof _dataEdit['kod'] !== 'undefined') {
            currentRow['kod'] = _dataEdit['kod'];
        }
        if (typeof _dataEdit['diskripsi'] !== 'undefined') {
            currentRow['diskripsi'] = _dataEdit['diskripsi'];
        }
        if (typeof _dataEdit['kategori'] !== 'undefined') {
            currentRow['kategori'] = _dataEdit['kategori'];
        }
        if (typeof _dataEdit['jantina'] !== 'undefined') {
            currentRow['jantina'] = _dataEdit['jantina'];
        }
        if (typeof _dataEdit['nilai'] !== 'undefined') {
            currentRow['nilai'] = _dataEdit['nilai'];
        }
        if (typeof _dataEdit['noPemerolehan'] !== 'undefined') {
            currentRow['noPemerolehan'] = _dataEdit['noPemerolehan'];
        }
        if (typeof _dataEdit['gabYt'] !== 'undefined') {
            currentRow['gabYt'] = _dataEdit['gabYt'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDjsJenisPengkhususan.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTableJenisPerkhidmatan = function () {
        $('#sectDmnResult25').show();
        const dataResult = mzAjaxRequest('jenis_perkhidmatan.php', 'GET');
        oTableDjkJenisPerkhidmatan.clear().rows.add(dataResult).draw();
    };

    this.addTableJenisPerkhidmatan = function (_dataAdd) {
        oTableDjkJenisPerkhidmatan.row.add(_dataAdd).draw();
    };

    this.updateTableJenisPerkhidmatan = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDjkJenisPerkhidmatan.row(_rowEdit).data();
        if (typeof _dataEdit['jenisPerkhidmatanId'] !== 'undefined') {
            currentRow['jenisPerkhidmatanId'] = _dataEdit['jenisPerkhidmatanId'];
        }
        if (typeof _dataEdit['kod'] !== 'undefined') {
            currentRow['kod'] = _dataEdit['kod'];
        }
        if (typeof _dataEdit['diskripsi'] !== 'undefined') {
            currentRow['diskripsi'] = _dataEdit['diskripsi'];
        }
        if (typeof _dataEdit['kategori'] !== 'undefined') {
            currentRow['kategori'] = _dataEdit['kategori'];
        }
        if (typeof _dataEdit['jantina'] !== 'undefined') {
            currentRow['jantina'] = _dataEdit['jantina'];
        }
        if (typeof _dataEdit['nilai'] !== 'undefined') {
            currentRow['nilai'] = _dataEdit['nilai'];
        }
        if (typeof _dataEdit['noPemerolehan'] !== 'undefined') {
            currentRow['noPemerolehan'] = _dataEdit['noPemerolehan'];
        }
        if (typeof _dataEdit['gabYt'] !== 'undefined') {
            currentRow['gabYt'] = _dataEdit['gabYt'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDjkJenisPerkhidmatan.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTablePeringkat = function () {
        $('#sectDmnResult26').show();
        const dataResult = mzAjaxRequest('peringkat.php', 'GET');
        oTableDprPeringkat.clear().rows.add(dataResult).draw();
    };

    this.addTablePeringkat = function (_dataAdd) {
        oTableDprPeringkat.row.add(_dataAdd).draw();
    };

    this.updateTablePeringkat = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDprPeringkat.row(_rowEdit).data();
        if (typeof _dataEdit['peringkatId'] !== 'undefined') {
            currentRow['peringkatId'] = _dataEdit['peringkatId'];
        }
        if (typeof _dataEdit['kod'] !== 'undefined') {
            currentRow['kod'] = _dataEdit['kod'];
        }
        if (typeof _dataEdit['diskripsi'] !== 'undefined') {
            currentRow['diskripsi'] = _dataEdit['diskripsi'];
        }
        if (typeof _dataEdit['kategori'] !== 'undefined') {
            currentRow['kategori'] = _dataEdit['kategori'];
        }
        if (typeof _dataEdit['jantina'] !== 'undefined') {
            currentRow['jantina'] = _dataEdit['jantina'];
        }
        if (typeof _dataEdit['nilai'] !== 'undefined') {
            currentRow['nilai'] = _dataEdit['nilai'];
        }
        if (typeof _dataEdit['noPemerolehan'] !== 'undefined') {
            currentRow['noPemerolehan'] = _dataEdit['noPemerolehan'];
        }
        if (typeof _dataEdit['gabYt'] !== 'undefined') {
            currentRow['gabYt'] = _dataEdit['gabYt'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDprPeringkat.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTableTelco = function () {
        $('#sectDmnResult27').show();
        const dataResult = mzAjaxRequest('telco.php', 'GET');
        oTableDtlTelco.clear().rows.add(dataResult).draw();
    };

    this.addTableTelco = function (_dataAdd) {
        oTableDtlTelco.row.add(_dataAdd).draw();
    };

    this.updateTableTelco = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDtlTelco.row(_rowEdit).data();
        if (typeof _dataEdit['telcoId'] !== 'undefined') {
            currentRow['telcoId'] = _dataEdit['telcoId'];
        }
        if (typeof _dataEdit['code'] !== 'undefined') {
            currentRow['code'] = _dataEdit['code'];
        }
        if (typeof _dataEdit['operatorName'] !== 'undefined') {
            currentRow['operatorName'] = _dataEdit['operatorName'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDtlTelco.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTableKecacatanCalon = function () {
        $('#sectDmnResult28').show();
        const dataResult = mzAjaxRequest('kecacatan_calon.php', 'GET');
        oTableDkcKecacatanCalon.clear().rows.add(dataResult).draw();
    };

    this.addTableKecacatanCalon = function (_dataAdd) {
        oTableDkcKecacatanCalon.row.add(_dataAdd).draw();
    };

    this.updateTableKecacatanCalon = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDkcKecacatanCalon.row(_rowEdit).data();
        if (typeof _dataEdit['kecacatanCalonId'] !== 'undefined') {
            currentRow['kecacatanCalonId'] = _dataEdit['kecacatanCalonId'];
        }
        if (typeof _dataEdit['kod'] !== 'undefined') {
            currentRow['kod'] = _dataEdit['kod'];
        }
        if (typeof _dataEdit['diskripsi'] !== 'undefined') {
            currentRow['diskripsi'] = _dataEdit['diskripsi'];
        }
        if (typeof _dataEdit['kategori'] !== 'undefined') {
            currentRow['kategori'] = _dataEdit['kategori'];
        }
        if (typeof _dataEdit['jantina'] !== 'undefined') {
            currentRow['jantina'] = _dataEdit['jantina'];
        }
        if (typeof _dataEdit['nilai'] !== 'undefined') {
            currentRow['nilai'] = _dataEdit['nilai'];
        }
        if (typeof _dataEdit['noPemerolehan'] !== 'undefined') {
            currentRow['noPemerolehan'] = _dataEdit['noPemerolehan'];
        }
        if (typeof _dataEdit['gabYt'] !== 'undefined') {
            currentRow['gabYt'] = _dataEdit['gabYt'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDkcKecacatanCalon.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTablePenguasaanBahasa = function () {
        $('#sectDmnResult29').show();
        const dataResult = mzAjaxRequest('penguasaan_bahasa.php', 'GET');
        oTableDpbPenguasaanBahasa.clear().rows.add(dataResult).draw();
    };

    this.addTablePenguasaanBahasa = function (_dataAdd) {
        oTableDpbPenguasaanBahasa.row.add(_dataAdd).draw();
    };

    this.updateTablePenguasaanBahasa = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDpbPenguasaanBahasa.row(_rowEdit).data();
        if (typeof _dataEdit['penguasaanBahasaId'] !== 'undefined') {
            currentRow['penguasaanBahasaId'] = _dataEdit['penguasaanBahasaId'];
        }
        if (typeof _dataEdit['kod'] !== 'undefined') {
            currentRow['kod'] = _dataEdit['kod'];
        }
        if (typeof _dataEdit['diskripsi'] !== 'undefined') {
            currentRow['diskripsi'] = _dataEdit['diskripsi'];
        }
        if (typeof _dataEdit['kategori'] !== 'undefined') {
            currentRow['kategori'] = _dataEdit['kategori'];
        }
        if (typeof _dataEdit['jantina'] !== 'undefined') {
            currentRow['jantina'] = _dataEdit['jantina'];
        }
        if (typeof _dataEdit['nilai'] !== 'undefined') {
            currentRow['nilai'] = _dataEdit['nilai'];
        }
        if (typeof _dataEdit['noPemerolehan'] !== 'undefined') {
            currentRow['noPemerolehan'] = _dataEdit['noPemerolehan'];
        }
        if (typeof _dataEdit['gabYt'] !== 'undefined') {
            currentRow['gabYt'] = _dataEdit['gabYt'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDpbPenguasaanBahasa.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTableTarafJawatan = function () {
        $('#sectDmnResult30').show();
        const dataResult = mzAjaxRequest('taraf_jawatan.php', 'GET');
        oTableDtjTarafJawatan.clear().rows.add(dataResult).draw();
    };

    this.addTableTarafJawatan = function (_dataAdd) {
        oTableDtjTarafJawatan.row.add(_dataAdd).draw();
    };

    this.updateTableTarafJawatan = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDtjTarafJawatan.row(_rowEdit).data();
        if (typeof _dataEdit['penguasaanBahasaId'] !== 'undefined') {
            currentRow['penguasaanBahasaId'] = _dataEdit['penguasaanBahasaId'];
        }
        if (typeof _dataEdit['kod'] !== 'undefined') {
            currentRow['kod'] = _dataEdit['kod'];
        }
        if (typeof _dataEdit['diskripsi'] !== 'undefined') {
            currentRow['diskripsi'] = _dataEdit['diskripsi'];
        }
        if (typeof _dataEdit['kategori'] !== 'undefined') {
            currentRow['kategori'] = _dataEdit['kategori'];
        }
        if (typeof _dataEdit['jantina'] !== 'undefined') {
            currentRow['jantina'] = _dataEdit['jantina'];
        }
        if (typeof _dataEdit['nilai'] !== 'undefined') {
            currentRow['nilai'] = _dataEdit['nilai'];
        }
        if (typeof _dataEdit['noPemerolehan'] !== 'undefined') {
            currentRow['noPemerolehan'] = _dataEdit['noPemerolehan'];
        }
        if (typeof _dataEdit['gabYt'] !== 'undefined') {
            currentRow['gabYt'] = _dataEdit['gabYt'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDtjTarafJawatan.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTablePengkhususan = function () {
        $('#sectDmnResult31').show();
        const dataResult = mzAjaxRequest('pengkhususan.php', 'GET');
        oTableDpsPengkhususan.clear().rows.add(dataResult).draw();
    };

    this.addTablePengkhususan = function (_dataAdd) {
        oTableDpsPengkhususan.row.add(_dataAdd).draw();
    };

    this.updateTablePengkhususan = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDpsPengkhususan.row(_rowEdit).data();
        if (typeof _dataEdit['pengkhususanId'] !== 'undefined') {
            currentRow['pengkhususanId'] = _dataEdit['pengkhususanId'];
        }
        if (typeof _dataEdit['kod'] !== 'undefined') {
            currentRow['kod'] = _dataEdit['kod'];
        }
        if (typeof _dataEdit['diskripsi'] !== 'undefined') {
            currentRow['diskripsi'] = _dataEdit['diskripsi'];
        }
        if (typeof _dataEdit['jenisPengkhususanId'] !== 'undefined') {
            currentRow['jenisPengkhususanId'] = _dataEdit['jenisPengkhususanId'];
        }
        if (typeof _dataEdit['bidang'] !== 'undefined') {
            currentRow['bidang'] = _dataEdit['bidang'];
        }
        if (typeof _dataEdit['noPemerolehan'] !== 'undefined') {
            currentRow['noPemerolehan'] = _dataEdit['noPemerolehan'];
        }
        if (typeof _dataEdit['gabYt'] !== 'undefined') {
            currentRow['gabYt'] = _dataEdit['gabYt'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDpsPengkhususan.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTableSukan = function () {
        $('#sectDmnResult32').show();
        const dataResult = mzAjaxRequest('sukan.php', 'GET');
        oTableDsuSukan.clear().rows.add(dataResult).draw();
    };

    this.addTableSukan = function (_dataAdd) {
        oTableDsuSukan.row.add(_dataAdd).draw();
    };

    this.updateTableSukan = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDsuSukan.row(_rowEdit).data();
        if (typeof _dataEdit['sukanId'] !== 'undefined') {
            currentRow['sukanId'] = _dataEdit['sukanId'];
        }
        if (typeof _dataEdit['kod'] !== 'undefined') {
            currentRow['kod'] = _dataEdit['kod'];
        }
        if (typeof _dataEdit['diskripsi'] !== 'undefined') {
            currentRow['diskripsi'] = _dataEdit['diskripsi'];
        }
        if (typeof _dataEdit['kategori'] !== 'undefined') {
            currentRow['kategori'] = _dataEdit['kategori'];
        }
        if (typeof _dataEdit['jantina'] !== 'undefined') {
            currentRow['jantina'] = _dataEdit['jantina'];
        }
        if (typeof _dataEdit['nilai'] !== 'undefined') {
            currentRow['nilai'] = _dataEdit['nilai'];
        }
        if (typeof _dataEdit['noPemerolehan'] !== 'undefined') {
            currentRow['noPemerolehan'] = _dataEdit['noPemerolehan'];
        }
        if (typeof _dataEdit['gabYt'] !== 'undefined') {
            currentRow['gabYt'] = _dataEdit['gabYt'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDsuSukan.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTableSkimSah = function () {
        $('#sectDmnResult33').show();
        const dataResult = mzAjaxRequest('skim_sah.php', 'GET');
        oTableDssSkimSah.clear().rows.add(dataResult).draw();
    };

    this.addTableSkimSah = function (_dataAdd) {
        oTableDssSkimSah.row.add(_dataAdd).draw();
    };

    this.updateTableSkimSah = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDssSkimSah.row(_rowEdit).data();
        if (typeof _dataEdit['skimSahId'] !== 'undefined') {
            currentRow['skimSahId'] = _dataEdit['skimSahId'];
        }
        if (typeof _dataEdit['kod'] !== 'undefined') {
            currentRow['kod'] = _dataEdit['kod'];
        }
        if (typeof _dataEdit['diskripsi'] !== 'undefined') {
            currentRow['diskripsi'] = _dataEdit['diskripsi'];
        }
        if (typeof _dataEdit['kumpPkhidmatJkk'] !== 'undefined') {
            currentRow['kumpPkhidmatJkk'] = _dataEdit['kumpPkhidmatJkk'];
        }
        if (typeof _dataEdit['agensi'] !== 'undefined') {
            currentRow['agensi'] = _dataEdit['agensi'];
        }
        if (typeof _dataEdit['bakatYt'] !== 'undefined') {
            currentRow['bakatYt'] = _dataEdit['bakatYt'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDssSkimSah.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTableSkim = function () {
        $('#sectDmnResult34').show();
        const dataResult = mzAjaxRequest('skim.php', 'GET');
        oTableDskSkim.clear().rows.add(dataResult).draw();
    };

    this.addTableSkim = function (_dataAdd) {
        oTableDskSkim.row.add(_dataAdd).draw();
    };

    this.updateTableSkim = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDskSkim.row(_rowEdit).data();
        if (typeof _dataEdit['skimId'] !== 'undefined') {
            currentRow['skimId'] = _dataEdit['skimId'];
        }
        if (typeof _dataEdit['kod'] !== 'undefined') {
            currentRow['kod'] = _dataEdit['kod'];
        }
        if (typeof _dataEdit['diskripsi'] !== 'undefined') {
            currentRow['diskripsi'] = _dataEdit['diskripsi'];
        }
        if (typeof _dataEdit['gghKod'] !== 'undefined') {
            currentRow['gghKod'] = _dataEdit['gghKod'];
        }
        if (typeof _dataEdit['gunasama'] !== 'undefined') {
            currentRow['gunasama'] = _dataEdit['gunasama'];
        }
        if (typeof _dataEdit['jenisSkim'] !== 'undefined') {
            currentRow['jenisSkim'] = _dataEdit['jenisSkim'];
        }
        if (typeof _dataEdit['kumpPkhidmatJkk'] !== 'undefined') {
            currentRow['kumpPkhidmatJkk'] = _dataEdit['kumpPkhidmatJkk'];
        }
        if (typeof _dataEdit['skimPkhidmat'] !== 'undefined') {
            currentRow['skimPkhidmat'] = _dataEdit['skimPkhidmat'];
        }
        if (typeof _dataEdit['gghSsm'] !== 'undefined') {
            currentRow['gghSsm'] = _dataEdit['gghSsm'];
        }
        if (typeof _dataEdit['kumpPkhidmatSbpa'] !== 'undefined') {
            currentRow['kumpPkhidmatSbpa'] = _dataEdit['kumpPkhidmatSbpa'];
        }
        if (typeof _dataEdit['oldKod'] !== 'undefined') {
            currentRow['oldKod'] = _dataEdit['oldKod'];
        }
        if (typeof _dataEdit['oldName'] !== 'undefined') {
            currentRow['oldName'] = _dataEdit['oldName'];
        }
        if (typeof _dataEdit['oldGred'] !== 'undefined') {
            currentRow['oldGred'] = _dataEdit['oldGred'];
        }
        if (typeof _dataEdit['kumpPkhidmatSsb'] !== 'undefined') {
            currentRow['kumpPkhidmatSsb'] = _dataEdit['kumpPkhidmatSsb'];
        }
        if (typeof _dataEdit['ujianWajib1'] !== 'undefined') {
            currentRow['ujianWajib1'] = _dataEdit['ujianWajib1'];
        }
        if (typeof _dataEdit['ujianWajib2'] !== 'undefined') {
            currentRow['ujianWajib2'] = _dataEdit['ujianWajib2'];
        }
        if (typeof _dataEdit['ujianWajib3'] !== 'undefined') {
            currentRow['ujianWajib3'] = _dataEdit['ujianWajib3'];
        }
        if (typeof _dataEdit['ujianWajib4'] !== 'undefined') {
            currentRow['ujianWajib4'] = _dataEdit['ujianWajib4'];
        }
        if (typeof _dataEdit['ujianWajib5'] !== 'undefined') {
            currentRow['ujianWajib5'] = _dataEdit['ujianWajib5'];
        }
        if (typeof _dataEdit['kpKod'] !== 'undefined') {
            currentRow['kpKod'] = _dataEdit['kpKod'];
        }
        if (typeof _dataEdit['noPemerolehan'] !== 'undefined') {
            currentRow['noPemerolehan'] = _dataEdit['noPemerolehan'];
        }
        if (typeof _dataEdit['ujianYt'] !== 'undefined') {
            currentRow['ujianYt'] = _dataEdit['ujianYt'];
        }
        if (typeof _dataEdit['gabYt'] !== 'undefined') {
            currentRow['gabYt'] = _dataEdit['gabYt'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDskSkim.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTableBekasPolTen = function () {
        $('#sectDmnResult35').show();
        const dataResult = mzAjaxRequest('bekas_pol_ten.php', 'GET');
        oTableDbpBekasPolTen.clear().rows.add(dataResult).draw();
    };

    this.addTableBekasPolTen = function (_dataAdd) {
        oTableDbpBekasPolTen.row.add(_dataAdd).draw();
    };

    this.updateTableBekasPolTen = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDbpBekasPolTen.row(_rowEdit).data();
        if (typeof _dataEdit['bekasPolTenId'] !== 'undefined') {
            currentRow['bekasPolTenId'] = _dataEdit['bekasPolTenId'];
        }
        if (typeof _dataEdit['kodBekasPolisTentera'] !== 'undefined') {
            currentRow['kodBekasPolisTentera'] = _dataEdit['kodBekasPolisTentera'];
        }
        if (typeof _dataEdit['kodPangkat'] !== 'undefined') {
            currentRow['kodPangkat'] = _dataEdit['kodPangkat'];
        }
        if (typeof _dataEdit['diskripsi'] !== 'undefined') {
            currentRow['diskripsi'] = _dataEdit['diskripsi'];
        }
        if (typeof _dataEdit['kodLain'] !== 'undefined') {
            currentRow['kodLain'] = _dataEdit['kodLain'];
        }
        if (typeof _dataEdit['mainInd'] !== 'undefined') {
            currentRow['mainInd'] = _dataEdit['mainInd'];
        }
        if (typeof _dataEdit['susunanKanan'] !== 'undefined') {
            currentRow['susunanKanan'] = _dataEdit['susunanKanan'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDbpBekasPolTen.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTableSubjekMatrikulasi = function () {
        $('#sectDmnResult36').show();
        const dataResult = mzAjaxRequest('subjek_matrikulasi.php', 'GET');
        oTableDsmSubjekMatrikulasi.clear().rows.add(dataResult).draw();
    };

    this.addTableSubjekMatrikulasi = function (_dataAdd) {
        oTableDsmSubjekMatrikulasi.row.add(_dataAdd).draw();
    };

    this.updateTableSubjekMatrikulasi = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDsmSubjekMatrikulasi.row(_rowEdit).data();
        if (typeof _dataEdit['subjId'] !== 'undefined') {
            currentRow['subjId'] = _dataEdit['subjId'];
        }
        if (typeof _dataEdit['subjCode'] !== 'undefined') {
            currentRow['subjCode'] = _dataEdit['subjCode'];
        }
        if (typeof _dataEdit['subjName'] !== 'undefined') {
            currentRow['subjName'] = _dataEdit['subjName'];
        }
        if (typeof _dataEdit['subjCredit'] !== 'undefined') {
            currentRow['subjCredit'] = _dataEdit['subjCredit'];
        }
        if (typeof _dataEdit['subjSemester'] !== 'undefined') {
            currentRow['subjSemester'] = _dataEdit['subjSemester'];
        }
        if (typeof _dataEdit['subjKira'] !== 'undefined') {
            currentRow['subjKira'] = _dataEdit['subjKira'];
        }
        if (typeof _dataEdit['subjSesi'] !== 'undefined') {
            currentRow['subjSesi'] = _dataEdit['subjSesi'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDsmSubjekMatrikulasi.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\

    this.genTableKemJabatan = function () {
        $('#sectDmnResult37').show();
        const dataResult = mzAjaxRequest('kem_jabatan.php', 'GET');
        oTableDkjKemJabatan.clear().rows.add(dataResult).draw();
    };

    this.addTableKemJabatan = function (_dataAdd) {
        oTableDkjKemJabatan.row.add(_dataAdd).draw();
    };

    this.updateTableKemJabatan = function (_dataEdit, _rowEdit) {
        const currentRow = oTableDkjKemJabatan.row(_rowEdit).data();
        if (typeof _dataEdit['kemJabatanId'] !== 'undefined') {
            currentRow['kemJabatanId'] = _dataEdit['kemJabatanId'];
        }
        if (typeof _dataEdit['kod'] !== 'undefined') {
            currentRow['kod'] = _dataEdit['kod'];
        }
        if (typeof _dataEdit['diskripsi'] !== 'undefined') {
            currentRow['diskripsi'] = _dataEdit['diskripsi'];
        }
        if (typeof _dataEdit['alamat1'] !== 'undefined') {
            currentRow['alamat1'] = _dataEdit['alamat1'];
        }
        if (typeof _dataEdit['alamat2'] !== 'undefined') {
            currentRow['alamat2'] = _dataEdit['alamat2'];
        }
        if (typeof _dataEdit['alamat3'] !== 'undefined') {
            currentRow['alamat3'] = _dataEdit['alamat3'];
        }
        if (typeof _dataEdit['gelaranKetua'] !== 'undefined') {
            currentRow['gelaranKetua'] = _dataEdit['gelaranKetua'];
        }
        if (typeof _dataEdit['poskod'] !== 'undefined') {
            currentRow['poskod'] = _dataEdit['poskod'];
        }
        if (typeof _dataEdit['bandar'] !== 'undefined') {
            currentRow['bandar'] = _dataEdit['bandar'];
        }
        if (typeof _dataEdit['kemKod'] !== 'undefined') {
            currentRow['kemKod'] = _dataEdit['kemKod'];
        }
        if (typeof _dataEdit['diskripsi2'] !== 'undefined') {
            currentRow['diskripsi2'] = _dataEdit['diskripsi2'];
        }
        if (typeof _dataEdit['diskripsi3'] !== 'undefined') {
            currentRow['diskripsi3'] = _dataEdit['diskripsi3'];
        }
        if (typeof _dataEdit['emel'] !== 'undefined') {
            currentRow['emel'] = _dataEdit['emel'];
        }
        if (typeof _dataEdit['noTel'] !== 'undefined') {
            currentRow['noTel'] = _dataEdit['noTel'];
        }
        if (typeof _dataEdit['unitUrusan'] !== 'undefined') {
            currentRow['unitUrusan'] = _dataEdit['unitUrusan'];
        }
        if (typeof _dataEdit['noPemerolehan'] !== 'undefined') {
            currentRow['noPemerolehan'] = _dataEdit['noPemerolehan'];
        }
        if (typeof _dataEdit['gabYt'] !== 'undefined') {
            currentRow['gabYt'] = _dataEdit['gabYt'];
        }
        if (typeof _dataEdit['sahYt'] !== 'undefined') {
            currentRow['sahYt'] = _dataEdit['sahYt'];
        }
        oTableDkjKemJabatan.row(_rowEdit).data(currentRow).draw();
    };

    // ----- \\
    
    this.getClassName = function () {
        return className;
    };

    this.setModalAgamaClass = function (_modalAgamaClass) {
        modalAgamaClass = _modalAgamaClass;
    };

    this.setModalKeturunanClass = function (_modalKeturunanClass) {
        modalKeturunanClass = _modalKeturunanClass;
    };

    this.setModalNegeriClass = function (_modalNegeriClass) {
        modalNegeriClass = _modalNegeriClass;
    };

    this.setModalPoskodClass = function (_modalPoskodClass) {
        modalPoskodClass = _modalPoskodClass;
    };

    this.setModalPusatTdClass = function (_modalPusatTdClass) {
        modalPusatTdClass = _modalPusatTdClass;
    };

    this.setModalMataPelajaranClass = function (_modalMataPelajaranClass) {
        modalMataPelajaranClass = _modalMataPelajaranClass;
    };

    this.setModalGredMatapelajaranClass = function (_modalGredMatapelajaranClass) {
        modalGredMatapelajaranClass = _modalGredMatapelajaranClass;
    };

    this.setModalSijilClass = function (_modalSijilClass) {
        modalSijilClass = _modalSijilClass;
    };

    this.setModalSijilPangkatClass = function (_modalSijilPangkatClass) {
        modalSijilPangkatClass = _modalSijilPangkatClass;
    };

    this.setModalUjianLisanClass = function (_modalUjianLisanClass) {
        modalUjianLisanClass = _modalUjianLisanClass;
    };

    this.setModalKelulusanClass = function (_modalKelulusanClass) {
        modalKelulusanClass = _modalKelulusanClass;
    };

    this.setModalPaperJulaiClass = function (_modalPaperJulaiClass) {
        modalPaperJulaiClass = _modalPaperJulaiClass;
    };

    this.setModalPaperJulaiBmClass = function (_modalPaperJulaiBmClass) {
        modalPaperJulaiBmClass = _modalPaperJulaiBmClass;
    };

    this.setModalKelulusanMrefClass = function (_modalKelulusanMrefClass) {
        modalKelulusanMrefClass = _modalKelulusanMrefClass;
    };

    this.setModalBahasaClass = function (_modalBahasaClass) {
        modalBahasaClass = _modalBahasaClass;
    };

    this.setModalBakatClass = function (_modalBakatClass) {
        modalBakatClass = _modalBakatClass;
    };

    this.setModalBakatDetailClass = function (_modalBakatDetailClass) {
        modalBakatDetailClass = _modalBakatDetailClass;
    };

    this.setModalBantuanClass = function (_modalBantuanClass) {
        modalBantuanClass = _modalBantuanClass;
    };

    this.setModalBiasiswaClass = function (_modalBiasiswaClass) {
        modalBiasiswaClass = _modalBiasiswaClass;
    };

    this.setModalKolejMatrikulasiClass = function (_modalKolejMatrikulasiClass) {
        modalKolejMatrikulasiClass = _modalKolejMatrikulasiClass;
    };

    this.setModalGredGajiClass = function (_modalGredGajiClass) {
        modalGredGajiClass = _modalGredGajiClass;
    };

    this.setModalInstitusiClass = function (_modalInstitusiClass) {
        modalInstitusiClass = _modalInstitusiClass;
    };

    this.setModalJenisPengajianClass = function (_modalJenisPengajianClass) {
        modalJenisPengajianClass = _modalJenisPengajianClass;
    };

    this.setModalJenisPengkhususanClass = function (_modalJenisPengkhususanClass) {
        modalJenisPengkhususanClass = _modalJenisPengkhususanClass;
    };

    this.setModalJenisPerkhidmatanClass = function (_modalJenisPerkhidmatanClass) {
        modalJenisPerkhidmatanClass = _modalJenisPerkhidmatanClass;
    };

    this.setModalPeringkatClass = function (_modalPeringkatClass) {
        modalPeringkatClass = _modalPeringkatClass;
    };

    this.setModalTelcoClass = function (_modalTelcoClass) {
        modalTelcoClass = _modalTelcoClass;
    };

    this.setModalKecacatanCalonClass = function (_modalKecacatanCalonClass) {
        modalKecacatanCalonClass = _modalKecacatanCalonClass;
    };

    this.setModalPenguasaanBahasaClass = function (_modalPenguasaanBahasaClass) {
        modalPenguasaanBahasaClass = _modalPenguasaanBahasaClass;
    };

    this.setModalTarafJawatanClass = function (_modalTarafJawatanClass) {
        modalTarafJawatanClass = _modalTarafJawatanClass;
    };

    this.setModalPengkhususanClass = function (_modalPengkhususanClass) {
        modalPengkhususanClass = _modalPengkhususanClass;
    };

    this.setModalSukanClass = function (_modalSukanClass) {
        modalSukanClass = _modalSukanClass;
    };

    this.setModalSkimSahClass = function (_modalSkimSahClass) {
        modalSkimSahClass = _modalSkimSahClass;
    };

    this.setModalSkimClass = function (_modalSkimClass) {
        modalSkimClass = _modalSkimClass;
    };

    this.setModalBekasPolTenClass = function (_modalBekasPolTenClass) {
        modalBekasPolTenClass = _modalBekasPolTenClass;
    };

    this.setModalSubjekMatrikulasiClass = function (_modalSubjekMatrikulasiClass) {
        modalSubjekMatrikulasiClass = _modalSubjekMatrikulasiClass;
    };

    this.setModalKemJabatanClass = function (_modalKemJabatanClass) {
        modalKemJabatanClass = _modalKemJabatanClass;
    };

    // ----- \\
    
    this.setRefNegeri = function (_refNegeri) {
        refNegeri = _refNegeri;
    };

    this.setRefBakat = function (_refBakat) {
        refBakat = _refBakat;
    };

    this.setRefKategoriInstitusi = function (_refKategoriInstitusi) {
        refKategoriInstitusi = _refKategoriInstitusi;
    };

    this.setRefJenisPengkhususan = function (_refJenisPengkhususan) {
        refJenisPengkhususan = _refJenisPengkhususan;
    };
}