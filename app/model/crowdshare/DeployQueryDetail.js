Ext.define('JxkpApp.model.crowdshare.DeployQueryDetail', {
    extend: 'Ext.data.Model',

    idProperty: 'MAILNUMBER',
    fields: [
        {name: 'ID', type: 'string'},
        {name: 'MAILNUMBER', type: 'string'},
        {name: 'DEAL_ID', type: 'string'},
        {name: 'USERNAME', type: 'string'},
        {name: 'DEALMAILNUMBER', type: 'string'},
        {name: 'ADDRESS', type: 'string'},
        {name: 'DELIVERYOK', type: 'string'},
        {name: 'HANDBACK', type: 'boolean'},
        {name: 'PAY', type: 'string'},
        {name: 'STATE', type: 'string'},
        {name: 'MOBILE', type: 'string'},
        {name: 'EMPLOYEE_ID', type: 'string'},
        {name: 'FREQUENCY', type: 'string'}
    ]
});