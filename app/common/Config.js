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
            garments: url+'api/v2/garments/',
            dummies: url+'api/v2/dummies/',
            geometry: url+'assets/v2/geometry/',
            user: url+'api/v2/user/',
            assets: url+'assets/v2/',
            materials: url+'api/v2/materials/'
        };
    }
});