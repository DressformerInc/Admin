/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Admin.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    data: {
        name: 'Admin'
    },

    stores: {
        menu: Ext.create('Ext.data.TreeStore', {
            model: 'Admin.model.Menu',
            rootVisible: false,
            root: {
                expanded: true,
                children: [
                    { name: "Garments", leaf: true }
                ]
            }
        })
    }

    //TODO - add data, formulas and/or methods to support your view
});