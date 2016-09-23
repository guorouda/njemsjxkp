Ext.define('JxkpApp.view.user.UserDeleteForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.userdeleteform',

    requires: [
        'Ext.form.field.File',
        'Ext.button.Button'
    ],

    height: 100,
    width: 490,
    bodyPadding: 10,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'filefield',
                    width: 395,
                    fieldLabel: '文件',
                    name: 'file'
                }
            ],
            buttons:[{
                text: '保存',
                iconCls: 'disk',
                action: 'user_delete'

            }]
        });

        me.callParent(arguments);
    }

});