Ext.define('JxkpApp.view.user.UserDeleteFormList', {
    extend: 'Ext.container.Container',
    alias: 'widget.userdeleteformlist',

    requires: [
        'JxkpApp.view.user.UserDeleteForm',
        'Ext.form.Panel'
    ],

    autoScroll: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'userdeleteform'
                },
                {
                    xtype: 'container',
                    flex: 1
                }
            ]
        });

        me.callParent(arguments);
    }

});