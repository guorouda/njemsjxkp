Ext.define('JxkpApp.model.crowdshare.DeployQuery', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'ID', type: 'string'},
        {name: 'MAILNUMBER', type: 'string'},
        {name: 'DEAL_ID', type: 'string'},
        {name: 'USERNAME', type: 'string'},
        {name: 'DEALMAILNUMBER', type: 'string'},
        {name: 'ADDRESS', type: 'string'},
        {name: 'STATE', type: 'string'},
        {name: 'DELIVERYOK', type: 'string'},
        {name: 'COUNT', type: 'string'},
        {name: 'MOBILE', type: 'string'},
        {name: 'EMPLOYEE_ID', type: 'string'},
        {name: 'FREQUENCY', type: 'string'}
    ]
});