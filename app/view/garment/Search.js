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
        'Ext.state.*'
    ],

    controller: 'garmentsearch',
    viewModel: {
        type: 'garmentsearch'
    },

    store: 'Garments',

//    bind: {
////        title: 'Search - {theProject.name}',
//        store: '{garments}'
//    },

    tbar: [
        {text: 'Add', handler: 'onAddGarment', reference: 'buttonAddGarment' }
//        {text: 'Reload', handler: 'onReload', reference: 'buttonReload' }
    ],

    dockedItems: [
        {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            store: 'Garments'
        }
    ],

    columnLines: true,

    features: [
        {
            ftype: 'groupingsummary',
            showSummaryRow: false,
//            collapsible: false,
//            hideGroupedHeader: true,
//            enableGroupingMenu: true,
            groupHeaderTpl: new Ext.XTemplate('<tpl for=".">', '<div>Garment: {name} <input type="button" value="Add size"></div>', '</tpl>')
        }
    ],

    columns: [
        {
            text: 'ID',
            hidden: true,
            dataIndex: 'id'
        },
        {
            text: 'Gid',
            hidden: true,
            dataIndex: 'gid'
        },
        {
            text: 'Size',
            dataIndex: 'size_name'
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
        groupclick: 'onGroupClick'
//        groupclick: function (view, node, group, e, eOpts) {
//            e.stopEvent();
//            e.stopPropagation();
//            console.log('Clicked on ', group);
//            if (e.getTarget().type === 'button') {
//                console.log('event:', e);
////                view.fireEvent('onAddSize', [view, node]);
////                view.fireViewEvent('onAddSize', view, node);
//                return false;
//            }
//        }

    }
});
