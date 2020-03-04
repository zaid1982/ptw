<?php
/**
 * Created by PhpStorm.
 * User: User
 * Date: 2/18/2019
 * Time: 10:39 PM
 */

class Class_constant {

    //const URL = '//metadatasyst.com/gems/api/';
    //const URL = '//gems.globalfm.com.my/api/';
    const URL = '//localhost:8081/spdp_v2/api/';

    const ERR_DEFAULT = 'Ralat pada sistem. Sila hubungi pihak Administrator!';
    const ERR_LOGIN_NOT_EXIST = 'Kesilapan pada login ID atau kata laluan. Sila cuba semula.';
    const ERR_LOGIN_WRONG_PASSWORD = 'Kata laluan tidak betul. Sila cuba semula.';
    const ERR_LOGIN_BLOCK = 'You account has been blocked. Please retry after 10 minutes.';
    const ERR_RESET_SAME_PASSWORD = 'Password cannot be similar to previous';
    const ERR_LOGIN_NOT_ACTIVE = 'User ID is not active. Please contact Administrator to activate.';
    const ERR_USER_ALREADY_ACTIVATED = 'Your ID already activated.';
    const ERR_FORGOT_PASSWORD_NOT_EXIST = 'Email not exist';
    const ERR_CHANGE_PASSWORD_WRONG_CURRENT = 'Old password not correct';
    const ERR_CHANGE_PASSWORD_OLD_NEW_SAME = 'New password cannot be the same as old password';
    const ERR_ROLE_DELETE_HAVE_TASK = 'This user cannot be removed from this roles since there are still task assigned. Please delegate the task first.';
    const ERR_ROLE_DELETE_ALONE = 'There is no other user are assigned to this role. Please assign this role to new user before remove this user form this role.';
    const ERR_USER_ADD_SIMILAR_USERNAME = 'No Kad Pengenalan telah sedia ada.';
    const ERR_USER_ADD_SIMILAR_EMAIL = 'Email already registered. Please choose another email.';
    const ERR_USER_DELETE = 'Pengguna ini telah sedia dihapus';
    const ERR_USER_DEACTIVATE = 'User already inactive';
    const ERR_USER_ACTIVATE = 'User already active';
    const ERR_USER_EXIST_IN_GROUP = 'User already registered in PPM / WO Group for current site. Please remove user from the group first to change site.';
    const ERR_DATA_EXCEED_LIMIT = 'Data carian melebihi limit 5,000. Sila kecilkan maklumat carian.';

    const SUC_FORGOT_PASSWORD = 'Your password successfully reset. Please login with temporary password sent to your email.';
    const SUC_CHANGE_PASSWORD = 'Your password has been changed';
    const SUC_RESET_PASSWORD = 'Your password successfully updated';
    const SUC_UPDATE_PROFILE = 'Your profile successfully updated';
    const SUC_EDIT_PASSWORD = 'Password successfully changed';
    const SUC_DATA_ADD = 'Data berjaya ditambah';
    const SUC_DATA_UPDATE = 'Data berjaya dikemaskini';

    const ERR_TASK_ALREADY_SUBMITTED = 'This task already submitted';
    const ERR_TASK_CLAIMED = 'This task currently processed by other user';

    const SUC_SAVE = 'Data berjaya disimpan!';
    const SUC_SUBMITTED = 'Data berjaya dihantar!';
    const SUC_RETURNED = 'Successfully returned!';
    const SUC_REJECTED = 'Successfully rejected!';
    const SUC_DELETE = 'Successfully removed!';
    const SUC_USER_ADD = 'Pengguna Sistem berjaya didaftar';
    const SUC_USER_UPDATE = 'Pengguna Sistem berjaya dikemaskini';
    const SUC_USER_DELETE = 'Pengguna Sistem berjaya dihapus';

    const ERR_MYID_NOT_EXIST = 'MyId yang dimasukkan tidak dijumpai';

