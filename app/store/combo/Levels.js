Ext.define('JxkpApp.store.combo.Levels', {
    extend: 'Ext.data.Store', 

    autoLoad: true,

    fields: [
        {name: 'di_value', type: 'String'},
        {name: 'di_caption', type: 'String'},
        {name: 'authorization', type: 'String'}
    ],

    proxy: {
        type: 'ajax',
        api: {
            // read: 'resources/data/users.json', 
            create: '/jxkpserver/DeptAction.do?action=addDd_item&field=authorization',
            read: '/jxkpserver/DeptAction.do?action=getDd_item&field=authorization',
            update: '/jxkpserver/DeptAction.do?action=upDd_item&field=authorization'

        }, 
        reader: {
            type: 'json', 
            root: 'rows'//,
            // successProperty: 'success'    
        },
        writer: {
            type: 'json',
            encode: true,  
            allowSingle: true, // 
            root: "data"
        }
    }
        
});