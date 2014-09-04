/**
 * Created by Miha-ha on 22.08.14.
 */
/**
 * This class defines the User editing view.
 */
Ext.define('Admin.view.dummy.Edit', {
    extend: 'Ext.window.Window',

    requires: [
        'Admin.store.FileType'
    ],

    controller: 'dummyedit',
    viewModel: {
        type: 'dummyedit'
    },

    width: 800,
    minHeight: 400,
    height: 600,
//    layout: {
//        type: 'vbox',
//        align: 'stretch'
//    },
    layout: 'fit',

    // As a Window the default property we are binding is "title":
    bind: {
        title: '{title}'
    },

    modal: true,

    dockedItems: [
        {
            xtype: 'panel',
            padding: 5,
//            layout: 'hbox',
            dock: 'top',
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Name',
                    reference: 'fieldName',
                    bind: '{theDummy.name}'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Height',
                    reference: 'fieldHeight',
                    bind: '{theDummy.body.height}'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Chest',
                    reference: 'fieldChest',
                    bind: '{theDummy.body.chest}'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Underbust',
                    reference: 'fieldUnderbust',
                    bind: '{theDummy.body.underbust}'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Waist',
                    reference: 'fieldWaist',
                    bind: '{theDummy.body.waist}'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Hips',
                    reference: 'fieldHips',
                    bind: '{theDummy.body.hips}'
                },
                {
                    xtype: 'checkboxfield',
                    fieldLabel: 'Default',
                    reference: 'fieldDefault',
                    bind: '{theDummy.default}'
                }
            ]
        }
    ],

    items: [
        {
            xtype: 'upload',
            reference: 'uploadtree',
            listeners: {
                filesadded: 'onFilesAdded',
                uploadedcomplete: 'onUploadedComplete'
            }
        }
    ],

    buttons: [
        {text: 'Delete', handler: 'onDelete', reference: 'buttonDelete'},
        '->',
        {text: 'Create', handler: 'onCreate', reference: 'buttonCreate'},
        {text: 'Update', handler: 'onUpdate', reference: 'buttonUpdate'}

    ],

    listeners: {
//        afterrender: 'onViewRendered'
    }
});
