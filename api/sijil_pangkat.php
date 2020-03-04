<?php

require_once 'library/constant.php';
require_once 'function/db.php';
require_once 'function/f_general.php';
require_once 'function/f_login.php';
require_once 'function/f_sijil_pangkat.php';

$api_name = 'api_sijil_pangkat';
$is_transaction = false;
$form_data = array('success' => false, 'result' => '', 'error' => '', 'errmsg' => '');
$result = '';

$constant = new Class_constant();
$fn_general = new Class_general();
$fn_login = new Class_login();
$fn_sijilPangkat = new Class_sijil_pangkat();

try {
    $fn_general->__set('constant', $constant);
    $fn_login->__set('constant', $constant);
    $fn_login->__set('fn_general', $fn_general);
    $fn_sijilPangkat->__set('constant', $constant);
    $fn_sijilPangkat->__set('fn_general', $fn_general);

    Class_db::getInstance()->db_connect();
    $request_method = $_SERVER['REQUEST_METHOD'];
    $fn_general->log_debug('API', $api_name, __LINE__, 'Request method = ' . $request_method);

    $headers = apache_request_headers();
    if (!isset($headers['Authorization'])) {
        throw new Exception('[' . __LINE__ . '] - Parameter Authorization empty');
    }
    $jwt_data = $fn_login->check_jwt($headers['Authorization']);

    if ('GET' === $request_method) {
        $sijilPangkatId = filter_input(INPUT_GET, 'sijilPangkatId');

        if (!is_null($sijilPangkatId)) {
            $fn_sijilPangkat->__set('sijilPangkatId', $sijilPangkatId);
            $result = $fn_sijilPangkat->get_sijil_pangkat();
        } else {
            $result = $fn_sijilPangkat->get_sijil_pangkat_list();
        }

        $form_data['result'] = $result;
        $form_data['success'] = true;
    } else if ('POST' === $request_method) {
        Class_db::getInstance()->db_beginTransaction();
        $is_transaction = true;

        $kod = filter_input(INPUT_POST, 'kod');
        $tkt = filter_input(INPUT_POST, 'tkt');
        $diskripsi = filter_input(INPUT_POST, 'diskripsi');
        $sahYt = filter_input(INPUT_POST, 'sahYt');

        $params = array(
            'kod' => $kod,
            'tkt' => $tkt,
            'diskripsi' => $diskripsi,
            'sahYt' => $sahYt
        );
        $result = $fn_sijilPangkat->add_sijil_pangkat($params);
        $fn_general->updateVersion(14);
        $fn_general->save_audit(59, $jwt_data->userId, 'Kod = ' . $kod);
        $form_data['errmsg'] = $constant::SUC_DATA_ADD;

        Class_db::getInstance()->db_commit();
        $form_data['result'] = $result;
        $form_data['success'] = true;
    } else if ('PUT' === $request_method) {
        $sijilPangkatId = filter_input(INPUT_GET, 'sijilPangkatId');
        $put_data = file_get_contents("php://input");
        parse_str($put_data, $put_vars);

        if (empty($sijilPangkatId)) {
            throw new Exception('[' . __LINE__ . '] - Parameter sijilPangkatId empty');
        }

        Class_db::getInstance()->db_beginTransaction();
        $is_transaction = true;

        $fn_sijilPangkat->__set('sijilPangkatId', $sijilPangkatId);
        $fn_sijilPangkat->update_sijil_pangkat($put_vars);
        $fn_general->updateVersion(14);
        $fn_general->save_audit(60, $jwt_data->userId, 'Kod = ' . $put_vars['kod']);
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