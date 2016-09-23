Ext.define('JxkpApp.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires:[
        'Ext.layout.container.Fit',
        'JxkpApp.view.Main',
        // 'JxkpApp.view.user.List'
    ],

    layout: {
        type: 'fit'
    },

    items: [{
        xtype: 'app-main'
        // xtype: 'userlist'
    }]
});
