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
                    reference: 'fieldHeight'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Chest',
                    reference: 'fieldChest'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Underbust',
                    reference: 'fieldUnderbust'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Waist',
                    reference: 'fieldWaist'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Hips',
                    reference: 'fieldHips'
                },
                {
                    xtype: 'checkboxfield',
                    fieldLabel: 'Default',
                    reference: 'fieldDefault',
                    bind: '{theDummy.default_dummy}'
                }
            ]
        }
    ],

    items: [
        {
            xtype: 'upload',
            listeners: {
                filesadded: 'onFilesAdded'
            }
        },
//        {
//            xtype: 'treepanel',
//            reference: 'treepanel',
//
//            tbar: [
//                {xtype: 'button', text: 'Select files', reference: 'buttonBrowse', handler: 'onBrowse'}
//            ],
//            viewConfig: {
//                plugins: {
//                    ptype: 'treeviewdragdrop',
//                    containerScroll: true,
//                    enableDrag: true,
//                    enableDrop: true
//                },
//                listeners: {
//                    nodedragover: function (targetNode, position, dragData) {
//                        var rec = dragData.records[0];
//                        return !targetNode.get('leaf') && rec.get('leaf');
//                    },
//                    drop: function (node, data, overModel, dropPosition, eOpts) {
//                        data.view.getSelectionModel().select(node);
//                    }
//                }
//            },
//            selType: 'cellmodel',
//            plugins: {
//                ptype: 'cellediting',
//                clicksToEdit: 1
//            },
//            useArrows: true,
//            rootVisible: false,
//            fields: ['assetId', 'name', 'type', 'size', 'status'],
//            columns: [
//                {
//                    xtype: 'treecolumn',
//                    text: 'Name',
//                    dataIndex: 'name',
//                    flex: 1,
//                    sortable: true
//                },
//                {
//                    text: 'Weight',
//                    dataIndex: 'weight',
//                    width: 100,
//                    sortable: true,
//                    editor: {
//                        xtype: 'textfield'
//                    }
//                },
//                {
//                    text: 'Type',
//                    dataIndex: 'type',
//                    width: 100,
//                    sortable: true,
//                    editor: {
//                        xtype: 'combobox',
//                        store: Ext.create('Ext.data.Store', {
//                            fields: ['name'],
//                            data: [
//                                {"name": "base"},
//                                {"name": "normal"},
//                                {"name": "diffuse"},
//                                {"name": "specular"},
//                                {"name": "height"},
//                                {"name": "chest"},
//                                {"name": "underbust"},
//                                {"name": "waist"},
//                                {"name": "hips"}
//                            ]
//                        }),
//                        editable: false,
//                        displayField: 'name',
//                        valueField: 'name'
//                    }
//                },
//                {
//                    text: 'Size',
//                    dataIndex: 'size',
//                    width: 100,
//                    sortable: true,
//                    renderer: function (value) {
//                        if (value > 1) {
//                            var s = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
//                            var e = Math.floor(Math.log(value) / Math.log(1024));
//                            if (e > 0) {
//                                return (value / Math.pow(1024, Math.floor(e))).toFixed(2) + " " + s[e];
//                            } else {
//                                return value + " " + s[e];
//                            }
//                        } else if (value == 1) {
//                            return "1 Byte";
//                        }
//                        return '-';
//                    }
//                },
//                {
//                    text: 'Status',
//                    dataIndex: 'status',
//                    width: 100,
//                    sortable: true,
//                    renderer: function (v, m, rec) {
//                        return rec.get('assetId') ? 'ok' : v;
//                    }
//                }
//            ],
//            root: {
//                expanded: true,
//                children: [
//                    { name: "base", leaf: false },
//                    { name: "textures", leaf: false },
//                    { name: "targets", leaf: false, children: [
//                        {name: 'height', leaf: false},
//                        {name: 'chest', leaf: false},
//                        {name: 'underbust', leaf: false},
//                        {name: 'waist', leaf: false},
//                        {name: 'hips', leaf: false}
//                    ] },
//                    { name: "unknown", leaf: false }
//                ]
//            }
//        }
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
