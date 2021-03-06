/**
 * Created by Miha-ha on 22.08.14.
 */
/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Admin.view.geometry.EditModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.geometryedit',

    stores: {
        garmentData: Ext.create('Ext.data.TreeStore', {
            rootVisible: false,
            root: {
                expanded: true,
                children: [
                    { text: "textures", leaf: false, children:[] },
                    { text: "targets", leaf: false, children:[] },
                    { text: "unknown", leaf: false, children:[] }
                ]
            }
        })
    }
});