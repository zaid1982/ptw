<?php

require_once 'library/constant.php';
require_once 'function/db.php';
require_once 'function/f_general.php';
require_once 'function/f_login.php';
require_once 'function/f_asm_citizendata.php';
require_once 'function/f_calon.php';
require_once 'function/f_calon_tkt3.php';
require_once 'function/f_calon_spm.php';
require_once 'function/f_calon_stpm.php';
require_once 'function/f_calon_stpm_pngk.php';
require_once 'function/f_calon_matrikulasi.php';
require_once 'function/f_calon_matrikulasi_pelajaran.php';
require_once 'function/f_calon_ipt.php';

$api_name = 'api_asm_citizendata';
$is_transaction = false;
$form_data = array('success' => false, 'result' => '', 'error' => '', 'errmsg' => '');
$result = '';

$constant = new Class_constant();
$fn_general = new Class_general();
$fn_login = new Class_login();
$fn_asmCitizendata = new Class_asm_citizendata();
$fn_calon = new Class_calon();

try {
    $fn_general->__set('constant', $constant);
    $fn_login->__set('constant', $constant);
    $fn_login->__set('fn_general', $fn_general);
    $fn_asmCitizendata->__set('constant', $constant);
    $fn_asmCitizendata->__set('fn_general', $fn_general);
    $fn_calon->__set('constant', $constant);
    $fn_calon->__set('fn_general', $fn_general);

    Class_db::getInstance()->db_connect();
    $request_method = $_SERVER['REQUEST_METHOD'];
    $fn_general->log_debug('API', $api_name, __LINE__, 'Request method = ' . $request_method);

    $headers = apache_request_headers();
    if (!isset($headers['Authorization'])) {
        throw new Exception('[' . __LINE__ . '] - Parameter Authorization empty');
    }
    $jwt_data = $fn_login->check_jwt($headers['Authorization']);

    if ('GET' === $request_method) {
        $t = filter_input(INPUT_GET, 't');
        $icNo = filter_input(INPUT_GET, 'icNo');

        if (!is_null($icNo)) {
            $fn_calon->__set('icNo', $icNo);
            $result = array();
            $fn_calon->set_idPemohon();
            $idPemohon = $fn_calon->__get('idPemohon');
            if ($t === 'get_maklumat_peribadi') {
                $fn_asmCitizendata->__set('userId', $icNo);
                $result['asmCitizendata'] = $fn_asmCitizendata->get_asm_citizendata();
                $result['calon'] = $fn_calon->get_calon();
            }
            else if ($t === 'get_maklumat_alamat') {
                $fn_asmCitizendata->__set('userId', $icNo);
                $result['asmCitizendata'] = $fn_asmCitizendata->get_asm_citizendata();
                $result['alamat'] = $fn_calon->get_alamat();
            }
            else if ($t === 'get_keputusan_persekolahan') {
                $fn_calonTkt3 = new Class_calon_tkt3();
                $fn_calonTkt3->__set('constant', $constant);
                $fn_calonTkt3->__set('fn_general', $fn_general);
                $fn_calonTkt3->__set('idPemohon', $idPemohon);
                $result['pmr'] = $fn_calonTkt3->get_calon_tkt3_list();
                $fn_calonSpm = new Class_calon_spm();
                $fn_calonSpm->__set('constant', $constant);
                $fn_calonSpm->__set('fn_general', $fn_general);
                $fn_calonSpm->__set('idPemohon', $idPemohon);
                $result['spm'] = $fn_calonSpm->get_calon_spm_list();
            }
            else if ($t === 'get_stpm_stam_matrikulasi') {
                $fn_calonStpm = new Class_calon_stpm();
                $fn_calonStpm->__set('constant', $constant);
                $fn_calonStpm->__set('fn_general', $fn_general);
                $fn_calonStpm->__set('idPemohon', $idPemohon);
                $result['stpm1'] = $fn_calonStpm->get_calon_stpm_list('1');
                $result['stpm2'] = $fn_calonStpm->get_calon_stpm_list('2');
                $fn_calonStpmPngk = new Class_calon_stpm_pngk();
                $fn_calonStpmPngk->__set('constant', $constant);
                $fn_calonStpmPngk->__set('fn_general', $fn_general);
                $fn_calonStpmPngk->__set('idPemohon', $idPemohon);
                $result['stpm1Pngk'] = $fn_calonStpmPngk->get_calon_stpm_pngk('1');
                $result['stpm2Pngk'] = $fn_calonStpmPngk->get_calon_stpm_pngk('2');
                $fn_calonMatrikulasi = new Class_calon_matrikulasi();
                $fn_calonMatrikulasi->__set('constant', $constant);
                $fn_calonMatrikulasi->__set('fn_general', $fn_general);
                $fn_calonMatrikulasi->__set('idPemohon', $idPemohon);
                $result['matrikulasi'] = $fn_calonMatrikulasi->get_calon_matrikulasi();
                $fn_calonMatrikulasiMatapelajaran = new Class_calon_matrikulasi_matapelajaran();
                $fn_calonMatrikulasiMatapelajaran->__set('constant', $constant);
                $fn_calonMatrikulasiMatapelajaran->__set('fn_general', $fn_general);
                $fn_calonMatrikulasiMatapelajaran->__set('idPemohon', $idPemohon);
                $result['matrikulasiMatapelajaran'] = $fn_calonMatrikulasiMatapelajaran->get_calon_matrikulasi_matapelajaran_list();
            }
            else if ($t === 'get_pengajian_tinggi') {
                $fn_calonIpt = new Class_calon_ipt();
                $fn_calonIpt->__set('constant', $constant);
                $fn_calonIpt->__set('fn_general', $fn_general);
                $fn_calonIpt->__set('idPemohon', $idPemohon);
                $result = $fn_calonIpt->get_calon_ipt_list();
            } else {
                throw new Exception('[' . __LINE__ . '] - Parameter t empty');
            }
        } else {
            throw new Exception('[' . __LINE__ . '] - Parameter icNo empty');
        }

        $form_data['result'] = $result;
        $form_data['success'] = true;
    } else {
        throw new Exception('[' . __LINE__ . '] - Wrong Request Method');
    }
    Class_db::getInstance()->db_close();
} catch (Exception $ex) {
    if ($is_transaction) {
        Class_db::getInstance()->db_rollback();
    }
    Class_db::getInstance()->db_close();
    $form_data['error'] = substr($ex->getMessage(), strpos($ex->getMessage(), '] - ') + 4);
    if ($ex->getCode() === 31) {
        $form_data['errmsg'] = substr($ex->getMessage(), strpos($ex->getMessage(), '] - ') + 4);
    } else {
        $form_data['errmsg'] = $constant::ERR_DEFAULT;
    }
    $fn_general->log_error('API', $api_name, __LINE__, $ex->getMessage());
}

echo json_encode($form_data);