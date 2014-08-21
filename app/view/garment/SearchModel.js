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
        defaultUser: function (get) {
            var project = get('theProject');
            if (get('currentUser.projectId') === get('theProject.id')) {
                return get('currentUser.id');
            } else {
                return get('theProject.leadId');
            }
        }
    },
    
    stores: {
        garments: {
            /*model: 'Garment',
            autoLoad: true,
            remoteFilter: true,
            filters: [{
                property: 'status',
                value: '{statusField.value}'
            }, {
                property: 'assigneeId',
                value: '{assigneeField.value}'
            }, {
                property: 'projectId',
                value: '{theProject.id}'
            }]*/
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
