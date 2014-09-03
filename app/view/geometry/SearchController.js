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
                    title: 'Add geometry',
                    theGeometry: null
                }
            }
        });

        win.show();
    },

    onEdit: function (self, rec) {
        var win = new Admin.view.geometry.Edit({
            viewModel: {
                data: {
                    title: 'Edit geometry',
                    theGeometry: rec
                }
            }
        });

        win.show();
    }
});
