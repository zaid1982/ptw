<?php

require_once 'library/constant.php';
require_once 'function/db.php';
require_once 'function/f_general.php';
require_once 'function/f_login.php';
require_once 'function/f_keturunan.php';

$api_name = 'api_keturunan';
$is_transaction = false;
$form_data = array('success' => false, 'result' => '', 'error' => '', 'errmsg' => '');
$result = '';

$constant = new Class_constant();
$fn_general = new Class_general();
$fn_login = new Class_login();
$fn_keturunan = new Class_keturunan();

try {
    $fn_general->__set('constant', $constant);
    $fn_login->__set('constant', $constant);
    $fn_login->__set('fn_general', $fn_general);
    $fn_keturunan->__set('constant', $constant);
    $fn_keturunan->__set('fn_general', $fn_general);

    Class_db::getInstance()->db_connect();
    $request_method = $_SERVER['REQUEST_METHOD'];
    $fn_general->log_debug('API', $api_name, __LINE__, 'Request method = ' . $request_method);

    $headers = apache_request_headers();
    if (!isset($headers['Authorization'])) {
        throw new Exception('[' . __LINE__ . '] - Parameter Authorization empty');
    }
    $jwt_data = $fn_login->check_jwt($headers['Authorization']);

    if ('GET' === $request_method) {
        $kodKeturunan = filter_input(INPUT_GET, 'kodKeturunan');

        if (!is_null($kodKeturunan)) {
            $fn_keturunan->__set('kodKeturunan', $kodKeturunan);
            $result = $fn_keturunan->get_keturunan();
        } else {
            $result = $fn_keturunan->get_keturunan_list();
        }

        $form_data['result'] = $result;
        $form_data['success'] = true;
    }
    else if ('POST' === $request_method) {
        Class_db::getInstance()->db_beginTransaction();
        $is_transaction = true;

        $kodKeturunan = filter_input(INPUT_POST, 'kodKeturunan');
        $keturunan = filter_input(INPUT_POST, 'keturunan');
        $sahYt = filter_input(INPUT_POST, 'sahYt');

        $params = array(
            'kodKeturunan'=>$kodKeturunan,
            'keturunan'=>$keturunan,
            'sahYt'=>$sahYt
        );
        $result = $fn_keturunan->add_keturunan($params);
        $fn_general->updateVersion(7);
        $fn_general->save_audit(73, $jwt_data->userId, 'Kod = ' . $kodKeturunan);
        $form_data['errmsg'] = $constant::SUC_DATA_ADD;

        Class_db::getInstance()->db_commit();
        $form_data['result'] = $result;
        $form_data['success'] = true;
    }
    else if ('PUT' === $request_method) {
        $kodKeturunan = filter_input(INPUT_GET, 'kodKeturunan');
        $put_data = file_get_contents("php://input");
        parse_str($put_data, $put_vars);

        if (empty($kodKeturunan)) {
            throw new Exception('[' . __LINE__ . '] - Parameter userId empty');
        }

        Class_db::getInstance()->db_beginTransaction();
        $is_transaction = true;

        $fn_keturunan->__set('kodKeturunan', $kodKeturunan);
        $fn_keturunan->update_keturunan($put_vars);
        $fn_general->updateVersion(7);
        $fn_general->save_audit(74, $jwt_data->userId, 'Kod = ' . $put_vars['kodKeturunan']);
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