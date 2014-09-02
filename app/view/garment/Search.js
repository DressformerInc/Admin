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
        'Admin.store.Garments',
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

//    store: Admin.app.getGarmentsStore(),

    bind: {
//        title: 'Search - {theProject.name}',
        store: '{garments}'
    },

//    store: Ext.data.StoreManager.lookup('garmentStore'),

    tbar: [
        {text: 'Add', handler: 'onAddGarment', reference: 'buttonAddGarment' },
        {text: 'Reload', handler: 'onReload', reference: 'buttonReload' }
    ],

    columnLines: true,

    features: [{
        id: 'group',
        ftype: 'groupingsummary',
//        groupHeaderTpl: '{name}',
        groupHeaderTpl: new Ext.XTemplate('<tpl for=".">', '<input type="button" value={name}></div>', '</tpl>'),
//        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],

    columns: [
        {
            text: 'ID',
            hidden: true,
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
        afterrender: 'onViewRendered',
        groupclick: function(view, node, group, e, eOpts) {
            console.log('Clicked on ', group);
            if (e.getTarget().type === 'button'){
                alert('Clicked on '+ group);
            }
        }

    }
});
