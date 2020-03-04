<?php

require_once 'library/constant.php';
require_once 'function/db.php';
require_once 'function/f_general.php';
require_once 'function/f_login.php';
require_once 'function/f_skim.php';

$api_name = 'api_skim';
$is_transaction = false;
$form_data = array('success' => false, 'result' => '', 'error' => '', 'errmsg' => '');
$result = '';

$constant = new Class_constant();
$fn_general = new Class_general();
$fn_login = new Class_login();
$fn_skim = new Class_skim();

try {
    $fn_general->__set('constant', $constant);
    $fn_login->__set('constant', $constant);
    $fn_login->__set('fn_general', $fn_general);
    $fn_skim->__set('constant', $constant);
    $fn_skim->__set('fn_general', $fn_general);

    Class_db::getInstance()->db_connect();
    $request_method = $_SERVER['REQUEST_METHOD'];
    $fn_general->log_debug('API', $api_name, __LINE__, 'Request method = ' . $request_method);

    $headers = apache_request_headers();
    if (!isset($headers['Authorization'])) {
        throw new Exception('[' . __LINE__ . '] - Parameter Authorization empty');
    }
    $jwt_data = $fn_login->check_jwt($headers['Authorization']);

    if ('GET' === $request_method) {
        $skimId = filter_input(INPUT_GET, 'skimId');

        if (!is_null($skimId)) {
            $fn_skim->__set('skimId', $skimId);
            $result = $fn_skim->get_skim();
        } else {
            $result = $fn_skim->get_skim_list();
        }

        $form_data['result'] = $result;
        $form_data['success'] = true;
    } else if ('POST' === $request_method) {
        Class_db::getInstance()->db_beginTransaction();
        $is_transaction = true;

        $kod = filter_input(INPUT_POST, 'kod');
        $diskripsi = filter_input(INPUT_POST, 'diskripsi');
        $gghKod = filter_input(INPUT_POST, 'gghKod');
        $gunasama = filter_input(INPUT_POST, 'gunasama');
        $jenisSkim = filter_input(INPUT_POST, 'jenisSkim');
        $kumpPkhidmatJkk = filter_input(INPUT_POST, 'kumpPkhidmatJkk');
        $skimPkhidmat = filter_input(INPUT_POST, 'skimPkhidmat');
        $gghSsm = filter_input(INPUT_POST, 'gghSsm');
        $kumpPkhidmatSbpa = filter_input(INPUT_POST, 'kumpPkhidmatSbpa');
        $oldKod = filter_input(INPUT_POST, 'oldKod');
        $oldName = filter_input(INPUT_POST, 'oldName');
        $oldGred = filter_input(INPUT_POST, 'oldGred');
        $kumpPkhidmatSsb = filter_input(INPUT_POST, 'kumpPkhidmatSsb');
        $ujianWajib1 = filter_input(INPUT_POST, 'ujianWajib1');
        $ujianWajib2 = filter_input(INPUT_POST, 'ujianWajib2');
        $ujianWajib3 = filter_input(INPUT_POST, 'ujianWajib3');
        $ujianWajib4 = filter_input(INPUT_POST, 'ujianWajib4');
        $ujianWajib5 = filter_input(INPUT_POST, 'ujianWajib5');
        $ujianYt = filter_input(INPUT_POST, 'ujianYt');
        $kpKod = filter_input(INPUT_POST, 'kpKod');
        $noPemerolehan = filter_input(INPUT_POST, 'noPemerolehan');
        $gabYt = filter_input(INPUT_POST, 'gabYt');
        $sahYt = filter_input(INPUT_POST, 'sahYt');

        $params = array(
            'kod' => $kod,
            'diskripsi' => $diskripsi,
            'gghKod' => $gghKod,
            'gunasama' => $gunasama,
            'jenisSkim' => $jenisSkim,
            'kumpPkhidmatJkk' => $kumpPkhidmatJkk,
            'skimPkhidmat' => $skimPkhidmat,
            'gghSsm' => $gghSsm,
            'kumpPkhidmatSbpa' => $kumpPkhidmatSbpa,
            'oldKod' => $oldKod,
            'oldName' => $oldName,
            'oldGred' => $oldGred,
            'kumpPkhidmatSsb' => $kumpPkhidmatSsb,
            'ujianWajib1' => $ujianWajib1,
            'ujianWajib2' => $ujianWajib2,
            'ujianWajib3' => $ujianWajib3,
            'ujianWajib4' => $ujianWajib4,
            'ujianWajib5' => $ujianWajib5,
            'ujianYt' => $ujianYt,
            'kpKod' => $kpKod,
            'noPemerolehan' => $noPemerolehan,
            'gabYt' => $gabYt,
            'sahYt' => $sahYt
        );

        $result = $fn_skim->add_skim($params);
        $fn_general->updateVersion(40);
        $fn_general->save_audit(61, $jwt_data->userId, 'Kod = ' . $kod);
        $form_data['errmsg'] = $constant::SUC_DATA_ADD;

        Class_db::getInstance()->db_commit();
        $form_data['result'] = $result;
        $form_data['success'] = true;
    } else if ('PUT' === $request_method) {
        $skimId = filter_input(INPUT_GET, 'skimId');
        $put_data = file_get_contents("php://input");
        parse_str($put_data, $put_vars);

        if (empty($skimId)) {
            throw new Exception('[' . __LINE__ . '] - Parameter skimId empty');
        }

        Class_db::getInstance()->db_beginTransaction();
        $is_transaction = true;

        $fn_skim->__set('skimId', $skimId);
        $fn_skim->update_skim($put_vars);
        $fn_general->updateVersion(40);
        $fn_general->save_audit(62, $jwt_data->userId, 'Kod = ' . $put_vars['kod']);
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