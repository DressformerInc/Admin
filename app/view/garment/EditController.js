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