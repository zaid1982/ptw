<?php

require_once 'library/constant.php';
require_once 'function/db.php';
require_once 'function/f_general.php';
require_once 'function/f_login.php';
require_once 'function/f_jenis_perkhidmatan.php';

$api_name = 'api_jenis_perkhidmatan';
$is_transaction = false;
$form_data = array('success' => false, 'result' => '', 'error' => '', 'errmsg' => '');
$result = '';

$constant = new Class_constant();
$fn_general = new Class_general();
$fn_login = new Class_login();
$fn_jenisPerkhidmatan = new Class_jenis_perkhidmatan();

try {
    $fn_general->__set('constant', $constant);
    $fn_login->__set('constant', $constant);
    $fn_login->__set('fn_general', $fn_general);
    $fn_jenisPerkhidmatan->__set('constant', $constant);
    $fn_jenisPerkhidmatan->__set('fn_general', $fn_general);

    Class_db::getInstance()->db_connect();
    $request_method = $_SERVER['REQUEST_METHOD'];
    $fn_general->log_debug('API', $api_name, __LINE__, 'Request method = ' . $request_method);

    $headers = apache_request_headers();
    if (!isset($headers['Authorization'])) {
        throw new Exception('[' . __LINE__ . '] - Parameter Authorization empty');
    }
    $jwt_data = $fn_login->check_jwt($headers['Authorization']);

    if ('GET' === $request_method) {
        $jenisPerkhidmatanId = filter_input(INPUT_GET, 'jenisPerkhidmatanId');

        if (!is_null($jenisPerkhidmatanId)) {
            $fn_jenisPerkhidmatan->__set('jenisPerkhidmatanId', $jenisPerkhidmatanId);
            $result = $fn_jenisPerkhidmatan->get_jenis_perkhidmatan();
        } else {
            $result = $fn_jenisPerkhidmatan->get_jenis_perkhidmatan_list();
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

        $fn_jenisPerkhidmatan->__set('userId', $jwt_data->userId);
        $result = $fn_jenisPerkhidmatan->add_jenis_perkhidmatan($params);
        $fn_general->updateVersion(31);
        $fn_general->save_audit(29, $jwt_data->userId, 'Kod = ' . $kod);
        $form_data['errmsg'] = $constant::SUC_DATA_ADD;

        Class_db::getInstance()->db_commit();
        $form_data['result'] = $result;
        $form_data['success'] = true;
    } else if ('PUT' === $request_method) {
        $jenisPerkhidmatanId = filter_input(INPUT_GET, 'jenisPerkhidmatanId');
        $put_data = file_get_contents("php://input");
        parse_str($put_data, $put_vars);

        if (empty($jenisPerkhidmatanId)) {
            throw new Exception('[' . __LINE__ . '] - Parameter jenisPerkhidmatanId empty');
        }

        Class_db::getInstance()->db_beginTransaction();
        $is_transaction = true;

        $fn_jenisPerkhidmatan->__set('jenisPerkhidmatanId', $jenisPerkhidmatanId);
        $fn_jenisPerkhidmatan->update_jenis_perkhidmatan($put_vars);
        $fn_general->updateVersion(31);
        $fn_general->save_audit(30, $jwt_data->userId, 'Kod = ' . $put_vars['kod']);
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