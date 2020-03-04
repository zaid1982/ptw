<?php

class Class_negeri {

    private $constant;
    private $fn_general;
    private $kodNegeri;

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
    public function get_negeri_list () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            $result = array();
            $dbResults = Class_db::getInstance()->db_select('ref_negeris');
            foreach ($dbResults as $dbResult) {
                $rowResult['kodNegeri'] = $dbResult['KOD_NEGERI'];
                $rowResult['negeri'] = $dbResult['NEGERI'];
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
    public function get_negeri () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            if (empty($this->kodNegeri)) {
                throw new Exception('[' . __LINE__ . '] - Parameter kodNegeri empty');
            }

            $result = array();
            $dbResult = Class_db::getInstance()->db_select_single('ref_negeris', array('KOD_NEGERI'=>$this->kodNegeri), null, 1);
            $result['kodNegeri'] = $dbResult['KOD_NEGERI'];
            $result['negeri'] = $dbResult['NEGERI'];
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
    public function add_negeri ($params=array()) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($params)) {
                throw new Exception('['.__LINE__.'] - Array params empty');
            }
            if (!array_key_exists('kodNegeri', $params) || empty($params['kodNegeri'])) {
                throw new Exception('['.__LINE__.'] - Parameter kodNegeri empty');
            }
            if (!array_key_exists('negeri', $params) || empty($params['negeri'])) {
                throw new Exception('['.__LINE__.'] - Parameter negeri empty');
            }
            if (!array_key_exists('sahYt', $params) || empty($params['sahYt'])) {
                throw new Exception('['.__LINE__.'] - Parameter sahYt empty');
            }

            $kodNegeri = $params['kodNegeri'];
            $negeri = $params['negeri'];
            $sahYt = $params['sahYt'];

            if (Class_db::getInstance()->db_count('ref_negeris', array('KOD_NEGERI'=>$kodNegeri)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_NEGERI_KOD_EXIST, 31);
            }
            if (Class_db::getInstance()->db_count('ref_negeris', array('NEGERI'=>$negeri)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_NEGERI_EXIST, 31);
            }

            Class_db::getInstance()->db_insert('ref_negeris', array('KOD_NEGERI'=>$kodNegeri, 'NEGERI'=>$negeri, 'sah_yt'=>$sahYt));

            return $kodNegeri;
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
    public function update_negeri ($putVars) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($this->kodNegeri)) {
                throw new Exception('[' . __LINE__ . '] - Parameter kodNegeri empty');
            }
            if (!isset($putVars['negeri']) || empty($putVars['negeri'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter negeri empty');
            }
            if (!isset($putVars['sahYt']) || empty($putVars['sahYt'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter sahYt empty');
            }

            $negeri = $putVars['negeri'];
            $sahYt = $putVars['sahYt'];

            if (Class_db::getInstance()->db_count('ref_negeris', array('NEGERI'=>$negeri, 'KOD_NEGERI'=>'<>'.$this->kodNegeri)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_NEGERI_EXIST, 31);
            }

            Class_db::getInstance()->db_update('ref_negeris', array('NEGERI'=>$negeri, 'sah_yt'=>$sahYt), array('KOD_NEGERI'=>$this->kodNegeri));
        }
        catch(Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

}