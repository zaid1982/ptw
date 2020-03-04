<?php

class Class_kem_jabatan {

    private $constant;
    private $fn_general;
    private $kemJabatanId;
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
    public function get_kem_jabatan_list () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            $result = array();
            $dbResults = Class_db::getInstance()->db_select('ref_kem_jabatan');
            foreach ($dbResults as $dbResult) {
                $rowResult['kemJabatanId'] = $dbResult['KEM_JABATAN_ID'];
                $rowResult['kod'] = $dbResult['KOD'];
                $rowResult['diskripsi'] = $this->fn_general->clear_null($dbResult['DISKRIPSI']);
                $rowResult['alamat1'] = $this->fn_general->clear_null($dbResult['ALAMAT_1']);
                $rowResult['alamat2'] = $this->fn_general->clear_null($dbResult['ALAMAT_2']);
                $rowResult['alamat3'] = $this->fn_general->clear_null($dbResult['ALAMAT_3']);
                $rowResult['gelaranKetua'] = $this->fn_general->clear_null($dbResult['GELARAN_KETUA']);
                $rowResult['poskod'] = $this->fn_general->clear_null($dbResult['POSKOD']);
                $rowResult['bandar'] = $this->fn_general->clear_null($dbResult['BANDAR']);
                $rowResult['kemKod'] = $this->fn_general->clear_null($dbResult['KEM_KOD']);
                $rowResult['diskripsi2'] = $this->fn_general->clear_null($dbResult['DISKRIPSI_2']);
                $rowResult['diskripsi3'] = $this->fn_general->clear_null($dbResult['DISKRIPSI_3']);
                $rowResult['emel'] = $this->fn_general->clear_null($dbResult['EMEL']);
                $rowResult['noTel'] = $this->fn_general->clear_null($dbResult['NO_TEL']);
                $rowResult['unitUrusan'] = $this->fn_general->clear_null($dbResult['UNIT_URUSAN']);
                $rowResult['noPemerolehan'] = $this->fn_general->clear_null($dbResult['NO_PEMEROLEHAN']);
                $rowResult['idPencipta'] = $this->fn_general->clear_null($dbResult['ID_PENCIPTA']);
                $rowResult['tarikhCipta'] = $this->fn_general->clear_null($dbResult['TARIKH_CIPTA']);
                $rowResult['pengguna'] = $this->fn_general->clear_null($dbResult['PENGGUNA']);
                $rowResult['tarikhUbahsuai'] = $this->fn_general->clear_null($dbResult['TARIKH_UBAHSUAI']);
                $rowResult['gabYt'] = $this->fn_general->clear_null($dbResult['GAB_YT']);
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
    public function get_kem_jabatan () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            if (empty($this->kemJabatanId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter kemJabatanId empty');
            }

            $result = array();
            $dbResult = Class_db::getInstance()->db_select_single('ref_kem_jabatan', array('KEM_JABATAN_ID'=>$this->kemJabatanId), null, 1);
            $result['kemJabatanId'] = $dbResult['KEM_JABATAN_ID'];
            $result['kod'] = $dbResult['KOD'];
            $result['diskripsi'] = $this->fn_general->clear_null($dbResult['DISKRIPSI']);
            $result['alamat1'] = $this->fn_general->clear_null($dbResult['ALAMAT_1']);
            $result['alamat2'] = $this->fn_general->clear_null($dbResult['ALAMAT_2']);
            $result['alamat3'] = $this->fn_general->clear_null($dbResult['ALAMAT_3']);
            $result['gelaranKetua'] = $this->fn_general->clear_null($dbResult['GELARAN_KETUA']);
            $result['poskod'] = $this->fn_general->clear_null($dbResult['POSKOD']);
            $result['bandar'] = $this->fn_general->clear_null($dbResult['BANDAR']);
            $result['kemKod'] = $this->fn_general->clear_null($dbResult['KEM_KOD']);
            $result['diskripsi2'] = $this->fn_general->clear_null($dbResult['DISKRIPSI_2']);
            $result['diskripsi3'] = $this->fn_general->clear_null($dbResult['DISKRIPSI_3']);
            $result['emel'] = $this->fn_general->clear_null($dbResult['EMEL']);
            $result['noTel'] = $this->fn_general->clear_null($dbResult['NO_TEL']);
            $result['unitUrusan'] = $this->fn_general->clear_null($dbResult['UNIT_URUSAN']);
            $result['noPemerolehan'] = $this->fn_general->clear_null($dbResult['NO_PEMEROLEHAN']);
            $result['idPencipta'] = $this->fn_general->clear_null($dbResult['ID_PENCIPTA']);
            $result['tarikhCipta'] = $this->fn_general->clear_null($dbResult['TARIKH_CIPTA']);
            $result['pengguna'] = $this->fn_general->clear_null($dbResult['PENGGUNA']);
            $result['tarikhUbahsuai'] = $this->fn_general->clear_null($dbResult['TARIKH_UBAHSUAI']);
            $result['gabYt'] = $this->fn_general->clear_null($dbResult['GAB_YT']);
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
    public function add_kem_jabatan ($params=array()) {
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
            if (!array_key_exists('alamat1', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter alamat1 not exist');
            }
            if (!array_key_exists('alamat2', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter alamat2 not exist');
            }
            if (!array_key_exists('alamat3', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter alamat3 not exist');
            }
            if (!array_key_exists('gelaranKetua', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter gelaranKetua not exist');
            }
            if (!array_key_exists('poskod', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter poskod not exist');
            }
            if (!array_key_exists('bandar', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter bandar not exist');
            }
            if (!array_key_exists('kemKod', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter kemKod not exist');
            }
            if (!array_key_exists('diskripsi2', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter diskripsi2 not exist');
            }
            if (!array_key_exists('diskripsi3', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter diskripsi3 not exist');
            }
            if (!array_key_exists('emel', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter emel not exist');
            }
            if (!array_key_exists('noTel', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter noTel not exist');
            }
            if (!array_key_exists('unitUrusan', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter unitUrusan not exist');
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
            $alamat1 = $params['alamat1'];
            $alamat2 = $params['alamat2'];
            $alamat3 = $params['alamat3'];
            $gelaranKetua = $params['gelaranKetua'];
            $poskod = $params['poskod'];
            $bandar = $params['bandar'];
            $kemKod = $params['kemKod'];
            $diskripsi2 = $params['diskripsi2'];
            $diskripsi3 = $params['diskripsi3'];
            $emel = $params['emel'];
            $noTel = $params['noTel'];
            $unitUrusan = $params['unitUrusan'];
            $noPemerolehan = $params['noPemerolehan'];
            $gabYt = $params['gabYt'];
            $sahYt = $params['sahYt'];

            if (Class_db::getInstance()->db_count('ref_kem_jabatan', array('KOD'=>$kod)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_KEM_JABATAN_EXIST, 31);
            }

            $user = Class_db::getInstance()->db_select_single('sys_user', array('user_id'=>$this->userId), null, 1);
            return Class_db::getInstance()->db_insert('ref_kem_jabatan',
                array(
                    'KOD'=>$kod,
                    'DISKRIPSI'=>$diskripsi,
                    'ALAMAT_1'=>$alamat1,
                    'ALAMAT_2'=>$alamat2,
                    'ALAMAT_3'=>$alamat3,
                    'GELARAN_KETUA'=>$gelaranKetua,
                    'POSKOD'=>$poskod,
                    'BANDAR'=>$bandar,
                    'KEM_KOD'=>$kemKod,
                    'DISKRIPSI_2'=>$diskripsi2,
                    'DISKRIPSI_3'=>$diskripsi3,
                    'EMEL'=>$emel,
                    'NO_TEL'=>$noTel,
                    'UNIT_URUSAN'=>$unitUrusan,
                    'NO_PEMEROLEHAN'=>$noPemerolehan,
                    'GAB_YT'=>$gabYt,
                    'SAH_YT'=>$sahYt,
                    'ID_PENCIPTA'=>$user['user_name'],
                    'TARIKH_CIPTA'=>'Now()',
                    'PENGGUNA'=>$user['user_first_name'],
                    'TARIKH_UBAHSUAI'=>'Now()'
                )
            );
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
    public function update_kem_jabatan ($putVars) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($this->kemJabatanId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter kemJabatanId empty');
            }
            if (!isset($putVars['diskripsi'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter diskripsi not exist');
            }
            if (!isset($putVars['alamat1'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter alamat1 not exist');
            }
            if (!isset($putVars['alamat2'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter alamat2 not exist');
            }
            if (!isset($putVars['alamat3'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter alamat3 not exist');
            }
            if (!isset($putVars['gelaranKetua'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter gelaranKetua not exist');
            }
            if (!isset($putVars['poskod'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter poskod not exist');
            }
            if (!isset($putVars['bandar'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter bandar not exist');
            }
            if (!isset($putVars['kemKod'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter kemKod not exist');
            }
            if (!isset($putVars['diskripsi2'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter diskripsi2 not exist');
            }
            if (!isset($putVars['diskripsi3'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter diskripsi3 not exist');
            }
            if (!isset($putVars['emel'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter emel not exist');
            }
            if (!isset($putVars['noTel'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter noTel not exist');
            }
            if (!isset($putVars['unitUrusan'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter unitUrusan not exist');
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

            $diskripsi = $putVars['diskripsi'];
            $alamat1 = $putVars['alamat1'];
            $alamat2 = $putVars['alamat2'];
            $alamat3 = $putVars['alamat3'];
            $gelaranKetua = $putVars['gelaranKetua'];
            $poskod = $putVars['poskod'];
            $bandar = $putVars['bandar'];
            $kemKod = $putVars['kemKod'];
            $diskripsi2 = $putVars['diskripsi2'];
            $diskripsi3 = $putVars['diskripsi3'];
            $emel = $putVars['emel'];
            $noTel = $putVars['noTel'];
            $unitUrusan = $putVars['unitUrusan'];
            $noPemerolehan = $putVars['noPemerolehan'];
            $gabYt = $putVars['gabYt'];
            $sahYt = $putVars['sahYt'];

            Class_db::getInstance()->db_update('ref_kem_jabatan',
                array(
                    'DISKRIPSI'=>$diskripsi,
                    'ALAMAT_1'=>$alamat1,
                    'ALAMAT_2'=>$alamat2,
                    'ALAMAT_3'=>$alamat3,
                    'GELARAN_KETUA'=>$gelaranKetua,
                    'POSKOD'=>$poskod,
                    'BANDAR'=>$bandar,
                    'KEM_KOD'=>$kemKod,
                    'DISKRIPSI_2'=>$diskripsi2,
                    'DISKRIPSI_3'=>$diskripsi3,
                    'EMEL'=>$emel,
                    'NO_TEL'=>$noTel,
                    'UNIT_URUSAN'=>$unitUrusan,
                    'NO_PEMEROLEHAN'=>$noPemerolehan,
                    'GAB_YT'=>$gabYt,
                    'SAH_YT'=>$sahYt,
                    'TARIKH_UBAHSUAI'=>'Now()'
                ), array('KEM_JABATAN_ID'=>$this->kemJabatanId));
        }
        catch(Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

}