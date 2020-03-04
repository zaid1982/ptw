<?php

class Class_asm_citizendata {

    private $constant;
    private $fn_general;
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
     * @return array
     * @throws Exception
     */
    public function get_asm_citizendata () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($this->userId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter userId empty');
            }

            $result = array();
            $dbResult = Class_db::getInstance()->db_select_single('asm_citizendata', array('UserId'=>$this->userId));
            if (empty($dbResult)) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_MYID_NOT_EXIST, 31);
            }
            $result['id'] = $dbResult['ID'];
            $result['myIdName'] = $this->fn_general->clear_null($dbResult['MyIdName']);
            $result['myIdICNumber'] = $this->fn_general->clear_null($dbResult['MyIdICNumber']);
            $result['dateOfBirth'] = str_replace('-', '/', $this->fn_general->clear_null($dbResult['DateOfBirth']));
            $result['age'] = $this->fn_general->calculateAge($dbResult['DateOfBirth']);
            $result['gender'] = $this->fn_general->clear_null($dbResult['Gender']);
            $result['religion'] = $this->fn_general->clear_null($dbResult['Religion']);
            $result['race'] = $this->fn_general->clear_null($dbResult['Race']);
            $result['citizenshipStatus'] = $this->fn_general->clear_null($dbResult['CitizenshipStatus']);
            $result['permanentAddress1'] = $this->fn_general->clear_null($dbResult['PermanentAddress1']);
            $result['permanentAddress2'] = $this->fn_general->clear_null($dbResult['PermanentAddress2']);
            $result['permanentAddress3'] = $this->fn_general->clear_null($dbResult['PermanentAddress3']);
            $result['permanentAddressPostcode'] = $this->fn_general->clear_null($dbResult['PermanentAddressPostcode']);
            $result['permanentAddressCityDesc'] = $this->fn_general->clear_null($dbResult['PermanentAddressCityDesc']);
            $result['permanentAddressStateCode'] = $this->fn_general->clear_null($dbResult['PermanentAddressStateCode']);

            return $result;
        }
        catch (Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

}