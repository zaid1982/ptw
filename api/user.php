<?php

require_once 'library/constant.php';
require_once 'function/db.php';
require_once 'function/f_general.php';
require_once 'function/f_login.php';
require_once 'function/f_user.php';

$api_name = 'api_user';
$is_transaction = false;
$form_data = array('success' => false, 'result' => '', 'error' => '', 'errmsg' => '');
$result = '';

$constant = new Class_constant();
$fn_general = new Class_general();
$fn_login = new Class_login();
$fn_user = new Class_user();

try {
    $fn_general->__set('constant', $constant);
    $fn_login->__set('constant', $constant);
    $fn_login->__set('fn_general', $fn_general);
    $fn_user->__set('constant', $constant);
    $fn_user->__set('fn_general', $fn_general);

    Class_db::getInstance()->db_connect();
    $request_method = $_SERVER['REQUEST_METHOD'];
    $fn_general->log_debug('API', $api_name, __LINE__, 'Request method = ' . $request_method);

    $headers = apache_request_headers();
    if (!isset($headers['Authorization'])) {
        throw new Exception('[' . __LINE__ . '] - Parameter Authorization empty');
    }
    $jwt_data = $fn_login->check_jwt($headers['Authorization']);

    if ('GET' === $request_method) {
        $userId = filter_input(INPUT_GET, 'userId');

        if (!is_null($userId)) {
            $fn_user->__set('userId', $userId);
            $result = $fn_user->get_user();
        } else {
            $designationId = filter_input(INPUT_GET, 'designationId');
            $departmentId = filter_input(INPUT_GET, 'departmentId');
            $roleId = filter_input(INPUT_GET, 'roleId');
            $result = $fn_user->get_users(false, $designationId, $departmentId, $roleId);
        }

        $form_data['result'] = $result;
        $form_data['success'] = true;
    }
    else if ('POST' === $request_method) {
        $action = filter_input(INPUT_POST, 'action');
        Class_db::getInstance()->db_beginTransaction();
        $is_transaction = true;

        if ($action === 'add_user') {
            $userNoKp = filter_input(INPUT_POST, 'userNoKp');
            $userFirstName = filter_input(INPUT_POST, 'userFirstName');
            $designationId = filter_input(INPUT_POST, 'designationId');
            $departmentId = filter_input(INPUT_POST, 'departmentId');
            $userContactNo = filter_input(INPUT_POST, 'userContactNo');
            $userEmail = filter_input(INPUT_POST, 'userEmail');
            $roleId = filter_input(INPUT_POST, 'roleId');
            $userPassword = filter_input(INPUT_POST, 'userPassword');
            $userStatus = filter_input(INPUT_POST, 'userStatus');

            $params = array(
                'userNoKp'=>$userNoKp,
                'userFirstName'=>$userFirstName,
                'designationId'=>$designationId,
                'departmentId'=>$departmentId,
                'userContactNo'=>$userContactNo,
                'userEmail'=>$userEmail,
                'roleId'=>$roleId,
                'userPassword'=>$userPassword,
                'userStatus'=>$userStatus
            );
            $result = $fn_user->add_user($params);
            $fn_general->updateVersion(3);
            $fn_general->save_audit(75, $jwt_data->userId, 'User ID = ' . $userNoKp);
            $form_data['errmsg'] = $constant::SUC_USER_ADD;
        } else if ($action === 'logout') {
            $fn_general->save_audit('2', $jwt_data->userId);
        } else {
            throw new Exception('[' . __LINE__ . '] - Parameter action (' . $action . ') invalid');
        }

        Class_db::getInstance()->db_commit();
        $form_data['result'] = $result;
        $form_data['success'] = true;
    }
    else if ('PUT' === $request_method) {
        $userId = filter_input(INPUT_GET, 'userId');
        $put_data = file_get_contents("php://input");
        parse_str($put_data, $put_vars);
        $action = $put_vars['action'];

        if (empty($userId)) {
            throw new Exception('[' . __LINE__ . '] - Parameter userId empty');
        }
        if (empty($action)) {
            throw new Exception('[' . __LINE__ . '] - Parameter action empty');
        }

        Class_db::getInstance()->db_beginTransaction();
        $is_transaction = true;

        if ($action === 'update_user') {
            $fn_user->__set('userId', $userId);
            $fn_user->update_user($put_vars);
            $fn_general->updateVersion(3);
            $fn_general->save_audit(76, $jwt_data->userId, 'User ID = ' . $put_vars['userNoKp']);
            $form_data['errmsg'] = $constant::SUC_USER_UPDATE;
        } else {
            throw new Exception('[' . __LINE__ . '] - Parameter action (' . $action . ') invalid');
        }

        Class_db::getInstance()->db_commit();
        Class_db::getInstance()->db_close();
        $form_data['result'] = $result;
        $form_data['success'] = true;
    }
    else if ('DELETE' === $request_method) {
        $userId = filter_input(INPUT_GET, 'userId');

        Class_db::getInstance()->db_beginTransaction();
        $is_transaction = true;

        $fn_user->__set('userId', $userId);
        $userName = $fn_user->delete_user();
        $fn_general->updateVersion(3);
        $fn_general->save_audit(77, $jwt_data->userId, 'User ID = ' . $userName);

        Class_db::getInstance()->db_commit();
        $form_data['errmsg'] = $constant::SUC_USER_DELETE;
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