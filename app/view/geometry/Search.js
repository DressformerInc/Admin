/**
 * Created by Miha-ha on 21.08.14.
 */
Ext.define('Admin.view.geometry.Search', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.geometrysearch',

    title: 'Geometry',

    requires: [
    ],

    controller: 'geometrysearch',
    viewModel: {
        type: 'geometrysearch'
    },

    bind: {
//        title: 'Search - {theProject.name}',
        store: '{geometry}'
    },

    tbar: [
        {xtype: 'button', text: 'Add', handler:'onAdd'}
    ],

    dockedItems: [
        {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            store: 'Geometry'
        }
    ],

    columnLines: true,

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
        rowdblclick: 'onEdit',
        afterrender: 'onViewRendered'
    }
});
