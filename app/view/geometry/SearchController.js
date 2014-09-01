Ext.define('Admin.view.geometry.SearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.geometrysearch',

    requires: [
        'Admin.view.geometry.Edit'
    ],

    onViewRendered: function () {

    },

    onAdd: function (btn) {
        var win = new Admin.view.geometry.Edit({
            viewModel: {
                data: {
                    title: 'Add geometry'
                }
            }
        });

        win.show();
    },

    onEdit: function () {
        console.log('row edit', arguments);
        var win = new Admin.view.geometry.Edit({
            viewModel: {
                data: {
                    title: 'Edit geometry',
                    theGarment: {}
                }
            }
        });

        win.show();
    }
});
