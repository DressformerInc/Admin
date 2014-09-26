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
            displayInfo: true,
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
        },
        {
            ftype: 'rowbody',
            setupRowData: function(record, rowIndex, rowValues) {
                var headerCt = this.view.headerCt,
                    colspan = headerCt.getColumnCount();

                // Usually you would style the my-body-class in CSS file
                Ext.apply(rowValues, {
                    rowBody: '<div style="padding: 5px; border-top: 1px solid #d3d3d3;"></div>'
                });
            }
        }
    ],

    columns: [
        {
            text: 'Gid',
            hidden: true,
            dataIndex: 'gid'
        },
        {
            text: '',
            renderer: function (v, m, r) {
                //console.log('renderer value:', r.data.assets.placeholder.url);
                var url = r.data.assets.placeholder.url;
                if (url){
                    return '<img src="'+url+'?scale=x128&q=100" alt="placeholder"/>'
                }

                return '';
            }
        },
        {
            text: 'Size',
            dataIndex: 'size_name',
            width: 50
        },
        {
            text: 'Title',
            dataIndex: 'name',
            flex: 1
        }, {
            text: 'Slot',
            dataIndex: 'slot',
            width: 50
        }, {
            text: 'Layer',
            dataIndex: 'Layer',
            width: 60
        }, {
            text: 'ID',
            dataIndex: 'id',
            flex: 2
        },
        {
            xtype:'actioncolumn',
            width:50,
            items: [{
                icon: 'resources/images/preview.png',  // Use a URL in the icon config
                tooltip: 'Preview',
                handler: 'onPreview'
            }]
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
