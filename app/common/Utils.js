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
            var words = str.split(/\s+/),
                params = {
                    id: '',
                    orig_name: '',
                    options: ''
                };

            if (words.length === 0) return params;

            //пробелы в имени файла недопустимы
            var file = words[words.length-1].split('/');
            params.orig_name = file[file.length-1];

            if (words.length > 1){
                params.options = words.slice(0, -1).join(' ');
            }

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