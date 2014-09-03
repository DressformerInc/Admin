/**
 * Created by Miha-ha on 21.08.14.
 */
Ext.define('Admin.store.Dummies', {
    extend: 'Ext.data.Store',

    model: 'Admin.model.Dummy',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: Admin.common.Config.api.dummies,
        reader: {
            type: 'json'
        }
    }
});