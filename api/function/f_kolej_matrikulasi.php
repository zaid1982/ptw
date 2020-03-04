<?php

class Class_kolej_matrikulasi {

    private $constant;
    private $fn_general;
    private $kolejId;

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
    public function get_kolej_matrikulasi_list () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            $result = array();
            $dbResults = Class_db::getInstance()->db_select('ref_kolej_matrikulasi');
            foreach ($dbResults as $dbResult) {
                $rowResult['kolejId'] = $dbResult['kolej_id'];
                $rowResult['kodkolej'] = $dbResult['kodkolej'];
                $rowResult['namakolej'] = $this->fn_general->clear_null($dbResult['namakolej']);
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
    public function get_kolej_matrikulasi () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            if (empty($this->kolejId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter kolejId empty');
            }

            $result = array();
            $dbResult = Class_db::getInstance()->db_select_single('ref_kolej_matrikulasi', array('kolej_id'=>$this->kolejId), null, 1);
            $result['kolejId'] = $dbResult['kolej_id'];
            $result['kodkolej'] = $dbResult['kodkolej'];
            $result['namakolej'] = $this->fn_general->clear_null($dbResult['namakolej']);
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
    public function add_kolej_matrikulasi ($params=array()) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($params)) {
                throw new Exception('['.__LINE__.'] - Array params empty');
            }
            if (!array_key_exists('kodkolej', $params) || empty($params['kodkolej'])) {
                throw new Exception('['.__LINE__.'] - Parameter kodkolej empty');
            }
            if (!array_key_exists('namakolej', $params) || empty($params['namakolej'])) {
                throw new Exception('['.__LINE__.'] - Parameter namakolej empty');
            }
            if (!array_key_exists('sahYt', $params) || empty($params['sahYt'])) {
                throw new Exception('['.__LINE__.'] - Parameter sahYt empty');
            }

            $kodkolej = $params['kodkolej'];
            $namakolej = $params['namakolej'];
            $sahYt = $params['sahYt'];

            if (Class_db::getInstance()->db_count('ref_kolej_matrikulasi', array('kodkolej'=>$kodkolej)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_KOLEJ_KOD_EXIST, 31);
            }
            if (Class_db::getInstance()->db_count('ref_kolej_matrikulasi', array('namakolej'=>$namakolej)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_KOLEJ_EXIST, 31);
            }

            return Class_db::getInstance()->db_insert('ref_kolej_matrikulasi', array('kodkolej'=>$kodkolej, 'namakolej'=>$namakolej, 'sah_yt'=>$sahYt));
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
    public function update_kolej_matrikulasi ($putVars) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($this->kolejId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter kolejId empty');
            }
            if (!isset($putVars['namakolej']) || empty($putVars['namakolej'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter namakolej empty');
            }
            if (!isset($putVars['sahYt']) || empty($putVars['sahYt'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter sahYt empty');
            }

            $namakolej = $putVars['namakolej'];
            $sahYt = $putVars['sahYt'];

            if (Class_db::getInstance()->db_count('ref_kolej_matrikulasi', array('namakolej'=>$namakolej, 'kolej_id'=>'<>'.$this->kolejId)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_KOLEJ_EXIST, 31);
            }

            Class_db::getInstance()->db_update('ref_kolej_matrikulasi', array('namakolej'=>$namakolej, 'sah_yt'=>$sahYt), array('kolej_id'=>$this->kolejId));
        }
        catch(Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

}