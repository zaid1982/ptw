<?php

class Class_skim {

    private $constant;
    private $fn_general;
    private $skimId;
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
    public function get_skim_list () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            $result = array();
            $dbResults = Class_db::getInstance()->db_select('ref_skim');
            foreach ($dbResults as $dbResult) {
                $rowResult['skimId'] = $dbResult['SKIM_ID'];
                $rowResult['kod'] = $this->fn_general->clear_null($dbResult['KOD']);
                $rowResult['diskripsi'] = $this->fn_general->clear_null($dbResult['DISKRIPSI']);
                $rowResult['gghKod'] = $this->fn_general->clear_null($dbResult['GGH_KOD']);
                $rowResult['gunasama'] = $this->fn_general->clear_null($dbResult['GUNASAMA']);
                $rowResult['jenisSkim'] = $this->fn_general->clear_null($dbResult['JENIS_SKIM']);
                $rowResult['kumpPkhidmatJkk'] = $this->fn_general->clear_null($dbResult['KUMP_PKHIDMAT_JKK']);
                $rowResult['skimPkhidmat'] = $this->fn_general->clear_null($dbResult['SKIM_PKHIDMAT']);
                $rowResult['gghSsm'] = $this->fn_general->clear_null($dbResult['GGH_SSM']);
                $rowResult['kumpPkhidmatSbpa'] = $this->fn_general->clear_null($dbResult['KUMP_PKHIDMAT_SBPA']);
                $rowResult['oldKod'] = $this->fn_general->clear_null($dbResult['OLD_KOD']);
                $rowResult['oldName'] = $this->fn_general->clear_null($dbResult['OLD_NAME']);
                $rowResult['oldGred'] = $this->fn_general->clear_null($dbResult['OLD_GRED']);
                $rowResult['kumpPkhidmatSsb'] = $this->fn_general->clear_null($dbResult['KUMP_PKHIDMAT_SSB']);
                $rowResult['ujianWajib1'] = $this->fn_general->clear_null($dbResult['UJIAN_WAJIB_1']);
                $rowResult['ujianWajib2'] = $this->fn_general->clear_null($dbResult['UJIAN_WAJIB_2']);
                $rowResult['ujianWajib3'] = $this->fn_general->clear_null($dbResult['UJIAN_WAJIB_3']);
                $rowResult['ujianWajib4'] = $this->fn_general->clear_null($dbResult['UJIAN_WAJIB_4']);
                $rowResult['ujianWajib5'] = $this->fn_general->clear_null($dbResult['UJIAN_WAJIB_5']);
                $rowResult['ujianYt'] = $this->fn_general->clear_null($dbResult['UJIAN_YT']);
                $rowResult['kpKod'] = $this->fn_general->clear_null($dbResult['KP_KOD']);
                $rowResult['noPemerolehan'] = $this->fn_general->clear_null($dbResult['NO_PEMEROLEHAN']);
                $rowResult['gabYt'] = $this->fn_general->clear_null($dbResult['GAB_YT']);
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
    public function get_skim () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            if (empty($this->skimId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter skimId empty');
            }

            $result = array();
            $dbResult = Class_db::getInstance()->db_select_single('ref_skim', array('SKIM_ID'=>$this->skimId), null, 1);
            $result['skimId'] = $dbResult['SKIM_ID'];
            $result['kod'] = $this->fn_general->clear_null($dbResult['KOD']);
            $result['diskripsi'] = $this->fn_general->clear_null($dbResult['DISKRIPSI']);
            $result['gghKod'] = $this->fn_general->clear_null($dbResult['GGH_KOD']);
            $result['gunasama'] = $this->fn_general->clear_null($dbResult['GUNASAMA']);
            $result['jenisSkim'] = $this->fn_general->clear_null($dbResult['JENIS_SKIM']);
            $result['kumpPkhidmatJkk'] = $this->fn_general->clear_null($dbResult['KUMP_PKHIDMAT_JKK']);
            $result['skimPkhidmat'] = $this->fn_general->clear_null($dbResult['SKIM_PKHIDMAT']);
            $result['gghSsm'] = $this->fn_general->clear_null($dbResult['GGH_SSM']);
            $result['kumpPkhidmatSbpa'] = $this->fn_general->clear_null($dbResult['KUMP_PKHIDMAT_SBPA']);
            $result['oldKod'] = $this->fn_general->clear_null($dbResult['OLD_KOD']);
            $result['oldName'] = $this->fn_general->clear_null($dbResult['OLD_NAME']);
            $result['oldGred'] = $this->fn_general->clear_null($dbResult['OLD_GRED']);
            $result['kumpPkhidmatSsb'] = $this->fn_general->clear_null($dbResult['KUMP_PKHIDMAT_SSB']);
            $result['ujianWajib1'] = $this->fn_general->clear_null($dbResult['UJIAN_WAJIB_1']);
            $result['ujianWajib2'] = $this->fn_general->clear_null($dbResult['UJIAN_WAJIB_2']);
            $result['ujianWajib3'] = $this->fn_general->clear_null($dbResult['UJIAN_WAJIB_3']);
            $result['ujianWajib4'] = $this->fn_general->clear_null($dbResult['UJIAN_WAJIB_4']);
            $result['ujianWajib5'] = $this->fn_general->clear_null($dbResult['UJIAN_WAJIB_5']);
            $result['ujianYt'] = $this->fn_general->clear_null($dbResult['UJIAN_YT']);
            $result['kpKod'] = $this->fn_general->clear_null($dbResult['KP_KOD']);
            $result['noPemerolehan'] = $this->fn_general->clear_null($dbResult['NO_PEMEROLEHAN']);
            $result['gabYt'] = $this->fn_general->clear_null($dbResult['GAB_YT']);
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
    public function add_skim ($params=array()) {
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
            if (!array_key_exists('gghKod', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter gghKod not exist');
            }
            if (!array_key_exists('gunasama', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter gunasama not exist');
            }
            if (!array_key_exists('jenisSkim', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter jenisSkim not exist');
            }
            if (!array_key_exists('kumpPkhidmatJkk', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter kumpPkhidmatJkk not exist');
            }
            if (!array_key_exists('skimPkhidmat', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter skimPkhidmat not exist');
            }
            if (!array_key_exists('gghSsm', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter gghSsm not exist');
            }
            if (!array_key_exists('kumpPkhidmatSbpa', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter kumpPkhidmatSbpa not exist');
            }
            if (!array_key_exists('oldKod', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter oldKod not exist');
            }
            if (!array_key_exists('oldName', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter oldName not exist');
            }
            if (!array_key_exists('oldGred', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter oldGred not exist');
            }
            if (!array_key_exists('kumpPkhidmatSsb', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter kumpPkhidmatSsb not exist');
            }
            if (!array_key_exists('ujianWajib1', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter ujianWajib1 not exist');
            }
            if (!array_key_exists('ujianWajib2', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter ujianWajib2 not exist');
            }
            if (!array_key_exists('ujianWajib3', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter ujianWajib3 not exist');
            }
            if (!array_key_exists('ujianWajib4', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter ujianWajib4 not exist');
            }
            if (!array_key_exists('ujianWajib5', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter ujianWajib5 not exist');
            }
            if (!array_key_exists('ujianYt', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter ujianYt not exist');
            }
            if (!array_key_exists('kpKod', $params)) {
                throw new Exception('['.__LINE__.'] - Parameter kpKod not exist');
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
            if (Class_db::getInstance()->db_count('ref_skim', array('KOD'=>$kod)) > 0) {
                throw new Exception('[' . __LINE__ . '] - '.$constant::ERR_SKIM_EXIST, 31);
            }

            $user = Class_db::getInstance()->db_select_single('sys_user', array('user_id'=>$this->userId), null, 1);
            return Class_db::getInstance()->db_insert('ref_skim',
                array(
                    'KOD'=>$kod,
                    'DISKRIPSI'=>$params['diskripsi'],
                    'GGH_KOD'=>$params['gghKod'],
                    'GUNASAMA'=>$params['gunasama'],
                    'JENIS_SKIM'=>$params['jenisSkim'],
                    'KUMP_PKHIDMAT_JKK'=>$params['kumpPkhidmatJkk'],
                    'SKIM_PKHIDMAT'=>$params['skimPkhidmat'],
                    'GGH_SSM'=>$params['gghSsm'],
                    'KUMP_PKHIDMAT_SBPA'=>$params['kumpPkhidmatSbpa'],
                    'OLD_KOD'=>$params['oldKod'],
                    'OLD_NAME'=>$params['oldName'],
                    'OLD_GRED'=>$params['oldGred'],
                    'KUMP_PKHIDMAT_SSB'=>$params['kumpPkhidmatSsb'],
                    'UJIAN_WAJIB_1'=>$params['ujianWajib1'],
                    'UJIAN_WAJIB_2'=>$params['ujianWajib2'],
                    'UJIAN_WAJIB_3'=>$params['ujianWajib3'],
                    'UJIAN_WAJIB_4'=>$params['ujianWajib4'],
                    'UJIAN_WAJIB_5'=>$params['ujianWajib5'],
                    'UJIAN_YT'=>$params['ujianYt'],
                    'KP_KOD'=>$params['kpKod'],
                    'NO_PEMEROLEHAN'=>$params['noPemerolehan'],
                    'GAB_YT'=>$params['gabYt'],
                    'SAH_YT'=>$params['sahYt'],
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
    public function update_skim ($putVars) {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);
            $constant = $this->constant;

            if (empty($this->skimId)) {
                throw new Exception('[' . __LINE__ . '] - Parameter skimId empty');
            }
            if (!isset($putVars['kod']) || empty($putVars['kod'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter kod not exist');
            }
            if (!isset($putVars['diskripsi'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter diskripsi not exist');
            }
            if (!isset($putVars['gghKod'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter gghKod not exist');
            }
            if (!isset($putVars['gunasama'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter gunasama not exist');
            }
            if (!isset($putVars['jenisSkim'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter jenisSkim not exist');
            }
            if (!isset($putVars['kumpPkhidmatJkk'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter kumpPkhidmatJkk not exist');
            }
            if (!isset($putVars['skimPkhidmat'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter skimPkhidmat not exist');
            }
            if (!isset($putVars['gghSsm'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter gghSsm not exist');
            }
            if (!isset($putVars['kumpPkhidmatSbpa'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter kumpPkhidmatSbpa not exist');
            }
            if (!isset($putVars['oldKod'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter oldKod not exist');
            }
            if (!isset($putVars['oldName'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter oldName not exist');
            }
            if (!isset($putVars['oldGred'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter oldGred not exist');
            }
            if (!isset($putVars['kumpPkhidmatSsb'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter kumpPkhidmatSsb not exist');
            }
            if (!isset($putVars['ujianWajib1'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter ujianWajib1 not exist');
            }
            if (!isset($putVars['ujianWajib2'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter ujianWajib2 not exist');
            }
            if (!isset($putVars['ujianWajib3'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter ujianWajib3 not exist');
            }
            if (!isset($putVars['ujianWajib4'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter ujianWajib4 not exist');
            }
            if (!isset($putVars['ujianWajib5'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter ujianWajib5 not exist');
            }
            if (!isset($putVars['ujianYt'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter ujianYt not exist');
            }
            if (!isset($putVars['kpKod'])) {
                throw new Exception('[' . __LINE__ . '] - Parameter kpKod not exist');
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

            Class_db::getInstance()->db_update('ref_skim', 
                array(
                    'KOD'=>$putVars['kod'],
                    'DISKRIPSI'=>$putVars['diskripsi'],
                    'GGH_KOD'=>$putVars['gghKod'],
                    'GUNASAMA'=>$putVars['gunasama'],
                    'JENIS_SKIM'=>$putVars['jenisSkim'],
                    'KUMP_PKHIDMAT_JKK'=>$putVars['kumpPkhidmatJkk'],
                    'SKIM_PKHIDMAT'=>$putVars['skimPkhidmat'],
                    'GGH_SSM'=>$putVars['gghSsm'],
                    'KUMP_PKHIDMAT_SBPA'=>$putVars['kumpPkhidmatSbpa'],
                    'OLD_KOD'=>$putVars['oldKod'],
                    'OLD_NAME'=>$putVars['oldName'],
                    'OLD_GRED'=>$putVars['oldGred'],
                    'KUMP_PKHIDMAT_SSB'=>$putVars['kumpPkhidmatSsb'],
                    'UJIAN_WAJIB_1'=>$putVars['ujianWajib1'],
                    'UJIAN_WAJIB_2'=>$putVars['ujianWajib2'],
                    'UJIAN_WAJIB_3'=>$putVars['ujianWajib3'],
                    'UJIAN_WAJIB_4'=>$putVars['ujianWajib4'],
                    'UJIAN_WAJIB_5'=>$putVars['ujianWajib5'],
                    'UJIAN_YT'=>$putVars['ujianYt'],
                    'KP_KOD'=>$putVars['kpKod'],
                    'NO_PEMEROLEHAN'=>$putVars['noPemerolehan'],
                    'GAB_YT'=>$putVars['gabYt'],
                    'SAH_YT'=>$putVars['sahYt'],
                    'TARIKH_UBAHSUAI'=>'Now()'
                ), 
                array('SKIM_ID'=>$this->skimId)
            );
        }
        catch(Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

}