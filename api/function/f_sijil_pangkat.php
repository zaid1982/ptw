<?php

class Class_sijil_pangkat {

    private $constant;
    private $fn_general;
    private $sijilPangkatId;

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
    public function get_sijil_pangkat_list () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            $result = array();
            $dbResults = Class_db::getInstance()->db_select('ref_sijil_pangkat');
            foreach ($dbResults as $dbResult) {
                $rowResult['sijilPangkatId'] = $dbResult['SIJIL_PANGKAT_ID'];
                $rowResult['kod'] = $dbResult['KOD'];
                $rowResult['tkt'] = $dbResult['TKT'];
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
    public function get_sijil_pangkat () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            if (empty($this->sijilPangkatId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter sijilPangkatId empty');
            }

            $result = array();
            $dbResult = Class_db::getInstance()->db_select_single('ref_sijil_pangkat', array('SIJIL_PANGKAT_ID'=>$this->sijilPangkatId), null, 1);
            $result['sijilPangkatId'] = $dbResult['SIJIL_PANGKAT_ID'];
            $result['kod'] = $dbResult['KOD'];
            $result['tkt'] = $dbResult['TKT'];
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
    public function add_sijil_pangkat ($params=array()) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($params)) {
                throw new Exception('['.__LINE__.'] - Array params empty');
            }
            if (!array_key_exists('kod', $params) || empty($params['kod'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter kod empty');
            }
            if (!array_key_exists('tkt', $params) || empty($params['tkt'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter tkt empty');
            }
            if (!array_key_exists('diskripsi', $params)) {
                throw new Exception('[' . __LINE__ . '] - Parameter diskripsi not exist');
            }
            if (!array_key_exists('sahYt', $params) || empty($params['sahYt'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter sahYt empty');
            }

            $kod = $params['kod'];
            $tkt = $params['tkt'];
            $diskripsi = $params['diskripsi'];
            $sahYt = $params['sahYt'];

            if (Class_db::getInstance()->db_count('ref_sijil_pangkat', array('KOD'=>$kod, 'TKT'=>$tkt)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_SIJIL_PANGKAT_EXIST, 31);
            }

            return Class_db::getInstance()->db_insert('ref_sijil_pangkat', array('KOD'=>$kod, 'TKT'=>$tkt, 'DISKRIPSI'=>$diskripsi, 'SAH_YT'=>$sahYt));
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
    public function update_sijil_pangkat ($putVars) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($this->sijilPangkatId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter sijilPangkatId empty');
            }
            if (!isset($putVars['kod']) || empty($putVars['kod'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter kod empty');
            }
            if (!isset($putVars['tkt']) || empty($putVars['tkt'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter tkt empty');
            }
            if (!isset($putVars['diskripsi'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter diskripsi not exist');
            }
            if (!isset($putVars['sahYt']) || empty($putVars['sahYt'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter sahYt empty');
            }

            $kod = $putVars['kod'];
            $tkt = $putVars['tkt'];
            $diskripsi = $putVars['diskripsi'];
            $sahYt = $putVars['sahYt'];

            if (Class_db::getInstance()->db_count('ref_sijil_pangkat', array('KOD'=>$kod, 'TKT'=>$tkt, 'SIJIL_PANGKAT_ID'=>'<>'.$this->sijilPangkatId)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_SIJIL_PANGKAT_EXIST, 31);
            }

            Class_db::getInstance()->db_update('ref_sijil_pangkat', array('KOD'=>$kod, 'TKT'=>$tkt, 'DISKRIPSI'=>$diskripsi, 'SAH_YT'=>$sahYt), array('SIJIL_PANGKAT_ID'=>$this->sijilPangkatId));
        }
        catch(Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

}