/**
 * Created by Miha-ha on 03.09.14.
 */
Ext.define('Admin.view.upload.Upload', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.upload',

    controller: 'upload',

    tbar: [
        {xtype: 'button', text: 'Select files', reference: 'buttonSelectFiles'}
    ],
    viewConfig: {
        plugins: {
            ptype: 'treeviewdragdrop',
            containerScroll: true,
            enableDrag: true,
            enableDrop: true
        },
        listeners: {
            nodedragover: function (targetNode, position, dragData) {
                var rec = dragData.records[0];
                return !targetNode.get('leaf') && rec.get('leaf');
            },
            drop: function (node, data, overModel, dropPosition, eOpts) {
                data.view.getSelectionModel().select(node);
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
    columns: [
        {
            xtype: 'treecolumn',
            text: 'Name',
            dataIndex: 'name',
            flex: 1,
            sortable: true
        },
        {
            text: 'Weight',
            dataIndex: 'weight',
            width: 100,
            sortable: true,
            editor: {
                xtype: 'textfield'
            }
        },
        {
            text: 'Type',
            dataIndex: 'type',
            width: 100,
            sortable: true,
            editor: {
                xtype: 'combobox',
                store: Ext.create('Ext.data.Store', {
                    fields: ['name'],
                    data: [
                        {"name": "base"},
                        {"name": "normal"},
                        {"name": "diffuse"},
                        {"name": "specular"},
                        {"name": "height"},
                        {"name": "chest"},
                        {"name": "underbust"},
                        {"name": "waist"},
                        {"name": "hips"}
                    ]
                }),
                editable: false,
                displayField: 'name',
                valueField: 'name'
            }
        },
        {
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
        },
        {
            text: 'Status',
            dataIndex: 'status',
            width: 100,
            sortable: true,
            renderer: function (v, m, rec) {
                return rec.get('assetId') ? 'ok' : v;
            }
        }
    ],
    root: {
        expanded: true,
        children: [
            { name: "base", leaf: false },
            { name: "textures", leaf: false },
            { name: "targets", leaf: false, children: [
                {name: 'height', leaf: false},
                {name: 'chest', leaf: false},
                {name: 'underbust', leaf: false},
                {name: 'waist', leaf: false},
                {name: 'hips', leaf: false}
            ] },
            { name: "unknown", leaf: false }
        ]
    },

    listeners: {
        afterrender: 'onViewRendered'
    }

});
