Ext.define('Admin.view.garment.SearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.garmentsearch',

    requires: [
        'Admin.view.garment.Edit'
    ],

    onAddGarment: function () {
//        var win = new Admin.view.garment.Edit({
//            viewModel: {
//                data: {
//                    title: 'Add garment',
//                    theGarment: {}
//                }
//            }
//        });
        var win = Ext.create('widget.window', {
            title: 'upload',
            width: 800,
            height: 600,
            items: [
                {
                    xtype: 'xuploadpanel'
                }
            ]
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
