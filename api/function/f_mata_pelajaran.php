<?php

class Class_mata_pelajaran {

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
    public function get_mata_pelajaran_list () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            $result = array();
            $dbResults = Class_db::getInstance()->db_select('ref_matapelajaran');
            foreach ($dbResults as $dbResult) {
                $rowResult['kod'] = $dbResult['KOD'];
                $rowResult['tkt'] = $this->fn_general->clear_null($dbResult['TKT']);
                $rowResult['diskripsi'] = $this->fn_general->clear_null($dbResult['DISKRIPSI']);
                $rowResult['gabYt'] = $this->fn_general->clear_null($dbResult['GAB_YT']);
                $rowResult['noPemerolehan'] = $this->fn_general->clear_null($dbResult['NO_PEMEROLEHAN']);
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
    public function get_mata_pelajaran () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            if (empty($this->kod)) {
                throw new Exception('[' . __LINE__ . '] - Parameter kod empty');
            }

            $result = array();
            $dbResult = Class_db::getInstance()->db_select_single('ref_matapelajaran', array('KOD'=>$this->kod), null, 1);
            $result['kod'] = $dbResult['KOD'];
            $result['tkt'] = $this->fn_general->clear_null($dbResult['TKT']);
            $result['diskripsi'] = $this->fn_general->clear_null($dbResult['DISKRIPSI']);
            $result['gabYt'] = $this->fn_general->clear_null($dbResult['GAB_YT']);
            $result['noPemerolehan'] = $this->fn_general->clear_null($dbResult['NO_PEMEROLEHAN']);
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
    public function add_mata_pelajaran ($params=array()) {
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
            if (!array_key_exists('tkt', $params) || empty($params['tkt'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter tkt empty');
            }
            if (!array_key_exists('diskripsi', $params) || empty($params['diskripsi'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter diskripsi empty');
            }
            if (!array_key_exists('gabYt', $params)) {
                throw new Exception('[' . __LINE__ . '] - Parameter gabYt not exist');
            }
            if (!array_key_exists('noPemerolehan', $params) || empty($params['noPemerolehan'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter noPemerolehan empty');
            }
            if (!array_key_exists('sahYt', $params) || empty($params['sahYt'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter sahYt empty');
            }

            $kod = $params['kod'];
            $tkt = $params['tkt'];
            $diskripsi = $params['diskripsi'];
            $gabYt = $params['gabYt'];
            $noPemerolehan = $params['noPemerolehan'];
            $sahYt = $params['sahYt'];

            if (Class_db::getInstance()->db_count('ref_matapelajaran', array('KOD' => $kod, 'TKT' => $tkt)) > 0) {
                throw new Exception('[' . __LINE__ . '] - ' . $constant::ERR_MATA_PELAJARAN_KOD_EXIST, 31);
            }
            if (Class_db::getInstance()->db_count('ref_matapelajaran', array('DISKRIPSI' => $diskripsi)) > 0) {
                throw new Exception('[' . __LINE__ . '] - ' . $constant::ERR_MATA_PELAJARAN_DESC_EXIST, 31);
            }

            $user = Class_db::getInstance()->db_select_single('sys_user', array('user_id'=>$this->userId), null, 1);
            Class_db::getInstance()->db_insert('ref_matapelajaran', array('KOD'=>$kod, 'TKT'=>$tkt, 'DISKRIPSI'=>$diskripsi, 'GAB_YT'=>$gabYt, 'NO_PEMEROLEHAN'=>$noPemerolehan, 'SAH_YT'=>$sahYt,
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
    public function update_mata_pelajaran ($putVars) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($this->kod)) {
                throw new Exception('[' . __LINE__ . '] - Parameter kod empty');
            }
            if (!isset($putVars['tkt']) || empty($putVars['tkt'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter tkt empty');
            }
            if (!isset($putVars['diskripsi']) || empty($putVars['diskripsi'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter diskripsi empty');
            }
            if (!isset($putVars['gabYt'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter gabYt empty');
            }
            if (!isset($putVars['noPemerolehan'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter noPemerolehan empty');
            }
            if (!isset($putVars['sahYt']) || empty($putVars['sahYt'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter sahYt empty');
            }

            $tkt = $putVars['tkt'];
            $diskripsi = $putVars['diskripsi'];
            $gabYt = $putVars['gabYt'];
            $noPemerolehan = $putVars['noPemerolehan'];
            $sahYt = $putVars['sahYt'];

            if (Class_db::getInstance()->db_count('ref_matapelajaran', array('DISKRIPSI'=>$diskripsi, 'TKT' => $tkt, 'KOD'=>'<>'.$this->kod)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_MATA_PELAJARAN_DESC_EXIST, 31);
            }

            Class_db::getInstance()->db_update('ref_matapelajaran', array('TKT'=>$tkt, 'DISKRIPSI'=>$diskripsi, 'GAB_YT'=>$gabYt, 'NO_PEMEROLEHAN'=>$noPemerolehan, 'SAH_YT'=>$sahYt,  'TARIKH_UBAHSUAI'=>'Now()'), array('KOD'=>$this->kod));
        }
        catch(Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }
}