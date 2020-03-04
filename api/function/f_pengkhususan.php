<?php

class Class_pengkhususan {

    private $constant;
    private $fn_general;
    private $pengkhususanId;
    private $userId;
    private $jenisPengkhususan;
    private $arrJenisPengkhususan;

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
     *
     */
    private function setup_jenis_pengkhususan () {
        $this->jenisPengkhususan = Class_db::getInstance()->db_select('ref_jenis_pengkhususan', array(), null, null, 1);
        foreach ($this->jenisPengkhususan as $result) {
            $this->arrJenisPengkhususan[intval($result['JENIS_PENGKHUSUSAN_ID'])] = $result['KOD'];
        }
    }

    /**
     * @param $jenisPengkhususan
     * @return string
     */
    private function get_jenis_pengkhususan_id ($jenisPengkhususan) {
        $jenisPengkhususanId = '';
        foreach ($this->jenisPengkhususan as $result) {
            if ($result['KOD'] === $jenisPengkhususan) {
                $jenisPengkhususanId = $result['JENIS_PENGKHUSUSAN_ID'];
                break;
            }
        }
        return $jenisPengkhususanId;
    }

    /**
     * @return array
     * @throws Exception
     */
    public function get_pengkhususan_list () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            $this->setup_jenis_pengkhususan();
            $result = array();
            $dbResults = Class_db::getInstance()->db_select('ref_pengkhususan');
            foreach ($dbResults as $dbResult) {
                $rowResult['pengkhususanId'] = $dbResult['PENGKHUSUSAN_ID'];
                $rowResult['kod'] = $dbResult['KOD'];
                $rowResult['diskripsi'] = $this->fn_general->clear_null($dbResult['DISKRIPSI']);
                $rowResult['jenisPengkhususanId'] = $this->get_jenis_pengkhususan_id($dbResult['JENIS']);
                $rowResult['bidang'] = $this->fn_general->clear_null($dbResult['BIDANG']);
                $rowResult['noPemerolehan'] = $this->fn_general->clear_null($dbResult['NO_PEMEROLEHAN']);
                $rowResult['gabYt'] = $this->fn_general->clear_null($dbResult['GAB_YT']);
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
    public function get_pengkhususan () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            if (empty($this->pengkhususanId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter pengkhususanId empty');
            }

            $this->setup_jenis_pengkhususan();
            $result = array();
            $dbResult = Class_db::getInstance()->db_select_single('ref_pengkhususan', array('PENGKHUSUSAN_ID'=>$this->pengkhususanId), null, 1);
            $result['pengkhususanId'] = $dbResult['PENGKHUSUSAN_ID'];
            $result['kod'] = $dbResult['KOD'];
            $result['diskripsi'] = $this->fn_general->clear_null($dbResult['DISKRIPSI']);
            $result['jenisPengkhususanId'] = $this->get_jenis_pengkhususan_id($dbResult['JENIS']);
            $result['bidang'] = $this->fn_general->clear_null($dbResult['BIDANG']);
            $result['noPemerolehan'] = $this->fn_general->clear_null($dbResult['NO_PEMEROLEHAN']);
            $result['gabYt'] = $this->fn_general->clear_null($dbResult['GAB_YT']);
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
    public function add_pengkhususan ($params=array()) {
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
            if (!array_key_exists('jenisPengkhususanId', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter jenisPengkhususanId not exist');
            }
            if (!array_key_exists('bidang', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter bidang not exist');
            }
            if (!array_key_exists('noPemerolehan', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter noPemerolehan not exist');
            }
            if (!array_key_exists('gabYt', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter gabYt not exist');
            }
            if (!array_key_exists('sahYt', $params) || empty($params['sahYt'])) {
                throw new Exception('['.__LINE__.'] - Parameter sahYt empty');
            }

            $this->setup_jenis_pengkhususan();
            $kod = $params['kod'];
            $diskripsi = $params['diskripsi'];
            $jenis = $this->arrJenisPengkhususan[$params['jenisPengkhususanId']];
            $bidang = $params['bidang'];
            $noPemerolehan = $params['noPemerolehan'];
            $gabYt = $params['gabYt'];
            $sahYt = $params['sahYt'];

            if (Class_db::getInstance()->db_count('ref_pengkhususan', array('KOD'=>$kod)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_PENGKHUSUSAN_KOD_EXIST, 31);
            }

            $user = Class_db::getInstance()->db_select_single('sys_user', array('user_id'=>$this->userId), null, 1);
            return Class_db::getInstance()->db_insert('ref_pengkhususan', array('KOD'=>$kod, 'DISKRIPSI'=>$diskripsi, 'JENIS'=>$jenis, 'BIDANG'=>$bidang, 'NO_PEMEROLEHAN'=>$noPemerolehan, 'GAB_YT'=>$gabYt, 'SAH_YT'=>$sahYt,
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
    public function update_pengkhususan ($putVars) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($this->pengkhususanId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter pengkhususanId empty');
            }
            if (!isset($putVars['kod']) || empty($putVars['kod'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter gred empty');
            }
            if (!isset($putVars['diskripsi'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter diskripsi not exist');
            }
            if (!isset($putVars['jenisPengkhususanId'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter jenisPengkhususanId not exist');
            }
            if (!isset($putVars['bidang'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter bidang not exist');
            }
            if (!isset($putVars['noPemerolehan'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter noPemerolehan not exist');
            }
            if (!isset($putVars['gabYt'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter gabYt not exist');
            }
            if (!isset($putVars['sahYt']) || empty($putVars['sahYt'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter sahYt empty');
            }

            $this->setup_jenis_pengkhususan();
            $kod = $putVars['kod'];
            $diskripsi = $putVars['diskripsi'];
            $jenis = $this->arrJenisPengkhususan[intval($putVars['jenisPengkhususanId'])];
            $bidang = $putVars['bidang'];
            $noPemerolehan = $putVars['noPemerolehan'];
            $gabYt = $putVars['gabYt'];
            $sahYt = $putVars['sahYt'];

            if (Class_db::getInstance()->db_count('ref_pengkhususan', array('KOD'=>$kod, 'PENGKHUSUSAN_ID'=>'<>'.$this->pengkhususanId)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_PENGKHUSUSAN_KOD_EXIST, 31);
            }

            Class_db::getInstance()->db_update('ref_pengkhususan', array('KOD'=>$kod, 'DISKRIPSI'=>$diskripsi, 'JENIS'=>$jenis, 'BIDANG'=>$bidang, 'NO_PEMEROLEHAN'=>$noPemerolehan, 'GAB_YT'=>$gabYt, 'SAH_YT'=>$sahYt,  'TARIKH_UBAHSUAI'=>'Now()'), array('PENGKHUSUSAN_ID'=>$this->pengkhususanId));
        }
        catch(Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

}