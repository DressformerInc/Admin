/**
 * Created by Miha-ha on 21.08.14.
 */
Ext.define('Admin.store.Geometry', {
    extend: 'Ext.data.Store',
    alias: 'store.geometry',
    model: 'Admin.model.Geometry',
    autoLoad: true,
//    data: [
//        {id: '1', name: 'name1'},
//        {id: '2', name: 'name2'},
//        {id: '3', name: 'name3'},
//        {id: '4', name: 'name4'}
//    ],
//    proxy: {
//        type: 'memory',
//        reader: {
//            type: 'json'
//        }
//    }
    proxy: {
        type: 'ajax',
        url: Admin.common.Config.api.geometry,
        reader: {
            type: 'json'
        }
    }
});