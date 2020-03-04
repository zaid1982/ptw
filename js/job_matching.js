const url = 'api/job_match.php';
var jawatan_json;

$(document).ready(function () {	
	var dropdown_profesional = $('#dropbox_profesional');
	var dropdown_ikhtisas = $('#dropbox_ikhtisas');

	dropdown_profesional.empty();
	dropdown_ikhtisas.empty();

	dropdown_profesional.append('<option selected="true" disabled>Pilih profesional...</option>');
	dropdown_ikhtisas.append('<option selected="true" disabled>Pilih ikhtisas...</option>');
	
	dropdown_profesional.prop('selectedIndex', 0);
	dropdown_ikhtisas.prop('selectedIndex', 0);
	
	$.ajax({
		url: url,
		type: 'get',
		data: {type:'nama_profesional'},
		dataType: 'json',
		success:function(response2){
			$.each(response2, function (key, entry) {
				dropdown_profesional.append($('<option></option>').attr('value', entry.KOD).text(entry.PROFESIONAL));
			})
		}
	});
	
	$.ajax({
		url: url,
		type: 'get',
		data: {type:'nama_ikhtisas'},
		dataType: 'json',
		success:function(response2){
			$.each(response2, function (key, entry) {
				dropdown_ikhtisas.append($('<option></option>').attr('value', entry.KOD).text(entry.IKHTISAS));
			})
		}
	});
	
	$("#had_umur").change(function () {                    
	   var newValue = $('#had_umur').val();
	   $("#had_umur_value").html(newValue);
	});
	
	$("#select_akademik").change(function(){
		var dropdown_jawatan = $('#dropbox_jawatan');
		var dropdown_klasifikasi = $('#dropbox_klasifikasi');

		dropdown_jawatan.empty();
		dropdown_klasifikasi.empty();

		dropdown_jawatan.append('<option selected="true" disabled>Pilih jawatan...</option>');
		dropdown_klasifikasi.append('<option selected="true" disabled>Pilih klasifikasi...</option>');

		dropdown_jawatan.prop('selectedIndex', 0);
		dropdown_klasifikasi.prop('selectedIndex', 0);


		$(this).find("option:selected").each(function(){
			var dropdown_akademik_1 = $('#dropbox_akademik_1');
			
			var optionValue = $(this).attr("value");
			var onClass1 = '';
			var offClass = '';
			
			switch(optionValue) {
				case '1':
					onClass1 = '.akademi_0, .akademi_1, .akademi_2, .ikthtisas, .peperiksaan_khas, .profesional, .maklumat_perkhidmatan, .pengkhususan_1, .peningkatan_lantikan, .jawatan_dan_klasifikasi';
					offClass = '';
					
					$.ajax({
						url: url,
						type: 'get',
						data: {type:'nama_kelayakan', value_min:'7', value_max:'9'},
						dataType: 'json',
						success:function(response1){
							setSelectAkademik('#dropbox_akademik_1', 1);
							$.each(response1, function (key, entry) {
								dropdown_akademik_1.append($('<option></option>').attr('value', entry.KELAYAKAN_SETARA).text(entry.KELAYAKAN));
							})
						}
					});
					
					break;
				case '2':
					onClass1 = '.akademi_0, .akademi_1, .akademi_2, .ikthtisas, .peperiksaan_khas, .profesional, .maklumat_perkhidmatan, .pengkhususan_1, .peningkatan_lantikan, .jawatan_dan_klasifikasi';
					offClass = '';
					
					$.ajax({
						url: url,
						type: 'get',
						data: {type:'nama_kelayakan', value_min:'5', value_max:'5'},
						dataType: 'json',
						success:function(response1){							
							setSelectAkademik('#dropbox_akademik_1', 2);
							$.each(response1, function (key, entry) {
								dropdown_akademik_1.append($('<option></option>').attr('value', entry.KELAYAKAN_SETARA).text(entry.KELAYAKAN));
							})
						}
					});	
					
					break;
				case '3':
					onClass1 = '.akademi_0, .akademi_1, .akademi_2, .peperiksaan_khas, .profesional, .maklumat_perkhidmatan, .pengkhususan_1, .peningkatan_lantikan, .jawatan_dan_klasifikasi';
					offClass = '.ikthtisas'
					
					response1 = '[{"KELAYAKAN":"SPM","KELAYAKAN_SETARA":"SPM"}]';;
					response1 = JSON.parse(response1);						
					setSelectAkademik('#dropbox_akademik_1', 3);
					$.each(response1, function (key, entry) {
						dropdown_akademik_1.append($('<option></option>').attr('value', entry.KELAYAKAN_SETARA).text(entry.KELAYAKAN));
					})
					
					break;
				case '4':
					onClass1 = '.akademi_0, .akademi_1, .maklumat_perkhidmatan, .jawatan_dan_klasifikasi';
					offClass = '.akademi_2, .ikthtisas, .peperiksaan_khas, .pengkhususan_1, .profesional, .peningkatan_lantikan';
					
					response1 = '[{"KELAYAKAN":"PMR / PT3","KELAYAKAN_SETARA":"PMR"}]';
					response1 = JSON.parse(response1);						
					setSelectAkademik('#dropbox_akademik_1', 4);
					$.each(response1, function (key, entry) {
						dropdown_akademik_1.append($('<option></option>').attr('value', entry.KELAYAKAN_SETARA).text(entry.KELAYAKAN));
					})
					
					break;
				case '5':
					onClass1 = '.akademi_0, .akademi_1, .pengkhususan_1, .jawatan_dan_klasifikasi';
					offClass = '.akademi_2, .ikthtisas, .peperiksaan_khas, .profesional, .maklumat_perkhidmatan, .peningkatan_lantikan';
					
					response1 = '[{"KELAYAKAN":"IJAZAH","KELAYAKAN_SETARA":"IJAZAH"},{"KELAYAKAN":"DIPLOMA","KELAYAKAN_SETARA":"DIPLOMA"},{"KELAYAKAN":"SPM","KELAYAKAN_SETARA":"SPM"}, {"KELAYAKAN":"PT3","KELAYAKAN_SETARA":"PT3"}]';
					response1 = JSON.parse(response1);						
					setSelectAkademik('#dropbox_akademik_1', 5);
					$.each(response1, function (key, entry) {
						dropdown_akademik_1.append($('<option></option>').attr('value', entry.KELAYAKAN_SETARA).text(entry.KELAYAKAN));
					})
					
					break;
				default:
					
			}

			$.ajax({
				url: url,
				type: 'get',
				data: {type:'nama_jawatan', value_once: optionValue},
				dataType: 'json',
				success:function(response){
					jawatan_json = response;
					$.each(response, function (key, entry) {
						dropdown_jawatan.append($('<option></option>').attr('value', entry.KOD).text(entry.JAWATAN));
					})
				}
			});
			
			$.ajax({
				url: url,
				type: 'get',
				data: {type:'nama_klasifikasi'},
				dataType: 'json',
				success:function(response){
					$.each(response, function (key, entry) {
						dropdown_klasifikasi.append($('<option></option>').attr('value', entry.KOD).text(entry.KLASIFIKASI_PERKHIDMATAN));
					})
				}
			});
			
			$(onClass1).show();				
			$(offClass).hide();
		});
	}).change();
	
	$("#dropbox_anggota").change(function(){
		$(this).find("option:selected").each(function(){
			var dropbox_pangkat_terakhir = $('#dropbox_pangkat_terakhir');
			dropbox_pangkat_terakhir.empty();
			dropbox_pangkat_terakhir.append('<option selected="true" disabled>Pilih pangkat terakhir...</option>');
			dropbox_pangkat_terakhir.prop('selectedIndex', 0);
			
			var optionValue = $(this).attr("value");
			
			$.ajax({
				url: url,
				type: 'get',
				data: {type:'jenis_pangkat_terakhir', value_once: optionValue},
				dataType: 'json',
				success:function(response1){
					$.each(response1, function (key, entry) {
						dropbox_pangkat_terakhir.append($('<option></option>').attr('value', entry.kod_pangkat).text(entry.PANGKAT_TERAKHIR));
					})
				}
			});
		});
	}).change();
	
	$("#dropbox_akademik_1").change(function(){
		$(this).find("option:selected").each(function(){
			var dropbox_pengkhususan = $('#dropbox_pengkhususan_1');
			dropbox_pengkhususan.empty();
			dropbox_pengkhususan.append('<option selected="true" disabled>Pilih pengkhususan...</option>');
			dropbox_pengkhususan.prop('selectedIndex', 0);
			
			//var optionValue = $(this).attr("value");
			var optionValue = $("#select_akademik").children("option:selected").val();
			
			if (optionValue == '1' || optionValue == '2') {
				$.ajax({
					url: url,
					type: 'get',
					data: {type:'nama_pengkhususan', value_once: optionValue},
					dataType: 'json',
					success:function(response1){
						$.each(response1, function (key, entry) {
							dropbox_pengkhususan.append($('<option></option>').attr('value', entry.KOD).text(entry.KELAYAKAN));
						})
					}
				});
			} else {
				dropbox_pengkhususan.append('<option value="all">SEMUA</option>');
			}
		});
	}).change();

	$("#button-daftar").click(function(e) {
		e.preventDefault();
		var id_modal_1 = "#centralModalLGInfoDemo";
	
		var form = $("#job_match_form");
		var url = form.attr('action');
	
		$.ajax({
			type: "POST",
			url: url,
			data: form.serialize(),
			success: function(data)
			{
				//table_id = "#dtMaterialDesignExample";
				//var table_main = $(table_id).DataTable();
                //table_main.ajax.reload();
				//$.notify("Data tetapan telah dikemaskini dari pangkalan data", "info");
				
				$(id_modal_1).modal('toggle');
			}
		});
	});

	$("#button_tambah_anggota").click(function(e) {
		e.preventDefault();
		
		var id_table = "#table_bekas_anggota";
	
		var jenis_anggota = $("#dropbox_anggota option:selected").text();
		var pangkat_akhir = $("#dropbox_pangkat_terakhir option:selected").text();

		var rowCount = $(id_table + ' tr').length - 1;
		
		$(id_table + ' tr:last').after("<tr id=\"trid_"+rowCount+"\">" +
													"<td class=\"order\" scope=\"row\">"+rowCount+"</td>" +
													"<td>"+jenis_anggota+"</td>" +
													"<td>"+pangkat_akhir+"</td>" +
													"<td><a href=\"javascript:;\"><i class=\"fas fa-trash red-text pr-2 anggota_delete\" aria-hidden=\"true\"></i></a></td>" +
												"</tr>");
	});

	$("#table_bekas_anggota").on("click", ".anggota_delete", function(e) {
		e.preventDefault();

		if($('table tr').length>1) {
			$(this).closest('tr').remove();
			
			$('td.order').text(function (i) {
				return i + 1;
			});
		}
		return false;
	});

	$("#button_tambah_akademik").click(function(e) {
		e.preventDefault();
		
		var id_table = "#table_akademik";
	
		var akademik = $("#dropbox_akademik_1 option:selected").text();
		var pengkhususan = $("#dropbox_pengkhususan_1 option:selected").text();

		var rowCount = $(id_table + ' tr').length - 1;
		
		$(id_table + ' tr:last').after("<tr id=\"tr_in_id_"+rowCount+"\">" +
													"<td class=\"order\" scope=\"row\">"+rowCount+"</td>" +
													"<td>"+akademik+"</td>" +
													"<td>"+pengkhususan+"</td>" +
													"<td><a href=\"javascript:;\"><i class=\"fas fa-trash red-text pr-2 akademik_delete\" aria-hidden=\"true\"></i></a></td>" +
												"</tr>");
	});

	$("#table_akademik").on("click", ".akademik_delete", function(e) {
		e.preventDefault();

		if($('table tr').length>1) {
			$(this).closest('tr').remove();
			
			$('td.order').text(function (i) {
				return i + 1;
			});
		}
		return false;
	});
	
	// SELECT	
	$('.mdb-select').select2();

	// DataPicker
	$('#from').pickadate();
	$('#to').pickadate();

	// DataTables
	var t = $('#dtMaterialDesignExample').DataTable({
		"ajax": {
			"url": url,
			"dataType": "json",
			"contentType": "application/json; charset=utf-8",
			"type": "GET",
			"data": {"type" : "table"}
		},
		"aoColumnDefs":[{			
			"aTargets": [ 0 ], "sClass": "middlecenter", "width": "5px"
		  , "mRender": function ( value, type, full )  {
			  return null;
		  }
		},{			
			"aTargets": [ 1 ], "sClass": "middlecenter", "width": "5px"
		  , "mRender": function ( value, type, full )  {
			  return find_in_json_by_(full.select_nama_jawatan, jawatan_json);
		  }
		},{			
			"aTargets": [ 2 ], "sClass": "middlecenter", "width": "5px"
		  , "mRender": function ( value, type, full )  {
			  return full.select_klasifikasi;
		  }
		},{			
			"aTargets": [ 3 ], "width": "18%"
		  , "data": function ( row, type, val, meta ) {			  
				if (row.select_kelayakan == '1') {
					text21 = 'IJAZAH / SARJANA / PhD';
				} else if (row.select_kelayakan == '2') {
					text21 = 'DIPLOMA / STPM / STAM / MATRIKULASI';
				} else if (row.select_kelayakan == '3') {
					text21 = 'SPM / SVM / SKM / SIJIL';
				} else if (row.select_kelayakan == '4') {
					text21 = 'PMR / PT3';
				} else if (row.select_kelayakan == '5') {
					text21 = 'BAKAT';
				} else {
					text21 = 'LAIN-LAIN';
				}
				
				return text21;
		  }
		},{
			"aTargets":[ 4 ], "width": "15%"
		  , "sType": "date"
		  , "mRender": function( value, type, full ) {
			  return full.select_akademik_1;
		  }
		},{
			"aTargets":[ 5 ], "width": "15%"
		  , "sType": "date"
		  , "mRender": function( value, type, full ) {
			  a = '<a class="btn-floating btn-deep-purple waves-effect waves-light" href="javascript:;"><i class="fas fa-eye"></i></a>';
			  a = a + '&nbsp;&nbsp;<a class="btn-floating btn-mdb-color waves-effect waves-light" href="javascript:;"><i class="fas fa-pencil-alt"></i></a>';
			  return a;
		  }
		}],
		"order": [[ 1, 'asc' ]]
	});
	
	t.on( 'order.dt search.dt', function () {
		t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
			cell.innerHTML = i+1;
		} );
	} ).draw();
});

