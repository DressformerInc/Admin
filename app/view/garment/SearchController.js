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
    }
});
