/**
 * Created by Miha-ha on 01.09.14.
 */

Ext.define('Admin.common.Api', {
    requires: ['Admin.common.Config'],

    singleton: true,

    constructor: function () {
        this.urls = Admin.common.Config.api;
    },

    //********* Garment CRUD **************

    createGarment: function (params, cb) {
        Ext.Ajax.request({
            url: Admin.common.Config.api.garments,
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

    deleteGarment: function (id, cb) {
        Ext.Ajax.request({
            url: Admin.common.Config.api.garments+id,
            method: 'DELETE',
            success: function (response) {
                cb(null, response);
            },
            failure: function (response) {
                cb(response);
            }
        });
    },

    //********* Geometry CRUD **************

    createGeometry: function (params, cb) {
        Ext.Ajax.request({
            url: Admin.common.Config.api.geometry,
            method: 'POST',
            jsonData: params,
            success: function (response) {
                var json;
                try {
                    json = Ext.decode(response.responseText);
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

    updateGeometry: function (id, params, cb) {
        Ext.Ajax.request({
            url: Admin.common.Config.api.geometry+id,
            method: 'PUT',
            jsonData: params,
            success: function (response) {
                var json;
                try {
                    json = Ext.JSON.decode(response.responseText);
                } catch (e) {
                    cb(e);
                }
                cb(null, json.id);
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

    //********* Material CRUD **************
    createMaterials: function (materials, cb) {
        Ext.Ajax.request({
            url: this.urls.materials,
            method: 'POST',
            jsonData: materials,
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