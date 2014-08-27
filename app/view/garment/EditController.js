/**
 * Created by Miha-ha on 22.08.14.
 */
Ext.define('Admin.view.garment.EditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.garmentedit',

    requires: [
        'Ext.window.Toast'
    ],

    onFilesAdded: function (up, files) {
        var tree = this.lookupReference('treepanel'),
            root = tree.getRootNode(),
            textures = root.findChild('name', 'textures'),
            targets = root.findChild('name', 'targets'),
            unknown = root.findChild('name', 'unknown'),
            baseModel;

        function isTexture(file) {
            return /image/.test(file.type);
        }

        function isNormalMap(file) {
            return isTexture(file) && /[_-]n/.test(file.name);
        }

        function isDiffuseMap(file) {
            return isTexture(file) && /[-_]d/.test(file.name);
        }

        function isModel(file) {
            return /\.obj$/.test(file.name);
        }

        console.log('edit controller files:', files, 'root:', root, textures, targets);
        files.forEach(function (file) {
            console.log('file:', file);
            var node = {
                name: file.name,
                size: file.size,
                leaf: true
            };

            if (isNormalMap(file)) {
                node.type = 'normal';
                textures.appendChild(node);
            }else if (isDiffuseMap(file)) {
                node.type = 'diffuse';
                textures.appendChild(node);
            }else if (isModel(file) && !baseModel){
                node.type = 'base model';
                root.appendChild(node);
            }else if (isModel(file) && baseModel){
                node.type = 'target model';
                targets.appendChild(node);
            }else {
                unknown.appendChild(node);
            }
        });

        tree.expandAll();
    },

    onFileUploaded: function (up, file, info) {
        var response = Ext.JSON.decode(info.response),
            tree = this.lookupReference('treepanel'),
            root = tree.getRootNode(),
            node = root.findChild('name', file.name, true);

        if (node && response.length > 0){
            node.set('assetId', response[0].id);
            node.save();
        }
    },

    onUploadProgress: function (up, file) {
        var tree = this.lookupReference('treepanel'),
            root = tree.getRootNode(),
            node = root.findChild('name', file.name, true);

        if (node) {
            node.set('status', file.percent);
            node.save();
        }
    },

    onUploadComplete: function(up, files) {
        Ext.Msg.hide();
        console.log('[UploadComplete]');
    },

    onViewRendered: function () {
        console.log('onRendered:', arguments);
        var me = this,
            buttonBrowse = this.lookupReference('buttonBrowse');

        me.uploader = new plupload.Uploader({
            runtimes: 'html5',
            browse_button: buttonBrowse.getEl().dom.id, // you can pass in id...
            container: me.getView().getEl().dom.id, // ... or DOM Element itself
            url: 'http://webgl.dressformer.com/assets/',

            filters: {
                max_file_size: '50mb',
                mime_types: [
                    {title: "Image files", extensions: "jpg,gif,png"},
                    {title: "Obj files", extensions: "obj"}
                ]
            },

            init: {
                PostInit: function () {
                    console.log('post init', null);
                },

                FilesAdded: me.onFilesAdded.bind(me),

                FileUploaded: me.onFileUploaded.bind(me),

                UploadComplete: me.onUploadComplete.bind(me),

                UploadProgress: me.onUploadProgress.bind(me),

                Error: function (up, err) {
                    console.log('error:', err);
                }
            }
        });

        me.uploader.init();
    },

    onBrowse: function () {
        console.log('onBrowse', arguments);
    },

    onUpload: function () {
        this.uploader.start();
        Ext.Msg.wait('Uploading', 'Uploading garment...');
        Ext.toast({
            title: 'Upload',
            html: 'Uploading started!!!',
            align: 'tr',
            bodyPadding: 10
        });
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