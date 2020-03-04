<?php

class Class_bekas_pol_ten {

    private $constant;
    private $fn_general;
    private $bekasPolTenId;

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
    public function get_bekas_pol_ten_list () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            $result = array();
            $dbResults = Class_db::getInstance()->db_select('ref_bekas_pol_ten');
            foreach ($dbResults as $dbResult) {
                $rowResult['bekasPolTenId'] = $dbResult['bekas_pol_ten_id'];
                $rowResult['kodBekasPolisTentera'] = $dbResult['kod_bekas_polis_tentera'];
                $rowResult['kodPangkat'] = $dbResult['kod_pangkat'];
                $rowResult['diskripsi'] = $this->fn_general->clear_null($dbResult['diskripsi']);
                $rowResult['kodLain'] = $this->fn_general->clear_null($dbResult['kod_lain']);
                $rowResult['mainInd'] = $this->fn_general->clear_null($dbResult['main_ind']);
                $rowResult['susunanKanan'] = $this->fn_general->clear_null($dbResult['susunan_kanan']);
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
    public function get_bekas_pol_ten () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            if (empty($this->bekasPolTenId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter bekasPolTenId empty');
            }

            $result = array();
            $dbResult = Class_db::getInstance()->db_select_single('ref_bekas_pol_ten', array('bekas_pol_ten_id'=>$this->bekasPolTenId), null, 1);
            $result['bekasPolTenId'] = $dbResult['bekas_pol_ten_id'];
            $result['kodBekasPolisTentera'] = $dbResult['kod_bekas_polis_tentera'];
            $result['kodPangkat'] = $dbResult['kod_pangkat'];
            $result['diskripsi'] = $this->fn_general->clear_null($dbResult['diskripsi']);
            $result['kodLain'] = $this->fn_general->clear_null($dbResult['kod_lain']);
            $result['mainInd'] = $this->fn_general->clear_null($dbResult['main_ind']);
            $result['susunanKanan'] = $this->fn_general->clear_null($dbResult['susunan_kanan']);
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
    public function add_bekas_pol_ten ($params=array()) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($params)) {
                throw new Exception('['.__LINE__.'] - Array params empty');
            }
            if (!array_key_exists('kodBekasPolisTentera', $params) || empty($params['kodBekasPolisTentera'])) {
                throw new Exception('['.__LINE__.'] - Parameter kodBekasPolisTentera empty');
            }
            if (!array_key_exists('kodPangkat', $params) || $params['kodPangkat'] === '') {
                throw new Exception('['.__LINE__.'] - Parameter kodPangkat not exist');
            }
            if (!array_key_exists('diskripsi', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter diskripsi not exist');
            }
            if (!array_key_exists('kodLain', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter kodLain not exist');
            }
            if (!array_key_exists('mainInd', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter mainInd not exist');
            }
            if (!array_key_exists('susunanKanan', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter susunanKanan not exist');
            }
            if (!array_key_exists('sahYt', $params) || empty($params['sahYt'])) {
                throw new Exception('['.__LINE__.'] - Parameter sahYt empty');
            }

            $kodBekasPolisTentera = $params['kodBekasPolisTentera'];
            $kodPangkat = $params['kodPangkat'];
            $diskripsi = $params['diskripsi'];
            $kodLain = $params['kodLain'];
            $mainInd = $params['mainInd'];
            $susunanKanan = $params['susunanKanan'];
            $sahYt = $params['sahYt'];

            if (Class_db::getInstance()->db_count('ref_bekas_pol_ten', array('kod_bekas_polis_tentera'=>$kodBekasPolisTentera, 'kod_pangkat'=>$kodPangkat)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_BEKAS_POLIS_TENTERA_EXIST, 31);
            }

            return Class_db::getInstance()->db_insert('ref_bekas_pol_ten', array('kod_bekas_polis_tentera'=>$kodBekasPolisTentera, 'kod_pangkat'=>$kodPangkat, 'diskripsi'=>$diskripsi, 'kod_lain'=>$kodLain,
                'main_ind'=>$mainInd, 'susunan_kanan'=>$susunanKanan, 'sah_yt'=>$sahYt));
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
    public function update_bekas_pol_ten ($putVars) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($this->bekasPolTenId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter bekasPolTenId empty');
            }
            if (!isset($putVars['kodBekasPolisTentera']) || empty($putVars['kodBekasPolisTentera'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter kodBekasPolisTentera empty');
            }
            if (!isset($putVars['kodPangkat']) || $putVars['kodPangkat'] === '') {
                throw new Exception('[' . __LINE__ . '] - Parameter kodPangkat empty');
            }
            if (!isset($putVars['diskripsi'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter diskripsi not exist');
            }
            if (!isset($putVars['kodLain'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter kodLain not exist');
            }
            if (!isset($putVars['mainInd'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter mainInd not exist');
            }
            if (!isset($putVars['susunanKanan'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter susunanKanan not exist');
            }
            if (!isset($putVars['sahYt']) || empty($putVars['sahYt'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter sahYt empty');
            }

            $kodBekasPolisTentera = $putVars['kodBekasPolisTentera'];
            $kodPangkat = $putVars['kodPangkat'];
            $diskripsi = $putVars['diskripsi'];
            $kodLain = $putVars['kodLain'];
            $mainInd = $putVars['mainInd'];
            $susunanKanan = $putVars['susunanKanan'];
            $sahYt = $putVars['sahYt'];

            if (Class_db::getInstance()->db_count('ref_bekas_pol_ten', array('kod_bekas_polis_tentera'=>$kodBekasPolisTentera, 'kod_pangkat'=>$kodPangkat, 'bekas_pol_ten_id'=>'<>'.$this->bekasPolTenId)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_BEKAS_POLIS_TENTERA_EXIST, 31);
            }

            Class_db::getInstance()->db_update('ref_bekas_pol_ten', array('kod_bekas_polis_tentera'=>$kodBekasPolisTentera, 'kod_pangkat'=>$kodPangkat, 'diskripsi'=>$diskripsi, 'kod_lain'=>$kodLain,
                'main_ind'=>$mainInd, 'susunan_kanan'=>$susunanKanan, 'sah_yt'=>$sahYt), array('bekas_pol_ten_id'=>$this->bekasPolTenId));
        }
        catch(Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

}