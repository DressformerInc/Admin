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

    init: function () {
        console.log('garment.Edit init:', arguments);
    },

    width: 800,
    minHeight: 400,
    height: 600,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    // As a Window the default property we are binding is "title":
    bind: {
        title: '{title}'
    },

    modal: true,

    tbar: [
        {xtype: 'button', text: 'Browse', reference:'buttonBrowse', handler: 'onBrowse'},
        {xtype: 'button', text: 'Upload', reference:'buttonUpload', handler: 'onUpload'}
    ],

    items: [{
        xtype: 'treepanel',
        reference: 'treepanel',
//        bind: {
//            store: '{garmentData}'
//        },
        viewConfig: {
            plugins: {
                ptype: 'treeviewdragdrop',
                enableDrag: true,
                enableDrop: true
            },
            listeners: {
                nodedragover: function(targetNode, position, dragData){
//                var rec = dragData.records[0],
//                    isFirst = targetNode.isFirst(),
//                    canDropFirst = rec.get('canDropOnFirst'),
//                    canDropSecond = rec.get('canDropOnSecond');
                    console.log('leaf:', targetNode.get('leaf'));
                    return targetNode.get('leaf') === false;
                }
            }
        },
        selType: 'cellmodel',
        plugins: {
            ptype: 'cellediting',
            clicksToEdit: 1
        },
        useArrows: true,
        rootVisible: false,
        fields: ['assetId', 'name', 'type', 'size', 'status'],
        columns: [{
            xtype: 'treecolumn',
            text: 'Name',
            dataIndex: 'name',
            flex: 1,
            sortable: true
        }, {
            text: 'Weight',
            dataIndex: 'weight',
            width: 100,
            sortable: true,
            editor: {
                xtype: 'textfield'
            }
        }, {
            text: 'Type',
//            hidden: true,
            dataIndex: 'type',
            width: 100,
            sortable: true,
            editor: {
                xtype: 'combobox',
                store: Ext.create('Ext.data.Store', {
                    fields: ['name'],
                    data : [
                        {"name":"base"},
                        {"name":"normal"},
                        {"name":"diffuse"},
                        {"name":"height"},
                        {"name":"chest"},
                        {"name":"underbust"},
                        {"name":"waist"},
                        {"name":"hips"}
                    ]
                }),
                editable: false,
                displayField: 'name',
                valueField: 'name'
            }
        }, {
            text: 'Size',
            dataIndex: 'size',
            width: 100,
            sortable: true,
            renderer: function (value) {
                if (value > 1) {
                    var s = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
                    var e = Math.floor(Math.log(value) / Math.log(1024));
                    if (e > 0) {
                        return (value / Math.pow(1024, Math.floor(e))).toFixed(2) + " " + s[e];
                    } else {
                        return value + " " + s[e];
                    }
                } else if (value == 1) {
                    return "1 Byte";
                }
                return '-';
            }
        }, {
            text: 'Status',
            dataIndex: 'status',
            width: 100,
            sortable: true,
            renderer: function (v, m, rec) {
                return rec.get('assetId') ? 'ok' : v;
            }
        }],
        root: {
            expanded: true,
            children: [
                { name: "base",  leaf: false },
                { name: "textures",  leaf: false },
                { name: "targets",  leaf: false, children: [
                    {name: 'height',  leaf: false},
                    {name: 'chest',  leaf: false},
                    {name: 'underbust',  leaf: false},
                    {name: 'waist',  leaf: false},
                    {name: 'hips',  leaf: false}
                ] },
                { name: "unknown", leaf: false }
            ]
        }
    }],

    buttons: [{
        text: 'Close',
        listeners: {
            click: 'onClose'
        }
    }, '->', {
        text: 'Create',
        listeners: {
            click: 'onCreate'
        }
    }],

    listeners: {
        afterrender: 'onViewRendered'
    }
});
