/**
 * Created by Miha-ha on 22.08.14.
 */
/**
 * This class defines the User editing view.
 */
Ext.define('Admin.view.garment.Edit', {
    extend: 'Ext.window.Window',

    controller: 'garmentedit', // links to 'Admin.view.garment.EditController'
    viewModel: {
        type: 'garmentedit'
    },

    width: 800,
    minHeight: 400,
    height: 600,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    // As a Window the default property we are binding is "title":
    bind: {
        title: '{title}'
//        theGarment: '{theGarment}'
    },

    modal: true,

    tbar: [{
        xtype: 'button',
        text: 'Browse...',
        handler: 'onSelectFiles'
    }],

    items: [{
        xtype: 'treepanel',
        bind: {
            store: '{garmentData}'
        },
        useArrows: true,
        rootVisible: false
    }],

    buttons: [{
        text: 'Close',
        listeners: {
            click: 'onClose'
        }
    }, '->', {
        text: 'Upload',
        listeners: {
            click: 'onUpload'
        }
    }]
});
