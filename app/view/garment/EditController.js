/**
 * Created by Miha-ha on 22.08.14.
 */
Ext.define('Admin.view.garment.EditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.garmentedit',

    requires: [
        'Ext.window.Toast'
    ],

    initGarment: function (garment) {
        //TODO: загрузить geometry
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

        if (targetsData && targetsData.length > 0) {
            for (var i = 0, li = targetsData.length; i < li; ++i) {
                var target = targetsData[i],
                    type = target.section;

                for (var j = 0, lj = target.sources.length; j < lj; ++j) {
                    var source = target.sources[j];

                    sections[type].appendChild({
                        name: source.origin_name,
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

        if (data.theGarment) {
//            this.initGarment(data.theGarment);
            btnCreate.hide();
            btnDelete.show();
            btnUpdate.show();
        } else {
            btnCreate.show();
            btnUpdate.hide();
            btnDelete.hide();
        }

    },

    createGeometryAndGarment: function () {
        var me = this,
            vmData = this.getViewModel().data,
            uploadTree = this.lookupReference('uploadtree'),
            geometryParams = uploadTree.getGeometryData(),
            texturesParams = uploadTree.getTexturesData(),
            fieldName = this.lookupReference('fieldName'),
            fieldSize = this.lookupReference('fieldSize'),
            garmentParams = {
                name: fieldName && fieldName.getValue() || 'unnamed',
                size_name: fieldSize && fieldSize.getValue(),
                gid: vmData && vmData.gid,
                assets: {
                    mtl: {},
                    geometry: {},
                    diffuse: {},
                    normal: {},
                    specular: {}
                }
            };

        geometryParams.name = (garmentParams.name || 'unnamed') + ' garment geometry';

        Ext.apply(garmentParams.assets, texturesParams);

        Ext.Msg.wait('Wait...', 'Creating garment...');

        Admin.common.Api.createGeometry(geometryParams, function (error, data) {
            if (error) {
                Admin.common.Utils.error('Failed to create the geometry!', error);
            } else {
                garmentParams.assets.geometry.id = data.id;
                Admin.common.Api.createGarment(garmentParams, function (error, garmentData) {
                    Ext.Msg.hide();
                    if (error) {
                        Admin.common.Utils.error('Filed to create the garment!', error);
                    } else {
                        Admin.app.getGarmentsStore().reload();
                        me.closeView();
                    }
                });
            }
        });
    },

    onUploadedComplete: function (tree, files) {
        this.createGeometryAndGarment();
    },

    onCreate: function () {
        var uploadTree = this.lookupReference('uploadtree'),
            vmData = uploadTree.getViewModel().data;

        Ext.Msg.wait('Wait...', 'Creating garment...');

        if (vmData.isUploaded) {
            this.createGeometryAndDummy();
        } else {
            vmData.uploader.start();
        }
    },

    onDelete: function () {
        var me = this,
            data = this.getViewModel().data;

        Ext.Msg.wait('Wait...', 'Deleting garment...');

        Admin.common.Api.deleteGarment(data.theGarment.id, function (error, response) {
            Ext.Msg.hide();
            if (error) {
                Admin.common.Utils.error(error, response);
            } else {
                Admin.app.getGarmentsStore().load();
                me.closeView();
            }
        });
    }
});