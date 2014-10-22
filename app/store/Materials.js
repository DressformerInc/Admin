/**
 * Created by Miha-ha on 21.08.14.
 */
Ext.define('Admin.store.Materials', {
    extend: 'Ext.data.TreeStore',
    root: {
        expanded: true,
        children: [
            { prop: "texture", value:'1.png', leaf: true },
            { prop: "textures", expanded: true, children: [
                { prop: "diffuse", value:'diff.png',  leaf: true },
                { prop: "specular", value:'spec.png',  leaf: true }
            ] }
        ]
    }
});