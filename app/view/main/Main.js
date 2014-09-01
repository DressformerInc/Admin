/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Admin.view.main.Main', {
    extend: 'Ext.container.Container',

    xtype: 'app-main',

    requires: [
        'Admin.model.*',
        'Admin.store.*',
        'Admin.view.garment.Search',
        'Admin.view.main.MainController',
        'Admin.view.main.MainModel'
    ],

    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    items: [
        {
            xtype: 'treepanel',
            bind: {
                title: '{name}',
                store: '{menu}'
            },
            region: 'west',
            width: 250,
            split: true,
            collapsible: true,
            collapsed: true,
            useArrows: true,
            rootVisible: false,
            multiSelect: false,
            columns: [
                {
                    xtype: 'treecolumn', //this is so we know which column will show the tree
                    text: 'Menu',
                    flex: 1,
                    dataIndex: 'name'
                }
            ],
            listeners: {
                itemclick: 'onItemClick'
            }

        },
        {
            region: 'center',
            xtype: 'tabpanel',
            reference: 'maintab',
            items: [
                {
                    xtype: 'garmentsearch'
                },
                {
                    xtype: 'geometrysearch'
                }
            ]
        }
    ]
});
