/**
 * Created by Miha-ha on 21.08.14.
 */
Ext.define('Admin.store.Garment', {
    extend: 'Ext.data.Store',
    alias: 'store.garment',
    storeId: 'garmentStore',
    model: 'Admin.model.Garment',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'http://webgl.dressformer.com/api/garments',
        reader: {
            type: 'json'
        }
    }
});