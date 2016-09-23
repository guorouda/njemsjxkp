Ext.define('JxkpApp.model.crowdshare.User', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'emp_id', type: 'string'},
        {name: 'emp_name', type: 'string'},
        {name: 'pid', type: 'string'},
        {name: 'active', type: 'string'},
        {name: 'emgency', type: 'string'},
        {name: 'emgencymobile', type: 'string'},
        {name: 'frontpic', type: 'string'},
        {name: 'registerdate', type: 'date', dateFormat : 'Y-m-d H:i:s.u'}

    ]
});