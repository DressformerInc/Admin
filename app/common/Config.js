/**
 * Created by Miha-ha on 01.09.14.
 */

Ext.define('Admin.common.Config', {
    singleton: true,
    constructor: function () {
//        var url = 'http://webgl.dressformer.com/';
        var url = 'http://v2.dressformer.com/';
        this.api = {
            base: url,
            garments: url+'api/garments/',
            geometry: url+'assets/geometry/',
            user: url+'api/user/',
            assets: url+'assets/'
        };
    }
});