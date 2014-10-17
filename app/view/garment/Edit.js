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

    dockedItems: [
        {
            xtype: 'panel',
            padding: 5,
            dock: 'top',
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Id',
                    reference: 'fieldId',
                    bind: '{theGarment.id}'
                },                {
                    xtype: 'textfield',
                    fieldLabel: 'Name',
                    reference: 'fieldName',
                    bind: '{theGarment.name}'
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Size',
                    reference: 'fieldSize',
                    editable: false,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'name',
                    store: {
                        fields: ['name'],
                        data : [
                            {"name":"XXS"},
                            {"name":"XS"},
                            {"name":"S"},
                            {"name":"M"},
                            {"name":"L"},
                            {"name":"XL"},
                            {"name":"XXL"}
                        ]
                    },
                    bind: '{theGarment.size_name}'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Slot',
                    reference: 'fieldSlot',
                    bind: '{theGarment.slot}'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Layer',
                    reference: 'fieldLayer',
                    bind: '{theGarment.layer}'
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
