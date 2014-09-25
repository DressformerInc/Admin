/**
 * Created by Miha-ha on 03.09.14.
 */
Ext.define('Admin.view.upload.Upload', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.upload',

    controller: 'upload',
    viewModel: {
        type: 'upload'
    },

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
                        {"name": "mtl"},
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
    },

    getTexturesData: function () {
        var root = this.getRootNode(),
            textures = root.findChild('name', 'textures'),
            base = root.findChild('name', 'base'),
            params = {};

        /*
         "diffuse"  : {
         "url"       : "//v2.dressformer.com/image/53b54559fcb05d3238000002",
         "id"        : "53b54559fcb05d3238000002",
         "orig_name" : "KPL_123_diffuse.jpg"
         },

         "normal"   : {
         "url"       : "//v2.dressformer.com/image/53b61050eff01c1008000001",
         "id"        : "53b61050eff01c1008000001",
         "orig_name" : "KPL_123_normal.jpg"
         },

         "specular" : {
         "url"       : "//v2.dressformer.com/image/53b61050eff01c1008000003",
         "id"        : "53b61050eff01c1008000003",
         "orig_name  : "KPL_123_spec.jpg"
         },
         */

        base.eachChild(function (node) {
            if (node.get('type') === 'mtl') {
                params['mtl'] = {
                    id: node.get('assetId'),
                    orig_name: node.get('name')
                }
            }
        });

        textures.eachChild(function (node) {
            params[node.get('type')] = {
                id: node.get('assetId'),
                orig_name: node.get('name')
            }
        });

        return params;
    },

    getGeometryData: function () {
        var root = this.getRootNode(),
            base = root.findChild('name', 'base'),
            targets = root.findChild('name', 'targets'),
            params = {
                base: {},
                name: '',
                morph_targets: []
            },
            ok = true;

        if (base ) {
            var obj = base.findChild('type', 'base');
            params.base.id = base.firstChild.get('assetId');
            params.base.origin_name = base.firstChild.get('name');
        } else {
            console.log('Error: base is empty');
            return;
        }

        targets.eachChild(function (node) {
            var section = {
                section: node.get('name'),
                sources: []
            };

            node.eachChild(function (child) {
                var weight = +child.get('weight');
                section.sources.push({
                    id: child.get('assetId'),
                    weight: weight,
                    origin_name: child.get('name')
                });

                if (!weight) ok = false;
            });

            params.morph_targets.push(section);
        });

        return params;
    }

});
