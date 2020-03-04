<?php

class Class_skim_sah {

    private $constant;
    private $fn_general;
    private $skimSahId;

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
    public function get_skim_sah_list () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            $result = array();
            $dbResults = Class_db::getInstance()->db_select('ref_skim_sah');
            foreach ($dbResults as $dbResult) {
                $rowResult['skimSahId'] = $dbResult['SKIM_SAH_ID'];
                $rowResult['kod'] = $this->fn_general->clear_null($dbResult['KOD']);
                $rowResult['diskripsi'] = $this->fn_general->clear_null($dbResult['DISKRIPSI']);
                $rowResult['kumpPkhidmatJkk'] = $this->fn_general->clear_null($dbResult['KUMP_PKHIDMAT_JKK']);
                $rowResult['agensi'] = $this->fn_general->clear_null($dbResult['AGENSI']);
                $rowResult['bakatYt'] = $this->fn_general->clear_null($dbResult['BAKAT_YT']);
                $rowResult['dCipta'] = $this->fn_general->clear_null($dbResult['D_CIPTA']);
                $rowResult['dKemaskini'] = $this->fn_general->clear_null($dbResult['D_KEMASKINI']);
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
    public function get_skim_sah () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            if (empty($this->skimSahId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter skimSahId empty');
            }

            $result = array();
            $dbResult = Class_db::getInstance()->db_select_single('ref_skim_sah', array('SKIM_SAH_ID'=>$this->skimSahId), null, 1);
            $result['skimSahId'] = $dbResult['SKIM_SAH_ID'];
            $result['kod'] = $this->fn_general->clear_null($dbResult['KOD']);
            $result['diskripsi'] = $this->fn_general->clear_null($dbResult['DISKRIPSI']);
            $result['kumpPkhidmatJkk'] = $this->fn_general->clear_null($dbResult['KUMP_PKHIDMAT_JKK']);
            $result['agensi'] = $this->fn_general->clear_null($dbResult['AGENSI']);
            $result['bakatYt'] = $this->fn_general->clear_null($dbResult['BAKAT_YT']);
            $result['dCipta'] = $this->fn_general->clear_null($dbResult['D_CIPTA']);
            $result['dKemaskini'] = $this->fn_general->clear_null($dbResult['D_KEMASKINI']);
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
    public function add_skim_sah ($params=array()) {
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
            if (!array_key_exists('kumpPkhidmatJkk', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter kumpPkhidmatJkk not exist');
            }
            if (!array_key_exists('agensi', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter agensi not exist');
            }
            if (!array_key_exists('bakatYt', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter bakatYt not exist');
            }
            if (!array_key_exists('sahYt', $params) || empty($params['sahYt'])) {
                throw new Exception('['.__LINE__.'] - Parameter sahYt empty');
            }

            $kod = $params['kod'];
            $diskripsi = $params['diskripsi'];
            $kumpPkhidmatJkk = $params['kumpPkhidmatJkk'];
            $agensi = $params['agensi'];
            $bakatYt = $params['bakatYt'];
            $sahYt = $params['sahYt'];

            if (Class_db::getInstance()->db_count('ref_skim_sah', array('KOD'=>$kod)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_SKIM_SAH_EXIST, 31);
            }

            return Class_db::getInstance()->db_insert('ref_skim_sah', array('KOD'=>$kod, 'DISKRIPSI'=>$diskripsi, 'KUMP_PKHIDMAT_JKK'=>$kumpPkhidmatJkk, 'AGENSI'=>$agensi, 'BAKAT_YT'=>$bakatYt, 'SAH_YT'=>$sahYt,
                'D_CIPTA'=>'Now()',  'D_KEMASKINI'=>'Now()'));
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
    public function update_skim_sah ($putVars) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($this->skimSahId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter skimSahId empty');
            }
            if (!isset($putVars['kod'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter kod not exist');
            }
            if (!isset($putVars['diskripsi'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter diskripsi not exist');
            }
            if (!isset($putVars['kumpPkhidmatJkk'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter kumpPkhidmatJkk not exist');
            }
            if (!isset($putVars['agensi'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter agensi not exist');
            }
            if (!isset($putVars['bakatYt'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter bakatYt not exist');
            }
            if (!isset($putVars['sahYt']) || empty($putVars['sahYt'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter sahYt empty');
            }

            $kod = $putVars['kod'];
            $diskripsi = $putVars['diskripsi'];
            $kumpPkhidmatJkk = $putVars['kumpPkhidmatJkk'];
            $agensi = $putVars['agensi'];
            $bakatYt = $putVars['bakatYt'];
            $sahYt = $putVars['sahYt'];

            Class_db::getInstance()->db_update('ref_skim_sah', array('KOD'=>$kod, 'DISKRIPSI'=>$diskripsi, 'KUMP_PKHIDMAT_JKK'=>$kumpPkhidmatJkk, 'AGENSI'=>$agensi, 'BAKAT_YT'=>$bakatYt, 'SAH_YT'=>$sahYt,  'D_KEMASKINI'=>'Now()'), array('SKIM_SAH_ID'=>$this->skimSahId));
        }
        catch(Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

}