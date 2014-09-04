/**
 * Created by Miha-ha on 22.08.14.
 */
/**
 * This class defines the User editing view.
 */
Ext.define('Admin.view.garment.Edit', {
    extend: 'Ext.window.Window',

    requires: [
        'Admin.store.FileType'
    ],

    controller: 'garmentedit', // links to 'Admin.view.garment.EditController'
    viewModel: {
        type: 'garmentedit'
    },

    width: 800,
    minHeight: 400,
    height: 600,

    layout: 'fit',

    bind: {
        title: '{title}'
    },

    modal: true,

    tbar: [
        {xtype: 'button', text: 'Select files...', reference: 'buttonBrowse', handler: 'onBrowse'},
        {xtype: 'textfield', emptyText: 'Garment name', reference: 'fieldName', bind: '{theGarment.name}'},
        {xtype: 'textfield', emptyText: 'Size', reference: 'fieldSize', bind: '{theGarment.size_name}'}
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
        {test: 'Delete', handler: 'onDelete', reference: 'buttonDelete'},
        '->',
        {text: 'Create', handler: 'onCreate', reference: 'buttonCreate'},
        {text: 'Update', handler: 'onUpdate', reference: 'buttonUpdate'}
    ]
});
