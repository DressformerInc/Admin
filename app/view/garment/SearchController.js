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
                    title: 'Add garment'
                }
            }
        });

        win.show();
    },

    onEditGarment: function () {
        console.log('row edit', arguments);
        var win = new Admin.view.garment.Edit({
            viewModel: {
                data: {
                    title: 'Edit garment',
                    theGarment: {}
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
                        gid: group
                    }
                }
            });

            win.show();
        }
    },

    onReload: function () {
        var store = Ext.getStore('Garments');
        store.reload();
    }
});
