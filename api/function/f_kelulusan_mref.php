<?php

class Class_kelulusan_mref {

    private $constant;
    private $fn_general;
    private $kelulusanId;
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
     * @param $input
     * @return string
     */
    private function get_jenis ($input) {
        $output = '';
        if ($input === '1') {
            $output = 'PROFESIONAL DAN IKHTISAS';
        } else if  ($input === '2') {
            $output = 'SEDANG BERKHIDMAT';
        } else if  ($input === '3') {
            $output = 'PERUBATAN';
        }
        return $output;
    }

    /**
     * @param $input
     * @return string
     */
    private function get_kategori ($input) {
        $output = '';
        if ($input === 'U') {
            $output = 'PERUBATAN';
        } else if  ($input === 'V') {
            $output = 'SVM';
        } else if  ($input === 'K') {
            $output = 'SKM';
        } else if  ($input === 'B') {
            $output = 'SEDANG BERKHIDMAT';
        } else if  ($input === 'P') {
            $output = 'PROFESIONAL';
        } else if  ($input === 'I') {
            $output = 'IKHTISAS (GURU)';
        }
        return $output;
    }

    /**
     * @return array
     * @throws Exception
     */
    public function get_kelulusan_mref_list () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            $result = array();
            $dbResults = Class_db::getInstance()->db_select('mref_kelulusan');
            foreach ($dbResults as $dbResult) {
                $rowResult['kelulusanId'] = $dbResult['KELULUSAN_ID'];
                $rowResult['kod'] = $dbResult['KOD'];
                $rowResult['diskripsi'] = $this->fn_general->clear_null($dbResult['DISKRIPSI']);
                $rowResult['gabYt'] = $this->fn_general->clear_null($dbResult['GAB_YT']);
                $rowResult['jenis'] = $this->get_jenis($dbResult['JENIS']);
                $rowResult['noPemerolehan'] = $this->fn_general->clear_null($dbResult['NO_PEMEROLEHAN']);
                $rowResult['kategori'] = $this->get_kategori($dbResult['KATEGORI']);
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
    public function get_kelulusan_mref () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            if (empty($this->kelulusanId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter kelulusanId empty');
            }

            $result = array();
            $dbResult = Class_db::getInstance()->db_select_single('mref_kelulusan', array('KELULUSAN_ID'=>$this->kelulusanId), null, 1);
            $result['kelulusanId'] = $dbResult['KELULUSAN_ID'];
            $result['kod'] = $dbResult['KOD'];
            $result['diskripsi'] = $this->fn_general->clear_null($dbResult['DISKRIPSI']);
            $result['gabYt'] = $this->fn_general->clear_null($dbResult['GAB_YT']);
            $result['jenis'] = $this->fn_general->clear_null($dbResult['JENIS']);
            $result['noPemerolehan'] = $this->fn_general->clear_null($dbResult['NO_PEMEROLEHAN']);
            $result['kategori'] = $this->fn_general->clear_null($dbResult['KATEGORI']);
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
    public function add_kelulusan_mref ($params=array()) {
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
            if (!array_key_exists('jenis', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter jenis not exist');
            }
            if (!array_key_exists('noPemerolehan', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter noPemerolehan not exist');
            }
            if (!array_key_exists('kategori', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter kategori not exist');
            }
            if (!array_key_exists('sahYt', $params) || empty($params['sahYt'])) {
                throw new Exception('['.__LINE__.'] - Parameter sahYt empty');
            }

            $kod = $params['kod'];
            $diskripsi = $params['diskripsi'];
            $gabYt = $params['gabYt'];
            $jenis = $params['jenis'];
            $noPemerolehan = $params['noPemerolehan'];
            $kategori = $params['kategori'];
            $sahYt = $params['sahYt'];

            if (Class_db::getInstance()->db_count('mref_kelulusan', array('KOD'=>$kod)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_KELULUSAN_KOD_EXIST, 31);
            }

            $user = Class_db::getInstance()->db_select_single('sys_user', array('user_id'=>$this->userId), null, 1);
            return Class_db::getInstance()->db_insert('mref_kelulusan', array('KOD'=>$kod, 'DISKRIPSI'=>$diskripsi, 'GAB_YT'=>$gabYt, 'JENIS'=>$jenis, 'NO_PEMEROLEHAN'=>$noPemerolehan, 'KATEGORI'=>$kategori, 'SAH_YT'=>$sahYt,
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
    public function update_kelulusan_mref ($putVars) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($this->kelulusanId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter kelulusanId empty');
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
            if (!isset($putVars['jenis'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter jenis not exist');
            }
            if (!isset($putVars['noPemerolehan'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter noPemerolehan not exist');
            }
            if (!isset($putVars['kategori'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter kategori not exist');
            }
            if (!isset($putVars['sahYt']) || empty($putVars['sahYt'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter sahYt empty');
            }

            $kod = $putVars['kod'];
            $diskripsi = $putVars['diskripsi'];
            $gabYt = $putVars['gabYt'];
            $jenis = $putVars['jenis'];
            $noPemerolehan = $putVars['noPemerolehan'];
            $kategori = $putVars['kategori'];
            $sahYt = $putVars['sahYt'];

            if (Class_db::getInstance()->db_count('mref_kelulusan', array('KOD'=>$kod, 'KELULUSAN_ID'=>'<>'.$this->kelulusanId)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_KELULUSAN_KOD_EXIST, 31);
            }

            Class_db::getInstance()->db_update('mref_kelulusan', array('KOD'=>$kod, 'DISKRIPSI'=>$diskripsi, 'GAB_YT'=>$gabYt, 'JENIS'=>$jenis, 'NO_PEMEROLEHAN'=>$noPemerolehan, 'KATEGORI'=>$kategori, 'SAH_YT'=>$sahYt,  'TARIKH_UBAHSUAI'=>'Now()'), array('KELULUSAN_ID'=>$this->kelulusanId));
        }
        catch(Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

}