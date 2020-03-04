function ModalPengguna() {

    const className = 'ModalPengguna';
    let self = this;
    let rowRefresh = '';
    let classFrom;
    let userId = '';
    let formValidate;
    let refDesignation;
    let refDepartment;
    let refRole;

    this.init = function () {
        mzOption('optMpgDesignationId', refDesignation, 'Pilih Jawatan / Gred *', 'designationId', 'designationDesc', {designationStatus: '1'});
        mzOption('optMpgDepartmentId', refDepartment, 'Pilih Bahagian *', 'departmentId', 'departmentDesc', {departmentStatus: '1'});
        mzOption('optMpgRoleId', refRole, 'Pilih Peranan *', 'roleId', 'roleDesc', {roleStatus: '1'});

        const vDataMpg = [
            {
                field_id: 'txtMpgUserFirstName',
                type: 'text',
                name: 'Nama Pengguna',
                validator: {
                    notEmpty: true,
                    maxLength: 200
                }
            },
            {
                field_id: 'txtMpgUserNoKp',
                type: 'text',
                name: 'No Kad Pengenalan',
                validator: {
                    notEmpty: true,
                    digit: true,
                    eqLength: 12
                }
            },
            {
                field_id: 'optMpgDesignationId',
                type: 'select',
                name: 'Jawatan / Gred',
                validator: {
                    notEmpty: true
                }
            },
            {
                field_id: 'optMpgDepartmentId',
                type: 'select',
                name: 'Bahagian',
                validator: {
                    notEmpty: true
                }
            },
            {
                field_id: 'txtMpgUserContactNo',
                type: 'text',
                name: 'No Telefon',
                validator: {
                    notEmpty: true,
                    digit: true,
                    minLength: 8,
                    maxLength: 15
                }
            },
            {
                field_id: 'txtMpgUserEmail',
                type: 'text',
                name: 'Emel',
                validator: {
                    notEmpty: true,
                    email: true,
                    maxLength: 100
                }
            },
            {
                field_id: 'optMpgRoleId',
                type: 'select',
                name: 'Peranan',
                validator: {
                    notEmpty: true
                }
            },
            {
                field_id: 'txtMpgUserPassword',
                type: 'text',
                name: 'Kata Laluan',
                validator: {
                    notEmpty: true,
                    minLength: 8,
                    maxLength: 12
                }
            },
            {
                field_id: 'chkMpgUserStatus',
                type: 'checkSingle',
                name: 'Status',
                validator: {
                }
            }
        ];

        formValidate = new MzValidate('formMpg');
        formValidate.registerFields(vDataMpg);

        $('#modal_pengguna').on('hidden.bs.modal', function(){
            formValidate.clearValidation();
        });

        $('#btnMpgSubmit').on('click', function () {
            ShowLoader();
            setTimeout(function () {
                try {
                    if (!formValidate.validateNow()) {
                        toastr['error'](_ALERT_MSG_VALIDATION, _ALERT_TITLE_ERROR);
                    }
                    else {
                        const statusVal = $("input[name='chkMpgUserStatus']").is(":checked") ? '1' : '2';
                        const data = {
                            userNoKp: $('#txtMpgUserNoKp').val(),
                            userFirstName: $('#txtMpgUserFirstName').val(),
                            designationId: $('#optMpgDesignationId').val(),
                            departmentId: $('#optMpgDepartmentId').val(),
                            userContactNo: $('#txtMpgUserContactNo').val(),
                            userEmail: $('#txtMpgUserEmail').val(),
                            roleId: $('#optMpgRoleId').val(),
                            userPassword: $('#txtMpgUserPassword').val(),
                            userStatus: statusVal
                        };

                        if (userId === '') {
                            data['action'] = 'add_user';
                            userId = mzAjaxRequest('user.php', 'POST', data);
                            if (classFrom.getClassName() === 'MainPengurusanPengguna') {
                                data['userId'] = userId;
                                classFrom.addTableUser(data);
                            }
                        } else {
                            data['action'] = 'update_user';
                            mzAjaxRequest('user.php?userId='+userId, 'PUT', data);
                            if (classFrom.getClassName() === 'MainPengurusanPengguna') {
                                classFrom.updateTableUser(data, rowRefresh);
                            }
                        }
                        $('#modal_pengguna').modal('hide');
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });

    };

    this.add = function () {
        userId = '';
        rowRefresh = '';

        ShowLoader();
        setTimeout(function () {
            try {
                $('#modal_pengguna').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.edit = function (_userId, _rowRefresh) {
        userId = _userId;
        rowRefresh = _rowRefresh;

        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_userId, _rowRefresh]);

                const dataResult = mzAjaxRequest('user.php?userId='+userId, 'GET');
                mzSetFieldValue('MpgUserNoKp', dataResult['userNoKp'], 'text');
                mzSetFieldValue('MpgUserFirstName', dataResult['userFirstName'], 'text');
                mzSetFieldValue('MpgDesignationId', dataResult['designationId'], 'select', 'Jawatan / Gred *');
                mzSetFieldValue('MpgDepartmentId', dataResult['departmentId'], 'select', 'Bahagian *');
                mzSetFieldValue('MpgUserContactNo', dataResult['userContactNo'], 'text');
                mzSetFieldValue('MpgUserEmail', dataResult['userEmail'], 'text');
                mzSetFieldValue('MpgRoleId', dataResult['roleId'], 'select', 'Peranan *');
                mzSetFieldValue('MpgUserPassword', dataResult['userPasswordTemp'], 'text');
                mzSetFieldValue('MpgUserStatus', dataResult['userStatus'], 'checkSingle', '1');

                $('#modal_pengguna').modal({backdrop: 'static', keyboard: false});
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 200);
    };

    this.delete = function (_userId) {
        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_userId]);
                mzAjaxRequest('user.php?userId='+_userId, 'DELETE');
                if (classFrom.getClassName() === 'MainPengurusanPengguna') {
                    classFrom.genTableUser();
                }
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 300);
    };

    this.getClassName = function () {
        return className;
    };

    this.setClassFrom = function (_classFrom) {
        classFrom = _classFrom;
    };

    this.setRefDesignation = function (_refDesignation) {
        refDesignation = _refDesignation;
    };

    this.setRefDepartment = function (_refDepartment) {
        refDepartment = _refDepartment;
    };

    this.setRefRole = function (_refRole) {
        refRole = _refRole;
    };

}