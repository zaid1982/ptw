<?php

class Class_poskod {

    private $constant;
    private $fn_general;
    private $poskodId;

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
    public function get_poskod_list () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            $result = array();
            $dbResults = Class_db::getInstance()->db_select('ref_poskod');
            foreach ($dbResults as $dbResult) {
                $rowResult['poskodId'] = $dbResult['poskod_id'];
                $rowResult['poskod'] = $dbResult['poskod'];
                $rowResult['lokasi'] = $dbResult['lokasi'];
                $rowResult['kodNegeri'] = $this->fn_general->clear_null($dbResult['kod_negeri']);
                $rowResult['bandar'] = $dbResult['bandar'];
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
    public function get_poskod () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            if (empty($this->poskodId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter poskodId empty');
            }

            $result = array();
            $dbResult = Class_db::getInstance()->db_select_single('ref_poskod', array('poskod_id'=>$this->poskodId), null, 1);
            $result['poskodId'] = $dbResult['poskod_id'];
            $result['poskod'] = $dbResult['poskod'];
            $result['lokasi'] = $dbResult['lokasi'];
            $result['kodNegeri'] = $this->fn_general->clear_null($dbResult['kod_negeri']);
            $result['bandar'] = $dbResult['bandar'];
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
    public function add_poskod ($params=array()) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($params)) {
                throw new Exception('['.__LINE__.'] - Array params empty');
            }
            if (!array_key_exists('poskod', $params) && empty($params['poskod'])) {
                throw new Exception('['.__LINE__.'] - Parameter poskod empty');
            }
            if (!array_key_exists('lokasi', $params) && empty($params['lokasi'])) {
                throw new Exception('['.__LINE__.'] - Parameter lokasi empty');
            }
            if (!array_key_exists('kodNegeri', $params) && empty($params['kodNegeri'])) {
                throw new Exception('['.__LINE__.'] - Parameter kodNegeri empty');
            }
            if (!array_key_exists('bandar', $params) && empty($params['bandar'])) {
                throw new Exception('['.__LINE__.'] - Parameter bandar empty');
            }
            if (!array_key_exists('sahYt', $params) && empty($params['v'])) {
                throw new Exception('['.__LINE__.'] - Parameter sahYt empty');
            }

            $poskod = $params['poskod'];
            $lokasi = $params['lokasi'];
            $kodNegeri = $params['kodNegeri'];
            $bandar = $params['bandar'];
            $sahYt = $params['sahYt'];

            if (Class_db::getInstance()->db_count('ref_poskod', array('poskod'=>$poskod, 'lokasi'=>$lokasi, 'kod_negeri'=>$kodNegeri)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_POSKOD_EXIST, 31);
            }

            return Class_db::getInstance()->db_insert('ref_poskod', array('poskod'=>$poskod, 'lokasi'=>$lokasi, 'kod_negeri'=>$kodNegeri, 'bandar'=>$bandar, 'sah_yt'=>$sahYt));
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
    public function update_poskod ($putVars) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($this->poskodId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter poskodId empty');
            }
            if (!isset($putVars['poskod']) || empty($putVars['poskod'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter poskod empty');
            }
            if (!isset($putVars['lokasi']) || empty($putVars['lokasi'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter lokasi empty');
            }
            if (!isset($putVars['kodNegeri']) || empty($putVars['kodNegeri'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter kodNegeri empty');
            }
            if (!isset($putVars['bandar']) || empty($putVars['bandar'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter bandar empty');
            }
            if (!isset($putVars['sahYt']) || empty($putVars['sahYt'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter sahYt empty');
            }

            $poskod = $putVars['poskod'];
            $lokasi = $putVars['lokasi'];
            $kodNegeri = $putVars['kodNegeri'];
            $bandar = $putVars['bandar'];
            $sahYt = $putVars['sahYt'];

            if (Class_db::getInstance()->db_count('ref_poskod', array('poskod'=>$poskod, 'lokasi'=>$lokasi, 'kod_negeri'=>$kodNegeri, 'poskod_id'=>'<>'.$this->poskodId)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_POSKOD_EXIST, 31);
            }

            Class_db::getInstance()->db_update('ref_poskod', array('poskod'=>$poskod, 'lokasi'=>$lokasi, 'kod_negeri'=>$kodNegeri, 'bandar'=>$bandar, 'sah_yt'=>$sahYt), array('poskod_id'=>$this->poskodId));
        }
        catch(Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

}