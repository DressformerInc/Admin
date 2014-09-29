/**
 * Created by Miha-ha on 03.09.14.
 */
Ext.define('Admin.view.upload.UploadController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.upload',

//    uploader: null,
//    isUploaded: false,

    bind: {
        uploader: '{uploader}',
        isUploaded: '{isUploaded}'
    },

    onFilesAdded: function (up, files) {
        var fieldName = this.lookupReference('fieldName'),
            tree = this.getView(),
            root = tree.getRootNode(),
            base = root.findChild('name', 'base'),
            textures = root.findChild('name', 'textures'),
            targets = root.findChild('name', 'targets'),
            sections = {
                height: targets.findChild('name', 'height'),
                underbust: targets.findChild('name', 'underbust'),
                underchest: targets.findChild('name', 'underbust'),
                waist: targets.findChild('name', 'waist'),
                chest: targets.findChild('name', 'chest'),
                hips: targets.findChild('name', 'hips')
            },
            unknown = root.findChild('name', 'unknown'),
            params = {
                height: {
                    min: 145,
                    max: 180
                },
                chest: {
                    min: 78.68,
                    max: 105.037
                },
                underbust: {
                    min: 64.598,
                    max: 86.109
                },
                underchest: {
                    min: 64.598,
                    max: 86.109
                },
                waist: {
                    min: 57.462,
                    max: 96.18
                },
                hips: {
                    min: 83.394,
                    max: 124.027
                }
            };

        function isMin(file) {
            return /min/i.test(file.name);
        }

        function isMax(file) {
            return /max/i.test(file.name);
        }

        function isTexture(file) {
            return /image/i.test(file.type);
        }

        function isNormalMap(file) {
            return isTexture(file) && /[_-]n/i.test(file.name);
        }

        function isDiffuseMap(file) {
            return isTexture(file) && /[-_]d/i.test(file.name);
        }

        function isSpecularMap(file) {
            return isTexture(file) && /[-_]s/i.test(file.name);
        }

        function isModel(file) {
            return /\.obj$/.test(file.name);
        }

        function isMtl(file) {
            return /\.mtl$/.test(file.name);
        }

        function isSection(name, file) {
            var re = new RegExp('[_-]?' + name, 'i');
            return isModel(file) && re.test(file.name);
        }

        function getGarmentName(fileName) {
            var parts = fileName.split('.');
            return parts[0] || 'unnamed';
        }

        files.forEach(function (file) {
            var node = {
                name: file.name,
                size: file.size,
                leaf: true
            };

            if (isNormalMap(file)) {
                node.type = 'normal';
                textures.appendChild(node);
            } else if (isDiffuseMap(file)) {
                node.type = 'diffuse';
                textures.appendChild(node);
            } else if (isSpecularMap(file)) {
                node.type = 'specular';
                textures.appendChild(node);
            } else if (isModel(file)) {
                var sectionFind = false;
                for (var section in sections) {
                    if (sections.hasOwnProperty(section)) {
                        var sectionNode = sections[section];
                        if (isSection(section, file)) {
                            sectionFind = true;

                            var weight = params[section];

                            sectionNode.appendChild({
                                name: node.name,
                                size: node.size,
                                weight: isMin(file) ? weight.min : weight.max,
                                type: section,
                                leaf: true
                            });

                            break;
                        }
                    }
                }

                if (!sectionFind) {
                    node.type = 'base';
                    base.appendChild(node);
//                    fieldName.setValue(getGarmentName(file.name));
                }
            } else if (isMtl(file)) {
                node.type = 'mtl';
                base.appendChild(node);
            } else {
                unknown.appendChild(node);
            }
        });

        tree.expandAll();

        this.fireViewEvent('filesadded', tree);
    },

    onFileUploaded: function (up, file, info) {
        var response = Ext.JSON.decode(info.response),
            tree = this.getView(),
            root = tree.getRootNode(),
            node = root.findChild('name', file.name, true);

        if (node && response.length > 0) {
            node.set('assetId', response[0].id);
            node.save();
        }
    },

    onUploadProgress: function (up, file) {
        var tree = this.getView(),
            root = tree.getRootNode(),
            node = root.findChild('name', file.name, true);

        if (node) {
            node.set('status', file.percent);
            node.save();
        }
    },

    onUploadComplete: function (up, files) {
        this.isUploaded = true;
        this.fireViewEvent('uploadedcomplete', this, files);
    },

    onViewRendered: function () {
        var me = this,
            vmData = this.getViewModel().data,
            buttonSelectFiles = this.lookupReference('buttonSelectFiles');


        vmData.uploader = me.uploader = new plupload.Uploader({
            runtimes: 'html5',
            browse_button: buttonSelectFiles.getEl().dom.id, // you can pass in id...
            container: me.getView().getEl().dom.id, // ... or DOM Element itself
            url: Admin.common.Config.api.assets,

            filters: {
                max_file_size: '50mb',
                mime_types: [
                    {title: "Image files", extensions: "jpg,gif,png"},
                    {title: "Obj/mtl files", extensions: "obj,mtl"}
                ]
            },

            init: {
                PostInit: function () {

                },

                FilesAdded: me.onFilesAdded.bind(me),

                FileUploaded: me.onFileUploaded.bind(me),

                UploadComplete: me.onUploadComplete.bind(me),

                UploadProgress: me.onUploadProgress.bind(me),

                Error: function (up, err) {
                    console.log('upload error:', err);
                }
            }
        });

        me.uploader.init();
    }
});