<?php

class Class_user {

    private $constant;
    private $fn_general;
    private $fn_email;
    private $userId;
    
    function __construct() {
    }
    
    private function get_exception($codes, $function, $line, $msg) {
        if ($msg != '') {            
            $pos = strpos($msg,'-');
            if ($pos !== false) {   
                $msg = substr($msg, $pos+2); 
            }
            return "(ErrCode:".$codes.") [".__CLASS__.":".$function.":".$line."] - ".$msg;
        } else {
            return "(ErrCode:".$codes.") [".__CLASS__.":".$function.":".$line."]";
        }
    }

    /**
     * @param $property
     * @return mixed
     * @throws Exception
     */
    public function __get($property) {
        if (property_exists($this, $property)) {
            return $this->$property;
        } else {
            throw new Exception($this->get_exception('0001', __FUNCTION__, __LINE__, 'Get Property not exist ['.$property.']'));
        }
    }

    /**
     * @param $property
     * @param $value
     * @throws Exception
     */
    public function __set($property, $value ) {
        if (property_exists($this, $property)) {
            $this->$property = $value;        
        } else {
            throw new Exception($this->get_exception('0002', __FUNCTION__, __LINE__, 'Get Property not exist ['.$property.']'));
        }
    }

    /**
     * @param $property
     * @return bool
     * @throws Exception
     */
    public function __isset($property ) {
        if (property_exists($this, $property)) {
            return isset($this->$property);
        } else {
            throw new Exception($this->get_exception('0003', __FUNCTION__, __LINE__, 'Get Property not exist ['.$property.']'));
        }
    }

    /**
     * @param $property
     * @throws Exception
     */
    public function __unset($property ) {
        if (property_exists($this, $property)) {
            unset($this->$property);
        } else {
            throw new Exception($this->get_exception('0004', __FUNCTION__, __LINE__, 'Get Property not exist ['.$property.']'));
        } 
    }

    /**
     * @param array $userDetails
     * @return array
     * @throws Exception
     */
    public function register_user ($userDetails=array()) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            if (empty($userDetails)) {
                throw new Exception('['.__LINE__.'] - Array userDetails empty');
            }     
            if (empty($type)) {
                throw new Exception('['.__LINE__.'] - Parameter type empty');
            }     
            if (!array_key_exists('userFirstName', $userDetails)) {
                throw new Exception('['.__LINE__.'] - Index userFirstName in array userDetails empty');
            }  
            if (!array_key_exists('userLastName', $userDetails)) {
                throw new Exception('['.__LINE__.'] - Index userLastName in array userDetails empty');
            } 
            if (!array_key_exists('userEmail', $userDetails)) {
                throw new Exception('['.__LINE__.'] - Index userEmail in array userDetails empty');
            } 
            if (!array_key_exists('userMykadNo', $userDetails)) {
                throw new Exception('['.__LINE__.'] - Index userMykadNo in array userDetails empty');
            } 
            if (!array_key_exists('userProfileContactNo', $userDetails)) {
                throw new Exception('['.__LINE__.'] - Index userProfileContactNo in array userDetails empty');
            } 
            if (!array_key_exists('userPassword', $userDetails)) {
                throw new Exception('['.__LINE__.'] - Index userPassword in array userDetails empty');
            }            
            
            $userFirstName = $userDetails['userFirstName'];
            $userLastName = $userDetails['userLastName'];
            $userEmail = $userDetails['userEmail'];
            $userMykadNo = $userDetails['userMykadNo'];
            $userProfileContactNo = $userDetails['userProfileContactNo'];
            $userPassword = $userDetails['userPassword'];
            
            if (Class_db::getInstance()->db_count('sys_user', array('user_email'=>$userEmail)) > 0) {
                throw new Exception('['.__LINE__.'] - Email already exist. Please use different email.', 31);
            }
            
            if ($type === 2) {
                $userId = Class_db::getInstance()->db_insert('sys_user', array('user_email'=>$userEmail, 'user_type'=>strval($type), 'user_password'=>md5($userPassword), 'user_first_name'=>$userFirstName, 
                    'user_last_name'=>$userLastName, 'user_mykad_no'=>$userMykadNo, 'group_id'=>'1', 'user_status'=>'3'));
                $userActivationKey = $this->fn_general->generateRandomString().$userId;
                Class_db::getInstance()->db_update('sys_user', array('user_activation_key'=>$userActivationKey), array('user_id'=>$userId));
                Class_db::getInstance()->db_insert('sys_user_profile', array('user_id'=>$userId, 'user_profile_contact_no'=>$userProfileContactNo));
                Class_db::getInstance()->db_insert('sys_user_role', array('user_id'=>$userId, 'role_id'=>'2'));
            } else {
                throw new Exception('['.__LINE__.'] - Parameter type invalid ('.$type.')');
            }
            
