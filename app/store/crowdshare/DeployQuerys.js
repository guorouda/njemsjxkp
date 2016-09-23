Ext.define('JxkpApp.store.crowdshare.DeployQuerys', {
    extend: 'Ext.data.Store',
    model: 'JxkpApp.model.crowdshare.DeployQuery',
    autoLoad: false,
    storeId: 'crowdsharedeployquerys',

    proxy: {
        type: 'ajax',
        api: {
            // create: '/jxkpserver/PostmanAction.do?action=deployAdd',
            read: '/jxkpserver/PostmanAction.do?action=deployQuery'//,
            // update: '/jxkpserver/PostmanAction.do?action=deployUpdate'

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