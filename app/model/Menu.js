Ext.define('JxkpApp.model.Menu', {
    extend: 'Ext.data.Model',

    requires: [
        // 'Ext.grid.column.Boolean'
    ],

    fields: [
        {
            name: 'id'
        },
        {
            name: 'text'
        },
        {
            type: 'boolean',
            defaultValue: false,
            name: 'leaf',
            persist: false
        },
        {
            name: 'iconCls'
        }
    ]
});