/**
 * Created by Miha-ha on 01.09.14.
 */

Ext.define('Admin.common.Api', {
    requires: ['Admin.common.Config'],

    singleton: true,

    constructor: function () {
        this.urls = Admin.common.Config.api;
    },

    //********* Geometry CRUD **************

    createGeometry: function (params, cb) {
        Ext.Ajax.request({
            url: Admin.common.Config.api.geometry,
            method: 'POST',
            jsonData: params,
            success: function (response) {
                try {
                    var json = Ext.JSON.decode(response.responseText);
                    cb(null, json.id);
                } catch (e) {
                    cb(e);
                }
            },
            failure: function (response) {
                cb(response);
            }
        });
    },

    updateGeometry: function (id, params, cb) {
        Ext.Ajax.request({
            url: Admin.common.Config.api.geometry+id,
            method: 'PUT',
            jsonData: params,
            success: function (response) {
                try {
                    var json = Ext.JSON.decode(response.responseText);
                    cb(null, json.id);
                } catch (e) {
                    cb(e);
                }
            },
            failure: function (response) {
                cb(response);
            }
        });
    },

    deleteGeometry: function (id, cb) {
        Ext.Ajax.request({
            url: Admin.common.Config.api.geometry+id,
            method: 'DELETE',
            success: function (response) {
                cb(null, response);
            },
            failure: function (response) {
                cb(response);
            }
        });
    },

    //********* Dummy CRUD **************

    /**
     * Create
     * @param params
     * @param cb
     */
    createDummy: function (params, cb) {
        Ext.Ajax.request({
            url: this.urls.dummies,
            method: 'POST',
            jsonData: params,
            success: function (response) {
                var json;
                try {
                    json = Ext.JSON.decode(response.responseText);
                } catch (e) {
                    return cb(e);
                }

                cb(null, json);
            },
            failure: function (response) {
                cb(response);
            }
        });
    },

    /**
     * Delete
     * @param id
     * @param cb
     */
    deleteDummy: function (id, cb) {
        Ext.Ajax.request({
            url: this.urls.dummies + id,
            method: 'DELETE',
            success: function (response) {
                cb(null, response);
            },
            failure: function (response) {
                cb(response);
            }
        });
    }
});