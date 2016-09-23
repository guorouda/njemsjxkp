Ext.define('JxkpApp.store.crowdshare.Users', {
    extend: 'Ext.data.Store',
    model: 'JxkpApp.model.crowdshare.User',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        api: {
            // create: '/jxkpserver/PostmanAction.do?action=addUser',
            read: '/jxkpserver/PostmanAction.do?action=get',
            update: '/jxkpserver/PostmanAction.do?action=update'

        },
        reader: {
            type: 'json',
            root: 'users'//,
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