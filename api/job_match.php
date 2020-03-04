<?php
header('Content-Type: application/json');
session_start();
require_once 'library/constant.php';
require_once 'function/db.php';
require_once 'function/f_general.php';


$type 		= isset($_GET['type']) && $_GET['type'] ? $_GET['type'] : '';
$value_min 	= isset($_GET['value_min']) && $_GET['value_min'] ? $_GET['value_min'] : '';
$value_max 	= isset($_GET['value_max']) && $_GET['value_max'] ? $_GET['value_max'] : '';
$value_once = isset($_GET['value_once']) && $_GET['value_once'] ? $_GET['value_once'] : '';

// REQUEST FROM POST
$type_post				= isset($_POST['type_post']) && $_POST['type_post'] ? $_POST['type_post'] : '';
$select_nama_jawatan	= isset($_POST['select_nama_jawatan']) && $_POST['select_nama_jawatan'] ? $_POST['select_nama_jawatan'] : '';
$select_klasifikasi		= isset($_POST['select_klasifikasi']) && $_POST['select_klasifikasi'] ? $_POST['select_klasifikasi'] : '';
$select_kelayakan		= isset($_POST['select_kelayakan']) && $_POST['select_kelayakan'] ? $_POST['select_kelayakan'] : '';
$select_bahasa_melayu	= isset($_POST['select_bahasa_melayu']) && $_POST['select_bahasa_melayu'] ? $_POST['select_bahasa_melayu'] : '';
$had_umur				= isset($_POST['had_umur']) && $_POST['had_umur'] ? $_POST['had_umur'] : '';
$select_akademik_1		= isset($_POST['select_akademik_1']) && $_POST['select_akademik_1'] ? $_POST['select_akademik_1'] : '';
$select_pengkhususan_1	= isset($_POST['select_pengkhususan_1']) && $_POST['select_pengkhususan_1'] ? $_POST['select_pengkhususan_1'] : '';
$select_akademik_2		= isset($_POST['select_akademik_2']) && $_POST['select_akademik_2'] ? $_POST['select_akademik_2'] : '';
$select_pengkhususan_2	= isset($_POST['select_pengkhususan_2']) && $_POST['select_pengkhususan_2'] ? $_POST['select_pengkhususan_2'] : '';
$tarikh_mula			= isset($_POST['tarikh_mula']) && $_POST['tarikh_mula'] ? $_POST['tarikh_mula'] : '';
$tarikh_akhir			= isset($_POST['tarikh_akhir']) && $_POST['tarikh_akhir'] ? $_POST['tarikh_akhir'] : '';
$jumlah_lantikan		= isset($_POST['jumlah_lantikan']) && $_POST['jumlah_lantikan'] ? $_POST['jumlah_lantikan'] : '';
$jumlah_simpanan		= isset($_POST['jumlah_simpanan']) && $_POST['jumlah_simpanan'] ? $_POST['jumlah_simpanan'] : '';
$checkbox_adakah_kurang_upaya	= isset($_POST['checkbox_adakah_kurang_upaya']) && $_POST['checkbox_adakah_kurang_upaya'] ? $_POST['checkbox_adakah_kurang_upaya'] : '';
$select_jenis_oku			= isset($_POST['select_jenis_oku']) && $_POST['select_jenis_oku'] ? $_POST['select_jenis_oku'] : '';
$checkbox_adakah_bekas_tp	= isset($_POST['checkbox_adakah_bekas_tp']) && $_POST['checkbox_adakah_bekas_tp'] ? $_POST['checkbox_adakah_bekas_tp'] : '';
$select_tp_jenis			= isset($_POST['select_tp_jenis']) && $_POST['select_tp_jenis'] ? $_POST['select_tp_jenis'] : '';
$select_tp_pangkat_akhir	= isset($_POST['select_tp_pangkat_akhir']) && $_POST['select_tp_pangkat_akhir'] ? $_POST['select_tp_pangkat_akhir'] : '';
$checkbox_adakah_peningkatan_lantikan	= isset($_POST['checkbox_adakah_peningkatan_lantikan']) && $_POST['checkbox_adakah_peningkatan_lantikan'] ? $_POST['checkbox_adakah_peningkatan_lantikan'] : '';
$checkbox_adakah_lulus_periksa_khas		= isset($_POST['checkbox_adakah_lulus_periksa_khas']) && $_POST['checkbox_adakah_lulus_periksa_khas'] ? $_POST['checkbox_adakah_lulus_periksa_khas'] : '';
$checkbox_adakah_bakat	= isset($_POST['checkbox_adakah_bakat']) && $_POST['checkbox_adakah_bakat'] ? $_POST['checkbox_adakah_bakat'] : '';
$select_profesional		= isset($_POST['select_profesional']) && $_POST['select_profesional'] ? $_POST['select_profesional'] : '';
$select_ikhtisas		= isset($_POST['select_ikhtisas']) && $_POST['select_ikhtisas'] ? $_POST['select_ikhtisas'] : '';
$checkbox_adakah_lesen_memandu	= isset($_POST['checkbox_adakah_lesen_memandu']) && $_POST['checkbox_adakah_lesen_memandu'] ? $_POST['checkbox_adakah_lesen_memandu'] : '';
$select_lokaliti_pemohon		= isset($_POST['select_lokaliti_pemohon']) && $_POST['select_lokaliti_pemohon'] ? $_POST['select_lokaliti_pemohon'] : '';
$select_lokaliti_ibu	= isset($_POST['select_lokaliti_ibu']) && $_POST['select_lokaliti_ibu'] ? $_POST['select_lokaliti_ibu'] : '';
$select_lokaliti_bapa	= isset($_POST['select_lokaliti_bapa']) && $_POST['select_lokaliti_bapa'] ? $_POST['select_lokaliti_bapa'] : '';
$select_lokaliti_alamat	= isset($_POST['select_lokaliti_alamat']) && $_POST['select_lokaliti_alamat'] ? $_POST['select_lokaliti_alamat'] : '';

