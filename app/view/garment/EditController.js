/**
 * Created by Miha-ha on 22.08.14.
 */
Ext.define('Admin.view.garment.EditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.garmentedit',

    requires: [
        'Ext.window.Toast'
    ],

    createGarment: function (geometryId, cb) {
        console.log('create garment:', arguments);
        var normalId = 'blahblah',
            diffuseId = 'blahblah';

        var params = {
            name: 'blah',
            assets: {
                geometry: 'webgl.dressformer.com/assets/geometry/'+geometryId,
                normal: 'webgl.dressformer.com/assets/image/'+normalId,
                diffuse: 'webgl.dressformer.com/assets/image/'+diffuseId
            }
        };

        Ext.Ajax.request({
            url: 'http://webgl.dressformer.com/assets/garments',
            params: params,
            success: function (response) {
                try {
                    var json = Ext.JSON.decode(response.responseText);
                    console.log('response json:', json);
                    cb(null, json.id);
                }catch(e){
                    cb(e);
                }
            },
            failure: function (response) {
                cb(response);
            }
        });
    },

    createGeometry: function (cb) {
        var tree = this.lookupReference('treepanel'),
            root = tree.getRootNode(),
            base = root.findChild('name', 'base'),
            targets = root.findChild('name', 'targets'),
            params = {
                base: base.firstChild.get('assetId'),
                morph_targets: []
            },
            ok = true;

        targets.eachChild(function (node) {
            var section = {
                section: node.get('name'),
                sources: []
            };

            node.eachChild(function (child) {
                var weight = child.get('weight');
                section.sources.push({
                    id: child.get('assetId'),
                    weight: weight
                });

                if (!weight) ok = false;
            });

            params.morph_targets.push(section);
        });

        console.log('create geometry params:', params);

        if (!ok) {
            Ext.Msg.show({
                title:'Error',
                message: 'All weights must be filled!',
                buttons: Ext.Msg.YES,
                icon: Ext.Msg.ERROR
            });
            return;
        }

        Ext.Ajax.request({
            url: 'http://webgl.dressformer.com/assets/geometry',
            params: params,
//            method: 'POST',
            cors: true,
            success: function (response) {
                try {
                    var json = Ext.JSON.decode(response.responseText);
                    console.log('response json:', json);
                    cb(null, json.id);
                }catch(e){
                    cb(e);
                }
            },
            failure: function (response) {
                cb(response);
            }
        });
    },

    onFilesAdded: function (up, files) {
        var tree = this.lookupReference('treepanel'),
            root = tree.getRootNode(),
            base = root.findChild('name', 'base'),
            textures = root.findChild('name', 'textures'),
            targets = root.findChild('name', 'targets'),
            sections = {
                height: targets.findChild('name', 'height'),
                chest: targets.findChild('name', 'chest'),
                underbust: targets.findChild('name', 'underbust'),
                waist: targets.findChild('name', 'waist'),
                hips: targets.findChild('name', 'hips')
            },
            unknown = root.findChild('name', 'unknown'),
            baseModel;

        function isTexture(file) {
            return /image/i.test(file.type);
        }

        function isNormalMap(file) {
            return isTexture(file) && /[_-]n/i.test(file.name);
        }

        function isDiffuseMap(file) {
            return isTexture(file) && /[-_]d/i.test(file.name);
        }

        function isModel(file) {
            return /\.obj$/.test(file.name);
        }

        function isSection(name, file) {
            var re = new RegExp('[_-]' + name, 'i');
            return isModel(file) && re.test(file.name);
        }

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
            } else if (isDiffuseMap(file)) {
                node.type = 'diffuse';
                textures.appendChild(node);
            } else if (isModel(file)) {
                var sectionFind = false;
                for (var section in sections) {
                    if (sections.hasOwnProperty(section)) {
                        var sectionNode = sections[section];
                        if (isSection(section, file)) {
                            sectionFind = true;
                            node.type = 'target ' + section;
                            sectionNode.appendChild(node);
                        }
                    }
                }

                if (!sectionFind) {
                    node.type = 'base model';
                    base.appendChild(node);
                }
            } else {
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

        if (node && response.length > 0) {
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

    onUploadComplete: function (up, files) {
        Ext.Msg.hide();
        console.log('[UploadComplete]');
    },

    onViewRendered: function () {
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

    onCreate: function () {
        var me = this;
        me.createGeometry(function (error, geometryId) {
            if (error) {
                console.log('error:', error);
                return;
            }

            me.createGarment(geometryId, function (error, garmentId) {
                console.log('create garment callback:', arguments);
            });

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
    }
});