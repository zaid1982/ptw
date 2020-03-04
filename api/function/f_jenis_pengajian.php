<?php

class Class_jenis_pengajian {

    private $constant;
    private $fn_general;
    private $jenisPengajianId;
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
    public function get_jenis_pengajian_list () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            $result = array();
            $dbResults = Class_db::getInstance()->db_select('ref_jenis_pengajian');
            foreach ($dbResults as $dbResult) {
                $rowResult['jenisPengajianId'] = $dbResult['JENIS_PENGAJIAN_ID'];
                $rowResult['kod'] = $this->fn_general->clear_null($dbResult['KOD']);
                $rowResult['diskripsi'] = $this->fn_general->clear_null($dbResult['DISKRIPSI']);
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
    public function get_jenis_pengajian () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            if (empty($this->jenisPengajianId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter jenisPengajianId empty');
            }

            $result = array();
            $dbResult = Class_db::getInstance()->db_select_single('ref_jenis_pengajian', array('JENIS_PENGAJIAN_ID'=>$this->jenisPengajianId), null, 1);
            $result['jenisPengajianId'] = $dbResult['JENIS_PENGAJIAN_ID'];
            $result['kod'] = $this->fn_general->clear_null($dbResult['KOD']);
            $result['diskripsi'] = $this->fn_general->clear_null($dbResult['DISKRIPSI']);
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
    public function add_jenis_pengajian ($params=array()) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($params)) {
                throw new Exception('['.__LINE__.'] - Array params empty');
            }
            if (!array_key_exists('kod', $params) || empty($params['kod'])) {
                throw new Exception('['.__LINE__.'] - Parameter kod empty');
            }
            if (!array_key_exists('diskripsi', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter diskripsi not exist');
            }
            if (!array_key_exists('sahYt', $params) || empty($params['sahYt'])) {
                throw new Exception('['.__LINE__.'] - Parameter sahYt empty');
            }

            $kod = $params['kod'];
            $diskripsi = $params['diskripsi'];
            $sahYt = $params['sahYt'];

            if (Class_db::getInstance()->db_count('ref_jenis_pengajian', array('KOD'=>$kod)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_JENIS_PENGAJIAN_EXIST, 31);
            }

            $user = Class_db::getInstance()->db_select_single('sys_user', array('user_id'=>$this->userId), null, 1);
            return Class_db::getInstance()->db_insert('ref_jenis_pengajian', array('KOD'=>$kod, 'DISKRIPSI'=>$diskripsi, 'SAH_YT'=>$sahYt,
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
    public function update_jenis_pengajian ($putVars) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($this->jenisPengajianId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter jenisPengajianId empty');
            }
            if (!isset($putVars['diskripsi'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter diskripsi not exist');
            }
            if (!isset($putVars['sahYt']) || empty($putVars['sahYt'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter sahYt empty');
            }

            $kod = $putVars['kod'];
            $diskripsi = $putVars['diskripsi'];
            $sahYt = $putVars['sahYt'];

            Class_db::getInstance()->db_update('ref_jenis_pengajian', array('KOD'=>$kod, 'DISKRIPSI'=>$diskripsi, 'SAH_YT'=>$sahYt,  'TARIKH_UBAHSUAI'=>'Now()'), array('JENIS_PENGAJIAN_ID'=>$this->jenisPengajianId));
        }
        catch(Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

}