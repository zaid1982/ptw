<?php

require_once 'library/constant.php';
require_once 'function/db.php';
require_once 'function/f_general.php';
require_once 'function/f_login.php';
require_once 'function/f_negeri.php';

$api_name = 'api_negeri';
$is_transaction = false;
$form_data = array('success' => false, 'result' => '', 'error' => '', 'errmsg' => '');
$result = '';

$constant = new Class_constant();
$fn_general = new Class_general();
$fn_login = new Class_login();
$fn_negeri = new Class_negeri();

try {
    $fn_general->__set('constant', $constant);
    $fn_login->__set('constant', $constant);
    $fn_login->__set('fn_general', $fn_general);
    $fn_negeri->__set('constant', $constant);
    $fn_negeri->__set('fn_general', $fn_general);

    Class_db::getInstance()->db_connect();
    $request_method = $_SERVER['REQUEST_METHOD'];
    $fn_general->log_debug('API', $api_name, __LINE__, 'Request method = ' . $request_method);

    $headers = apache_request_headers();
    if (!isset($headers['Authorization'])) {
        throw new Exception('[' . __LINE__ . '] - Parameter Authorization empty');
    }
    $jwt_data = $fn_login->check_jwt($headers['Authorization']);

    if ('GET' === $request_method) {
        $kodNegeri = filter_input(INPUT_GET, 'kodNegeri');

        if (!is_null($kodNegeri)) {
            $fn_negeri->__set('kodNegeri', $kodNegeri);
            $result = $fn_negeri->get_negeri();
        } else {
            $result = $fn_negeri->get_negeri_list();
        }

        $form_data['result'] = $result;
        $form_data['success'] = true;
    } else if ('POST' === $request_method) {
        Class_db::getInstance()->db_beginTransaction();
        $is_transaction = true;

        $kodNegeri = filter_input(INPUT_POST, 'kodNegeri');
        $negeri = filter_input(INPUT_POST, 'negeri');
        $sahYt = filter_input(INPUT_POST, 'sahYt');

        $params = array(
            'kodNegeri' => $kodNegeri,
            'negeri' => $negeri,
            'sahYt' => $sahYt
        );
        $result = $fn_negeri->add_negeri($params);
        $fn_general->updateVersion(8);
        $fn_general->save_audit(41, $jwt_data->userId, 'Kod = ' . $kodNegeri);
        $form_data['errmsg'] = $constant::SUC_DATA_ADD;

        Class_db::getInstance()->db_commit();
        $form_data['result'] = $result;
        $form_data['success'] = true;
    } else if ('PUT' === $request_method) {
        $kodNegeri = filter_input(INPUT_GET, 'kodNegeri');
        $put_data = file_get_contents("php://input");
        parse_str($put_data, $put_vars);

        if (empty($kodNegeri)) {
            throw new Exception('[' . __LINE__ . '] - Parameter userId empty');
        }

        Class_db::getInstance()->db_beginTransaction();
        $is_transaction = true;

        $fn_negeri->__set('kodNegeri', $kodNegeri);
        $fn_negeri->update_negeri($put_vars);
        $fn_general->updateVersion(8);
        $fn_general->save_audit(42, $jwt_data->userId, 'Kod = ' . $kodNegeri);
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