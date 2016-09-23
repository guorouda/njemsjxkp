Ext.define('JxkpApp.store.crowdshare.AppSalarys', {
    extend: 'Ext.data.Store',
    model: 'JxkpApp.model.crowdshare.AppSalary',
    autoLoad: false,
    storeId: 'crowdshareappsalarys',

    proxy: {
        type: 'ajax',
        api: {
            create: '/jxkpserver/PostmanAction.do?action=salaryAdd',
            read: '/jxkpserver/PostmanAction.do?action=salaryQuery',
            update: '/jxkpserver/PostmanAction.do?action=salaryUpdate',
            destroy: '/jxkpserver/PostmanAction.do?action=salaryDestroy'            
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