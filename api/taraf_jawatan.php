<?php

require_once 'library/constant.php';
require_once 'function/db.php';
require_once 'function/f_general.php';
require_once 'function/f_login.php';
require_once 'function/f_taraf_jawatan.php';

$api_name = 'api_taraf_jawatan';
$is_transaction = false;
$form_data = array('success' => false, 'result' => '', 'error' => '', 'errmsg' => '');
$result = '';

$constant = new Class_constant();
$fn_general = new Class_general();
$fn_login = new Class_login();
$fn_tarafJawatan = new Class_taraf_jawatan();

try {
    $fn_general->__set('constant', $constant);
    $fn_login->__set('constant', $constant);
    $fn_login->__set('fn_general', $fn_general);
    $fn_tarafJawatan->__set('constant', $constant);
    $fn_tarafJawatan->__set('fn_general', $fn_general);

    Class_db::getInstance()->db_connect();
    $request_method = $_SERVER['REQUEST_METHOD'];
    $fn_general->log_debug('API', $api_name, __LINE__, 'Request method = ' . $request_method);

    $headers = apache_request_headers();
    if (!isset($headers['Authorization'])) {
        throw new Exception('[' . __LINE__ . '] - Parameter Authorization empty');
    }
    $jwt_data = $fn_login->check_jwt($headers['Authorization']);

    if ('GET' === $request_method) {
        $tarafJawatanId = filter_input(INPUT_GET, 'tarafJawatanId');

        if (!is_null($tarafJawatanId)) {
            $fn_tarafJawatan->__set('tarafJawatanId', $tarafJawatanId);
            $result = $fn_tarafJawatan->get_taraf_jawatan();
        } else {
            $result = $fn_tarafJawatan->get_taraf_jawatan_list();
        }

        $form_data['result'] = $result;
        $form_data['success'] = true;
    } else if ('POST' === $request_method) {
        Class_db::getInstance()->db_beginTransaction();
        $is_transaction = true;

        $kod = filter_input(INPUT_POST, 'kod');
        $diskripsi = filter_input(INPUT_POST, 'diskripsi');
        $kategori = filter_input(INPUT_POST, 'kategori');
        $jantina = filter_input(INPUT_POST, 'jantina');
        $nilai = filter_input(INPUT_POST, 'nilai');
        $sahYt = filter_input(INPUT_POST, 'sahYt');

        $params = array(
            'kod' => $kod,
            'diskripsi' => $diskripsi,
            'kategori' => $kategori,
            'jantina' => $jantina,
            'nilai' => $nilai,
            'sahYt' => $sahYt
        );

        $fn_tarafJawatan->__set('userId', $jwt_data->userId);
        $result = $fn_tarafJawatan->add_taraf_jawatan($params);
        $fn_general->updateVersion(36);
        $fn_general->save_audit(67, $jwt_data->userId, 'Kod = ' . $kod);
        $form_data['errmsg'] = $constant::SUC_DATA_ADD;

        Class_db::getInstance()->db_commit();
        $form_data['result'] = $result;
        $form_data['success'] = true;
    } else if ('PUT' === $request_method) {
        $tarafJawatanId = filter_input(INPUT_GET, 'tarafJawatanId');
        $put_data = file_get_contents("php://input");
        parse_str($put_data, $put_vars);

        if (empty($tarafJawatanId)) {
            throw new Exception('[' . __LINE__ . '] - Parameter tarafJawatanId empty');
        }

        Class_db::getInstance()->db_beginTransaction();
        $is_transaction = true;

        $fn_tarafJawatan->__set('tarafJawatanId', $tarafJawatanId);
        $fn_tarafJawatan->update_taraf_jawatan($put_vars);
        $fn_general->updateVersion(36);
        $fn_general->save_audit(68, $jwt_data->userId, 'Kod = ' . $put_vars['kod']);
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