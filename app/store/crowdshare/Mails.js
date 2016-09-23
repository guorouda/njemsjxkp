Ext.define('JxkpApp.store.crowdshare.Mails', {
    extend: 'Ext.data.Store',
    model: 'JxkpApp.model.crowdshare.Mail',
    autoLoad: false,
    storeId: 'crowdsharemails',
    
    proxy: {
        type: 'ajax',
        api: {
            create: '/jxkpserver/PostmanAction.do?action=deployAdd',
            read: '/jxkpserver/PostmanAction.do?action=deployGet',
            update: '/jxkpserver/PostmanAction.do?action=deployUpdate'

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