<?php

class Class_paper_julai_bm {

    private $constant;
    private $fn_general;
    private $mpelKod;
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
    public function get_paper_julai_bm_list () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            $result = array();
            $dbResults = Class_db::getInstance()->db_select('ref_paper_julai_bm');
            foreach ($dbResults as $dbResult) {
                $rowResult['mpelKod'] = $dbResult['mpel_kod'];
                $rowResult['diskripsi'] = $this->fn_general->clear_null($dbResult['diskripsi']);
                $rowResult['idCipta'] = $this->fn_general->clear_null($dbResult['id_cipta']);
                $rowResult['dCipta'] = $this->fn_general->clear_null($dbResult['d_cipta']);
                $rowResult['dUbahsuai'] = $this->fn_general->clear_null($dbResult['d_ubahsuai']);
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
    public function get_paper_julai_bm () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            if (empty($this->mpelKod)) {
                throw new Exception('[' . __LINE__ . '] - Parameter mpelKod empty');
            }

            $result = array();
            $dbResult = Class_db::getInstance()->db_select_single('ref_paper_julai_bm', array('mpel_kod'=>$this->mpelKod), null, 1);
            $result['mpelKod'] = $dbResult['mpel_kod'];
            $result['diskripsi'] = $this->fn_general->clear_null($dbResult['diskripsi']);
            $result['idCipta'] = $this->fn_general->clear_null($dbResult['id_cipta']);
            $result['dCipta'] = $this->fn_general->clear_null($dbResult['d_cipta']);
            $result['dUbahsuai'] = $this->fn_general->clear_null($dbResult['d_ubahsuai']);
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
    public function add_paper_julai_bm ($params=array()) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($params)) {
                throw new Exception('['.__LINE__.'] - Array params empty');
            }
            if (!array_key_exists('mpelKod', $params) || empty($params['mpelKod'])) {
                throw new Exception('['.__LINE__.'] - Parameter mpelKod empty');
            }
            if (!array_key_exists('diskripsi', $params) || empty($params['diskripsi'])) {
                throw new Exception('['.__LINE__.'] - Parameter diskripsi empty');
            }
            if (!array_key_exists('sahYt', $params) || empty($params['sahYt'])) {
                throw new Exception('['.__LINE__.'] - Parameter sahYt empty');
            }

            $mpelKod = $params['mpelKod'];
            $diskripsi = $params['diskripsi'];
            $sahYt = $params['sahYt'];

            if (Class_db::getInstance()->db_count('ref_paper_julai_bm', array('mpel_kod'=>$mpelKod)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_PAPER_JULAI_KOD_EXIST, 31);
            }

            $user = Class_db::getInstance()->db_select_single('sys_user', array('user_id'=>$this->userId), null, 1);
            Class_db::getInstance()->db_insert('ref_paper_julai_bm', array('mpel_kod'=>$mpelKod, 'diskripsi'=>$diskripsi, 'sah_yt'=>$sahYt,
                'id_cipta'=>$user['user_name'], 'd_cipta'=>'Now()',  'd_ubahsuai'=>'Now()'));

            return $mpelKod;
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
    public function update_paper_julai_bm ($putVars) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($this->mpelKod)) {
                throw new Exception('[' . __LINE__ . '] - Parameter mpelKod empty');
            }
            if (!isset($putVars['diskripsi']) || empty($putVars['diskripsi'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter diskripsi empty');
            }
            if (!isset($putVars['sahYt']) || empty($putVars['sahYt'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter sahYt empty');
            }

            $diskripsi = $putVars['diskripsi'];
            $sahYt = $putVars['sahYt'];

            Class_db::getInstance()->db_update('ref_paper_julai_bm', array('diskripsi'=>$diskripsi, 'sah_yt'=>$sahYt,  'd_ubahsuai'=>'Now()'), array('mpel_kod'=>$this->mpelKod));
        }
        catch(Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

}