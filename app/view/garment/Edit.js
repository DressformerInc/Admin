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

    init: function () {
        console.log('garment.Edit init:', arguments);
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
    },

    modal: true,

    tbar: [{
        xtype: 'filefield',
        text: 'Browse...',
        buttonText: 'Browse files...',
        handler: 'onSelectFiles'
    }],

    items: [{
        xtype: 'treepanel',
        reference: 'treepanel',
//        bind: {
//            store: '{garmentData}'
//        },
        useArrows: true,
        rootVisible: false,
        fields: ['name', 'description'],
        columns: [{
            xtype: 'treecolumn',
            text: 'Name',
            dataIndex: 'name',
            flex: 1,
            sortable: true
        }, {
            text: 'Size',
            dataIndex: 'size',
            width: 100,
            sortable: true,
            renderer: function (value) {
                if (value > 1) {
                    var s = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
                    var e = Math.floor(Math.log(value) / Math.log(1024));
                    if (e > 0) {
                        return (value / Math.pow(1024, Math.floor(e))).toFixed(2) + " " + s[e];
                    } else {
                        return value + " " + s[e];
                    }
                } else if (value == 1) {
                    return "1 Byte";
                }
                return '-';
            }
        }, {
            text: 'Type',
            dataIndex: 'type',
            width: 200,
            sortable: true
        }],
        root: {
            expanded: true,
            children: [
                { name: "textures",  leaf: false },
                { name: "targets",  leaf: false },
                { name: "unknown", leaf: false }
            ]
        }
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
