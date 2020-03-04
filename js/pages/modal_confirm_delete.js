function ModalConfirmDelete() {

    let id;
    let returnClass;

    this.init = function () {
        $('#btnMcdSubmit').on('click', function () {
            returnClass.delete(id);
            $('#modal_confirm_delete').modal('hide');
        });
    };

    this.delete = function (_id, _returnClass) {
        if (typeof _id === 'undefined' || _id === '') {
            toastr['error'](_ALERT_MSG_ERROR_DEFAULT, _ALERT_TITLE_ERROR);
            return false;
        }
        id = _id;
        returnClass = typeof _returnClass !== 'undefined' ? _returnClass : '';
        $('#modal_confirm_delete').modal({backdrop: 'static', keyboard: false});
    };

    this.init();
}