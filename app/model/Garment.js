/**
 * Created by Miha-ha on 21.08.14.
 */

Ext.define('Admin.model.Garment', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',  type: 'string'},
        {name: 'gid',  type: 'string'},
        {name: 'name',  type: 'string'}
    ]
});