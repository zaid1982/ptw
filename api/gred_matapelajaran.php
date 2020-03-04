<?php

require_once 'library/constant.php';
require_once 'function/db.php';
require_once 'function/f_general.php';
require_once 'function/f_login.php';
require_once 'function/f_gred_matapelajaran.php';

$api_name = 'api_gred_matapelajaran';
$is_transaction = false;
$form_data = array('success' => false, 'result' => '', 'error' => '', 'errmsg' => '');
$result = '';

$constant = new Class_constant();
$fn_general = new Class_general();
$fn_login = new Class_login();
$fn_gred_matapelajaran = new Class_gred_matapelajaran();

try {
    $fn_general->__set('constant', $constant);
    $fn_login->__set('constant', $constant);
    $fn_login->__set('fn_general', $fn_general);
    $fn_gred_matapelajaran->__set('constant', $constant);
    $fn_gred_matapelajaran->__set('fn_general', $fn_general);

    Class_db::getInstance()->db_connect();
    $request_method = $_SERVER['REQUEST_METHOD'];
    $fn_general->log_debug('API', $api_name, __LINE__, 'Request method = ' . $request_method);

    $headers = apache_request_headers();
    if (!isset($headers['Authorization'])) {
        throw new Exception('[' . __LINE__ . '] - Parameter Authorization empty');
    }
    $jwt_data = $fn_login->check_jwt($headers['Authorization']);

    if ('GET' === $request_method) {
        $gredId = filter_input(INPUT_GET, 'gredId');

        if (!is_null($gredId)) {
            $fn_gred_matapelajaran->__set('gredId', $gredId);
            $result = $fn_gred_matapelajaran->get_gred_matapelajaran();
        } else {
            $result = $fn_gred_matapelajaran->get_gred_matapelajaran_list();
        }

        $form_data['result'] = $result;
        $form_data['success'] = true;
    } else if ('POST' === $request_method) {
        Class_db::getInstance()->db_beginTransaction();
        $is_transaction = true;

        $gred = filter_input(INPUT_POST, 'gred');
        $jenis = filter_input(INPUT_POST, 'jenis');
        $tkt = filter_input(INPUT_POST, 'tkt');
        $namaPeperiksaan = filter_input(INPUT_POST, 'namaPeperiksaan');
        $susunan = filter_input(INPUT_POST, 'susunan');
        $sahYt = filter_input(INPUT_POST, 'sahYt');

        $params = array(
            'gred' => $gred,
            'jenis' => $jenis,
            'tkt' => $tkt,
            'namaPeperiksaan' => $namaPeperiksaan,
            'susunan' => $susunan,
            'sahYt' => $sahYt
        );

        $fn_gred_matapelajaran->__set('userId', $jwt_data->userId);
        $result = $fn_gred_matapelajaran->add_gred_matapelajaran($params);
        $fn_general->updateVersion(12);
        $fn_general->save_audit(21, $jwt_data->userId, 'Kod = ' . $gred);
        $form_data['errmsg'] = $constant::SUC_DATA_ADD;

        Class_db::getInstance()->db_commit();
        $form_data['result'] = $result;
        $form_data['success'] = true;
    } else if ('PUT' === $request_method) {
        $gredId = filter_input(INPUT_GET, 'gredId');
        $put_data = file_get_contents("php://input");
        parse_str($put_data, $put_vars);

        if (empty($gredId)) {
            throw new Exception('[' . __LINE__ . '] - Parameter gredId empty');
        }

        Class_db::getInstance()->db_beginTransaction();
        $is_transaction = true;

        $fn_gred_matapelajaran->__set('gredId', $gredId);
        $fn_gred_matapelajaran->update_gred_matapelajaran($put_vars);
        $fn_general->updateVersion(12);
        $fn_general->save_audit(22, $jwt_data->userId, 'Kod = ' . $put_vars['gred']);
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