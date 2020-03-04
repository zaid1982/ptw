<?php

class Class_agama {

    private $constant;
    private $fn_general;
    private $kodAgama;

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
    public function get_agama_list () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            $result = array();
            $dbResults = Class_db::getInstance()->db_select('ref_agama');
            foreach ($dbResults as $dbResult) {
                $rowResult['kodAgama'] = $dbResult['kod_agama'];
                $rowResult['agama'] = $dbResult['agama'];
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
    public function get_agama () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            if (empty($this->kodAgama)) {
                throw new Exception('[' . __LINE__ . '] - Parameter kodAgama empty');
            }

            $result = array();
            $dbResult = Class_db::getInstance()->db_select_single('ref_agama', array('kod_agama'=>$this->kodAgama), null, 1);
            $result['kodAgama'] = $dbResult['kod_agama'];
            $result['agama'] = $dbResult['agama'];
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
    public function add_agama ($params=array()) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($params)) {
                throw new Exception('['.__LINE__.'] - Array params empty');
            }
            if (!array_key_exists('kodAgama', $params) || empty($params['kodAgama'])) {
                throw new Exception('['.__LINE__.'] - Parameter kodAgama empty');
            }
            if (!array_key_exists('agama', $params) || empty($params['agama'])) {
                throw new Exception('['.__LINE__.'] - Parameter agama empty');
            }
            if (!array_key_exists('sahYt', $params) || empty($params['sahYt'])) {
                throw new Exception('['.__LINE__.'] - Parameter sahYt empty');
            }

            $kodAgama = $params['kodAgama'];
            $agama = $params['agama'];
            $sahYt = $params['sahYt'];

            if (Class_db::getInstance()->db_count('ref_agama', array('kod_agama'=>$kodAgama)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_AGAMA_KOD_EXIST, 31);
            }
            if (Class_db::getInstance()->db_count('ref_agama', array('agama'=>$agama)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_AGAMA_EXIST, 31);
            }

            Class_db::getInstance()->db_insert('ref_agama', array('kod_agama'=>$kodAgama, 'agama'=>$agama, 'sah_yt'=>$sahYt));

            return $kodAgama;
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
    public function update_agama ($putVars) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($this->kodAgama)) {
                throw new Exception('[' . __LINE__ . '] - Parameter kodAgama empty');
            }
            if (!isset($putVars['agama']) || empty($putVars['agama'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter agama empty');
            }
            if (!isset($putVars['sahYt']) || empty($putVars['sahYt'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter sahYt empty');
            }

            $agama = $putVars['agama'];
            $sahYt = $putVars['sahYt'];

            if (Class_db::getInstance()->db_count('ref_agama', array('agama'=>$agama, 'kod_agama'=>'<>'.$this->kodAgama)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_AGAMA_EXIST, 31);
            }

            Class_db::getInstance()->db_update('ref_agama', array('agama'=>$agama, 'sah_yt'=>$sahYt), array('kod_agama'=>$this->kodAgama));
        }
        catch(Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

}