/**
 * Created by Miha-ha on 21.08.14.
 */
Ext.define('Admin.store.Garments', {
    extend: 'Ext.data.Store',
    alias: 'store.garments',
    storeId: 'storeGarments',
    model: 'Admin.model.Garment',
    autoLoad: true,
    groupField: 'gid',
    proxy: {
        type: 'ajax',
        url: Admin.common.Config.api.garments,
        reader: {
            type: 'json'
        }
    }
});