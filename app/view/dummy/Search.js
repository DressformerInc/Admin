/**
 * Created by Miha-ha on 21.08.14.
 */
Ext.define('Admin.view.dummy.Search', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.dummysearch',

    title: 'Dummies',

    requires: [
    ],

    controller: 'dummysearch',
    viewModel: {
        type: 'dummysearch'
    },

    bind: {
        store: '{dummies}'
    },

    tbar: [
        {xtype: 'button', text: 'Add', handler:'onAdd'}
    ],

    dockedItems: [
        {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            store: 'Dummies'
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
