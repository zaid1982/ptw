<?php

class Class_bahasa {

    private $constant;
    private $fn_general;
    private $bahasaId;
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
    public function get_bahasa_list () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            $result = array();
            $dbResults = Class_db::getInstance()->db_select('ref_bahasa');
            foreach ($dbResults as $dbResult) {
                $rowResult['bahasaId'] = $dbResult['bahasa_id'];
                $rowResult['kod'] = $dbResult['kod'];
                $rowResult['diskripsi'] = $this->fn_general->clear_null($dbResult['diskripsi']);
                $rowResult['gabYt'] = $this->fn_general->clear_null($dbResult['gab_yt']);
                $rowResult['noPemerolehan'] = $this->fn_general->clear_null($dbResult['no_pemerolehan']);
                $rowResult['idPencipta'] = $this->fn_general->clear_null($dbResult['id_pencipta']);
                $rowResult['tarikhCipta'] = $this->fn_general->clear_null($dbResult['tarikh_cipta']);
                $rowResult['pengguna'] = $this->fn_general->clear_null($dbResult['pengguna']);
                $rowResult['tarikhUbahsuai'] = $this->fn_general->clear_null($dbResult['tarikh_ubahsuai']);
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
    public function get_bahasa () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            if (empty($this->bahasaId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter bahasaId empty');
            }

            $result = array();
            $dbResult = Class_db::getInstance()->db_select_single('ref_bahasa', array('bahasa_id'=>$this->bahasaId), null, 1);
            $result['bahasaId'] = $dbResult['bahasa_id'];
            $result['kod'] = $dbResult['kod'];
            $result['diskripsi'] = $this->fn_general->clear_null($dbResult['diskripsi']);
            $result['gabYt'] = $this->fn_general->clear_null($dbResult['gab_yt']);
            $result['noPemerolehan'] = $this->fn_general->clear_null($dbResult['no_pemerolehan']);
            $result['idPencipta'] = $this->fn_general->clear_null($dbResult['id_pencipta']);
            $result['tarikhCipta'] = $this->fn_general->clear_null($dbResult['tarikh_cipta']);
            $result['pengguna'] = $this->fn_general->clear_null($dbResult['pengguna']);
            $result['tarikhUbahsuai'] = $this->fn_general->clear_null($dbResult['tarikh_ubahsuai']);
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
    public function add_bahasa ($params=array()) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($this->userId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter userId empty');
            }
            if (empty($params)) {
                throw new Exception('['.__LINE__.'] - Array params empty');
            }
            if (!array_key_exists('kod', $params) || empty($params['kod'])) {
                throw new Exception('['.__LINE__.'] - Parameter kod empty');
            }
            if (!array_key_exists('diskripsi', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter diskripsi not exist');
            }
            if (!array_key_exists('gabYt', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter gabYt not exist');
            }
            if (!array_key_exists('noPemerolehan', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter noPemerolehan not exist');
            }
            if (!array_key_exists('sahYt', $params) || empty($params['sahYt'])) {
                throw new Exception('['.__LINE__.'] - Parameter sahYt empty');
            }

            $kod = $params['kod'];
            $diskripsi = $params['diskripsi'];
            $gabYt = $params['gabYt'];
            $noPemerolehan = $params['noPemerolehan'];
            $sahYt = $params['sahYt'];

            if (Class_db::getInstance()->db_count('ref_bahasa', array('kod'=>$kod)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_BAHASA_KOD_EXIST, 31);
            }

            $user = Class_db::getInstance()->db_select_single('sys_user', array('user_id'=>$this->userId), null, 1);
            return Class_db::getInstance()->db_insert('ref_bahasa', array('kod'=>$kod, 'diskripsi'=>$diskripsi, 'gab_yt'=>$gabYt, 'no_pemerolehan'=>$noPemerolehan, 'sah_yt'=>$sahYt,
                'id_pencipta'=>$user['user_name'], 'tarikh_cipta'=>'Now()', 'pengguna'=>$user['user_first_name'],  'tarikh_ubahsuai'=>'Now()'));
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
    public function update_bahasa ($putVars) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($this->bahasaId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter bahasaId empty');
            }
            if (!isset($putVars['kod']) || empty($putVars['kod'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter gred empty');
            }
            if (!isset($putVars['diskripsi'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter diskripsi not exist');
            }
            if (!isset($putVars['gabYt'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter gabYt not exist');
            }
            if (!isset($putVars['noPemerolehan'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter noPemerolehan not exist');
            }
            if (!isset($putVars['sahYt']) || empty($putVars['sahYt'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter sahYt empty');
            }

            $kod = $putVars['kod'];
            $diskripsi = $putVars['diskripsi'];
            $gabYt = $putVars['gabYt'];
            $noPemerolehan = $putVars['noPemerolehan'];
            $sahYt = $putVars['sahYt'];

            if (Class_db::getInstance()->db_count('ref_bahasa', array('kod'=>$kod, 'bahasa_id'=>'<>'.$this->bahasaId)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_BAHASA_KOD_EXIST, 31);
            }

            Class_db::getInstance()->db_update('ref_bahasa', array('kod'=>$kod, 'diskripsi'=>$diskripsi, 'gab_yt'=>$gabYt, 'no_pemerolehan'=>$noPemerolehan, 'sah_yt'=>$sahYt,  'tarikh_ubahsuai'=>'Now()'), array('bahasa_id'=>$this->bahasaId));
        }
        catch(Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

}