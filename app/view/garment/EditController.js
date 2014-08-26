/**
 * Created by Miha-ha on 22.08.14.
 */
Ext.define('Admin.view.garment.EditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.garmentedit',

    requires: [
        'Ext.window.Toast'
    ],

    init: function () {
        var garmentData = this.getStore('garmentData'),
            files = this.getViewModel().getData().files,
            tree = this.lookupReference('treepanel'),
            root = tree.getRootNode(),
            textures = root.findChild('name', 'textures'),
            targets = root.findChild('name', 'targets'),
            unknown = root.findChild('name', 'unknown');

        function isTexture(file) {
            return /image/.test(file.type);
        }

        console.log('edit controller files:', files, 'root:', root, textures, targets);
        files.forEach(function (file) {
            console.log('file:', file);
            var node = {
                name: file.name,
                size: file.size,
                leaf: true
            };
            isTexture(file) && textures.appendChild(node);
        });

        tree.expandAll();
    },

    onUpload: function () {
        Ext.Msg.wait('Uploading', 'Uploading garment...');
        Ext.toast({
            title: 'Upload',
            html: 'Upload button pressed!!!',
            align: 'tr',
            bodyPadding: 10
        });
        setTimeout(function () {
            Ext.Msg.hide();
        }, 3000);
    },

    onClose: function () {
        console.log('files:', this.files);
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