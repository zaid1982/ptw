<?php

class Class_subjek_matrikulasi {

    private $constant;
    private $fn_general;
    private $subjId;

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
    public function get_subjek_matrikulasi_list () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            $result = array();
            $dbResults = Class_db::getInstance()->db_select('ref_subjek_matrikulasi');
            foreach ($dbResults as $dbResult) {
                $rowResult['subjId'] = $dbResult['subj_id'];
                $rowResult['subjCode'] = $dbResult['subj_code'];
                $rowResult['subjName'] = $this->fn_general->clear_null($dbResult['subj_name']);
                $rowResult['subjCredit'] = $this->fn_general->clear_null($dbResult['subj_credit']);
                $rowResult['subjSemester'] = $this->fn_general->clear_null($dbResult['subj_semester']);
                $rowResult['subjKira'] = $this->fn_general->clear_null($dbResult['subj_kira']);
                $rowResult['subjSesi'] = $this->fn_general->clear_null($dbResult['subj_sesi']);
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
    public function get_subjek_matrikulasi () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            if (empty($this->subjId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter subjId empty');
            }

            $result = array();
            $dbResult = Class_db::getInstance()->db_select_single('ref_subjek_matrikulasi', array('subj_id'=>$this->subjId), null, 1);
            $result['subjId'] = $dbResult['subj_id'];
            $result['subjCode'] = $dbResult['subj_code'];
            $result['subjName'] = $this->fn_general->clear_null($dbResult['subj_name']);
            $result['subjCredit'] = $this->fn_general->clear_null($dbResult['subj_credit']);
            $result['subjSemester'] = $this->fn_general->clear_null($dbResult['subj_semester']);
            $result['subjKira'] = $this->fn_general->clear_null($dbResult['subj_kira']);
            $result['subjSesi'] = $this->fn_general->clear_null($dbResult['subj_sesi']);
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
    public function add_subjek_matrikulasi ($params=array()) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($params)) {
                throw new Exception('['.__LINE__.'] - Array params empty');
            }
            if (!array_key_exists('subjCode', $params) || empty($params['subjCode'])) {
                throw new Exception('['.__LINE__.'] - Parameter subjCode empty');
            }
            if (!array_key_exists('subjName', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter subjName not exist');
            }
            if (!array_key_exists('subjCredit', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter subjCredit not exist');
            }
            if (!array_key_exists('subjSemester', $params) || $params['subjSemester'] === '') {
                throw new Exception('['.__LINE__.'] - Parameter subjSemester empty');
            }
            if (!array_key_exists('subjKira', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter subjKira not exist');
            }
            if (!array_key_exists('subjSesi', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter subjSesi not exist');
            }
            if (!array_key_exists('sahYt', $params) || empty($params['sahYt'])) {
                throw new Exception('['.__LINE__.'] - Parameter sahYt empty');
            }

            $subjCode = $params['subjCode'];
            $subjName = $params['subjName'];
            $subjCredit = $params['subjCredit'];
            $subjSemester = $params['subjSemester'];
            $subjKira = $params['subjKira'];
            $subjSesi = $params['subjSesi'];
            $sahYt = $params['sahYt'];

            if (Class_db::getInstance()->db_count('ref_subjek_matrikulasi', array('subj_code'=>$subjCode, 'subj_semester'=>$subjSemester)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_SUBJEK_MATRIKULASI_EXIST, 31);
            }

            return Class_db::getInstance()->db_insert('ref_subjek_matrikulasi', array('subj_code'=>$subjCode, 'subj_name'=>$subjName, 'subj_credit'=>$subjCredit,
                'subj_semester'=>$subjSemester, 'subj_kira'=>$subjKira, 'subj_sesi'=>$subjSesi, 'sah_yt'=>$sahYt));
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
    public function update_subjek_matrikulasi ($putVars) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($this->subjId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter subjId empty');
            }
            if (!isset($putVars['subjCode']) || empty($putVars['subjCode'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter subjCode empty');
            }
            if (!isset($putVars['subjName'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter subjName not exist');
            }
            if (!isset($putVars['subjCredit'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter subjCredit not exist');
            }
            if (!isset($putVars['subjSemester']) || $putVars['subjSemester'] === '') {
                throw new Exception('[' . __LINE__ . '] - Parameter subjSemester empty');
            }
            if (!isset($putVars['subjKira'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter subjKira not exist');
            }
            if (!isset($putVars['subjSesi'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter subjSesi not exist');
            }
            if (!isset($putVars['sahYt']) || empty($putVars['sahYt'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter sahYt empty');
            }

            $subjCode = $putVars['subjCode'];
            $subjName = $putVars['subjName'];
            $subjCredit = $putVars['subjCredit'];
            $subjSemester = $putVars['subjSemester'];
            $subjKira = $putVars['subjKira'];
            $subjSesi = $putVars['subjSesi'];
            $sahYt = $putVars['sahYt'];

            if (Class_db::getInstance()->db_count('ref_subjek_matrikulasi', array('subj_code'=>$subjCode, 'subj_semester'=>$subjSemester, 'subj_id'=>'<>'.$this->subjId)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_SUBJEK_MATRIKULASI_EXIST, 31);
            }

            Class_db::getInstance()->db_update('ref_subjek_matrikulasi', array('subj_code'=>$subjCode, 'subj_name'=>$subjName, 'subj_credit'=>$subjCredit,
                'subj_semester'=>$subjSemester, 'subj_kira'=>$subjKira, 'subj_sesi'=>$subjSesi, 'sah_yt'=>$sahYt), array('subj_id'=>$this->subjId));
        }
        catch(Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

}