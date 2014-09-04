/**
 * Created by Miha-ha on 22.08.14.
 */
/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Admin.view.upload.UploadModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.upload',

    data: {
        uploader: null,
        isUpload: false
    }

});