/**
 * Created by Miha-ha on 01.09.14.
 */

Ext.define('Admin.common.Utils', {
    singleton: true,
    error: function (msg, data) {
        Ext.Msg.show({
            title: 'Error',
            message: msg,
            buttons: Ext.Msg.YES,
            icon: Ext.Msg.ERROR
        });
        console.error(msg, data);
    }
});