<?php

require_once 'library/constant.php';
require_once 'function/db.php';
require_once 'function/f_general.php';
require_once 'function/f_login.php';
require_once 'function/f_subjek_matrikulasi.php';

$api_name = 'api_subjek_matrikulasi';
$is_transaction = false;
$form_data = array('success' => false, 'result' => '', 'error' => '', 'errmsg' => '');
$result = '';

$constant = new Class_constant();
$fn_general = new Class_general();
$fn_login = new Class_login();
$fn_subjekMatrikulasi = new Class_subjek_matrikulasi();

try {
    $fn_general->__set('constant', $constant);
    $fn_login->__set('constant', $constant);
    $fn_login->__set('fn_general', $fn_general);
    $fn_subjekMatrikulasi->__set('constant', $constant);
    $fn_subjekMatrikulasi->__set('fn_general', $fn_general);

    Class_db::getInstance()->db_connect();
    $request_method = $_SERVER['REQUEST_METHOD'];
    $fn_general->log_debug('API', $api_name, __LINE__, 'Request method = ' . $request_method);

    $headers = apache_request_headers();
    if (!isset($headers['Authorization'])) {
        throw new Exception('[' . __LINE__ . '] - Parameter Authorization empty');
    }
    $jwt_data = $fn_login->check_jwt($headers['Authorization']);

    if ('GET' === $request_method) {
        $subjId = filter_input(INPUT_GET, 'subjId');

        if (!is_null($subjId)) {
            $fn_subjekMatrikulasi->__set('subjId', $subjId);
            $result = $fn_subjekMatrikulasi->get_subjek_matrikulasi();
        } else {
            $result = $fn_subjekMatrikulasi->get_subjek_matrikulasi_list();
        }

        $form_data['result'] = $result;
        $form_data['success'] = true;
    }
    else if ('POST' === $request_method) {
        Class_db::getInstance()->db_beginTransaction();
        $is_transaction = true;

        $subjCode = filter_input(INPUT_POST, 'subjCode');
        $subjName = filter_input(INPUT_POST, 'subjName');
        $subjCredit = filter_input(INPUT_POST, 'subjCredit');
        $subjSemester = filter_input(INPUT_POST, 'subjSemester');
        $subjKira = filter_input(INPUT_POST, 'subjKira');
        $subjSesi = filter_input(INPUT_POST, 'subjSesi');
        $sahYt = filter_input(INPUT_POST, 'sahYt');

        $params = array(
            'subjCode'=>$subjCode,
            'subjName'=>$subjName,
            'subjCredit'=>$subjCredit,
            'subjSemester'=>$subjSemester,
            'subjKira'=>$subjKira,
            'subjSesi'=>$subjSesi,
            'sahYt'=>$sahYt
        );
        $result = $fn_subjekMatrikulasi->add_subjek_matrikulasi($params);
        $fn_general->updateVersion(44);
        $fn_general->save_audit(80, $jwt_data->userId, 'Kod = ' . $subjCode . ', Semester = '.$subjSemester);
        $form_data['errmsg'] = $constant::SUC_DATA_ADD;

        Class_db::getInstance()->db_commit();
        $form_data['result'] = $result;
        $form_data['success'] = true;
    }
    else if ('PUT' === $request_method) {
        $subjId = filter_input(INPUT_GET, 'subjId');
        $put_data = file_get_contents("php://input");
        parse_str($put_data, $put_vars);

        if (empty($subjId)) {
            throw new Exception('[' . __LINE__ . '] - Parameter subjId empty');
        }

        Class_db::getInstance()->db_beginTransaction();
        $is_transaction = true;

        $fn_subjekMatrikulasi->__set('subjId', $subjId);
        $fn_subjekMatrikulasi->update_subjek_matrikulasi($put_vars);
        $fn_general->updateVersion(44);
        $fn_general->save_audit(81, $jwt_data->userId, 'Kod = ' . $put_vars['subjCode'] . ', Semester = '.$put_vars['subjSemester']);
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