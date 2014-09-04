/**
 * Created by Miha-ha on 22.08.14.
 */
Ext.define('Admin.view.dummy.EditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dummyedit',

    requires: [
        'Ext.window.Toast'
    ],

    isUploaded: false,
    sendMode: 'POST',

    init: function (view) {
        var data = this.getViewModel().data,
            btnCreate = this.lookupReference('buttonCreate'),
            btnDelete = this.lookupReference('buttonDelete'),
            btnUpdate = this.lookupReference('buttonUpdate');

        if (data.theDummy) {
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

    onCreatedComplete: function (error, data) {
        Ext.Msg.hide();
        if (error) {
            Admin.common.Utils.error('Failed to create the dummy!', error);
        } else {
            Ext.Msg.alert('Status', 'Dummy created successfully!');
            this.closeView();
            Admin.app.getDummiesStore().load();
        }
    },

    onFilesAdded: function (tree) {
        console.log('onFilesAdded:', tree);
    },

    onUploadedComplete: function (tree, files) {
        this.createGeometryAndDummy(this.onCreatedComplete.bind(this));
    },

    createGeometryAndDummy: function (cb) {
        var me = this,
            uploadTree = this.lookupReference('uploadtree'),
            vmData = uploadTree.getViewModel().data,
            geometryParams = uploadTree.getData(),
            fieldName = this.lookupReference('fieldName'),
            fieldChest = this.lookupReference('fieldChest'),
            fieldHeight = this.lookupReference('fieldHeight'),
            fieldUnderbust = this.lookupReference('fieldUnderbust'),
            fieldWaist = this.lookupReference('fieldWaist'),
            fieldHips = this.lookupReference('fieldHips'),
            fieldDefault = this.lookupReference('fieldDefault'),
            dummyParams = {
                name: fieldName && fieldName.getValue(),
                'default': fieldDefault && fieldDefault.getValue(),
                assets: {
                    geometry: {}
                },
                body: {
                    height: fieldHeight && +fieldHeight.getValue(),
                    chest: fieldChest && +fieldChest.getValue(),
                    underbust: fieldUnderbust && +fieldUnderbust.getValue(),
                    waist: fieldWaist && +fieldWaist.getValue(),
                    hips: fieldHips && +fieldHips.getValue()
                }
            };

        geometryParams.name = (dummyParams.name || 'unnamed') + ' dummy geometry';

        Ext.Msg.wait('Wait...', 'Creating dummy...');

        Admin.common.Api.createGeometry(geometryParams, function (error, id) {
            if (error) {
                Admin.common.Utils.error('Failed to create the geometry!', error);
            } else {
                dummyParams.assets.geometry.id = id;
                Admin.common.Api.createDummy(dummyParams, me.onCreatedComplete.bind(me));
            }
        });

    },

    onCreate: function () {
        var me = this,
            uploadTree = this.lookupReference('uploadtree'),
            vmData = uploadTree.getViewModel().data,
            dataTree = uploadTree.getData(),
            fieldName = this.lookupReference('fieldName'),
            fieldChest = this.lookupReference('fieldChest'),
            fieldHeight = this.lookupReference('fieldHeight'),
            fieldUnderbust = this.lookupReference('fieldUnderbust'),
            fieldWaist = this.lookupReference('fieldWaist'),
            fieldHips = this.lookupReference('fieldHips'),
            fieldDefault = this.lookupReference('fieldDefault');

        console.log('vmData:', vmData);

        if (vmData.isUploaded) {
            this.createGeometryAndDummy();
        } else {
            vmData.uploader.start();
        }

//        Ext.Msg.wait('Wait...', 'Creating geometry...');

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
        /*
         {
         "id": "0ae99696-0e13-4c54-8ad7-d1488dffbf65",

         "name": "default dummy",

         "default": true,

         "assets": {
         "geometry": {
         "url" : "//v2.dressformer.com/geometry/e748f388-36f8-47a2-b012-61f1083b80e7",
         "id"  : "e748f388-36f8-47a2-b012-61f1083b80e7"
         }
         },

         "body": {
         "chest"     : 91.154,
         "underbust" : 77.13,
         "waist"     : 66.71,
         "hips"      : 88.88,
         "height"    : 170
         }
         }
         */


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

        Ext.Msg.wait('Wait...', 'Deleting dummy...');

        Admin.common.Api.deleteDummy(data.theDummy.id, function (error, response) {
            Ext.Msg.hide();
            if (error) {
                Admin.common.Utils.error(error, response);
            }else {
                Admin.app.getDummiesStore().load();
                me.closeView();
            }
        })
    }

});