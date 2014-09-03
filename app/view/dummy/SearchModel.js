/**
 * This class is the View Model for the garment search view.
 */
Ext.define('Admin.view.dummy.SearchModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dummysearch',

    requires: [
        'Admin.model.Dummy',
        'Admin.store.Dummies'
    ],

    
    stores: {
        dummies: 'Dummies'
    }
});
