<?php

require_once 'library/constant.php';
require_once 'function/db.php';
require_once 'function/f_general.php';
require_once 'function/f_login.php';
require_once 'function/f_skim_sah.php';

$api_name = 'api_skim_sah';
$is_transaction = false;
$form_data = array('success' => false, 'result' => '', 'error' => '', 'errmsg' => '');
$result = '';

$constant = new Class_constant();
$fn_general = new Class_general();
$fn_login = new Class_login();
$fn_skimSah = new Class_skim_sah();

try {
    $fn_general->__set('constant', $constant);
    $fn_login->__set('constant', $constant);
    $fn_login->__set('fn_general', $fn_general);
    $fn_skimSah->__set('constant', $constant);
    $fn_skimSah->__set('fn_general', $fn_general);

    Class_db::getInstance()->db_connect();
    $request_method = $_SERVER['REQUEST_METHOD'];
    $fn_general->log_debug('API', $api_name, __LINE__, 'Request method = ' . $request_method);

    $headers = apache_request_headers();
    if (!isset($headers['Authorization'])) {
        throw new Exception('[' . __LINE__ . '] - Parameter Authorization empty');
    }
    $jwt_data = $fn_login->check_jwt($headers['Authorization']);

    if ('GET' === $request_method) {
        $skimSahId = filter_input(INPUT_GET, 'skimSahId');

        if (!is_null($skimSahId)) {
            $fn_skimSah->__set('skimSahId', $skimSahId);
            $result = $fn_skimSah->get_skim_sah();
        } else {
            $result = $fn_skimSah->get_skim_sah_list();
        }

        $form_data['result'] = $result;
        $form_data['success'] = true;
    } else if ('POST' === $request_method) {
        Class_db::getInstance()->db_beginTransaction();
        $is_transaction = true;

        $kod = filter_input(INPUT_POST, 'kod');
        $diskripsi = filter_input(INPUT_POST, 'diskripsi');
        $kumpPkhidmatJkk = filter_input(INPUT_POST, 'kumpPkhidmatJkk');
        $agensi = filter_input(INPUT_POST, 'agensi');
        $bakatYt = filter_input(INPUT_POST, 'bakatYt');
        $sahYt = filter_input(INPUT_POST, 'sahYt');

        $params = array(
            'kod' => $kod,
            'diskripsi' => $diskripsi,
            'kumpPkhidmatJkk' => $kumpPkhidmatJkk,
            'agensi' => $agensi,
            'bakatYt' => $bakatYt,
            'sahYt' => $sahYt
        );

        $result = $fn_skimSah->add_skim_sah($params);
        $fn_general->updateVersion(39);
        $fn_general->save_audit(63, $jwt_data->userId, 'Kod = ' . $kod);
        $form_data['errmsg'] = $constant::SUC_DATA_ADD;

        Class_db::getInstance()->db_commit();
        $form_data['result'] = $result;
        $form_data['success'] = true;
    } else if ('PUT' === $request_method) {
        $skimSahId = filter_input(INPUT_GET, 'skimSahId');
        $put_data = file_get_contents("php://input");
        parse_str($put_data, $put_vars);

        if (empty($skimSahId)) {
            throw new Exception('[' . __LINE__ . '] - Parameter skimSahId empty');
        }

        Class_db::getInstance()->db_beginTransaction();
        $is_transaction = true;

        $fn_skimSah->__set('skimSahId', $skimSahId);
        $fn_skimSah->update_skim_sah($put_vars);
        $fn_general->updateVersion(39);
        $fn_general->save_audit(64, $jwt_data->userId, 'Kod = ' . $put_vars['kod']);
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