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
//        garments: 'Admin.store.Garment',
        garments: {
            model: 'Admin.model.Garment',
            autoLoad: true,
            storeId: 'garmentStore',
            data : [
                {id: '1', name: 'name1'},
                {id: '2', name: 'name2'},
                {id: '3', name: 'name3'},
                {id: '4', name: 'name4'}
            ],
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            }
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
