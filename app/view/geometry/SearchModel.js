/**
 * This class is the View Model for the garment search view.
 */
Ext.define('Admin.view.geometry.SearchModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.geometrysearch',

    requires: [
        'Admin.model.*',
        'Admin.store.Garments'
    ],

    
    stores: {
        geometry: {
            type: 'geometry'
        }
    }
});
