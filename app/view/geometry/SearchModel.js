/**
 * This class is the View Model for the garment search view.
 */
Ext.define('Admin.view.geometry.SearchModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.geometrysearch',

    requires: [
        'Admin.model.Geometry',
        'Admin.store.Geometry'
    ],

    
    stores: {
        geometry: 'Geometry'
    }
});