try {
	if ($type !== '') {
		switch ($type) {
			case "nama_jawatan":
				switch ($value_once) {
					case '1':
						$sql = "SELECT 
									DISTINCT(RSS.DISKRIPSI) AS JAWATAN,
									RSS.KOD AS KOD,						
									RGG.DISKRIPSI AS KLASIFIKASI_PERKHIDMATAN
								FROM 
									ref_skim_sah RSS,
									ref_skim RS,
									ref_gred_gaji RGG
								WHERE
									RSS.KOD = RS.KOD
									AND RSS.SAH_YT = 'Y' 
									AND RS.GGH_KOD = RGG.KOD
									AND RSS.KUMP_PKHIDMAT_JKK = 'A'
								GROUP BY JAWATAN";
						break;
					
					case '2':
						$sql = "SELECT 
									DISTINCT(RSS.DISKRIPSI) AS JAWATAN,
									RSS.KOD AS KOD,						
									RGG.DISKRIPSI AS KLASIFIKASI_PERKHIDMATAN
								FROM 
									ref_skim_sah RSS,
									ref_skim RS,
									ref_gred_gaji RGG
								WHERE
									RSS.KOD = RS.KOD
									AND RSS.SAH_YT = 'Y' 
									AND RS.GGH_KOD = RGG.KOD
									AND RSS.KUMP_PKHIDMAT_JKK = 'B'
								GROUP BY JAWATAN";
						break;

					case '3':
						$sql = "SELECT 
									DISTINCT(RSS.DISKRIPSI) AS JAWATAN,
									RSS.KOD AS KOD,						
									RGG.DISKRIPSI AS KLASIFIKASI_PERKHIDMATAN
								FROM 
									ref_skim_sah RSS,
									ref_skim RS,
									ref_gred_gaji RGG
								WHERE
									RSS.KOD = RS.KOD
									AND RSS.SAH_YT = 'Y' 
									AND RS.GGH_KOD = RGG.KOD
									AND RSS.KUMP_PKHIDMAT_JKK = 'C'
								GROUP BY JAWATAN";
						break;
					
					case '4':
						$sql = "SELECT 
									DISTINCT(RSS.DISKRIPSI) AS JAWATAN,
									RSS.KOD AS KOD,						
									RGG.DISKRIPSI AS KLASIFIKASI_PERKHIDMATAN
								FROM 
									ref_skim_sah RSS,
									ref_skim RS,
									ref_gred_gaji RGG
								WHERE
									RSS.KOD = RS.KOD
									AND RSS.SAH_YT = 'Y' 
									AND RS.GGH_KOD = RGG.KOD
									AND RSS.KUMP_PKHIDMAT_JKK = 'D'
								GROUP BY JAWATAN";
						break;

					default:
						$sql = "SELECT 
								DISTINCT(RSS.DISKRIPSI) AS JAWATAN,
								RSS.KOD AS KOD,						
								RGG.DISKRIPSI AS KLASIFIKASI_PERKHIDMATAN
							FROM 
								ref_skim_sah RSS,
								ref_skim RS,
								ref_gred_gaji RGG
							WHERE
								RSS.KOD = RS.KOD
								AND RSS.SAH_YT = 'Y' 
								AND RS.GGH_KOD = RGG.KOD
							GROUP BY JAWATAN";
				}				
				break;
				
			case "nama_klasifikasi":
				$sql = "SELECT 
							DISTINCT(RGG.DISKRIPSI) AS KLASIFIKASI_PERKHIDMATAN
						FROM 
							ref_skim_sah RSS,
							ref_skim RS,
							ref_gred_gaji RGG
						WHERE
							RSS.KOD = RS.KOD
							AND RSS.SAH_YT = 'Y' 
							AND RS.GGH_KOD = RGG.KOD";
				break;
			
			case "nama_ikhtisas":
				$sql = "SELECT 
							DISTINCT(RK.DISKRIPSI) AS IKHTISAS,
							RK.KOD
						FROM 
							ref_kelulusan RK
						WHERE 
							RK.JENIS = '1'
							AND RK.KATEGORI = 'I'
						ORDER BY RK.DISKRIPSI";
				break;
				
			case "nama_profesional":
				$sql = "SELECT 
							DISTINCT(RK.DISKRIPSI) AS PROFESIONAL,
							RK.KOD
						FROM 
							ref_kelulusan RK
						WHERE 
							RK.JENIS = '1'
							AND RK.KATEGORI = 'P'
						ORDER BY DISKRIPSI";
				break;
				
			case "nama_kelayakan":
				$sql = "SELECT 
							DISTINCT(RK.DISKRIPSI) AS KELAYAKAN,
							RK.KELAYAKAN_SETARA
						FROM 
							ref_kelayakan RK
						WHERE
							RK.SAH_YT = 'Y' 
							AND RK.KELAYAKAN_SETARA >= '$value_min'
							AND RK.KELAYAKAN_SETARA <= '$value_max'";
				break;
				
			case "nama_pengkhususan":
				$sql = "SELECT 
							DISTINCT(RJP.DISKRIPSI) AS KELAYAKAN,
							RJP.KOD
						FROM 
							ref_jenis_pengkhususan RJP
						WHERE
							RJP.SAH_YT = 'Y'";
				break;
				
			case "jenis_oku":
				$sql = "SELECT 
							DISTINCT(RKC.DISKRIPSI) AS JENIS_OKU,
							RKC.KOD
						FROM 
							ref_kecacatan_calon RKC
						WHERE
							RKC.SAH_YT = 'Y'";
				break;
				
			case "jenis_bekas_anggota":
				$sql = "SELECT 
							DISTINCT(RBPT.DISKRIPSI) AS BEKAS_ANGGOTA,
							RBPT.kod_bekas_polis_tentera
						FROM 
							ref_bekas_pol_ten RBPT
						WHERE
							RBPT.main_ind = 'Y'";
				break;
				
			case "jenis_pangkat_terakhir":
				$sql = "SELECT 
							DISTINCT(RBPT.DISKRIPSI) AS PANGKAT_TERAKHIR,
							RBPT.kod_pangkat
						FROM 
							ref_bekas_pol_ten RBPT
						WHERE
							RBPT.main_ind = 'N'
							AND RBPT.kod_bekas_polis_tentera = '$value_once'";
				break;

			case "table":
					$sql = "SELECT 
								JM.id_job_match,
								JM.select_nama_jawatan,
								JM.select_klasifikasi,
								JM.select_kelayakan,
								JM.select_akademik_1
							FROM 
								job_match JM";
					break;
				
			default:
				echo "Your favorite color is neither red, blue, nor green! #1";
				exit();
		}
	}

	if ($type_post !== '') {
		switch ($type_post) {
			case "daftar":
				$sql = "INSERT INTO 
							job_match 
						VALUES (NULL, '$select_nama_jawatan', '$select_klasifikasi', '$select_kelayakan',
							'$select_bahasa_melayu',
							'$had_umur',
							'$select_akademik_1',
							'$select_pengkhususan_1',
							'$select_akademik_2',
							'$select_pengkhususan_2',
							'$tarikh_mula',
							'$tarikh_akhir',
							'$jumlah_lantikan',
							'$jumlah_simpanan',
							'$checkbox_adakah_kurang_upaya',
							'$select_jenis_oku',
							'$checkbox_adakah_bekas_tp',
							'$select_tp_jenis',
							'$select_tp_pangkat_akhir',
							'$checkbox_adakah_peningkatan_lantikan',
							'$checkbox_adakah_lulus_periksa_khas',
							'$checkbox_adakah_bakat',
							'$select_profesional',
							'$select_ikhtisas',
							'$checkbox_adakah_lesen_memandu',
							'$select_lokaliti_pemohon',
							'$select_lokaliti_ibu',
							'$select_lokaliti_bapa',
							'$select_lokaliti_alamat',
							Now());";
				break;
				
			default:
				echo "Your favorite color is neither red, blue, nor green! #2";
				exit();
		}
	}

	if ($type == '' && $type_post == '') {
		echo "Your favorite color is neither red, blue, nor green! #3";
		exit();
	}
	
	if ($type !== '') {
		Class_db::getInstance()->db_connect_match();
		$data = Class_db::getInstance()->db_select_pdo($sql);
	}

	if ($type_post !== '') {
		Class_db::getInstance()->db_connect_match();
		Class_db::getInstance()->db_beginTransaction();
		Class_db::getInstance()->db_insert_pdo($sql);
		Class_db::getInstance()->db_commit();
	}
	
} catch(Exception $e) {
    //Class_db::getInstance()->db_rollback();
	echo (date("Y/m/d h:i:sa")." [".__FILE__.":".__LINE__."] - ".$e->getMessage()."\r\n");
}

Class_db::getInstance()->db_close();

$results = array("data" => $data);

if ($type == 'table') {
	echo json_encode($results);
} else {
	echo json_encode($data);
}
?>