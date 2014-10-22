Ext.define('Admin.view.garment.SearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.garmentsearch',

    requires: [
        'Admin.view.garment.Edit'
    ],

    onViewRendered: function () {

    },

    onAddGarment: function (btn) {
        var win = new Admin.view.garment.Edit({
            viewModel: {
                data: {
                    title: 'Add garment',
                    theGarment: null
                }
            }
        });

        win.show();
    },

    onEditGarment: function (self, rec) {
        var win = new Admin.view.garment.Edit({
            viewModel: {
                data: {
                    title: 'Edit garment',
                    theGarment: rec
                }
            }
        });

        win.show();
    },

    onAddSize: function (view, node) {
        console.log('onAddSize:', node);
    },

    onGroupClick: function (view, node, group, e, eOpts) {
//        console.log('Clicked on ', group, 'target:', e.getTarget());
        if (e.getTarget().type === 'button') {

            view.features[0].expand(group);

            var win = new Admin.view.garment.Edit({
                viewModel: {
                    data: {
                        title: 'Add size: ' + group,
                        gid: group,
                        theGarment: null
                    }
                }
            });

            win.show();
        }
    },

    onReload: function () {
        var store = Ext.getStore('Garments');
        store.reload();
    },

    onPreview: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex),
            materialsCombo = Ext.create('Ext.form.ComboBox', {
                fieldLabel: 'Choose material',
                store: Ext.create('Ext.data.Store', {
                    fields: ['name'],
                    data : []
                }),
                forceSelection: true,
                queryMode: 'local',
                displayField: 'name',
                valueField: 'name'
            }),
            materialEditor =  Ext.create('Ext.grid.property.Grid', {
                region: 'east',
                title: 'Material editor',
                width: 300,
                split: true,
                collapsible: true,
                collapsed: true,
                tbar: [materialsCombo],
                source: {
                    "visible": true
                },
                listeners: {
                    propertychange: function (source, recordId, value, oldValue, eOpts ) {
                        console.log('property change:', arguments);
                        var preview = Ext.ComponentQuery.query('#previewFrame')[0].el.dom.contentWindow;
                        preview.postMessage({method: 'GarmentMaterialUpdate', params: [
                            rec.get('id'),
                            materialsCombo.getRawValue(),
                            recordId,
                            value
                        ]}, '*');
                    }
                }
            });

        window.addEventListener('message', function (event) {
            console.log('event from iframe:', event);
            if ('Materials' === event.data.method){
                console.log('materials:', event.data.params, 'materialEditor:', materialEditor.source);
                materialsCombo.getStore().loadData(event.data.params);
                materialsCombo.select(materialsCombo.getStore().getAt(0));

            }else if('GarmentLoaded' === event.data.method){
                console.log('garment loaded:', event.data.params);
            }


        }, false);

        Ext.create('Ext.window.Window', {
            title: 'Preview: ' + rec.get('name'),
            width: 450,
            height: 600,
            layout: {
                type: 'border'
            },
            tbar: [
                {
                    xtype: 'button',
                    text: 'Make placeholder',
                    style: {borderBottom: '1px solid lightgray'},
                    handler: function () {
                        var preview = Ext.ComponentQuery.query('#previewFrame')[0].el.dom.contentWindow;
                        preview.postMessage({method: 'MakeScreenshot', params: [
                            {garmentId: rec.get('id')}
                        ]}, '*');
                    }
                },
                {
                    xtype: 'button',
                    text: 'Show dummy',
                    enableToggle: true,
                    pressed: true,
                    handler: function (self) {
                        var preview = Ext.ComponentQuery.query('#previewFrame')[0].el.dom.contentWindow;
                        if (self.pressed) {
                            preview.postMessage({method: 'ShowDummy', params: []}, '*');
                        } else {
                            preview.postMessage({method: 'HideDummy', params: []}, '*');
                        }
                    }
                }
            ],
            items: [
                {
                    region: 'center',
                    xtype: "component",
                    reference: 'cmpIframe',
                    id: 'previewFrame',
                    autoEl: {
                        tag: "iframe",

                        src: "http://v2.dressformer.com/widget/" + rec.get('id'),
                        //src : "http://localhost:3000/"+rec.get('id'),
                        frameborder: 0
                    },
                    listeners: {
                        load: {
                            element: 'el',
                            fn: function () {
                                var preview = Ext.ComponentQuery.query('#previewFrame')[0].el.dom.contentWindow;
                                console.log('iframe loaded:', preview);

                            }
                        }
                    }
                },
                materialEditor
            ]
        }).show();
    }
});