    const ERR_AGAMA_KOD_EXIST = 'Kod Agama telah sedia ada. Sila pilih Kod Agama yang lain!';
    const ERR_AGAMA_EXIST = 'Agama telah sedia ada. Sila pilih Agama yang lain!';
    const ERR_KETURUNAN_KOD_EXIST = 'Kod Keturunan telah sedia ada. Sila pilih Kod Keturunan yang lain!';
    const ERR_KETURUNAN_EXIST = 'Keturunan telah sedia ada. Sila pilih Keturunan yang lain!';
    const ERR_NEGERI_KOD_EXIST = 'Kod Negeri telah sedia ada. Sila pilih Kod Negeri yang lain!';
    const ERR_NEGERI_EXIST = 'Negeri telah sedia ada. Sila pilih Negeri yang lain!';
    const ERR_POSKOD_EXIST = 'Nama lokasi telah sedia ada pada poskod dan negeri yang dipilih.';
    const ERR_MATA_PELAJARAN_KOD_EXIST = 'Kod Mata Pelajaran telah sedia ada. Sila pilih Kod Mata Pelajaran yang lain!';
    const ERR_MATA_PELAJARAN_DESC_EXIST = 'Mata Pelajaran telah sedia ada. Sila pilih Pusat Mata Pelajaran yang lain!';
    const ERR_GRED_MATA_PELAJARAN_EXIST = 'Gred Mata Pelajaran telah sedia ada pada Jenis dan Tingkatan yang dipilih.';
    const ERR_SIJIL_EXIST = 'Kod Sijil telah sedia ada pada Tingkatan yang dipilih.';
    const ERR_SIJIL_PANGKAT_EXIST = 'Kod Sijil Pangkat telah sedia ada pada Tingkatan yang dipilih.';
    const ERR_UJIAN_LISAN_EXIST = 'Kod Ujian Lisan telah sedia ada pada Tingkatan yang dipilih.';
    const ERR_KELULUSAN_KOD_EXIST = 'Kod Kelulusan telah sedia ada. Sila pilih Kod Kelulusan yang lain!';
    const ERR_PAPER_JULAI_KOD_EXIST = 'Kod Paper Julai telah sedia ada. Sila pilih Kod Paper Julai yang lain!';
    const ERR_PAPER_JULAI_BM_KOD_EXIST = 'Kod Paper Julai BM telah sedia ada. Sila pilih Kod Paper Julai BM yang lain!';
    const ERR_BAHASA_KOD_EXIST = 'Kod Bahasa telah sedia ada. Sila pilih Kod Bahasa yang lain!';
    const ERR_BAKAT_KOD_EXIST = 'Kod Bakat telah sedia ada. Sila pilih Kod Bakat yang lain!';
    const ERR_BANTUAN_KOD_EXIST = 'Kod Bantuan telah sedia ada. Sila pilih Kod Bantuan yang lain!';
    const ERR_BANTUAN_EXIST = 'Bantuan telah sedia ada. Sila pilih Bantuan yang lain!';
    const ERR_BIASISWA_KOD_EXIST = 'Kod Biasiswa telah sedia ada. Sila pilih Kod Biasiswa yang lain!';
    const ERR_BIASISWA_EXIST = 'Biasiswa telah sedia ada. Sila pilih Biasiswa yang lain!';
    const ERR_KOLEJ_KOD_EXIST = 'Kod Kolej telah sedia ada. Sila pilih Kod Kolej yang lain!';
    const ERR_KOLEJ_EXIST = 'Nama Kolej telah sedia ada. Sila pilih Nama Kolej yang lain!';
    const ERR_GRED_GAJI_EXIST = 'Gred Gaji telah sedia ada. Sila pilih Gred Gaji yang lain!';
    const ERR_KATEGORI_INSTITUSI_KOD_EXIST = 'Kod Kategori Institusi telah sedia ada. Sila pilih Kod Kategori Institusi yang lain!';
    const ERR_KATEGORI_INSTITUSI_EXIST = 'Kategori Institusi telah sedia ada. Sila pilih Kategori Institusi yang lain!';
    const ERR_INSTITUSI_KOD_EXIST = 'Kod Institusi telah sedia ada. Sila pilih Kod Institusi yang lain!';
    const ERR_JENIS_PENGAJIAN_EXIST = 'Kod Jenis Pengajian telah sedia ada. Sila pilih Kod Jenis Pengajian yang lain!';
    const ERR_JENIS_PENGKHUSUSAN_EXIST = 'Kod Jenis Pengkhususan telah sedia ada. Sila pilih Kod Jenis Pengkhususan yang lain!';
    const ERR_JENIS_PERKHIDMATAN_EXIST = 'Kod Jenis Perkhidmatan telah sedia ada. Sila pilih Kod Jenis Perkhidmatan yang lain!';
    const ERR_PERINGKAT_EXIST = 'Kod Peringkat telah sedia ada. Sila pilih Kod Peringkat yang lain!';
    const ERR_TELCO_KOD_EXIST = 'Kod Telco telah sedia ada. Sila Telco Kod Peringkat yang lain!';
    const ERR_KECACATAN_CALON_EXIST = 'Kod Kecacatan Calon telah sedia ada. Sila pilih Kod Kecacatan Calon yang lain!';
    const ERR_PENGUASAAN_BAHASA_EXIST = 'Kod Penguasaan Bahasa telah sedia ada. Sila pilih Kod Penguasaan Bahasa yang lain!';
    const ERR_TARAF_JAWATAN_EXIST = 'Kod Taraf Jawatan telah sedia ada. Sila pilih Kod Taraf Jawatan yang lain!';
    const ERR_PENGKHUSUSAN_KOD_EXIST = 'Kod Pengkhususan telah sedia ada. Sila pilih Kod Pengkhususan yang lain!';
    const ERR_SUKAN_EXIST = 'Kod Sukan telah sedia ada. Sila pilih Kod Sukan yang lain!';
    const ERR_SKIM_SAH_EXIST = 'Kod Skim Sah telah sedia ada. Sila pilih Kod Skim Sah yang lain!';
    const ERR_SKIM_EXIST = 'Kod Skim telah sedia ada. Sila pilih Kod Skim yang lain!';
    const ERR_BEKAS_POLIS_TENTERA_EXIST = 'Kod Bekas Polis Tentera telah sedia ada pada Kod Pangkat yang dipilih. Sila pilih Kod Bekas Polis Tentera yang lain!';
    const ERR_SUBJEK_MATRIKULASI_EXIST = 'Kod Subjek Matrikulasi telah sedia ada pada Semester yang dipilih. Sila pilih Kod Skim yang lain!';
    const ERR_KEM_JABATAN_EXIST = 'Kod Kementerian Jabatan telah sedia ada. Sila pilih Kod Kementerian Jabatan yang lain!';

}