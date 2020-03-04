<?php

class Class_bantuan {

    private $constant;
    private $fn_general;
    private $bantuanId;

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
    public function get_bantuan_list () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            $result = array();
            $dbResults = Class_db::getInstance()->db_select('ref_bantuan');
            foreach ($dbResults as $dbResult) {
                $rowResult['bantuanId'] = $dbResult['bantuan_id'];
                $rowResult['kodBantuan'] = $dbResult['kod_bantuan'];
                $rowResult['bantuan'] = $this->fn_general->clear_null($dbResult['bantuan']);
                $rowResult['sahYt'] = $this->fn_general->clear_null($dbResult['sah_yt'], 'T');
                array_push($result, $rowResult);
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
    public function get_bantuan () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            if (empty($this->bantuanId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter bantuanId empty');
            }

            $result = array();
            $dbResult = Class_db::getInstance()->db_select_single('ref_bantuan', array('kod_bantuan'=>$this->bantuanId), null, 1);
            $result['bantuanId'] = $dbResult['bantuan_id'];
            $result['kodBantuan'] = $dbResult['kod_bantuan'];
            $result['bantuan'] = $this->fn_general->clear_null($dbResult['bantuan']);
            $result['sahYt'] = $this->fn_general->clear_null($dbResult['sah_yt'], 'T');

            return $result;
        }
        catch (Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

    /**
     * @param array $params
     * @return mixed
     * @throws Exception
     */
    public function add_bantuan ($params=array()) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($params)) {
                throw new Exception('['.__LINE__.'] - Array params empty');
            }
            if (!array_key_exists('kodBantuan', $params) || empty($params['kodBantuan'])) {
                throw new Exception('['.__LINE__.'] - Parameter kodBantuan empty');
            }
            if (!array_key_exists('bantuan', $params) || empty($params['bantuan'])) {
                throw new Exception('['.__LINE__.'] - Parameter bantuan empty');
            }
            if (!array_key_exists('sahYt', $params) || empty($params['sahYt'])) {
                throw new Exception('['.__LINE__.'] - Parameter sahYt empty');
            }

            $kodBantuan = $params['kodBantuan'];
            $bantuan = $params['bantuan'];
            $sahYt = $params['sahYt'];

            if (Class_db::getInstance()->db_count('ref_bantuan', array('kod_bantuan'=>$kodBantuan)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_BANTUAN_KOD_EXIST, 31);
            }
            if (Class_db::getInstance()->db_count('ref_bantuan', array('bantuan'=>$bantuan)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_BANTUAN_EXIST, 31);
            }

            return Class_db::getInstance()->db_insert('ref_bantuan', array('kod_bantuan'=>$kodBantuan, 'bantuan'=>$bantuan, 'sah_yt'=>$sahYt));
        }
        catch(Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

    /**
     * @param $putVars
     * @throws Exception
     */
    public function update_bantuan ($putVars) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($this->bantuanId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter bantuanId empty');
            }
            if (!isset($putVars['bantuan']) || empty($putVars['bantuan'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter bantuan empty');
            }
            if (!isset($putVars['sahYt']) || empty($putVars['sahYt'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter sahYt empty');
            }

            $bantuan = $putVars['bantuan'];
            $sahYt = $putVars['sahYt'];

            if (Class_db::getInstance()->db_count('ref_bantuan', array('bantuan'=>$bantuan, 'bantuan_id'=>'<>'.$this->bantuanId)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_BANTUAN_EXIST, 31);
            }

            Class_db::getInstance()->db_update('ref_bantuan', array('bantuan'=>$bantuan, 'sah_yt'=>$sahYt), array('bantuan_id'=>$this->bantuanId));
        }
        catch(Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

}