function find_in_json_by_(no_key, thejson){
	var item = thejson.find(item => item.KOD === no_key);
	return item.JAWATAN;	
}

function valueChanged(me, ShowHideDIV, type){
	if($(me).is(":checked")) {
		if (type == 'oku') {
			var dropdown_oku = $('#dropbox_oku');
			dropdown_oku.empty();
			
			$.ajax({
				url: url,
				type: 'get',
				data: {type:'jenis_oku'},
				dataType: 'json',
				success:function(response){
					$.each(response, function (key, entry) {
						dropdown_oku.append($('<option></option>').attr('value', entry.KOD).text(entry.JENIS_OKU));
					})
				}
			});
		} else if (type == 'bekas_anggota') {
			var dropdown_anggota = $('#dropbox_anggota');
			dropdown_anggota.empty();
			dropdown_anggota.append('<option selected="true" disabled>Pilih jenis bekas...</option>');
			dropdown_anggota.prop('selectedIndex', 0);
			
			$.ajax({
				url: url,
				type: 'get',
				data: {type:'jenis_bekas_anggota'},
				dataType: 'json',
				success:function(response){
					$.each(response, function (key, entry) {
						dropdown_anggota.append($('<option></option>').attr('value', entry.kod_bekas_polis_tentera).text(entry.BEKAS_ANGGOTA));
					})
				}
			});
		} else {
			return;
		}
	}
	
	if($(me).is(":checked"))   
		$(ShowHideDIV).show();
	else
		$(ShowHideDIV).hide();
}

function setSelectAkademik(name_select, type){
	var da1 = $(name_select);
	da1.empty();
	da1.append('<option selected="true" disabled>Pilih kelayakan akademik...</option>');
	if (type !== 1) {
		da1.append('<option value="all">SEMUA</option>');	
	}
	da1.prop('selectedIndex', 0);
}

