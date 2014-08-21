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
        'Admin.view.garment.SearchController',
        'Admin.view.garment.SearchModel'
//        'Garment.override.grid.column.Date'
    ],

    // Connects to our View Controller (Garment.view.garment.SearchController) and View Model
    // (Garment.view.garment.SearchModel).
    controller: 'garmentsearch',
    viewModel: {
        type: 'garmentsearch'
    },

    bind: {
//        title: 'Search - {theProject.name}',
//        store: '{garments}'
    },

    tbar: [
        {text: 'Upload', handler: 'onClickUpload' }
    ],

    columns: [{
        text: 'ID',
        dataIndex: 'id'
    }, {
        text: 'Title',
        dataIndex: 'title',
        flex: 1
    }]
});
