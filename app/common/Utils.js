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
    },
    parseMtl: function (mtl) {
        var lines = mtl.split("\n"),
            info = {},
            delimiter_pattern = /\s+/,
            mapPattern = /(map_|bump)/,
            materialsInfo = {};

        function parseTextureParams(str) {
            var words = str.split(' '),
                params = {
                    orig_name: ''
                };

            for (var i = 0, l = words.length; i < l; ++i) {
                var word = words[i];
                if ('-' === word[0]) {
                    params[word] = words[i+1];
                    i++;
                }else {
                    if (params.orig_name) params.orig_name += ' ';
                    params.orig_name += word;
                }
            }

//            //find id of file
//            for (var p in this.options.assets){
//                if (this.options.assets.hasOwnProperty(p)) {
//                    var prop = this.options.assets[p];
//                    if (prop.orig_name === params.file) params.url = prop.url;
//                }
//            }

            return params;
        }

        for (var i = 0, l = lines.length; i < l; ++i) {

            var line = lines[i];
            line = line.trim();

            // Blank line or comment ignore
            if (line.length === 0 || line.charAt(0) === '#') continue;

            var pos = line.indexOf(' ');
            var key = ( pos >= 0 ) ? line.substring(0, pos) : line;
            key = key.toLowerCase();

            var value = ( pos >= 0 ) ? line.substring(pos + 1) : "";
            value = value.trim();

            if (key === "newmtl") {
                // New material
                info = {name: value};
                materialsInfo[value] = info;
            } else if (info) {
//                if (key === "ka" || key === "kd" || key === "ks") {
//                    var ss = value.split(delimiter_pattern, 3);
//                    info[key] = [parseFloat(ss[0]), parseFloat(ss[1]), parseFloat(ss[2])];
//                } else {
//                    info[key] = value;
//                }
                if (mapPattern.test(key)){
                    info[key] = parseTextureParams(value);
                }else {
                    info[key] = value;
                }

            }

        }

        return materialsInfo;
    }
});