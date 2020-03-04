<?php

class Class_calon_matrikulasi {

    private $constant;
    private $fn_general;
    private $id;
    private $idPemohon;

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
    public function get_calon_matrikulasi () {
        try {
            $this->fn_general->log_debug(__CLASS__, __FUNCTION__, __LINE__, 'Entering '.__FUNCTION__);

            if (empty($this->idPemohon)) {
                throw new Exception('[' . __LINE__ . '] - Parameter idPemohon empty');
            }

            $result = array();
            $dbResult = Class_db::getInstance()->db_select_single('calon_matrikulasi', array('id_pemohon'=>$this->idPemohon));
            if (!empty($dbResult)) {
                $result['id'] = $dbResult['id'];
                $result['idPemohon'] = $dbResult['id_pemohon'];
                $result['noKp'] = $dbResult['no_kp'];
                $result['jenisSijil'] = $this->fn_general->clear_null($dbResult['jenis_sijil']);
                $result['noMatrik'] = $this->fn_general->clear_null($dbResult['no_matrik']);
                $result['jurusan'] = $this->fn_general->clear_null($dbResult['jurusan']);
                $result['sesi'] = $this->fn_general->clear_null($dbResult['sesi']);
                $result['kolej'] = $this->fn_general->clear_null($dbResult['kolej']);
                $result['pngk'] = $this->fn_general->clear_null($dbResult['pngk']);
                $result['dCipta'] = $this->fn_general->clear_null($dbResult['d_cipta']);
                $result['dKemaskini'] = $this->fn_general->clear_null($dbResult['d_kemaskini']);
            } else {
                $result = '';
            }

            return $result;
        }
        catch (Exception $ex) {
            $this->fn_general->log_error(__CLASS__, __FUNCTION__, __LINE__, $ex->getMessage());
            throw new Exception($this->get_exception('0005', __FUNCTION__, __LINE__, $ex->getMessage()), $ex->getCode());
        }
    }

}