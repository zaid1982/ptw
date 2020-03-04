<?php

class Class_keturunan {

    private $constant;
    private $fn_general;
    private $kodKeturunan;

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
    public function get_keturunan_list () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            $result = array();
            $dbResults = Class_db::getInstance()->db_select('ref_keturunan');
            foreach ($dbResults as $dbResult) {
                $rowResult['kodKeturunan'] = $dbResult['kod_keturunan'];
                $rowResult['keturunan'] = $dbResult['keturunan'];
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
    public function get_keturunan () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            if (empty($this->kodKeturunan)) {
                throw new Exception('[' . __LINE__ . '] - Parameter kodKeturunan empty');
            }

            $result = array();
            $dbResult = Class_db::getInstance()->db_select_single('ref_keturunan', array('kod_keturunan'=>$this->kodKeturunan), null, 1);
            $result['kodKeturunan'] = $dbResult['kod_keturunan'];
            $result['keturunan'] = $dbResult['keturunan'];
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
    public function add_keturunan ($params=array()) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($params)) {
                throw new Exception('['.__LINE__.'] - Array params empty');
            }
            if (!array_key_exists('kodKeturunan', $params) || empty($params['kodKeturunan'])) {
                throw new Exception('['.__LINE__.'] - Parameter kodKeturunan empty');
            }
            if (!array_key_exists('keturunan', $params) || empty($params['keturunan'])) {
                throw new Exception('['.__LINE__.'] - Parameter keturunan empty');
            }
            if (!array_key_exists('sahYt', $params) || empty($params['sahYt'])) {
                throw new Exception('['.__LINE__.'] - Parameter sahYt empty');
            }

            $kodKeturunan = $params['kodKeturunan'];
            $keturunan = $params['keturunan'];
            $sahYt = $params['sahYt'];

            if (Class_db::getInstance()->db_count('ref_keturunan', array('kod_keturunan'=>$kodKeturunan)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_KETURUNAN_KOD_EXIST, 31);
            }
            if (Class_db::getInstance()->db_count('ref_keturunan', array('keturunan'=>$keturunan)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_KETURUNAN_EXIST, 31);
            }

            Class_db::getInstance()->db_insert('ref_keturunan', array('kod_keturunan'=>$kodKeturunan, 'keturunan'=>$keturunan, 'sah_yt'=>$sahYt));

            return $kodKeturunan;
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
    public function update_keturunan ($putVars) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($this->kodKeturunan)) {
                throw new Exception('[' . __LINE__ . '] - Parameter kodKeturunan empty');
            }
            if (!isset($putVars['keturunan']) || empty($putVars['keturunan'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter keturunan empty');
            }
            if (!isset($putVars['sahYt']) || empty($putVars['sahYt'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter sahYt empty');
            }

            $keturunan = $putVars['keturunan'];
            $sahYt = $putVars['sahYt'];

            if (Class_db::getInstance()->db_count('ref_keturunan', array('keturunan'=>$keturunan, 'kod_keturunan'=>'<>'.$this->kodKeturunan)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_KETURUNAN_EXIST, 31);
            }

            Class_db::getInstance()->db_update('ref_keturunan', array('keturunan'=>$keturunan, 'sah_yt'=>$sahYt), array('kod_keturunan'=>$this->kodKeturunan));
        }
        catch(Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

}