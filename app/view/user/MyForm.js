Ext.define('JxkpApp.view.user.MyForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.usermyform',

    requires: [
        'Ext.form.field.ComboBox',
        'JxkpApp.view.user.Dept'
    ],

    height: 250,
    width: 400,
    autoScroll: true,
    bodyPadding: 10,
    title: '信息列表',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'ID',
                    labelWidth: 70,
                    labelAlign: 'right',
                    name: 'ID',
                    hidden: true
                },            
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: '工号',
                    labelWidth: 70,
                    labelAlign: 'right',
					name: 'EMP_ID'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: '姓名',
                    labelWidth: 70,
                    labelAlign: 'right',
					name: 'EMP_NAME'
                },
                {
                    xtype: 'userdept',
                    anchor: '100%',
                    fieldLabel: '部门',
                    labelWidth: 70,
                    labelAlign: 'right',
					name: 'DEP_ID'
                },
                {
                    xtype: 'combolevel',
                    anchor: '100%',
                    fieldLabel: '级别',
                    labelWidth: 70,
                    labelAlign: 'right',
					name: 'LEV'
                },
                {
                    xtype: 'combogender',
                    anchor: '100%',
                    fieldLabel: '性别',
                    labelWidth: 70,
                    labelAlign: 'right',
					name: 'SEX'
                },
                {
                    xtype: 'combostation',
                    anchor: '100%',
                    fieldLabel: '岗位名称',
                    labelWidth: 70,
                    labelAlign: 'right',
					name: 'STATION'
                },
                {
                    xtype: 'combosegment',
                    anchor: '100%',
                    fieldLabel: '段道',
                    labelWidth: 70,
                    labelAlign: 'right',
					name: 'SEGMENT'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: '人员类别',
                    labelWidth: 70,
                    labelAlign: 'right',
					name: 'CATEGORY'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: '文化程度',
                    labelWidth: 70,
                    labelAlign: 'right',
					name: 'EDU'
                },
                {
                    xtype: 'datefield',
                    anchor: '100%',
                    fieldLabel: '出生年月',
                    labelWidth: 70,
                    labelAlign: 'right',
                    format: 'Y/m/d',
                    submitFormat: 'Y-m-d H:i:s.u',
                    name: 'BIRTHDAY'
                },
                {
                    xtype: 'datefield',
                    anchor: '100%',
                    fieldLabel: '工作年月',
                    labelWidth: 70,
                    labelAlign: 'right',
                    format: 'Y/m/d',
                    submitFormat: 'Y-m-d H:i:s.u',
					name: 'GN'
                },
                {
                    xtype: 'datefield',
                    anchor: '100%',
                    fieldLabel: '入局年月',
                    labelWidth: 70,
                    labelAlign: 'right',
                    format: 'Y/m/d',
                    submitFormat: 'Y-m-d H:i:s.u',
					name: 'RJ'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: '身份证号码',
                    labelWidth: 70,
                    labelAlign: 'right',
					name: 'PID'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: '岗位名称',
                    labelWidth: 70,
                    labelAlign: 'right',
					name: 'GWMC'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: '职级',
                    labelWidth: 70,
                    labelAlign: 'right',
					name: 'ZJ'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: '技术职务',
                    labelWidth: 70,
                    labelAlign: 'right',
					name: 'JSZW'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: '技术级别',
                    labelWidth: 70,
                    labelAlign: 'right',
					name: 'JSJB'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: '岗位工资',
                    labelWidth: 70,
                    labelAlign: 'right',
					name: 'GWGZ'
                },
                {
                    xtype: 'textareafield',
                    anchor: '100%',
                    fieldLabel: '备注',
                    labelWidth: 70,
                    labelAlign: 'right',
					name: 'MEMO'
                }
            ],
            buttons:[{
                text: '新建',
                iconCls: 'add',
                action: 'add'
            },{
                text: '保存',
                iconCls: 'disk',
                action: 'disk'

            },{
                text: '清除',
                iconCls: 'delete',
                action: 'delete'

            }]
        });

        me.callParent(arguments);
    }

});