<?php

require_once 'library/constant.php';
require_once 'function/db.php';
require_once 'function/f_general.php';
require_once 'function/f_login.php';
require_once 'function/f_bekas_pol_ten.php';

$api_name = 'api_bekas_pol_ten';
$is_transaction = false;
$form_data = array('success' => false, 'result' => '', 'error' => '', 'errmsg' => '');
$result = '';

$constant = new Class_constant();
$fn_general = new Class_general();
$fn_login = new Class_login();
$fn_bekasPolTen = new Class_bekas_pol_ten();

try {
    $fn_general->__set('constant', $constant);
    $fn_login->__set('constant', $constant);
    $fn_login->__set('fn_general', $fn_general);
    $fn_bekasPolTen->__set('constant', $constant);
    $fn_bekasPolTen->__set('fn_general', $fn_general);

    Class_db::getInstance()->db_connect();
    $request_method = $_SERVER['REQUEST_METHOD'];
    $fn_general->log_debug('API', $api_name, __LINE__, 'Request method = ' . $request_method);

    $headers = apache_request_headers();
    if (!isset($headers['Authorization'])) {
        throw new Exception('[' . __LINE__ . '] - Parameter Authorization empty');
    }
    $jwt_data = $fn_login->check_jwt($headers['Authorization']);

    if ('GET' === $request_method) {
        $bekasPolTenId = filter_input(INPUT_GET, 'bekasPolTenId');

        if (!is_null($bekasPolTenId)) {
            $fn_bekasPolTen->__set('bekasPolTenId', $bekasPolTenId);
            $result = $fn_bekasPolTen->get_bekas_pol_ten();
        } else {
            $result = $fn_bekasPolTen->get_bekas_pol_ten_list();
        }

        $form_data['result'] = $result;
        $form_data['success'] = true;
    }
    else if ('POST' === $request_method) {
        Class_db::getInstance()->db_beginTransaction();
        $is_transaction = true;

        $kodBekasPolisTentera = filter_input(INPUT_POST, 'kodBekasPolisTentera');
        $kodPangkat = filter_input(INPUT_POST, 'kodPangkat');
        $diskripsi = filter_input(INPUT_POST, 'diskripsi');
        $kodLain = filter_input(INPUT_POST, 'kodLain');
        $mainInd = filter_input(INPUT_POST, 'mainInd');
        $susunanKanan = filter_input(INPUT_POST, 'susunanKanan');
        $sahYt = filter_input(INPUT_POST, 'sahYt');

        $params = array(
            'kodBekasPolisTentera'=>$kodBekasPolisTentera,
            'kodPangkat'=>$kodPangkat,
            'diskripsi'=>$diskripsi,
            'kodLain'=>$kodLain,
            'mainInd'=>$mainInd,
            'susunanKanan'=>$susunanKanan,
            'sahYt'=>$sahYt
        );
        $result = $fn_bekasPolTen->add_bekas_pol_ten($params);
        $fn_general->updateVersion(43);
        $fn_general->save_audit(78, $jwt_data->userId, 'Kod = ' . $kodBekasPolisTentera);
        $form_data['errmsg'] = $constant::SUC_DATA_ADD;

        Class_db::getInstance()->db_commit();
        $form_data['result'] = $result;
        $form_data['success'] = true;
    }
    else if ('PUT' === $request_method) {
        $bekasPolTenId = filter_input(INPUT_GET, 'bekasPolTenId');
        $put_data = file_get_contents("php://input");
        parse_str($put_data, $put_vars);

        if (empty($bekasPolTenId)) {
            throw new Exception('[' . __LINE__ . '] - Parameter bekasPolTenId empty');
        }

        Class_db::getInstance()->db_beginTransaction();
        $is_transaction = true;

        $fn_bekasPolTen->__set('bekasPolTenId', $bekasPolTenId);
        $fn_bekasPolTen->update_bekas_pol_ten($put_vars);
        $fn_general->updateVersion(43);
        $fn_general->save_audit(79, $jwt_data->userId, 'Kod = ' . $put_vars['kodBekasPolisTentera']);
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