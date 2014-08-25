/**
 * Created by Miha-ha on 22.08.14.
 */
Ext.define('Admin.view.garment.EditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.garmentedit',

    requires: [
        'Ext.window.Toast'
    ],

    onUpload: function() {
        Ext.Msg.wait('Uploading', 'Uploading garment...');
        Ext.toast({
            title: 'Upload',
            html: 'Upload button pressed!!!',
            align: 'tr',
            bodyPadding: 10
        });
        setTimeout(function () {
            Ext.Msg.hide();
        },3000);
    },

    onClose: function() {

        Ext.toast({
            title: 'Close',
            html: 'Close button pressed!!!',
            align: 'tr',
            bodyPadding: 10
        });
    },

    onSelectFiles: function () {
        console.log('on select files', arguments);
    }
});