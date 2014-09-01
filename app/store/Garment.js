/**
 * Created by Miha-ha on 21.08.14.
 */
Ext.define('Admin.store.Garment', {
    extend: 'Ext.data.Store',
    alias: 'store.garment',
    model: 'Admin.model.Garment',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: Admin.class.Config.api.garments,
        reader: {
            type: 'json'
        }
    }
});