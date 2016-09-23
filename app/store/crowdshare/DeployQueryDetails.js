Ext.define('JxkpApp.store.crowdshare.DeployQueryDetails', {
    extend: 'Ext.data.Store',
    model: 'JxkpApp.model.crowdshare.DeployQueryDetail',
    autoLoad: false,
    storeId: 'crowdsharedeployquerydetails',

    proxy: {
        type: 'ajax',
        api: {
            create: '/jxkpserver/PostmanAction.do?action=deployAddDetail',
            read: '/jxkpserver/PostmanAction.do?action=deployQueryDetail',
            update: '/jxkpserver/PostmanAction.do?action=deployUpdateDetail',
            destroy: '/jxkpserver/PostmanAction.do?action=deployDestroyDetail'            
        },
        reader: {
            type: 'json',
            root: 'users'//,
            // successProperty: 'success'
        },
        writer: {
            type: 'json',
            encode: true,
            allowSingle: false, //
            root: "data"
        }
    }
});