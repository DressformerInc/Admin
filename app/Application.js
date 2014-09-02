/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('Admin.Application', {
    extend: 'Ext.app.Application',
    
    name: 'Admin',

    requires: [
      'Admin.common.*'
    ],

    stores: [
        'Garments',
        'Geometry'
    ],
    
    launch: function () {
        Ext.Ajax.setDefaultHeaders({
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        });
    }
});
