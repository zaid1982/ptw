<?php

class Class_institusi {

    private $constant;
    private $fn_general;
    private $institusiId;
    private $userId;
    private $kategoriInstitusi;
    private $arrJenisInstitusi;

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
    private function setup_kategori_institusi () {
        $this->kategoriInstitusi = Class_db::getInstance()->db_select('ref_kategori_institusi', array(), null, null, 1);
        foreach ($this->kategoriInstitusi as $result) {
            $this->arrJenisInstitusi[intval($result['KATEGORI_INSTITUSI_ID'])] = $result['JENIS_INSTITUSI'];
        }
    }

    /**
     * @param $jenisInstitusi
     * @return string
     */
    private function get_kategori_institusi_id ($jenisInstitusi) {
        $kategoriInstitusiId = '';
        foreach ($this->kategoriInstitusi as $result) {
            if ($result['JENIS_INSTITUSI'] === $jenisInstitusi) {
                $kategoriInstitusiId = $result['KATEGORI_INSTITUSI_ID'];
                break;
            }
        }
        return $kategoriInstitusiId;
    }

    /**
     * @return array
     * @throws Exception
     */
    public function get_institusi_list () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            $this->setup_kategori_institusi();
            $result = array();
            $dbResults = Class_db::getInstance()->db_select('ref_institusi');
            foreach ($dbResults as $dbResult) {
                $rowResult['institusiId'] = $dbResult['INSTITUSI_ID'];
                $rowResult['kod'] = $dbResult['KOD'];
                $rowResult['diskripsi'] = $this->fn_general->clear_null($dbResult['DISKRIPSI']);
                $rowResult['kategoriInstitusiId'] = $this->get_kategori_institusi_id($dbResult['JENIS_INSTITUSI']);
                $rowResult['negara'] = $this->fn_general->clear_null($dbResult['NEGARA']);
                $rowResult['kategori'] = $this->fn_general->clear_null($dbResult['KATEGORI']);
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
    public function get_institusi () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            if (empty($this->institusiId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter institusiId empty');
            }

            $this->setup_kategori_institusi();
            $result = array();
            $dbResult = Class_db::getInstance()->db_select_single('ref_institusi', array('INSTITUSI_ID'=>$this->institusiId), null, 1);
            $result['institusiId'] = $dbResult['INSTITUSI_ID'];
            $result['kod'] = $dbResult['KOD'];
            $result['diskripsi'] = $this->fn_general->clear_null($dbResult['DISKRIPSI']);
            $result['kategoriInstitusiId'] = $this->get_kategori_institusi_id($dbResult['JENIS_INSTITUSI']);
            $result['negara'] = $this->fn_general->clear_null($dbResult['NEGARA']);
            $result['kategori'] = $this->fn_general->clear_null($dbResult['KATEGORI']);
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
    public function add_institusi ($params=array()) {
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
            if (!array_key_exists('kategoriInstitusiId', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter kategoriInstitusiId not exist');
            }
            if (!array_key_exists('negara', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter negara not exist');
            }
            if (!array_key_exists('kategori', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter kategori not exist');
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

            $this->setup_kategori_institusi();
            $kod = $params['kod'];
            $diskripsi = $params['diskripsi'];
            $jenisInstitusi = $this->arrJenisInstitusi[$params['kategoriInstitusiId']];
            $negara = $params['negara'];
            $kategori = $params['kategori'];
            $noPemerolehan = $params['noPemerolehan'];
            $gabYt = $params['gabYt'];
            $sahYt = $params['sahYt'];

            if (Class_db::getInstance()->db_count('ref_institusi', array('KOD'=>$kod)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_INSTITUSI_KOD_EXIST, 31);
            }

            $user = Class_db::getInstance()->db_select_single('sys_user', array('user_id'=>$this->userId), null, 1);
            return Class_db::getInstance()->db_insert('ref_institusi', array('KOD'=>$kod, 'DISKRIPSI'=>$diskripsi, 'JENIS_INSTITUSI'=>$jenisInstitusi, 'NEGARA'=>$negara, 'KATEGORI'=>$kategori, 'NO_PEMEROLEHAN'=>$noPemerolehan, 'GAB_YT'=>$gabYt, 'SAH_YT'=>$sahYt,
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
    public function update_institusi ($putVars) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($this->institusiId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter institusiId empty');
            }
            if (!isset($putVars['kod']) || empty($putVars['kod'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter gred empty');
            }
            if (!isset($putVars['diskripsi'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter diskripsi not exist');
            }
            if (!isset($putVars['kategoriInstitusiId'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter kategoriInstitusiId not exist');
            }
            if (!isset($putVars['negara'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter negara not exist');
            }
            if (!isset($putVars['kategori'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter kategori not exist');
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

            $this->setup_kategori_institusi();
            $kod = $putVars['kod'];
            $diskripsi = $putVars['diskripsi'];
            $jenisInstitusi = $this->arrJenisInstitusi[intval($putVars['kategoriInstitusiId'])];
            $negara = $putVars['negara'];
            $kategori = $putVars['kategori'];
            $noPemerolehan = $putVars['noPemerolehan'];
            $gabYt = $putVars['gabYt'];
            $sahYt = $putVars['sahYt'];

            if (Class_db::getInstance()->db_count('ref_institusi', array('KOD'=>$kod, 'INSTITUSI_ID'=>'<>'.$this->institusiId)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_INSTITUSI_KOD_EXIST, 31);
            }

            Class_db::getInstance()->db_update('ref_institusi', array('KOD'=>$kod, 'DISKRIPSI'=>$diskripsi, 'JENIS_INSTITUSI'=>$jenisInstitusi, 'NEGARA'=>$negara, 'KATEGORI'=>$kategori, 'NO_PEMEROLEHAN'=>$noPemerolehan, 'GAB_YT'=>$gabYt, 'SAH_YT'=>$sahYt,  'TARIKH_UBAHSUAI'=>'Now()'), array('INSTITUSI_ID'=>$this->institusiId));
        }
        catch(Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

}