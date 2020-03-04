<?php

class Class_kategori_institusi {

    private $constant;
    private $fn_general;
    private $kategoriInstitusiId;

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
    public function get_kategori_institusi_list () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            $result = array();
            $dbResults = Class_db::getInstance()->db_select('ref_kategori_institusi');
            foreach ($dbResults as $dbResult) {
                $rowResult['kategoriInstitusiId'] = $dbResult['KATEGORI_INSTITUSI_ID'];
                $rowResult['jenisInstitusi'] = $dbResult['JENIS_INSTITUSI'];
                $rowResult['diskripsi'] = $this->fn_general->clear_null($dbResult['DISKRIPSI']);
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
    public function get_kategori_institusi () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            if (empty($this->kategoriInstitusiId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter kategoriInstitusiId empty');
            }

            $result = array();
            $dbResult = Class_db::getInstance()->db_select_single('ref_kategori_institusi', array('KATEGORI_INSTITUSI_ID'=>$this->kategoriInstitusiId), null, 1);
            $result['kategoriInstitusiId'] = $dbResult['KATEGORI_INSTITUSI_ID'];
            $result['jenisInstitusi'] = $dbResult['JENIS_INSTITUSI'];
            $result['diskripsi'] = $this->fn_general->clear_null($dbResult['DISKRIPSI']);
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
    public function add_kategori_institusi ($params=array()) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($params)) {
                throw new Exception('['.__LINE__.'] - Array params empty');
            }
            if (!array_key_exists('jenisInstitusi', $params) || empty($params['jenisInstitusi'])) {
                throw new Exception('['.__LINE__.'] - Parameter jenisInstitusi empty');
            }
            if (!array_key_exists('diskripsi', $params) || empty($params['diskripsi'])) {
                throw new Exception('['.__LINE__.'] - Parameter diskripsi empty');
            }
            if (!array_key_exists('sahYt', $params) || empty($params['sahYt'])) {
                throw new Exception('['.__LINE__.'] - Parameter sahYt empty');
            }

            $jenisInstitusi = $params['jenisInstitusi'];
            $diskripsi = $params['diskripsi'];
            $sahYt = $params['sahYt'];

            if (Class_db::getInstance()->db_count('ref_kategori_institusi', array('JENIS_INSTITUSI'=>$jenisInstitusi)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_KATEGORI_INSTITUSI_KOD_EXIST, 31);
            }
            if (Class_db::getInstance()->db_count('ref_kategori_institusi', array('DISKRIPSI'=>$diskripsi)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_KATEGORI_INSTITUSI_EXIST, 31);
            }

            return Class_db::getInstance()->db_insert('ref_kategori_institusi', array('JENIS_INSTITUSI'=>$jenisInstitusi, 'DISKRIPSI'=>$diskripsi, 'sah_yt'=>$sahYt));
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
    public function update_kategori_institusi ($putVars) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($this->kategoriInstitusiId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter kategoriInstitusiId empty');
            }
            if (!isset($putVars['diskripsi']) || empty($putVars['diskripsi'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter DISKRIPSI empty');
            }
            if (!isset($putVars['sahYt']) || empty($putVars['sahYt'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter sahYt empty');
            }

            $diskripsi = $putVars['diskripsi'];
            $sahYt = $putVars['sahYt'];

            if (Class_db::getInstance()->db_count('ref_kategori_institusi', array('DISKRIPSI'=>$diskripsi, 'KATEGORI_INSTITUSI_ID'=>'<>'.$this->kategoriInstitusiId)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_KATEGORI_INSTITUSI_EXIST, 31);
            }

            Class_db::getInstance()->db_update('ref_kategori_institusi', array('DISKRIPSI'=>$diskripsi, 'sah_yt'=>$sahYt), array('KATEGORI_INSTITUSI_ID'=>$this->kategoriInstitusiId));
        }
        catch(Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

}