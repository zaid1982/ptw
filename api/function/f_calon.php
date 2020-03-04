<?php

class Class_calon {

    private $constant;
    private $fn_general;
    private $idPemohon;
    private $icNo;

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
     * @return mixed
     * @throws Exception
     */
    public function set_idPemohon () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            if (empty($this->icNo)) {
                throw new Exception('[' . __LINE__ . '] - Parameter icNo empty');
            }

            $this->idPemohon = Class_db::getInstance()->db_select_col('calon', array('ic_no'=>$this->icNo), 'id_pemohon');
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
    public function get_calon () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($this->idPemohon) && empty($this->icNo)) {
                throw new Exception('[' . __LINE__ . '] - Parameter idPemohon or icNo empty');
            }

            $result = array();
            $dbResult = Class_db::getInstance()->db_select_single('calon', array('id_pemohon'=>$this->idPemohon, 'ic_no'=>$this->icNo));
            if (empty($dbResult)) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_MYID_NOT_EXIST, 31);
            }
            $result['idPemohon'] = $dbResult['id_pemohon'];
            $result['icNo'] = $this->fn_general->clear_null($dbResult['ic_no']);
            $result['jenisId'] = $this->fn_general->clear_null($dbResult['jenis_id']);
            $result['namaPenuh'] = $this->fn_general->clear_null($dbResult['nama_penuh']);
            $result['dob'] = str_replace('-', '/', $this->fn_general->clear_null($dbResult['dob']));
            $result['agama'] = $this->fn_general->clear_null($dbResult['agama']);
            $result['keturunan'] = $this->fn_general->clear_null($dbResult['keturunan']);
            $result['warganegara'] = $this->fn_general->clear_null($dbResult['warganegara']);
            $result['statusKahwin'] = $this->fn_general->clear_null($dbResult['status_kahwin']);
            $result['operator'] = $this->fn_general->clear_null($dbResult['operator']);
            $result['noTel'] = $this->fn_general->clear_null($dbResult['no_tel']);
            $result['emel'] = $this->fn_general->clear_null($dbResult['emel']);
            $result['tempatlahirPemohon'] = $this->fn_general->clear_null($dbResult['tempatlahir_pemohon']);
            $result['tempatlahirIbu'] = $this->fn_general->clear_null($dbResult['tempatlahir_ibu']);
            $result['tempatlahirBapa'] = $this->fn_general->clear_null($dbResult['tempatlahir_bapa']);
            $result['tinggi'] = $this->fn_general->clear_null($dbResult['tinggi']);
            $result['berat'] = $this->fn_general->clear_null($dbResult['berat']);
            $result['tarafAkademik'] = $this->fn_general->clear_null($dbResult['taraf_akademik']);
            $result['pusatTemuduga'] = $this->fn_general->clear_null($dbResult['pusat_temuduga']);

            return $result;
        }
        catch (Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

    public function get_alamat () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($this->idPemohon)) {
                throw new Exception('[' . __LINE__ . '] - Parameter idPemohon empty');
            }

            $result = array();
            $dbResult = Class_db::getInstance()->db_select_single('alamat_surat', array('id_pemohon'=>$this->idPemohon));
            if (!empty($dbResult)) {
                $result['idPemohon'] = $dbResult['id_pemohon'];
                $result['alamat1'] = $this->fn_general->clear_null($dbResult['alamat1']);
                $result['alamat2'] = $this->fn_general->clear_null($dbResult['alamat2']);
                $result['alamat3'] = $this->fn_general->clear_null($dbResult['alamat3']);
                $result['poskod'] = $this->fn_general->clear_null($dbResult['poskod']);
                $result['bandar'] = $this->fn_general->clear_null($dbResult['bandar']);
                $result['negeri'] = $this->fn_general->clear_null($dbResult['negeri']);
            }

            return $result;
        }
        catch (Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

}