<?php

class Class_sukan {

    private $constant;
    private $fn_general;
    private $sukanId;
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
    public function get_sukan_list () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            $result = array();
            $dbResults = Class_db::getInstance()->db_select('ref_sukan');
            foreach ($dbResults as $dbResult) {
                $rowResult['sukanId'] = $dbResult['sukan_id'];
                $rowResult['kod'] = $this->fn_general->clear_null($dbResult['kod']);
                $rowResult['diskripsi'] = $this->fn_general->clear_null($dbResult['diskripsi']);
                $rowResult['kategori'] = $this->fn_general->clear_null($dbResult['kategori']);
                $rowResult['jantina'] = $this->fn_general->clear_null($dbResult['jantina']);
                $rowResult['nilai'] = $this->fn_general->clear_null($dbResult['nilai']);
                $rowResult['noPemerolehan'] = $this->fn_general->clear_null($dbResult['no_pemerolehan']);
                $rowResult['gabYt'] = $this->fn_general->clear_null($dbResult['gab_yt']);
                $rowResult['idCipta'] = $this->fn_general->clear_null($dbResult['id_cipta']);
                $rowResult['dCipta'] = $this->fn_general->clear_null($dbResult['d_cipta']);
                $rowResult['pengguna'] = $this->fn_general->clear_null($dbResult['pengguna']);
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
    public function get_sukan () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            if (empty($this->sukanId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter sukanId empty');
            }

            $result = array();
            $dbResult = Class_db::getInstance()->db_select_single('ref_sukan', array('sukan_id'=>$this->sukanId), null, 1);
            $result['sukanId'] = $dbResult['sukan_id'];
            $result['kod'] = $this->fn_general->clear_null($dbResult['kod']);
            $result['diskripsi'] = $this->fn_general->clear_null($dbResult['diskripsi']);
            $result['kategori'] = $this->fn_general->clear_null($dbResult['kategori']);
            $result['jantina'] = $this->fn_general->clear_null($dbResult['jantina']);
            $result['nilai'] = $this->fn_general->clear_null($dbResult['nilai']);
            $result['noPemerolehan'] = $this->fn_general->clear_null($dbResult['no_pemerolehan']);
            $result['gabYt'] = $this->fn_general->clear_null($dbResult['gab_yt']);
            $result['idCipta'] = $this->fn_general->clear_null($dbResult['id_cipta']);
            $result['dCipta'] = $this->fn_general->clear_null($dbResult['d_cipta']);
            $result['pengguna'] = $this->fn_general->clear_null($dbResult['pengguna']);
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
    public function add_sukan ($params=array()) {
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
            if (!array_key_exists('kategori', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter kategori not exist');
            }
            if (!array_key_exists('jantina', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter jantina not exist');
            }
            if (!array_key_exists('nilai', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter nilai not exist');
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

            $kod = $params['kod'];
            $diskripsi = $params['diskripsi'];
            $kategori = $params['kategori'];
            $jantina = $params['jantina'];
            $nilai = $params['nilai'];
            $noPemerolehan = $params['noPemerolehan'];
            $gabYt = $params['gabYt'];
            $sahYt = $params['sahYt'];

            if (Class_db::getInstance()->db_count('ref_sukan', array('kod'=>$kod)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_SUKAN_EXIST, 31);
            }

            $user = Class_db::getInstance()->db_select_single('sys_user', array('user_id'=>$this->userId), null, 1);
            return Class_db::getInstance()->db_insert('ref_sukan', array('kod'=>$kod, 'diskripsi'=>$diskripsi, 'kategori'=>$kategori, 'jantina'=>$jantina, 'nilai'=>$nilai, 'no_pemerolehan'=>$noPemerolehan, 'gab_yt'=>$gabYt, 'sah_yt'=>$sahYt,
                'id_cipta'=>$user['user_name'], 'd_cipta'=>'Now()', 'pengguna'=>$user['user_first_name'],  'd_ubahsuai'=>'Now()'));
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
    public function update_sukan ($putVars) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($this->sukanId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter sukanId empty');
            }
            if (!isset($putVars['kod'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter kod not exist');
            }
            if (!isset($putVars['diskripsi'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter diskripsi not exist');
            }
            if (!isset($putVars['kategori'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter kategori not exist');
            }
            if (!isset($putVars['jantina'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter jantina not exist');
            }
            if (!isset($putVars['nilai'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter nilai not exist');
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

            $kod = $putVars['kod'];
            $diskripsi = $putVars['diskripsi'];
            $kategori = $putVars['kategori'];
            $jantina = $putVars['jantina'];
            $nilai = $putVars['nilai'];
            $noPemerolehan = $putVars['noPemerolehan'];
            $gabYt = $putVars['gabYt'];
            $sahYt = $putVars['sahYt'];

            Class_db::getInstance()->db_update('ref_sukan', array('kod'=>$kod, 'diskripsi'=>$diskripsi, 'kategori'=>$kategori, 'jantina'=>$jantina, 'nilai'=>$nilai, 'no_pemerolehan'=>$noPemerolehan, 'gab_yt'=>$gabYt, 'sah_yt'=>$sahYt,  'd_ubahsuai'=>'Now()'), array('sukan_id'=>$this->sukanId));
        }
        catch(Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

}