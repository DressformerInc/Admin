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
        {text: 'Add', handler: 'onAddGarment', reference: 'buttonAddGarment' }
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
        rowdblclick: 'onEditGarment',
        afterrender: 'onViewRendered'
    }
});
