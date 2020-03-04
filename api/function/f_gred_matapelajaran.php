<?php

class Class_gred_matapelajaran {

    private $constant;
    private $fn_general;
    private $gredId;
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
    public function get_gred_matapelajaran_list () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            $result = array();
            $dbResults = Class_db::getInstance()->db_select('ref_gred_matapelajaran');
            foreach ($dbResults as $dbResult) {
                $rowResult['gredId'] = $dbResult['GRED_ID'];
                $rowResult['gred'] = $dbResult['GRED'];
                $rowResult['jenis'] = $dbResult['JENIS'];
                $rowResult['tkt'] = $dbResult['TKT'];
                $rowResult['namaPeperiksaan'] = $this->fn_general->clear_null($dbResult['NAMA_PEPERIKSAAN']);
                $rowResult['susunan'] = $this->fn_general->clear_null($dbResult['SUSUNAN']);
                $rowResult['idPencipta'] = $this->fn_general->clear_null($dbResult['ID_PENCIPTA']);
                $rowResult['tarikhCipta'] = $this->fn_general->clear_null($dbResult['TARIKH_CIPTA']);
                $rowResult['pengguna'] = $this->fn_general->clear_null($dbResult['PENGGUNA']);
                $rowResult['tarikhUbahsuai'] = $this->fn_general->clear_null($dbResult['TARIKH_UBAHSUAI']);
                $rowResult['sahYt'] = $this->fn_general->clear_null($dbResult['SAH_YT'], 'T');
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
    public function get_gred_matapelajaran () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            if (empty($this->gredId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter gredId empty');
            }

            $result = array();
            $dbResult = Class_db::getInstance()->db_select_single('ref_gred_matapelajaran', array('GRED_ID'=>$this->gredId), null, 1);
            $result['gredId'] = $dbResult['GRED_ID'];
            $result['gred'] = $dbResult['GRED'];
            $result['jenis'] = $dbResult['JENIS'];
            $result['tkt'] = $dbResult['TKT'];
            $result['namaPeperiksaan'] = $this->fn_general->clear_null($dbResult['NAMA_PEPERIKSAAN']);
            $result['susunan'] = $this->fn_general->clear_null($dbResult['SUSUNAN']);
            $result['idPencipta'] = $this->fn_general->clear_null($dbResult['ID_PENCIPTA']);
            $result['tarikhCipta'] = $this->fn_general->clear_null($dbResult['TARIKH_CIPTA']);
            $result['pengguna'] = $this->fn_general->clear_null($dbResult['PENGGUNA']);
            $result['tarikhUbahsuai'] = $this->fn_general->clear_null($dbResult['TARIKH_UBAHSUAI']);
            $result['sahYt'] = $this->fn_general->clear_null($dbResult['SAH_YT'], 'T');

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
    public function add_gred_matapelajaran ($params=array()) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($params)) {
                throw new Exception('['.__LINE__.'] - Array params empty');
            }
            if (!array_key_exists('gred', $params) || empty($params['gred'])) {
                throw new Exception('['.__LINE__.'] - Parameter gred empty');
            }
            if (!array_key_exists('jenis', $params) || empty($params['jenis'])) {
                throw new Exception('['.__LINE__.'] - Parameter jenis empty');
            }
            if (!array_key_exists('tkt', $params) || empty($params['tkt'])) {
                throw new Exception('['.__LINE__.'] - Parameter tkt empty');
            }
            if (!array_key_exists('namaPeperiksaan', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter namaPeperiksaan not exist');
            }
            if (!array_key_exists('susunan', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter susunan not exist');
            }
            if (!array_key_exists('sahYt', $params) || empty($params['sahYt'])) {
                throw new Exception('['.__LINE__.'] - Parameter sahYt empty');
            }

            $gred = $params['gred'];
            $jenis = $params['jenis'];
            $tkt = $params['tkt'];
            $namaPeperiksaan = $params['namaPeperiksaan'];
            $susunan = $params['susunan'];
            $sahYt = $params['sahYt'];

            if (Class_db::getInstance()->db_count('ref_gred_matapelajaran', array('GRED'=>$gred, 'JENIS'=>$jenis, 'TKT'=>$tkt)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_GRED_MATA_PELAJARAN_EXIST, 31);
            }

            $user = Class_db::getInstance()->db_select_single('sys_user', array('user_id'=>$this->userId), null, 1);
            return Class_db::getInstance()->db_insert('ref_gred_matapelajaran', array('GRED'=>$gred, 'JENIS'=>$jenis, 'TKT'=>$tkt, 'NAMA_PEPERIKSAAN'=>$namaPeperiksaan, 'SUSUNAN'=>$susunan, 'SAH_YT'=>$sahYt,
                'ID_PENCIPTA'=>$user['user_name'], 'TARIKH_CIPTA'=>'Now()', 'PENGGUNA'=>$user['user_first_name'],  'TARIKH_UBAHSUAI'=>'Now()'));
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
    public function update_gred_matapelajaran ($putVars) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($this->gredId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter gredId empty');
            }
            if (!isset($putVars['gred']) || empty($putVars['gred'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter gred empty');
            }
            if (!isset($putVars['jenis']) || empty($putVars['jenis'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter jenis empty');
            }
            if (!isset($putVars['tkt']) || empty($putVars['tkt'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter tkt empty');
            }
            if (!isset($putVars['namaPeperiksaan'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter namaPeperiksaan not exist');
            }
            if (!isset($putVars['susunan'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter susunan not exist');
            }
            if (!isset($putVars['sahYt']) || empty($putVars['sahYt'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter sahYt empty');
            }

            $gred = $putVars['gred'];
            $jenis = $putVars['jenis'];
            $tkt = $putVars['tkt'];
            $namaPeperiksaan = $putVars['namaPeperiksaan'];
            $susunan = $putVars['susunan'];
            $sahYt = $putVars['sahYt'];

            if (Class_db::getInstance()->db_count('ref_gred_matapelajaran', array('GRED'=>$gred, 'JENIS'=>$jenis, 'TKT'=>$tkt, 'GRED_ID'=>'<>'.$this->gredId)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_GRED_MATA_PELAJARAN_EXIST, 31);
            }

            Class_db::getInstance()->db_update('ref_gred_matapelajaran', array('GRED'=>$gred, 'JENIS'=>$jenis, 'TKT'=>$tkt, 'NAMA_PEPERIKSAAN'=>$namaPeperiksaan, 'SUSUNAN'=>$susunan, 'SAH_YT'=>$sahYt,  'TARIKH_UBAHSUAI'=>'Now()'), array('GRED_ID'=>$this->gredId));
        }
        catch(Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

}