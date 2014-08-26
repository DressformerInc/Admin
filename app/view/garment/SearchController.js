Ext.define('Admin.view.garment.SearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.garmentsearch',

    requires: [
        'Admin.view.garment.Edit'
    ],

    onViewRendered: function () {
        var me = this;

        var buttonAddGarment = this.lookupReference('buttonAddGarment');
        console.log('onViewRendered arguments:', arguments, 'btn id:', buttonAddGarment.getEl().dom.id);

        me.uploader = new plupload.Uploader({
            runtimes: 'html5',
            browse_button: buttonAddGarment.getEl().dom.id, // you can pass in id...
            container: me.getView().getEl().dom.id, // ... or DOM Element itself
            url: 'upload.php',

            filters: {
                max_file_size: '10mb',
                mime_types: [
                    {title: "Image files", extensions: "jpg,gif,png"},
                    {title: "Zip files", extensions: "zip"}
                ]
            },

            init: {
                PostInit: function () {
                    console.log('post init', null);
                },

                FilesAdded: function (up, files) {
                    console.log('files added', files);
                    var win = new Admin.view.garment.Edit({
                        viewModel: {
                            data: {
                                title: 'Add garment',
                                files: files
                            }
                        }
                    });
                    win.show();
                },

                UploadProgress: function (up, file) {
                    console.log('file progress:', file);
                },

                Error: function (up, err) {
                    console.log('error:', err);
                }
            }
        });

        me.uploader.init();
    },

    onAddGarment: function (btn) {

        var buttonAddGarment = this.lookupReference('buttonAddGarment');
        console.log('arguments:', arguments, 'btn:', buttonAddGarment);
//        var win = new Admin.view.garment.Edit({
//            viewModel: {
//                data: {
//                    title: 'Add garment',
//                    theGarment: {}
//                }
//            }
//        });
//        var win = Ext.create('widget.window', {
//            title: 'upload',
//            width: 800,
//            height: 600,
//            items: [
//                {
//                    xtype: 'xuploadpanel'
//                }
//            ]
//        });
//
//        win.show();
//        this.uploader.start();
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
