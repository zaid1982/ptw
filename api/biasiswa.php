<?php

require_once 'library/constant.php';
require_once 'function/db.php';
require_once 'function/f_general.php';
require_once 'function/f_login.php';
require_once 'function/f_biasiswa.php';

$api_name = 'api_biasiswa';
$is_transaction = false;
$form_data = array('success' => false, 'result' => '', 'error' => '', 'errmsg' => '');
$result = '';

$constant = new Class_constant();
$fn_general = new Class_general();
$fn_login = new Class_login();
$fn_biasiswa = new Class_biasiswa();

try {
    $fn_general->__set('constant', $constant);
    $fn_login->__set('constant', $constant);
    $fn_login->__set('fn_general', $fn_general);
    $fn_biasiswa->__set('constant', $constant);
    $fn_biasiswa->__set('fn_general', $fn_general);

    Class_db::getInstance()->db_connect();
    $request_method = $_SERVER['REQUEST_METHOD'];
    $fn_general->log_debug('API', $api_name, __LINE__, 'Request method = ' . $request_method);

    $headers = apache_request_headers();
    if (!isset($headers['Authorization'])) {
        throw new Exception('[' . __LINE__ . '] - Parameter Authorization empty');
    }
    $jwt_data = $fn_login->check_jwt($headers['Authorization']);

    if ('GET' === $request_method) {
        $biasiswaId = filter_input(INPUT_GET, 'biasiswaId');

        if (!is_null($biasiswaId)) {
            $fn_biasiswa->__set('biasiswaId', $biasiswaId);
            $result = $fn_biasiswa->get_biasiswa();
        } else {
            $result = $fn_biasiswa->get_biasiswa_list();
        }

        $form_data['result'] = $result;
        $form_data['success'] = true;
    }
    else if ('POST' === $request_method) {
        Class_db::getInstance()->db_beginTransaction();
        $is_transaction = true;

        $kodBiasiswa = filter_input(INPUT_POST, 'kodBiasiswa');
        $biasiswa = filter_input(INPUT_POST, 'biasiswa');
        $sahYt = filter_input(INPUT_POST, 'sahYt');

        $params = array(
            'kodBiasiswa'=>$kodBiasiswa,
            'biasiswa'=>$biasiswa,
            'sahYt'=>$sahYt
        );
        $result = $fn_biasiswa->add_biasiswa($params);
        $fn_general->updateVersion(24);
        $fn_general->save_audit(17, $jwt_data->userId, 'Kod = ' . $kodBiasiswa);
        $form_data['errmsg'] = $constant::SUC_DATA_ADD;

        Class_db::getInstance()->db_commit();
        $form_data['result'] = $result;
        $form_data['success'] = true;
    }
    else if ('PUT' === $request_method) {
        $biasiswaId = filter_input(INPUT_GET, 'biasiswaId');
        $put_data = file_get_contents("php://input");
        parse_str($put_data, $put_vars);

        if (empty($biasiswaId)) {
            throw new Exception('[' . __LINE__ . '] - Parameter biasiswaId empty');
        }

        Class_db::getInstance()->db_beginTransaction();
        $is_transaction = true;

        $fn_biasiswa->__set('biasiswaId', $biasiswaId);
        $fn_biasiswa->update_biasiswa($put_vars);
        $fn_general->updateVersion(24);
        $fn_general->save_audit(18, $jwt_data->userId, 'Kod = ' . $put_vars['kodBiasiswa']);
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