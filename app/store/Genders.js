Ext.define('JxkpApp.store.Genders', {
    extend: 'Ext.data.Store', 

    autoLoad: true,

    fields: [
        {name: 'di_value', type: 'String'},
        {name: 'di_caption', type: 'String'}
    ],
    data: [
        {'di_value': '0', 'di_caption': '无'},
        {'di_value': '1', 'di_caption': '男'},
        {'di_value': '2', 'di_caption': '女'}
    ]
        
});