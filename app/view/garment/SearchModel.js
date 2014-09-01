/**
 * This class is the View Model for the garment search view.
 */
Ext.define('Admin.view.garment.SearchModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.garmentsearch',

    
    data: {
        defaultStatus: 2
    },
    
    formulas: {

    },
    
    stores: {
        garments: 'Garments'
//        {
//            source: 'Garments'
//        }
    }
});
