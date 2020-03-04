<?php

class Class_biasiswa {

    private $constant;
    private $fn_general;
    private $biasiswaId;

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
    public function get_biasiswa_list () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            $result = array();
            $dbResults = Class_db::getInstance()->db_select('ref_biasiswa');
            foreach ($dbResults as $dbResult) {
                $rowResult['biasiswaId'] = $dbResult['biasiswa_id'];
                $rowResult['kodBiasiswa'] = $dbResult['kod_biasiswa'];
                $rowResult['biasiswa'] = $this->fn_general->clear_null($dbResult['biasiswa']);
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
    public function get_biasiswa () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            if (empty($this->biasiswaId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter biasiswaId empty');
            }

            $result = array();
            $dbResult = Class_db::getInstance()->db_select_single('ref_biasiswa', array('biasiswa_id'=>$this->biasiswaId), null, 1);
            $result['biasiswaId'] = $dbResult['biasiswa_id'];
            $result['kodBiasiswa'] = $dbResult['kod_biasiswa'];
            $result['biasiswa'] = $this->fn_general->clear_null($dbResult['biasiswa']);
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
    public function add_biasiswa ($params=array()) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($params)) {
                throw new Exception('['.__LINE__.'] - Array params empty');
            }
            if (!array_key_exists('kodBiasiswa', $params) || empty($params['kodBiasiswa'])) {
                throw new Exception('['.__LINE__.'] - Parameter kodBiasiswa empty');
            }
            if (!array_key_exists('biasiswa', $params) || empty($params['biasiswa'])) {
                throw new Exception('['.__LINE__.'] - Parameter biasiswa empty');
            }
            if (!array_key_exists('sahYt', $params) || empty($params['sahYt'])) {
                throw new Exception('['.__LINE__.'] - Parameter sahYt empty');
            }

            $kodBiasiswa = $params['kodBiasiswa'];
            $biasiswa = $params['biasiswa'];
            $sahYt = $params['sahYt'];

            if (Class_db::getInstance()->db_count('ref_biasiswa', array('kod_biasiswa'=>$kodBiasiswa)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_BIASISWA_KOD_EXIST, 31);
            }
            if (Class_db::getInstance()->db_count('ref_biasiswa', array('biasiswa'=>$biasiswa)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_BIASISWA_EXIST, 31);
            }

            return Class_db::getInstance()->db_insert('ref_biasiswa', array('kod_biasiswa'=>$kodBiasiswa, 'biasiswa'=>$biasiswa, 'sah_yt'=>$sahYt));
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
    public function update_biasiswa ($putVars) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($this->biasiswaId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter biasiswaId empty');
            }
            if (!isset($putVars['biasiswa']) || empty($putVars['biasiswa'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter biasiswa empty');
            }
            if (!isset($putVars['sahYt']) || empty($putVars['sahYt'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter sahYt empty');
            }

            $biasiswa = $putVars['biasiswa'];
            $sahYt = $putVars['sahYt'];

            if (Class_db::getInstance()->db_count('ref_biasiswa', array('biasiswa'=>$biasiswa, 'biasiswa_id'=>'<>'.$this->biasiswaId)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_BIASISWA_EXIST, 31);
            }

            Class_db::getInstance()->db_update('ref_biasiswa', array('biasiswa'=>$biasiswa, 'sah_yt'=>$sahYt), array('biasiswa_id'=>$this->biasiswaId));
        }
        catch(Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

}