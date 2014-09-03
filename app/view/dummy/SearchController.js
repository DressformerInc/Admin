Ext.define('Admin.view.dummy.SearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dummysearch',

    requires: [
        'Admin.view.dummy.Edit'
    ],

    onViewRendered: function () {

    },

    onAdd: function (btn) {
        var win = new Admin.view.geometry.Edit({
            viewModel: {
                data: {
                    title: 'Add dummy',
                    theGeometry: null
                }
            }
        });

        win.show();
    },

    onEdit: function (self, rec) {
        var win = new Admin.view.dummy.Edit({
            viewModel: {
                data: {
                    title: 'Edit dummy',
                    theGeometry: rec
                }
            }
        });

        win.show();
    }
});
