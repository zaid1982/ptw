<?php

require_once 'library/constant.php';
require_once 'function/db.php';
require_once 'function/f_general.php';
require_once 'function/f_login.php';
require_once 'function/f_kelulusan_mref.php';

$api_name = 'api_kelulusan_mref';
$is_transaction = false;
$form_data = array('success' => false, 'result' => '', 'error' => '', 'errmsg' => '');
$result = '';

$constant = new Class_constant();
$fn_general = new Class_general();
$fn_login = new Class_login();
$fn_kelulusanMref = new Class_kelulusan_mref();

try {
    $fn_general->__set('constant', $constant);
    $fn_login->__set('constant', $constant);
    $fn_login->__set('fn_general', $fn_general);
    $fn_kelulusanMref->__set('constant', $constant);
    $fn_kelulusanMref->__set('fn_general', $fn_general);

    Class_db::getInstance()->db_connect();
    $request_method = $_SERVER['REQUEST_METHOD'];
    $fn_general->log_debug('API', $api_name, __LINE__, 'Request method = ' . $request_method);

    $headers = apache_request_headers();
    if (!isset($headers['Authorization'])) {
        throw new Exception('[' . __LINE__ . '] - Parameter Authorization empty');
    }
    $jwt_data = $fn_login->check_jwt($headers['Authorization']);

    if ('GET' === $request_method) {
        $kelulusanId = filter_input(INPUT_GET, 'kelulusanId');

        if (!is_null($kelulusanId)) {
            $fn_kelulusanMref->__set('kelulusanId', $kelulusanId);
            $result = $fn_kelulusanMref->get_kelulusan_mref();
        } else {
            $result = $fn_kelulusanMref->get_kelulusan_mref_list();
        }

        $form_data['result'] = $result;
        $form_data['success'] = true;
    } else if ('POST' === $request_method) {
        Class_db::getInstance()->db_beginTransaction();
        $is_transaction = true;

        $kod = filter_input(INPUT_POST, 'kod');
        $diskripsi = filter_input(INPUT_POST, 'diskripsi');
        $gabYt = filter_input(INPUT_POST, 'gabYt');
        $jenis = filter_input(INPUT_POST, 'jenis');
        $noPemerolehan = filter_input(INPUT_POST, 'noPemerolehan');
        $kategori = filter_input(INPUT_POST, 'kategori');
        $sahYt = filter_input(INPUT_POST, 'sahYt');

        $params = array(
            'kod' => $kod,
            'diskripsi' => $diskripsi,
            'gabYt' => $gabYt,
            'jenis' => $jenis,
            'noPemerolehan' => $noPemerolehan,
            'kategori' => $kategori,
            'sahYt' => $sahYt
        );

        $fn_kelulusanMref->__set('userId', $jwt_data->userId);
        $result = $fn_kelulusanMref->add_kelulusan_mref($params);
        $fn_general->updateVersion(19);
        $fn_general->save_audit(35, $jwt_data->userId, 'Kod = ' . $kod);
        $form_data['errmsg'] = $constant::SUC_DATA_ADD;

        Class_db::getInstance()->db_commit();
        $form_data['result'] = $result;
        $form_data['success'] = true;
    } else if ('PUT' === $request_method) {
        $kelulusanId = filter_input(INPUT_GET, 'kelulusanId');
        $put_data = file_get_contents("php://input");
        parse_str($put_data, $put_vars);

        if (empty($kelulusanId)) {
            throw new Exception('[' . __LINE__ . '] - Parameter kelulusanId empty');
        }

        Class_db::getInstance()->db_beginTransaction();
        $is_transaction = true;

        $fn_kelulusanMref->__set('kelulusanId', $kelulusanId);
        $fn_kelulusanMref->update_kelulusan_mref($put_vars);
        $fn_general->updateVersion(19);
        $fn_general->save_audit(36, $jwt_data->userId, 'Kod = ' . $put_vars['kod']);
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