Ext.define('JxkpApp.view.crowdshare.DeployForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.deployformlist',

    requires: [
        'Ext.form.field.ComboBox'
    ],
    
    height: 250,
    width: 400,
    bodyPadding: 10,
    title: '信息列表',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'id',
                    labelWidth: 70,
                    labelAlign: 'right',
                    name: 'id',
                    hidden: true
                },
                {
                    xtype: 'combodirection',
                    anchor: '100%',
                    fieldLabel: '方向',
                    labelWidth: 70,
                    labelAlign: 'right',
                    name: 'address'
                },
                // {
                //     xtype: 'textfield',
                //     anchor: '100%',
                //     fieldLabel: '区块',
                //     labelWidth: 70,
                //     labelAlign: 'right',
					// name: 'address'
                // },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: '件数',
                    labelWidth: 70,
                    labelAlign: 'right',
                    name: 'mailnumber'
                }//,
                // {
                //     xtype: 'textfield',
                //     anchor: '100%',
                //     fieldLabel: '姓名',
                //     labelWidth: 70,
                //     labelAlign: 'right',
					// name: 'name'
                // },
                // {
                //     xtype: 'textfield',
                //     anchor: '100%',
                //     fieldLabel: '联系电话',
                //     labelWidth: 70,
                //     labelAlign: 'right',
					// name: 'mobile'
                // },
                // {
                //     xtype: 'textfield',
                //     anchor: '100%',
                //     fieldLabel: '状态',
                //     labelWidth: 70,
                //     labelAlign: 'right',
					// name: 'state'
                // }
            ],
            buttons:[{
                text: '新增',
                iconCls: 'add',
                action: 'add'

            },{
                text: '保存',
                iconCls: 'disk',
                action: 'disk'

            },{
                text: '取消',
                iconCls: 'delete',
                action: 'delete'

            }]
        });

        me.callParent(arguments);
    }

});