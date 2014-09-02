/**
 * Created by Miha-ha on 22.08.14.
 */
Ext.define('Admin.view.geometry.EditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.geometryedit',

    requires: [
        'Ext.window.Toast'
    ],

    isUploaded: false,

    showError: function (msg) {
        Ext.Msg.show({
            title: 'Error',
            message: msg,
            buttons: Ext.Msg.YES,
            icon: Ext.Msg.ERROR
        });
    },

    createGeometry: function (cb) {
        var me = this,
            tree = this.lookupReference('treepanel'),
            fieldName = this.lookupReference('fieldName'),
            fieldDefault = this.lookupReference('fieldDefault'),
            root = tree.getRootNode(),
            base = root.findChild('name', 'base'),
            targets = root.findChild('name', 'targets'),
            params = {
                base: base && base.firstChild && base.firstChild.get('assetId'),
                name: fieldName && fieldName.getValue(),
                default_dummy: fieldDefault && fieldDefault.getValue(),
                morph_targets: []
            },
            ok = true;

        if (!params.base) {
            cb('base is empty!');
            return;
        }

        targets.eachChild(function (node) {
            var section = {
                section: node.get('name'),
                sources: []
            };

            node.eachChild(function (child) {
                var weight = +child.get('weight');
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
            me.showError('All weights must be filled!');
            return;
        }

        Ext.Ajax.request({
            url: Admin.common.Config.api.geometry,
            jsonData: params,
            success: function (response) {
                try {
                    var json = Ext.JSON.decode(response.responseText);
                    console.log('response json:', json);
                    cb(null, json.id);
                } catch (e) {
                    cb(e);
                }
            },
            failure: function (response) {
                cb(response);
            }
        });
    },

    onFilesAdded: function (up, files) {
        var fieldName = this.lookupReference('fieldName'),
            tree = this.lookupReference('treepanel'),
            root = tree.getRootNode(),
            base = root.findChild('name', 'base'),
            textures = root.findChild('name', 'textures'),
            targets = root.findChild('name', 'targets'),
            sections = {
                height: targets.findChild('name', 'height'),
                chest: targets.findChild('name', 'chest'),
                underbust: targets.findChild('name', 'underbust'),
                underchest: targets.findChild('name', 'underbust'),
                waist: targets.findChild('name', 'waist'),
                hips: targets.findChild('name', 'hips')
            },
            unknown = root.findChild('name', 'unknown');

        function isTexture(file) {
            return /image/i.test(file.type);
        }

        function isNormalMap(file) {
            return isTexture(file) && /[_-]n/i.test(file.name);
        }

        function isDiffuseMap(file) {
            return isTexture(file) && /[-_]d/i.test(file.name);
        }

        function isSpecularMap(file) {
            return isTexture(file) && /[-_]s/i.test(file.name);
        }

        function isModel(file) {
            return /\.obj$/.test(file.name);
        }

        function isMtl(file) {
            return /\.mtl&/.test(file.name);
        }

        function isSection(name, file) {
            var re = new RegExp('[_-]?' + name, 'i');
            return isModel(file) && re.test(file.name);
        }

        function getGarmentName(fileName) {
            var parts = fileName.split('.');
            return parts[0] || 'unnamed';
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
            }  else if (isSpecularMap(file)) {
                node.type = 'specular';
                textures.appendChild(node);
            } else if (isModel(file)) {
                var sectionFind = false;
                for (var section in sections) {
                    if (sections.hasOwnProperty(section)) {
                        var sectionNode = sections[section];
                        if (isSection(section, file)) {
                            sectionFind = true;
                            node.type = section;
                            sectionNode.appendChild(node);
                        }
                    }
                }

                if (!sectionFind) {
                    node.type = 'base';
                    base.appendChild(node);
                    fieldName.setValue(getGarmentName(file.name));
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
        var me = this;

        me.createGeometry(function (error, geometryId) {
            Ext.Msg.hide();
            if (error) {
                me.showError('Ooops!\nCreate geometry fail...');
                console.log('error:', error);
                return;
            }

            Admin.app.getGeometryStore().reload();
            me.closeView();
        });
    },

    onViewRendered: function () {
        var me = this,
            buttonBrowse = this.lookupReference('buttonBrowse');

        me.uploader = new plupload.Uploader({
            runtimes: 'html5',
            browse_button: buttonBrowse.getEl().dom.id, // you can pass in id...
            container: me.getView().getEl().dom.id, // ... or DOM Element itself
//            url: 'http://webgl.dressformer.com/assets/',
            url: Admin.common.Config.api.assets,

            filters: {
                max_file_size: '50mb',
                mime_types: [
                    {title: "Image files", extensions: "jpg,gif,png"},
                    {title: "Obj/mtl files", extensions: "obj,mtl"}
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
//        console.log('onBrowse', arguments);
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
        Ext.Msg.wait('Wait...', 'Creating geometry...');
        if (me.isUploaded) {
            me.createGeometry(function (error, geometryId) {
                if (error) {
                    Ext.Msg.hide();
                    me.showError('Ooops!\nCreate geometry fail...');
                    console.log('error:', error);
                    return;
                }

                console.log('geometry id:', geometryId);

                Admin.app.getGeometryStore().reload();
                me.closeView();
            })
        }else {
            me.uploader.start()
        }
    },

    onCreateGeometry: function () {
        var me = this;

        me.createGeometry(function (error, geometryId) {
            if (error) {
                me.showError(error);
            }else {
                Ext.Msg.alert('GeometryId', geometryId);
            }
        })

    }
});