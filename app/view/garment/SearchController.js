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
                        title: 'Add size: '+group,
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

    onPreview: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);


        Ext.create('Ext.window.Window', {
            title: 'Preview: '+rec.get('name'),
            width: 450,
            height: 600,
            layout: 'fit',
            tbar: [{
                xtype: 'button',
                text: 'Make placeholder',
                style: {borderBottom: '1px solid lightgray'},
                handler: function () {
                    var preview = Ext.ComponentQuery.query('#previewFrame')[0].el.dom.contentWindow;
                    preview.postMessage({method: 'MakeScreenshot', params: [{garmentId:rec.get('id')}]}, '*');
                }
            },{
                xtype: 'button',
                text: 'Show dummy',
                enableToggle: true,
                pressed: true,
                handler: function (self) {
                    var preview = Ext.ComponentQuery.query('#previewFrame')[0].el.dom.contentWindow;
                    if (self.pressed){
                        preview.postMessage({method: 'ShowDummy', params: []}, '*');
                    }else {
                        preview.postMessage({method: 'HideDummy', params: []}, '*');
                    }
                }
            }],
            items : [{
                xtype : "component",
                reference: 'cmpIframe',
                id: 'previewFrame',
                autoEl : {
                    tag : "iframe",

                    src : "http://v2.dressformer.com/widget/"+rec.get('id'),
                    //src : "http://localhost:3000/"+rec.get('id'),
                    frameborder: 0
                }
            }]
        }).show();
    }
});
