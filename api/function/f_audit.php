<?php

class Class_audit {

    private $constant;
    private $fn_general;

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
     * @param string $moduleId
     * @param string $actionId
     * @param string $myKadNo
     * @param string $fullname
     * @param string $from
     * @param string $to
     * @return array
     * @throws Exception
     */
    public function get_audit_list ($moduleId='', $actionId='', $myKadNo='', $fullname='', $from='', $to='') {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            $arrSearch = array(
                'audit_module_id'=>$moduleId,
                'sys_audit.audit_action_id'=>$actionId,
                'user_mykad_no'=>$myKadNo,
                'user_first_name'=>'%'.$fullname.'%',
            );
            if (!empty($from)) {
                $arrSearch['audit_timestamp'] = '>='.$from;
            }
            if (!empty($to)) {
                $arrSearch[' audit_timestamp'] = '<='.$to;
            }

            if (Class_db::getInstance()->db_count('vw_audit_trail', $arrSearch) > 5000) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_DATA_EXCEED_LIMIT, 31);
            }

            $result = array();
            $arr_dataLocal = Class_db::getInstance()->db_select('vw_audit_trail', $arrSearch);
            foreach ($arr_dataLocal as $dataLocal) {
                $row_result['auditId'] = $dataLocal['audit_id'];
                $row_result['userId'] = $this->fn_general->clear_null($dataLocal['user_id']);
                $row_result['auditIp'] = $this->fn_general->clear_null($dataLocal['audit_ip']);
                $row_result['auditPlace'] = $this->fn_general->clear_null($dataLocal['audit_place']);
                $row_result['auditTimestamp'] = str_replace('-', '/', $dataLocal['audit_timestamp']);
                $row_result['auditActionId'] = $dataLocal['audit_action_id'];
                $row_result['auditRemark'] = $this->fn_general->clear_null($dataLocal['audit_remark']);
                array_push($result, $row_result);
            }

            return $result;
        }
        catch(Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

}
