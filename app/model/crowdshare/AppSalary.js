Ext.define('JxkpApp.model.crowdshare.AppSalary', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'ID', type: 'string'},
        {name: 'EMP_ID', type: 'string'},
        {name: 'DAYMOENY', type: 'string'},
        {name: 'MONTHMONEY', type: 'string'},
        {name: 'FINEMONEY', type: 'string'},
        {name: 'CREATEDATE', type: 'date', dateFormat : 'Y-m-d H:i:s.u'}
    ]
});