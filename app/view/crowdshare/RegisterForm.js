Ext.define('JxkpApp.view.crowdshare.RegisterForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.registerformlist',

    requires: [
        'Ext.form.field.ComboBox',
        'Ext.Img'
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
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: '登录名',
                    labelWidth: 70,
                    labelAlign: 'right',
					name: 'emp_id'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: '真实姓名',
                    labelWidth: 70,
                    labelAlign: 'right',
					name: 'emp_name'
                },

                {
                    xtype: 'datefield',
                    anchor: '100%',
                    fieldLabel: '注册时间',
                    labelWidth: 70,
                    labelAlign: 'right',
                    format: 'Y/m/d',
                    submitFormat: 'Y-m-d H:i:s.u',
                    name: 'registerdate'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: '身份证号码',
                    labelWidth: 70,
                    labelAlign: 'right',
					name: 'pid'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: '联系人',
                    labelWidth: 70,
                    labelAlign: 'right',
					name: 'emgency'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: '联系人电话',
                    labelWidth: 70,
                    labelAlign: 'right',
					name: 'emgencymobile'
                },
                {
                    xtype: 'image',
                    height: 200,
                    itemId: 'imgFront',
                    name: 'frontpic'
                }
            ],
            buttons:[{
                text: '激活',
                iconCls: 'disk',
                action: 'disk'

            },{
                text: '驳回',
                iconCls: 'delete',
                action: 'delete'

            }]
        });

        me.callParent(arguments);
    }

});