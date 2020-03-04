<?php

require_once 'library/constant.php';
require_once 'function/db.php';
require_once 'function/f_general.php';
require_once 'function/f_login.php';
require_once 'function/f_institusi.php';

$api_name = 'api_institusi';
$is_transaction = false;
$form_data = array('success' => false, 'result' => '', 'error' => '', 'errmsg' => '');
$result = '';

$constant = new Class_constant();
$fn_general = new Class_general();
$fn_login = new Class_login();
$fn_institusi = new Class_institusi();

try {
    $fn_general->__set('constant', $constant);
    $fn_login->__set('constant', $constant);
    $fn_login->__set('fn_general', $fn_general);
    $fn_institusi->__set('constant', $constant);
    $fn_institusi->__set('fn_general', $fn_general);

    Class_db::getInstance()->db_connect();
    $request_method = $_SERVER['REQUEST_METHOD'];
    $fn_general->log_debug('API', $api_name, __LINE__, 'Request method = ' . $request_method);

    $headers = apache_request_headers();
    if (!isset($headers['Authorization'])) {
        throw new Exception('[' . __LINE__ . '] - Parameter Authorization empty');
    }
    $jwt_data = $fn_login->check_jwt($headers['Authorization']);

    if ('GET' === $request_method) {
        $institusiId = filter_input(INPUT_GET, 'institusiId');

        if (!is_null($institusiId)) {
            $fn_institusi->__set('institusiId', $institusiId);
            $result = $fn_institusi->get_institusi();
        } else {
            $result = $fn_institusi->get_institusi_list();
        }

        $form_data['result'] = $result;
        $form_data['success'] = true;
    } else if ('POST' === $request_method) {
        Class_db::getInstance()->db_beginTransaction();
        $is_transaction = true;

        $kod = filter_input(INPUT_POST, 'kod');
        $diskripsi = filter_input(INPUT_POST, 'diskripsi');
        $kategoriInstitusiId = filter_input(INPUT_POST, 'kategoriInstitusiId');
        $negara = filter_input(INPUT_POST, 'negara');
        $kategori = filter_input(INPUT_POST, 'kategori');
        $noPemerolehan = filter_input(INPUT_POST, 'noPemerolehan');
        $gabYt = filter_input(INPUT_POST, 'gabYt');
        $sahYt = filter_input(INPUT_POST, 'sahYt');

        $params = array(
            'kod' => $kod,
            'diskripsi' => $diskripsi,
            'kategoriInstitusiId' => $kategoriInstitusiId,
            'negara' => $negara,
            'kategori' => $kategori,
            'noPemerolehan' => $noPemerolehan,
            'gabYt' => $gabYt,
            'sahYt' => $sahYt
        );

        $fn_institusi->__set('userId', $jwt_data->userId);
        $result = $fn_institusi->add_institusi($params);
        $fn_general->updateVersion(27);
        $fn_general->save_audit(23, $jwt_data->userId, 'Kod = ' . $kod);
        $form_data['errmsg'] = $constant::SUC_DATA_ADD;

        Class_db::getInstance()->db_commit();
        $form_data['result'] = $result;
        $form_data['success'] = true;
    } else if ('PUT' === $request_method) {
        $institusiId = filter_input(INPUT_GET, 'institusiId');
        $put_data = file_get_contents("php://input");
        parse_str($put_data, $put_vars);

        if (empty($institusiId)) {
            throw new Exception('[' . __LINE__ . '] - Parameter institusiId empty');
        }

        Class_db::getInstance()->db_beginTransaction();
        $is_transaction = true;

        $fn_institusi->__set('institusiId', $institusiId);
        $fn_institusi->update_institusi($put_vars);
        $fn_general->updateVersion(27);
        $fn_general->save_audit(24, $jwt_data->userId, 'Kod = ' . $put_vars['kod']);
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