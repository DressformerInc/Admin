/**
 * Created by Miha-ha on 22.08.14.
 */

Ext.define('Admin.view.geometry.Edit', {
    extend: 'Ext.window.Window',

    requires: [
        'Admin.store.FileType'
    ],

    controller: 'geometryedit', // links to 'Admin.view.garment.EditController'
    viewModel: {
        type: 'geometryedit'
    },

    width: 800,
    minHeight: 400,
    height: 600,

    layout: 'fit',

    bind: {
        title: '{title}'
    },

    modal: true,


    dockedItems: [
        {
            xtype: 'panel',
            padding: 5,
            dock: 'top',
            items: [
                {
                    xtype: 'textfield',
                    readOnly: true,
                    fieldLabel: 'Id',
                    reference: 'fieldId',
                    bind: '{theGeometry.id}'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Name',
                    reference: 'fieldName',
                    bind: '{theGeometry.name}'
                }
            ]
        }
    ],

    items: [
        {
            xtype: 'upload',
            reference: 'uploadtree',
            listeners: {
                uploadedcomplete: 'onUploadedComplete'
            }
        }
    ],

    buttons: [
        {text: 'Delete', handler: 'onDelete', reference: 'buttonDelete'},
        '->',
        {text: 'Create', handler: 'onCreate', reference: 'buttonCreate'},
        {text: 'Update', handler: 'onUpdate', reference: 'buttonUpdate'}

    ]

});