            return array('userId'=>$userId, 'activationKey'=>$userActivationKey);
        }
        catch(Exception $ex) {   
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

    /**
     * @param string $activationInput
     * @return bool|string
     * @throws Exception
     */
    public function activate_user ($activationInput='') {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            if (empty($activationInput)) {
                throw new Exception('['.__LINE__.'] - Parameter activationInput empty');
            }    
            if (strlen($activationInput) < 21) { 
                throw new Exception('['.__LINE__.'] - Wrong activation key. Please click the activation link given from your email.', 31);
            }
            
            $userId = substr($activationInput, 20);
            
            if (Class_db::getInstance()->db_count('sys_user', array('user_id'=>$userId, 'user_activation_key'=>$activationInput)) == 0) {
                throw new Exception('['.__LINE__.'] - Wrong activation key. Please click the activation link given from your email.', 31);
            }
            if (Class_db::getInstance()->db_count('sys_user', array('user_id'=>$userId, 'user_activation_key'=>$activationInput, 'user_status'=>'1')) == 1) {
                throw new Exception('['.__LINE__.'] - Your account already activated. Please login with email as user ID and your registered password.', 31);
            }
                        
            Class_db::getInstance()->db_update('sys_user', array('user_status'=>'1', 'user_time_activate'=>'Now()'), array('user_id'=>$userId));
            return $userId;
        }
        catch(Exception $ex) {   
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

    /**
     * @param string $email
     * @return mixed
     * @throws Exception
     */
    public function forgot_password ($email='') {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($email)) {
                throw new Exception('['.__LINE__.'] - Parameter email empty');
            }

            $sys_user_profile = Class_db::getInstance()->db_select_single('sys_user_profile', array('user_email'=>$email, 'user_profile_status'=>'1'));
            if (empty($sys_user_profile)) {
                throw new Exception('['.__LINE__.'] - '.$constant::ERR_FORGOT_PASSWORD_NOT_EXIST, 31);
            }
            $userId = $sys_user_profile['user_id'];

            $temporaryPassword = $this->fn_general->generateRandomString(15);
            Class_db::getInstance()->db_update('sys_user', array('user_password'=>md5($temporaryPassword), 'user_password_temp'=>$temporaryPassword, 'user_time_activate'=>'', 'user_fail_attempt'=>'0', 'user_time_block'=>''), array('user_id'=>$userId));
            
            //$emailParam = array('userName'=>$userName, 'tempPassword'=>$temporaryPassword);
            //$this->fn_email->setup_email($userId, 1, $emailParam);
            $sys_user = Class_db::getInstance()->db_select_single('sys_user', array('user_id'=>$userId), null, 1);
            $content = '<p>Dear '.$sys_user['user_first_name'].',</p>
            <p>Your temporary password is '.$temporaryPassword.'.</p>
            <p>To change your password, please open the mobile apps and key in the given password to login.</p>
            <br /><br />
            <p><i>Note: This is an automail from GEMS 2.0 System. Please do not reply to this email.</i></p>';
            $this->fn_email->send_email_express($email, 'GEMS 2.0 - Temporary Password', $content);
            
            return array('userId'=>$userId, 'tempPassword'=>$temporaryPassword);
        }
        catch(Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

    /**
     * @param $userId
     * @param $name
     * @param $phoneNo
     * @param $uploadId
     * @return string
     * @throws Exception
     */
    public function update_profile_m ($userId, $name, $phoneNo, $uploadId) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($userId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter userId empty');
            }

            $sys_user = Class_db::getInstance()->db_select_single('sys_user', array('user_id'=>$userId), null, 1);
            if (!empty($name)) {
                Class_db::getInstance()->db_update('sys_user', array('user_first_name'=>$name), array('user_id'=>$userId));
            }
            if (!empty($phoneNo)) {
                Class_db::getInstance()->db_update('sys_user_profile', array('user_contact_no'=>$phoneNo), array('user_id'=>$userId, 'user_profile_status'=>'1'));
            }
            if (!empty($uploadId)) {
                if (!empty($sys_user['upload_id'])) {
                    Class_db::getInstance()->db_update('sys_upload', array('upload_status'=>'6'), array('upload_id'=>$sys_user['upload_id']));
                }

                Class_db::getInstance()->db_update('sys_user', array('upload_id'=>$uploadId), array('user_id'=>$userId));
                $upload = Class_db::getInstance()->db_select_single('vw_sys_upload', array('upload_id'=>$uploadId), null, 1);
                $docUrl = $constant::URL.$upload['upload_folder'].'/'.$upload['upload_filename'].'.'.$upload['upload_extension'];
                return $docUrl;
            }
            return '';
        }
        catch(Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

    /**
     * @param $userId
     * @param $put_vars
     * @throws Exception
     */
    public function change_password ($userId, $put_vars) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;
            
            if (empty($userId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter userId empty');
            } 
            if (!isset($put_vars['oldPassword']) || empty($put_vars['oldPassword'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter oldPassword empty');
            }
            if (!isset($put_vars['newPassword']) || empty($put_vars['newPassword'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter newPassword empty');
            }
            
            $oldPassword = $put_vars['oldPassword'];
            $newPassword = $put_vars['newPassword'];

            if ($oldPassword === $newPassword){
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_CHANGE_PASSWORD_OLD_NEW_SAME, 31);
            }
            if (Class_db::getInstance()->db_count('sys_user', array('user_password'=>md5($oldPassword), 'user_id'=>$userId)) == 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_CHANGE_PASSWORD_WRONG_CURRENT, 31);
            }
                        
            Class_db::getInstance()->db_update('sys_user', array('user_password'=>md5($newPassword)), array('user_id'=>$userId));
        }
        catch(Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

    /**
     * @param $userId
     * @param $put_vars
     * @throws Exception
     */
    public function edit_password ($userId, $put_vars) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            if (empty($userId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter userId empty');
            }
            if (!isset($put_vars['newPassword']) || empty($put_vars['newPassword'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter newPassword empty');
            }

            $newPassword = $put_vars['newPassword'];
            Class_db::getInstance()->db_update('sys_user', array('user_password'=>md5($newPassword)), array('user_id'=>$userId));
        }
        catch(Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

    /**
     * @param array $userDetails
     * @return mixed
     * @throws Exception
     */
    public function add_user ($userDetails=array()) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($userDetails)) {
                throw new Exception('['.__LINE__.'] - Array userDetails empty');
            }
            if (!array_key_exists('userNoKp', $userDetails) || empty($userDetails['userNoKp'])) {
                throw new Exception('['.__LINE__.'] - Parameter userNoKp empty');
            }
            if (!array_key_exists('userFirstName', $userDetails) || empty($userDetails['userFirstName'])) {
                throw new Exception('['.__LINE__.'] - Parameter userFirstName empty');
            }
            if (!array_key_exists('designationId', $userDetails) || empty($userDetails['designationId'])) {
                throw new Exception('['.__LINE__.'] - Parameter designationId empty');
            }
            if (!array_key_exists('departmentId', $userDetails) || empty($userDetails['departmentId'])) {
                throw new Exception('['.__LINE__.'] - Parameter departmentId empty');
            }
            if (!array_key_exists('userContactNo', $userDetails) || empty($userDetails['userContactNo'])) {
                throw new Exception('['.__LINE__.'] - Parameter userContactNo empty');
            }
            if (!array_key_exists('userEmail', $userDetails) || empty($userDetails['userEmail'])) {
                throw new Exception('['.__LINE__.'] - Parameter userEmail empty');
            }
            if (!array_key_exists('roleId', $userDetails) || empty($userDetails['roleId'])) {
                throw new Exception('['.__LINE__.'] - Parameter roleId empty');
            }
            if (!array_key_exists('userPassword', $userDetails) || empty($userDetails['userPassword'])) {
                throw new Exception('['.__LINE__.'] - Parameter userPassword empty');
            }
            if (!array_key_exists('userStatus', $userDetails) || empty($userDetails['userStatus'])) {
                throw new Exception('['.__LINE__.'] - Parameter userStatus empty');
            }

            $userNoKp = $userDetails['userNoKp'];
            $userFirstName = $userDetails['userFirstName'];
            $designationId = $userDetails['designationId'];
            $departmentId = $userDetails['departmentId'];
            $userContactNo = $userDetails['userContactNo'];
            $userEmail = $userDetails['userEmail'];
            $roleId = $userDetails['roleId'];
            $userPassword = $userDetails['userPassword'];
            $userStatus = $userDetails['userStatus'];
            $groupId = '1';

            if (Class_db::getInstance()->db_count('sys_user', array('user_name'=>$userNoKp)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_USER_ADD_SIMILAR_USERNAME, 31);
            }

            $userId = Class_db::getInstance()->db_insert('sys_user', array('user_name'=>$userNoKp, 'user_password'=>md5($userPassword), 'user_password_temp'=>$userPassword, 'user_first_name'=>$userFirstName, 'user_status'=>$userStatus));
            Class_db::getInstance()->db_insert('sys_user_profile', array('user_id'=>$userId, 'user_no_kp'=>$userNoKp, 'user_email'=>$userEmail, 'user_contact_no'=>$userContactNo, 'designation_id'=>$designationId, 'department_id'=>$departmentId));
            Class_db::getInstance()->db_insert('sys_user_role', array('user_id'=>$userId, 'role_id'=>$roleId, 'group_id'=>$groupId));

            return $userId;
        }
        catch(Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

    /**
     * @param $put_vars
     * @throws Exception
     */
    public function update_user ($put_vars) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($this->userId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter userId empty');
            }
            if (!isset($put_vars['userNoKp']) || empty($put_vars['userNoKp'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter userNoKp empty');
            }
            if (!isset($put_vars['userFirstName']) || empty($put_vars['userFirstName'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter userFirstName empty');
            }
            if (!isset($put_vars['designationId']) || empty($put_vars['designationId'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter designationId empty');
            }
            if (!isset($put_vars['departmentId']) || empty($put_vars['departmentId'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter departmentId empty');
            }
            if (!isset($put_vars['userContactNo']) || empty($put_vars['userContactNo'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter userContactNo empty');
            }
            if (!isset($put_vars['userEmail']) || empty($put_vars['userEmail'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter userEmail empty');
            }
            if (!isset($put_vars['roleId']) || empty($put_vars['roleId'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter roleId empty');
            }
            if (!isset($put_vars['userPassword']) || empty($put_vars['userPassword'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter userPassword empty');
            }
            if (!isset($put_vars['userStatus']) || empty($put_vars['userStatus'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter userStatus empty');
            }

            $userNoKp = $put_vars['userNoKp'];
            $userFirstName = $put_vars['userFirstName'];
            $designationId = $put_vars['designationId'];
            $departmentId = $put_vars['departmentId'];
            $userContactNo = $put_vars['userContactNo'];
            $userEmail = $put_vars['userEmail'];
            $roleId = $put_vars['roleId'];
            $userPassword = $put_vars['userPassword'];
            $userStatus = $put_vars['userStatus'];

            Class_db::getInstance()->db_update('sys_user', array('user_name'=>$userNoKp, 'user_password'=>md5($userPassword), 'user_password_temp'=>$userPassword, 'user_first_name'=>$userFirstName, 'user_status'=>$userStatus), array('user_id'=>$this->userId));
            Class_db::getInstance()->db_update('sys_user_profile', array('user_no_kp'=>$userNoKp, 'user_email'=>$userEmail, 'user_contact_no'=>$userContactNo, 'designation_id'=>$designationId, 'department_id'=>$departmentId), array('user_id'=>$this->userId, 'user_profile_status'=>'1'));
            Class_db::getInstance()->db_update('sys_user_role', array('role_id'=>$roleId), array('user_id'=>$this->userId));
        }
        catch(Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

    /**
     * @param $isReference
     * @param string $designationId
     * @param string $departmentId
     * @param string $roleId
     * @return array
     * @throws Exception
     */
    public function get_users($isReference=false, $designationId='', $departmentId='', $roleId='') {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            $result = array();
            $status = $isReference ? '' : '<> 6';
            $users = Class_db::getInstance()->db_select('vw_user_list', array('user_status'=>$status, 'designation_id'=>$designationId, 'department_id'=>$departmentId, 'role_id'=>$roleId));
            foreach ($users as $user) {
                $row_result['userId'] = $user['user_id'];
                $row_result['userName'] = $user['user_name'];
                $row_result['userType'] = $user['user_type'];
                $row_result['userFirstName'] = $user['user_first_name'];
                $row_result['userLastName'] = $user['user_last_name'];
                $row_result['userFullName'] = $user['user_first_name'].' '.$user['user_last_name'];
                $row_result['userNoKp'] = $this->fn_general->clear_null($user['user_no_kp']);
                $row_result['userContactNo'] = $this->fn_general->clear_null($user['user_contact_no']);
                $row_result['userEmail'] = $this->fn_general->clear_null($user['user_email']);
                $row_result['departmentId'] = $this->fn_general->clear_null($user['department_id']);
                $row_result['designationId'] = $this->fn_general->clear_null($user['designation_id']);
                $row_result['roles'] = $this->fn_general->clear_null($user['roles']);
                $row_result['groupId'] = $this->fn_general->clear_null($user['group_id']);
                $row_result['roleId'] = $this->fn_general->clear_null($user['role_id']);
                $row_result['userStatus'] = $user['user_status'];
                array_push($result, $row_result);
            }
            return $result;
        }
        catch (Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }


    /**
     * @return array
     * @throws Exception
     */
    public function get_user () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            if (empty($this->userId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter userId empty');
            }

            $result = array();
            $user = Class_db::getInstance()->db_select_single('vw_user_list', array('sys_user.user_id'=>$this->userId), null, 1);
            $result['userId'] = $user['user_id'];
            $result['userName'] = $user['user_name'];
            $result['userType'] = $user['user_type'];
            $result['userFirstName'] = $user['user_first_name'];
            $result['userLastName'] = $user['user_last_name'];
            $result['userFullName'] = $user['user_first_name'].' '.$user['user_last_name'];
            $result['userNoKp'] = $this->fn_general->clear_null($user['user_no_kp']);
            $result['userContactNo'] = $this->fn_general->clear_null($user['user_contact_no']);
            $result['userEmail'] = $this->fn_general->clear_null($user['user_email']);
            $result['departmentId'] = $this->fn_general->clear_null($user['department_id']);
            $result['designationId'] = $this->fn_general->clear_null($user['designation_id']);
            $result['roles'] = $this->fn_general->clear_null($user['roles']);
            $result['groupId'] = $user['group_id'];
            $result['roleId'] = $this->fn_general->clear_null($user['role_id']);
            $result['userStatus'] = $user['user_status'];
            $result['userPasswordTemp'] = $user['user_password_temp'];

            return $result;
        }
        catch (Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

    /**
     * @return array
     * @throws Exception
     */
    public function get_user_by_role() {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            $result = array();
            $userData = Class_db::getInstance()->db_select('vw_user_by_role');
            foreach ($userData as $data) {
                $row_result['roleId'] = $data['role_id'];
                $row_result['total'] = $data['total'];
                array_push($result, $row_result);
            }

            return $result;
        }
        catch (Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

    /**
     * @param $userId
     * @throws Exception
     */
    public function deactivate_profile ($userId) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($userId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter userId empty');
            }
            if (Class_db::getInstance()->db_count('sys_user', array('user_id'=>$userId, 'user_status'=>'2')) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_USER_DEACTIVATE, 31);
            }

            Class_db::getInstance()->db_update('sys_user', array('user_status'=>'2'), array('user_id'=>$userId));
        }
        catch (Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

    /**
     * @param $userId
     * @throws Exception
     */
    public function activate_profile ($userId) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($userId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter userId empty');
            }
            if (Class_db::getInstance()->db_count('sys_user', array('user_id'=>$userId, 'user_status'=>'1')) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_USER_ACTIVATE, 31);
            }

            Class_db::getInstance()->db_update('sys_user', array('user_status'=>'1'), array('user_id'=>$userId));
        }
        catch (Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

    /**
     * @param $userId
     * @param $token
     * @throws Exception
     */
    public function save_token ($userId, $token) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            if (empty($userId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter userId empty');
            }
            if (empty($token)) {
                throw new Exception('[' . __LINE__ . '] - Parameter token empty');
            }

            Class_db::getInstance()->db_update('sys_user', array('user_token'=>$token), array('user_id'=>$userId));
        }
        catch (Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

    /**
     * @throws Exception
     */
    public function delete_user () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($this->userId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter userId empty');
            }
            if (Class_db::getInstance()->db_count('sys_user', array('user_id'=>$this->userId, 'user_status'=>'6')) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_USER_DEACTIVATE, 31);
            }

            $userName = Class_db::getInstance()->db_select_col('sys_user', array('user_id'=>$this->userId), 'user_name', null, 1);
            Class_db::getInstance()->db_update('sys_user', array('user_status'=>'6'), array('user_id'=>$this->userId));
            return $userName;
        }
        catch (Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }
}