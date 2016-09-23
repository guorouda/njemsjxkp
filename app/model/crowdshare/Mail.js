Ext.define('JxkpApp.model.crowdshare.Mail', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'mailnumber', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'address', type: 'string'},
        {name: 'state', type: 'string'},
        {name: 'mobile', type: 'string'},
        {name: 'username', type: 'string'},
        {name: 'employee_id', type: 'string'},
        {name: 'frequency', type: 'string'}
        // {name: 'deliverytime', type: 'date', dateFormat : 'Y-m-d H:i:s.u'}
    ]
});