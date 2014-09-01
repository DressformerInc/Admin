/**
 * This class is the View Model for the garment search view.
 */
Ext.define('Admin.view.garment.SearchModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.garmentsearch',

    requires: [
        'Admin.model.*',
        'Admin.store.Garment'
    ],
    
    data: {
        defaultStatus: 2
    },
    
    formulas: {

    },
    
    stores: {
        garments: {
            type: 'garment'
        },

        statuses: {
            fields: ['id', 'name'],
            data: [{
                id: -1,
                name: '-- All --'
            }, {
                id: 1,
                name: 'Pending'
            }, {
                id: 2,
                name: 'Open'
            }, {
                id: 3,
                name: 'Closed'
            }]
        }
    }
});
