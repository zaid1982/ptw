<?php

class Class_pusat_td {

    private $constant;
    private $fn_general;
    private $kod;
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
    public function get_pusat_td_list () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            $result = array();
            $dbResults = Class_db::getInstance()->db_select('ref_pusat_td');
            foreach ($dbResults as $dbResult) {
                $rowResult['kod'] = $dbResult['KOD'];
                $rowResult['diskripsi'] = $this->fn_general->clear_null($dbResult['DISKRIPSI']);
                $rowResult['kptKod'] = $this->fn_general->clear_null($dbResult['KPT_KOD']);
                $rowResult['negKod'] = $this->fn_general->clear_null($dbResult['NEG_KOD']);
                $rowResult['jenisPusat'] = $this->fn_general->clear_null($dbResult['JENIS_PUSAT']);
                $rowResult['kodPendek'] = $this->fn_general->clear_null($dbResult['KOD_PENDEK']);
                $rowResult['orderSeq'] = $this->fn_general->clear_null($dbResult['ORDER_SEQ']);
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
    public function get_pusat_td () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            if (empty($this->kod)) {
                throw new Exception('[' . __LINE__ . '] - Parameter kod empty');
            }

            $result = array();
            $dbResult = Class_db::getInstance()->db_select_single('ref_pusat_td', array('KOD'=>$this->kod), null, 1);
            $result['kod'] = $dbResult['KOD'];
            $result['diskripsi'] = $this->fn_general->clear_null($dbResult['DISKRIPSI']);
            $result['kptKod'] = $this->fn_general->clear_null($dbResult['KPT_KOD']);
            $result['negKod'] = $this->fn_general->clear_null($dbResult['NEG_KOD']);
            $result['jenisPusat'] = $this->fn_general->clear_null($dbResult['JENIS_PUSAT']);
            $result['kodPendek'] = $this->fn_general->clear_null($dbResult['KOD_PENDEK']);
            $result['orderSeq'] = $this->fn_general->clear_null($dbResult['ORDER_SEQ']);
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
    public function add_pusat_td ($params=array()) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering ' . __FUNCTION__);
            $constant = $this->constant;

            if (empty($this->userId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter userId empty');
            }
            if (empty($params)) {
                throw new Exception('[' . __LINE__ . '] - Array params empty');
            }
            if (!array_key_exists('kod', $params) || empty($params['kod'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter kod empty');
            }
            if (!array_key_exists('diskripsi', $params) || empty($params['diskripsi'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter diskripsi empty');
            }
            if (!array_key_exists('kptKod', $params)) {
                throw new Exception('[' . __LINE__ . '] - Parameter kptKod not exist');
            }
            if (!array_key_exists('negKod', $params) || empty($params['negKod'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter negKod empty');
            }
            if (!array_key_exists('jenisPusat', $params)) {
                throw new Exception('[' . __LINE__ . '] - Parameter jenisPusat not exist');
            }
            if (!array_key_exists('kodPendek', $params)) {
                throw new Exception('[' . __LINE__ . '] - Parameter kodPendek not exist');
            }
            if (!array_key_exists('sahYt', $params) || empty($params['sahYt'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter sahYt empty');
            }

            $kod = $params['kod'];
            $diskripsi = $params['diskripsi'];
            $kptKod = $params['kptKod'];
            $negKod = $params['negKod'];
            $jenisPusat = $params['jenisPusat'];
            $kodPendek = $params['kodPendek'];
            $sahYt = $params['sahYt'];

            if (Class_db::getInstance()->db_count('ref_pusat_td', array('KOD' => $kod)) > 0) {
                throw new Exception('[' . __LINE__ . '] - ' . $constant::ERR_PUSAT_TD_KOD_EXIST, 31);
            }
            if (Class_db::getInstance()->db_count('ref_pusat_td', array('DISKRIPSI' => $diskripsi)) > 0) {
                throw new Exception('[' . __LINE__ . '] - ' . $constant::ERR_PUSAT_TD_DESC_EXIST, 31);
            }

            $user = Class_db::getInstance()->db_select_single('sys_user', array('user_id'=>$this->userId), null, 1);
            Class_db::getInstance()->db_insert('ref_pusat_td', array('KOD'=>$kod, 'DISKRIPSI'=>$diskripsi, 'KPT_KOD'=>$kptKod, 'NEG_KOD'=>$negKod, 'JENIS_PUSAT'=>$jenisPusat, 'KOD_PENDEK'=>$kodPendek, 'SAH_YT'=>$sahYt,
                'ID_PENCIPTA'=>$user['user_name'], 'TARIKH_CIPTA'=>'Now()', 'PENGGUNA'=>$user['user_first_name'],  'TARIKH_UBAHSUAI'=>'Now()'));

            return $kod;
        } catch (Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

    /**
     * @param $putVars
     * @throws Exception
     */
    public function update_pusat_td ($putVars) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($this->kod)) {
                throw new Exception('[' . __LINE__ . '] - Parameter kod empty');
            }
            if (!isset($putVars['diskripsi']) || empty($putVars['diskripsi'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter diskripsi empty');
            }
            if (!isset($putVars['kptKod'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter kptKod empty');
            }
            if (!isset($putVars['negKod'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter negKod empty');
            }
            if (!isset($putVars['jenisPusat'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter jenisPusat empty');
            }
            if (!isset($putVars['kodPendek'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter kodPendek empty');
            }
            if (!isset($putVars['sahYt']) || empty($putVars['sahYt'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter sahYt empty');
            }

            $diskripsi = $putVars['diskripsi'];
            $kptKod = $putVars['kptKod'];
            $negKod = $putVars['negKod'];
            $jenisPusat = $putVars['jenisPusat'];
            $kodPendek = $putVars['kodPendek'];
            $sahYt = $putVars['sahYt'];

            if (Class_db::getInstance()->db_count('ref_pusat_td', array('DISKRIPSI'=>$diskripsi, 'KOD'=>'<>'.$this->kod)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_PUSAT_TD_DESC_EXIST, 31);
            }

            Class_db::getInstance()->db_update('ref_pusat_td', array('DISKRIPSI'=>$diskripsi, 'KPT_KOD'=>$kptKod, 'NEG_KOD'=>$negKod, 'JENIS_PUSAT'=>$jenisPusat, 'KOD_PENDEK'=>$kodPendek, 'SAH_YT'=>$sahYt,  'TARIKH_UBAHSUAI'=>'Now()'), array('KOD'=>$this->kod));
        }
        catch(Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }
}