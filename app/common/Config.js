/**
 * Created by Miha-ha on 01.09.14.
 */

Ext.define('Admin.common.Config', {
    singleton: true,
    constructor: function () {
        var url = 'http://v2.dressformer.com/';
//        var url = 'http://localhost:5000/';
        this.api = {
            base: url,
            garments: url+'api/garments/',
            dummies: url+'api/dummies/',
            geometry: url+'assets/geometry/',
            user: url+'api/user/',
            assets: url+'assets/',
            materials: url+'api/materials/'
        };
    }
});