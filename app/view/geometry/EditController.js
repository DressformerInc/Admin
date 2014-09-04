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
    sendMode: 'POST',

    initGeometry: function (geometry) {
        var tree = this.lookupReference('treepanel'),
            fieldName = this.lookupReference('fieldName'),
            fieldDefault = this.lookupReference('fieldDefault'),
            root = tree.getRootNode(),
            base = root.findChild('name', 'base'),
            targets = root.findChild('name', 'targets'),
            sections = {
                height: targets.findChild('name', 'height'),
                chest: targets.findChild('name', 'chest'),
                underbust: targets.findChild('name', 'underbust'),
                underchest: targets.findChild('name', 'underbust'),
                waist: targets.findChild('name', 'waist'),
                hips: targets.findChild('name', 'hips')
            },
            baseData = geometry.get('base'),
            targetsData = geometry.get('morph_targets');

        if (baseData) {
            base.appendChild({
                assetId: baseData.id,
                name: baseData.origin_name,
                type: 'base',
                leaf: true
            });
        }

        if (targetsData && targetsData.length > 0){
            for (var i= 0, li=targetsData.length; i<li; ++i){
                var target = targetsData[i],
                    type = target.section;

                for(var j= 0, lj=target.sources.length; j<lj; ++j){
                    var source = target.sources[j];

                    sections[type].appendChild({
                        name: source.origin_name,
                        id: source.id,
                        assetId: source.id,
                        weight: source.weight,
                        type: type,
                        leaf: true
                    });
                }
            }
        }


        tree.expandAll();
    },

    init: function (view) {
        var data = this.getViewModel().data,
            btnCreate = this.lookupReference('buttonCreate'),
            btnDelete = this.lookupReference('buttonDelete'),
            btnUpdate = this.lookupReference('buttonUpdate');

        if (data.theGeometry) {
//            this.initGeometry(data.theGeometry);
            btnCreate.hide();
            btnDelete.show();
            btnUpdate.show();
        } else {
            btnCreate.show();
            btnUpdate.hide();
            btnDelete.hide();
        }

    },

    getData: function () {

    },

    showError: function (msg) {
        Ext.Msg.show({
            title: 'Error',
            message: msg,
            buttons: Ext.Msg.YES,
            icon: Ext.Msg.ERROR
        });
    },

    sendGeometry: function (method, cb) {
        var me = this,
            data = this.getViewModel().data,
            url = Admin.common.Config.api.geometry,
            tree = this.lookupReference('treepanel'),
            fieldName = this.lookupReference('fieldName'),
            fieldDefault = this.lookupReference('fieldDefault'),
            root = tree.getRootNode(),
            base = root.findChild('name', 'base'),
            targets = root.findChild('name', 'targets'),
            params = {
                base: {},
                name: fieldName && fieldName.getValue(),
                default_dummy: fieldDefault && fieldDefault.getValue(),
                morph_targets: []
            },
            ok = true;

        if (base && base.firstChild && base.firstChild.get('assetId')) {
            params.base.id = base.firstChild.get('assetId');
            params.base.origin_name = base.firstChild.get('name');
        } else {
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
                    weight: weight,
                    origin_name: child.get('name')
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

        if ('PUT' === method) {
            url += data.theGeometry.id;
        }

        Ext.Ajax.request({
            url: url,
            method: method,
            jsonData: params,
            success: function (response) {
                try {
                    var json = Ext.JSON.decode(response.responseText);
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

    createGeometry: function (cb) {
        this.sendGeometry('POST', cb);
    },

    updateGeometry: function (cb) {
        this.sendGeometry('PUT', cb);
    },

    deleteGeometry: function (id, cb) {
        Ext.Ajax.request({
            url: Admin.common.Config.api.geometry+id,
            method: 'DELETE',
            success: function (response) {
               cb(null, response);
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
                underbust: targets.findChild('name', 'underbust'),
                underchest: targets.findChild('name', 'underbust'),
                waist: targets.findChild('name', 'waist'),
                chest: targets.findChild('name', 'chest'),
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
            } else if (isSpecularMap(file)) {
                node.type = 'specular';
                textures.appendChild(node);
            } else if (isModel(file)) {
                var sectionFind = false;
                for (var section in sections) {
                    if (sections.hasOwnProperty(section)) {
                        var sectionNode = sections[section];
                        if (isSection(section, file)) {
                            sectionFind = true;

                            sectionNode.appendChild({
                                name: node.name,
                                size: node.size,
                                type: section,
                                leaf: true
                            });

                            break;
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

        console.log('sections chest:', sections.chest);

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

        me.sendGeometry(me.sendMode, function (error, geometryId) {
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


    onCreate: function () {
//        var me = this;
//        Ext.Msg.wait('Wait...', 'Creating geometry...');
//
//        this.sendMode = 'POST';
//
//        if (me.isUploaded) {
//            me.createGeometry(function (error, geometryId) {
//                if (error) {
//                    Ext.Msg.hide();
//                    me.showError('Ooops!\nCreate geometry fail...');
//                    console.log('error:', error);
//                    return;
//                }
//
//                console.log('geometry id:', geometryId);
//
//                Admin.app.getGeometryStore().reload();
//                me.closeView();
//            })
//        } else {
//            me.uploader.start()
//        }
    },

    onUpdate: function () {
//        var me = this;
//        Ext.Msg.wait('Wait...', 'Updating geometry...');
//
//        this.sendMode = 'PUT';
//
//        if (me.isUploaded) {
//            me.createGeometry(function (error, geometryId) {
//                if (error) {
//                    Ext.Msg.hide();
//                    me.showError('Ooops!\nUpdate geometry fail...');
//                    console.log('error:', error);
//                    return;
//                }
//
//                console.log('geometry id:', geometryId);
//
//                Admin.app.getGeometryStore().reload();
//                me.closeView();
//            })
//        } else {
//            me.uploader.start()
//        }
    },

    onDelete: function () {
        var me = this,
            data = this.getViewModel().data;

        Admin.common.Api.deleteGeometry(data.theGeometry.id, function (error, response) {
            if (error) {
                Admin.common.Utils.error(error, response);
            }else {
                Admin.app.getGeometryStore().load();
                me.closeView();
            }
        });
    }

});