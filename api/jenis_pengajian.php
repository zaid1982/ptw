<?php

require_once 'library/constant.php';
require_once 'function/db.php';
require_once 'function/f_general.php';
require_once 'function/f_login.php';
require_once 'function/f_jenis_pengajian.php';

$api_name = 'api_jenis_pengajian';
$is_transaction = false;
$form_data = array('success' => false, 'result' => '', 'error' => '', 'errmsg' => '');
$result = '';

$constant = new Class_constant();
$fn_general = new Class_general();
$fn_login = new Class_login();
$fn_jenisPengajian = new Class_jenis_pengajian();

try {
    $fn_general->__set('constant', $constant);
    $fn_login->__set('constant', $constant);
    $fn_login->__set('fn_general', $fn_general);
    $fn_jenisPengajian->__set('constant', $constant);
    $fn_jenisPengajian->__set('fn_general', $fn_general);

    Class_db::getInstance()->db_connect();
    $request_method = $_SERVER['REQUEST_METHOD'];
    $fn_general->log_debug('API', $api_name, __LINE__, 'Request method = ' . $request_method);

    $headers = apache_request_headers();
    if (!isset($headers['Authorization'])) {
        throw new Exception('[' . __LINE__ . '] - Parameter Authorization empty');
    }
    $jwt_data = $fn_login->check_jwt($headers['Authorization']);

    if ('GET' === $request_method) {
        $jenisPengajianId = filter_input(INPUT_GET, 'jenisPengajianId');

        if (!is_null($jenisPengajianId)) {
            $fn_jenisPengajian->__set('jenisPengajianId', $jenisPengajianId);
            $result = $fn_jenisPengajian->get_jenis_pengajian();
        } else {
            $result = $fn_jenisPengajian->get_jenis_pengajian_list();
        }

        $form_data['result'] = $result;
        $form_data['success'] = true;
    } else if ('POST' === $request_method) {
        Class_db::getInstance()->db_beginTransaction();
        $is_transaction = true;

        $kod = filter_input(INPUT_POST, 'kod');
        $diskripsi = filter_input(INPUT_POST, 'diskripsi');
        $sahYt = filter_input(INPUT_POST, 'sahYt');

        $params = array(
            'kod' => $kod,
            'diskripsi' => $diskripsi,
            'sahYt' => $sahYt
        );

        $fn_jenisPengajian->__set('userId', $jwt_data->userId);
        $result = $fn_jenisPengajian->add_jenis_pengajian($params);
        $fn_general->updateVersion(29);
        $fn_general->save_audit(25, $jwt_data->userId, 'Kod = ' . $kod);
        $form_data['errmsg'] = $constant::SUC_DATA_ADD;

        Class_db::getInstance()->db_commit();
        $form_data['result'] = $result;
        $form_data['success'] = true;
    } else if ('PUT' === $request_method) {
        $jenisPengajianId = filter_input(INPUT_GET, 'jenisPengajianId');
        $put_data = file_get_contents("php://input");
        parse_str($put_data, $put_vars);

        if (empty($jenisPengajianId)) {
            throw new Exception('[' . __LINE__ . '] - Parameter jenisPengajianId empty');
        }

        Class_db::getInstance()->db_beginTransaction();
        $is_transaction = true;

        $fn_jenisPengajian->__set('jenisPengajianId', $jenisPengajianId);
        $fn_jenisPengajian->update_jenis_pengajian($put_vars);
        $fn_general->updateVersion(29);
        $fn_general->save_audit(26, $jwt_data->userId, 'Kod = ' . $put_vars['kod']);
        $form_data['errmsg'] = $constant::SUC_DATA_UPDATE;

        Class_db::getInstance()->db_commit();
        Class_db::getInstance()->db_close();
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