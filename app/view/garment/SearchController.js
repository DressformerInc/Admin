Ext.define('Admin.view.garment.SearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.garmentsearch',

    requires: [
        'Admin.view.garment.Edit'
    ],

    onClickAdd: function () {
        console.log('add clicked', null);
    },
    onRowEdit: function () {
        console.log('row edit', arguments);
        var win = new Admin.view.garment.Edit({
            viewModel: {
                data: {
                    theUser: {}
                }
            }
        });

        win.show();
    }


    /*
    onTicketClick: function(view, rowIdx, colIdx, item, e, rec) {
        this.fireViewEvent('viewgarment', this.getView(), rec);
    },
    
    onRefreshClick: function() {
        this.getView().getStore().load();
    },

    renderAssignee: function(v, meta, rec) {
        return rec.getAssignee().get('name');
    },

    renderCreator: function(v, meta, rec) {
        return rec.getCreator().get('name');
    },

    renderStatus: function(v) {
        return Admin.model.Garment.getStatusName(v);
    }
    */
});
