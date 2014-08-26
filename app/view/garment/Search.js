/**
 * Created by Miha-ha on 21.08.14.
 */
/**
 * This view is the garment search grid. It is created one instance per project and added
 * as a tab.
 */
Ext.define('Admin.view.garment.Search', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.garmentsearch',

    title: 'Garments',

    requires: [
        'Admin.model.Garment',
        'Admin.store.Garment',
        'Admin.view.garment.SearchController',
        'Admin.view.garment.SearchModel',
//        'Garment.override.grid.column.Date'
        'Ext.data.*',
        'Ext.util.*',
        'Ext.state.*',
        'Ext.ux.upload.Button',
        'Ext.ux.upload.plugin.Window'

    ],

    // Connects to our View Controller (Garment.view.garment.SearchController) and View Model
    // (Garment.view.garment.SearchModel).
    controller: 'garmentsearch',
    viewModel: {
        type: 'garmentsearch'
    },

    bind: {
//        title: 'Search - {theProject.name}',
        store: '{garments}'
    },

//    store: Ext.data.StoreManager.lookup('garmentStore'),

    tbar: [
        {text: 'Add', handler: 'onAddGarment' },
        {
            xtype: 'uploadbutton',
            text: 'Select files',
            //singleFile: true,
            plugins: [
                {
                    ptype: 'ux.upload.window',
                    title: 'Upload',
                    width: 520,
                    height: 350
                }
            ],
            uploader: {
                url: 'upload.json',
                uploadpath: '/Root/files',
                autoStart: false,
                max_file_size: '2020mb',
                drop_element: 'dragload',
                statusQueuedText: 'Ready to upload',
                statusUploadingText: 'Uploading ({0}%)',
                statusFailedText: '<span style="color: red">Error</span>',
                statusDoneText: '<span style="color: green">Complete</span>',

                statusInvalidSizeText: 'File too large',
                statusInvalidExtensionText: 'Invalid file type'
            },
            listeners: {
                filesadded: function (uploader, files) {
                    //console.log('filesadded');
                    return true;
                },

                beforeupload: function (uploader, file) {
                    //console.log('beforeupload');
                },

                fileuploaded: function (uploader, file) {
                    //console.log('fileuploaded');
                },

                uploadcomplete: function (uploader, success, failed) {
                    //console.log('uploadcomplete');
                },
                scope: this
            }


        }
    ],

    columnLines: true,

    columns: [
        {
            text: 'ID',
            dataIndex: 'id'
        },
        {
            text: 'Title',
            dataIndex: 'name',
            flex: 1
        }
    ],
    listeners: {
        rowdblclick: 'onEditGarment'
    }
});
