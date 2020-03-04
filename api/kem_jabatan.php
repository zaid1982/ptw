<?php

require_once 'library/constant.php';
require_once 'function/db.php';
require_once 'function/f_general.php';
require_once 'function/f_login.php';
require_once 'function/f_kem_jabatan.php';

$api_name = 'api_kem_jabatan';
$is_transaction = false;
$form_data = array('success' => false, 'result' => '', 'error' => '', 'errmsg' => '');
$result = '';

$constant = new Class_constant();
$fn_general = new Class_general();
$fn_login = new Class_login();
$fn_kemJabatan = new Class_kem_jabatan();

try {
    $fn_general->__set('constant', $constant);
    $fn_login->__set('constant', $constant);
    $fn_login->__set('fn_general', $fn_general);
    $fn_kemJabatan->__set('constant', $constant);
    $fn_kemJabatan->__set('fn_general', $fn_general);

    Class_db::getInstance()->db_connect();
    $request_method = $_SERVER['REQUEST_METHOD'];
    $fn_general->log_debug('API', $api_name, __LINE__, 'Request method = ' . $request_method);

    $headers = apache_request_headers();
    if (!isset($headers['Authorization'])) {
        throw new Exception('[' . __LINE__ . ') - Parameter Authorization empty');
    }
    $jwt_data = $fn_login->check_jwt($headers['Authorization']);

    if ('GET' === $request_method) {
        $kemJabatanId = filter_input(INPUT_GET, 'kemJabatanId');

        if (!is_null($kemJabatanId)) {
            $fn_kemJabatan->__set('kemJabatanId', $kemJabatanId);
            $result = $fn_kemJabatan->get_kem_jabatan();
        } else {
            $result = $fn_kemJabatan->get_kem_jabatan_list();
        }

        $form_data['result'] = $result;
        $form_data['success'] = true;
    } else if ('POST' === $request_method) {
        Class_db::getInstance()->db_beginTransaction();
        $is_transaction = true;

        $kod = filter_input(INPUT_POST, 'kod');
        $diskripsi = filter_input(INPUT_POST, 'diskripsi');
        $alamat1 = filter_input(INPUT_POST, 'alamat1');
        $alamat2 = filter_input(INPUT_POST, 'alamat2');
        $alamat3 = filter_input(INPUT_POST, 'alamat3');
        $gelaranKetua = filter_input(INPUT_POST, 'gelaranKetua');
        $poskod = filter_input(INPUT_POST, 'poskod');
        $bandar = filter_input(INPUT_POST, 'bandar');
        $kemKod = filter_input(INPUT_POST, 'kemKod');
        $diskripsi2 = filter_input(INPUT_POST, 'diskripsi2');
        $diskripsi3 = filter_input(INPUT_POST, 'diskripsi3');
        $emel = filter_input(INPUT_POST, 'emel');
        $noTel = filter_input(INPUT_POST, 'noTel');
        $unitUrusan = filter_input(INPUT_POST, 'unitUrusan');
        $noPemerolehan = filter_input(INPUT_POST, 'noPemerolehan');
        $gabYt = filter_input(INPUT_POST, 'gabYt');
        $sahYt = filter_input(INPUT_POST, 'sahYt');

        $params = array(
            'kod' => $kod,
            'diskripsi' => $diskripsi,
            'alamat1'=> $alamat1,
            'alamat2'=> $alamat2,
            'alamat3'=> $alamat3,
            'gelaranKetua'=> $gelaranKetua,
            'poskod'=> $poskod,
            'bandar'=> $bandar,
            'kemKod'=> $kemKod,
            'diskripsi2'=> $diskripsi2,
            'diskripsi3'=> $diskripsi3,
            'emel'=> $emel,
            'noTel'=> $noTel,
            'unitUrusan'=> $unitUrusan,
            'noPemerolehan' => $noPemerolehan,
            'gabYt' => $gabYt,
            'sahYt' => $sahYt
        );

        $fn_kemJabatan->__set('userId', $jwt_data->userId);
        $result = $fn_kemJabatan->add_kem_jabatan($params);
        $fn_general->updateVersion(45);
        $fn_general->save_audit(82, $jwt_data->userId, 'Kod = ' . $kod);
        $form_data['errmsg'] = $constant::SUC_DATA_ADD;

        Class_db::getInstance()->db_commit();
        $form_data['result'] = $result;
        $form_data['success'] = true;
    } else if ('PUT' === $request_method) {
        $kemJabatanId = filter_input(INPUT_GET, 'kemJabatanId');
        $put_data = file_get_contents("php://input");
        parse_str($put_data, $put_vars);

        if (empty($kemJabatanId)) {
            throw new Exception('[' . __LINE__ . ') - Parameter kemJabatanId empty');
        }

        Class_db::getInstance()->db_beginTransaction();
        $is_transaction = true;

        $fn_kemJabatan->__set('kemJabatanId', $kemJabatanId);
        $fn_kemJabatan->update_kem_jabatan($put_vars);
        $fn_general->updateVersion(45);
        $fn_general->save_audit(83, $jwt_data->userId, 'Kod = ' . $put_vars['kod']);
        $form_data['errmsg'] = $constant::SUC_DATA_UPDATE;

        Class_db::getInstance()->db_commit();
        Class_db::getInstance()->db_close();
        $form_data['result'] = $result;
        $form_data['success'] = true;
    } else {
        throw new Exception('[' . __LINE__ . ') - Wrong Request Method');
    }
    Class_db::getInstance()->db_close();
} catch (Exception $ex) {
    if ($is_transaction) {
        Class_db::getInstance()->db_rollback();
    }
    Class_db::getInstance()->db_close();
    $form_data['error'] = substr($ex->getMessage(), strpos($ex->getMessage(), ') - ') + 4);
    if ($ex->getCode() === 31) {
        $form_data['errmsg'] = substr($ex->getMessage(), strpos($ex->getMessage(), ') - ') + 4);
    } else {
        $form_data['errmsg'] = $constant::ERR_DEFAULT;
    }
    $fn_general->log_error('API', $api_name, __LINE__, $ex->getMessage());
}

echo json_encode($form_data);