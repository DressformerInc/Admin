/**
 * Created by Miha-ha on 21.08.14.
 */
Ext.define('Admin.store.FileType', {
    extend: 'Ext.data.Store',
    storeId: 'fileTypeStore',
    autoLoad: true,
    fields: ['id', 'name'],
    data: [
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
});