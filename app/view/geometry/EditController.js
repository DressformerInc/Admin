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

    onUploadedComplete: function (up, files) {
        this.createGeometry();
    },

    createGeometry: function () {
        var me = this,
            uploadTree = this.lookupReference('uploadtree'),
            geometryParams = uploadTree.getGeometryData(),
            fieldName = this.lookupReference('fieldName');

        Ext.Msg.wait('Wait...', 'Creating geometry...');

        geometryParams.name = fieldName && fieldName.getValue() || 'unnamed';

        Admin.common.Api.createGeometry(geometryParams, function (error, data) {
            Ext.Msg.hide();
            if (error) {
                Admin.common.Utils.error('Failed to create the geometry!', error);
            } else {
                Admin.app.getGeometryStore().load();
                me.closeView();
            }
        });
    },

    onCreate: function () {
        var uploadTree = this.lookupReference('uploadtree'),
            vmData = uploadTree.getViewModel().data;

        if (vmData.isUploaded) {
            this.createGeometry();
        } else {
            vmData.uploader.start();
        }
    },

    onUpdate: function () {

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